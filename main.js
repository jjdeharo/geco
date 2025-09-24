const DEFAULT_LANGUAGE = 'es';
let currentLanguage = DEFAULT_LANGUAGE;
let incompatibleGroups = [];
let lastReportData = null;
let studentAssignments = [];
const STUDENT_TYPES = ['A', 'B', 'C'];
let lastFocusedElement = null;
let isTypologyModalOpen = false;
let isImportModalOpen = false;
let lastFocusedImportElement = null;
let isFullImportModalOpen = false;
let fullImportSelectedData = null;
const STORAGE_KEY = 'gecoStateV1';


const SAMPLE_NAMES = {
  es: {
    A: ['Ana', 'Pedro', 'María', 'Luis'],
    B: ['Lucía', 'Carlos', 'Marta', 'Juan', 'Sofía', 'Miguel', 'Elena', 'Pablo', 'Laura', 'Alejandro', 'Carmen', 'David', 'Raquel', 'Andrea', 'Jorge'],
    C: ['Isabel', 'Guillermo', 'Martín', 'Irene', 'Daniel', 'Teresa', 'Javier']
  },
  ca: {
    A: ['Anna', 'Pau', 'Maria', 'Lluís'],
    B: ['Laia', 'Oriol', 'Núria', 'Jordi', 'Clara', 'Marc', 'Gemma', 'Arnau', 'Mireia', 'Roger', 'Meritxell', 'Xavi', 'Helena', 'Carles', 'Irene'],
    C: ['Montserrat', 'Ferran', 'Eulàlia', 'Biel', 'Neus', 'Quim', 'Sílvia']
  },
  gl: {
    A: ['Uxía', 'Xoán', 'Brais', 'Sabela'],
    B: ['Noa', 'Manuel', 'Iria', 'Diego', 'Antía', 'Hugo', 'Celia', 'Mateo', 'Lara', 'Iago', 'Uxío', 'Carmen', 'Breogán', 'Alda', 'Xiana'],
    C: ['Rosalía', 'Lois', 'Mencía', 'Teo', 'Lúa', 'Anxo', 'Carme']
  },
  eu: {
    A: ['Ane', 'Iker', 'Maialen', 'Jon'],
    B: ['Uxue', 'Aitor', 'Nahia', 'Unai', 'June', 'Asier', 'Irati', 'Ibai', 'Mikel', 'Odei', 'Leire', 'Gorka', 'Ainhoa', 'Ekaitz', 'Nerea'],
    C: ['Kattalin', 'Endika', 'Itziar', 'Luken', 'Amaia', 'Gaizka', 'Naia']
  },
  en: {
    A: ['Alice', 'Peter', 'Mary', 'Lewis'],
    B: ['Olivia', 'Liam', 'Emma', 'Noah', 'Sophia', 'James', 'Amelia', 'Benjamin', 'Charlotte', 'Ethan', 'Harper', 'Daniel', 'Grace', 'Lucas', 'Chloe'],
    C: ['George', 'Martha', 'Samuel', 'Eleanor', 'Harold', 'Ivy', 'Caleb']
  }
};

const SAMPLE_NAME_GROUPS = {
  grupoA: 'A',
  grupoB: 'B',
  grupoC: 'C'
};

function getSampleList(lang, groupKey) {
  return SAMPLE_NAMES[lang]?.[groupKey] || null;
}

function formatSampleNames(lang, groupKey) {
  const list = getSampleList(lang, groupKey);
  return list ? list.join('\n') : '';
}

function getSampleSignature(lang, groupKey) {
  const list = getSampleList(lang, groupKey);
  return list ? list.join('|') : null;
}

function normaliseNamesValue(value) {
  if (!value) {
    return '';
  }
  return parseNames(value).join('|');
}

function isSampleValueForLang(value, lang, groupKey) {
  const signature = getSampleSignature(lang, groupKey);
  if (!signature) {
    return false;
  }
  return normaliseNamesValue(value) === signature;
}

function findSampleLanguageForValue(value, groupKey) {
  const signature = normaliseNamesValue(value);
  if (!signature) {
    return null;
  }
  return Object.keys(SAMPLE_NAMES).find(lang => getSampleSignature(lang, groupKey) === signature) || null;
}

function resolveKey(obj, path) {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

function replaceParams(text, params) {
  return Object.keys(params).reduce((acc, key) => acc.replace(new RegExp(`\\{${key}\\}`, 'g'), params[key]), text);
}

function t(key, params = {}) {
  const langData = TRANSLATIONS[currentLanguage] || TRANSLATIONS[DEFAULT_LANGUAGE];
  let template = resolveKey(langData, key);
  if (template === undefined) {
    template = resolveKey(TRANSLATIONS[DEFAULT_LANGUAGE], key);
  }
  if (template === undefined) {
    return key;
  }
  if (typeof template === 'function') {
    return template(params);
  }
  return replaceParams(template, params);
}

function getCurrentLocale() {
  const info = TRANSLATIONS[currentLanguage] || TRANSLATIONS[DEFAULT_LANGUAGE];
  return info.locale || 'es-ES';
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const type = el.dataset.i18nType || 'text';
    const value = t(key);
    if (type === 'html') {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.setAttribute('placeholder', t(key));
  });
}

function buildLanguageSwitcher() {
  const container = document.getElementById('languageSwitcher');
  if (!container) return;
  container.innerHTML = '';
  const preferred = ['es', 'ca', 'gl', 'eu'];
  const order = preferred.filter(lang => TRANSLATIONS[lang]).concat(
    Object.keys(TRANSLATIONS).filter(lang => !preferred.includes(lang) && lang !== 'en')
  );
  if (TRANSLATIONS.en) {
    order.push('en');
  }
  order.forEach(lang => {
    const btn = document.createElement('button');
    btn.className = 'lang-btn';
    btn.textContent = TRANSLATIONS[lang].languageName || lang.toUpperCase();
    if (lang === currentLanguage) {
      btn.classList.add('active');
    }
    btn.addEventListener('click', () => {
      if (lang !== currentLanguage) {
        setLanguage(lang);
      }
    });
    container.appendChild(btn);
  });
}

function getCurrentTipoGrupo() {
  return document.querySelector('input[name="tipoGrupo"]:checked')?.value || 'heterogeneos';
}

function getCurrentSobrantes() {
  return document.querySelector('input[name="sobrantes"]:checked')?.value || 'grupoNuevo';
}

function getCurrentNumAlumnos() {
  return parseInt(document.getElementById('numAlumnos').value, 10) || 0;
}

function cloneEquipos(equipos) {
  return equipos ? equipos.map(grupo => grupo.map(alumno => ({ nombre: alumno.nombre, tipo: alumno.tipo }))) : null;
}

function detectBrowserLanguage() {
  const supported = Object.keys(TRANSLATIONS);
  const navigatorLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  if (supported.includes(navigatorLang)) {
    return navigatorLang;
  }
  const match = supported.find(lang => navigatorLang.startsWith(lang.toLowerCase()));
  return match || DEFAULT_LANGUAGE;
}

function parseNames(value) {
  return (value || '')
    .split(/\r?\n/)
    .map(item => item.replace(/^["']|["']$/g, '').trim())
    .filter(item => item.length > 0);
}

function normaliseStudentType(value) {
  const token = (value || '').toString().trim().toUpperCase();
  if (token === 'A' || token === 'B' || token === 'C') {
    return token;
  }
  if (token.startsWith('A')) {
    return 'A';
  }
  if (token.startsWith('C')) {
    return 'C';
  }
  if (token.startsWith('B')) {
    return 'B';
  }
  return 'B';
}

function normaliseAssignments(assignments) {
  const locale = getCurrentLocale();
  const map = new Map();
  assignments.forEach(student => {
    if (!student) return;
    const name = (student.nombre || '').trim();
    if (!name) return;
    const key = name.toLowerCase();
    map.set(key, { nombre: name, tipo: normaliseStudentType(student.tipo) });
  });
  return Array.from(map.values()).sort((a, b) => a.nombre.localeCompare(b.nombre, locale, { sensitivity: 'base' }));
}

function showImportStatus(key, params = {}, status = 'info') {
  const statusEl = document.getElementById('importStatus');
  if (!statusEl) {
    return;
  }
  if (!key) {
    statusEl.textContent = '';
    statusEl.classList.remove('success', 'error');
    return;
  }
  statusEl.textContent = t(key, params);
  statusEl.classList.remove('success', 'error');
  if (status === 'success') {
    statusEl.classList.add('success');
  } else if (status === 'error') {
    statusEl.classList.add('error');
  }
}

function showFullImportStatus(message, type = 'info') {
  const el = document.getElementById('fullImportStatus');
  if (!el) return;
  el.textContent = message || '';
  el.classList.remove('success', 'error');
  if (type === 'success') el.classList.add('success');
  if (type === 'error') el.classList.add('error');
}

function saveAppState() {
  try {
    const payload = {
      version: 1,
      data: {
        students: studentAssignments || [],
        incompatibleGroups: incompatibleGroups || [],
        teams: lastReportData?.equipos || null,
        tipoGrupo: lastReportData?.tipoGrupo || getCurrentTipoGrupo(),
        numAlumnos: getCurrentNumAlumnos(),
        opcionSobrantes: getCurrentSobrantes()
      }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) { /* ignore */ }
}

function loadAppState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    const data = parsed && parsed.data ? parsed.data : parsed; // admite export antiguo
    if (!data) return false;
    const students = Array.isArray(data.students) ? data.students : [];
    if (students.length > 0) {
      replaceStudentAssignments(students);
    }
    if (Array.isArray(data.incompatibleGroups)) {
      const nameSet = new Set((studentAssignments || []).map(s => s.nombre));
      incompatibleGroups = data.incompatibleGroups
        .map(g => g.filter(n => nameSet.has(n)))
        .filter(g => g.length >= 2);
      refreshIncompatiblesUI();
    }
    // Sincronizar controles del UI con preferencias guardadas
    const tipoGrupo = data.tipoGrupo || getCurrentTipoGrupo();
    const numAlumnos = typeof data.numAlumnos === 'number' ? data.numAlumnos : getCurrentNumAlumnos();
    const opcionSobrantes = data.opcionSobrantes || getCurrentSobrantes();
    // Radios tipoGrupo
    const tipoRadio = document.querySelector(`input[name="tipoGrupo"][value="${tipoGrupo}"]`);
    if (tipoRadio) tipoRadio.checked = true;
    // Burbujas número y hidden input
    const hiddenInput = document.getElementById('numAlumnos');
    if (hiddenInput) hiddenInput.value = String(numAlumnos);
    document.querySelectorAll('.bubble').forEach(b => {
      const val = b.getAttribute('data-value');
      if (val === String(numAlumnos)) b.classList.add('active'); else b.classList.remove('active');
    });
    // Radios sobrantes
    const sobRadio = document.querySelector(`input[name="sobrantes"][value="${opcionSobrantes}"]`);
    if (sobRadio) sobRadio.checked = true;
    if (Array.isArray(data.teams) && data.teams.length > 0) {
      const equipos = data.teams.map(grupo => grupo.map(al => ({ nombre: al.nombre, tipo: al.tipo })));
      mostrarEquipos(equipos);
      lastReportData = {
        equipos: cloneEquipos(equipos),
        tipoGrupo,
        numAlumnos,
        opcionSobrantes
      };
      mostrarInforme(equipos, tipoGrupo, numAlumnos, opcionSobrantes);
    }
    return true;
  } catch (e) { return false; }
}

function showQuickPasteStatus(messageKey, params = {}, type = 'info') {
  const el = document.getElementById('quickPasteStatus');
  if (!el) return;
  if (!messageKey) {
    el.textContent = '';
    el.classList.remove('success', 'error');
    return;
  }
  el.textContent = t(messageKey, params);
  el.classList.remove('success', 'error');
  if (type === 'success') el.classList.add('success');
  if (type === 'error') el.classList.add('error');
}

function refreshBodyModalState() {
  if (isTypologyModalOpen || isImportModalOpen) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
}

function renderAssignmentsTable() {
  const container = document.getElementById('bulkTableContainer');
  if (!container) {
    return;
  }
  container.innerHTML = '';
  if (!studentAssignments || studentAssignments.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = t('bulkInput.emptyTable');
    container.appendChild(emptyMsg);
    return;
  }

  const table = document.createElement('table');
  table.className = 'bulk-table';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = [
    { key: 'bulkInput.table.name', className: '' },
    { key: 'bulkInput.table.typeA', className: 'type-column' },
    { key: 'bulkInput.table.typeB', className: 'type-column' },
    { key: 'bulkInput.table.typeC', className: 'type-column' },
    { key: 'bulkInput.table.actions', className: '' }
  ];
  headers.forEach(({ key, className }) => {
    const th = document.createElement('th');
    th.textContent = t(key);
    if (className) {
      th.className = className;
    }
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  studentAssignments.forEach((student, index) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = student.nombre;
    nameInput.addEventListener('change', event => handleAssignmentNameChange(index, event.target.value));
    nameCell.appendChild(nameInput);
    row.appendChild(nameCell);

    STUDENT_TYPES.forEach(tipo => {
      const typeCell = document.createElement('td');
      typeCell.className = 'type-column';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'type-toggle';
      if (student.tipo === tipo) {
        button.classList.add('selected');
        button.textContent = 'X';
      } else {
        button.textContent = '•';
      }
      button.addEventListener('click', () => handleAssignmentTypeClick(index, tipo));
      typeCell.appendChild(button);
      row.appendChild(typeCell);
    });

    const actionCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'row-delete';
    deleteBtn.textContent = t('bulkInput.deleteRow');
    deleteBtn.addEventListener('click', () => handleAssignmentDelete(index));
    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

function focusFirstTypologyField() {
  const modal = document.getElementById('typologyModal');
  if (!modal) {
    return;
  }
  const firstEditable = modal.querySelector('.modal-body input, .modal-body select');
  if (firstEditable) {
    firstEditable.focus();
    return;
  }
  const closeBtn = document.getElementById('typologyModalClose');
  if (closeBtn) {
    closeBtn.focus();
  }
}

function handleTypologyModalKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeTypologyModal();
  }
}

function openTypologyModal() {
  const modal = document.getElementById('typologyModal');
  if (!modal || isTypologyModalOpen) {
    return;
  }
  lastFocusedElement = document.activeElement;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  isTypologyModalOpen = true;
  renderAssignmentsTable();
  focusFirstTypologyField();
  document.addEventListener('keydown', handleTypologyModalKeydown);
  refreshBodyModalState();
}

function closeTypologyModal() {
  const modal = document.getElementById('typologyModal');
  if (!modal || !isTypologyModalOpen) {
    return;
  }
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  isTypologyModalOpen = false;
  document.removeEventListener('keydown', handleTypologyModalKeydown);
  refreshBodyModalState();
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
}

function initTypologyModal() {
  const openBtn = document.getElementById('openTypologyModal');
  if (openBtn) {
    openBtn.addEventListener('click', openTypologyModal);
  }
  const closeBtn = document.getElementById('typologyModalClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeTypologyModal);
  }
  const doneBtn = document.getElementById('typologyModalDone');
  if (doneBtn) {
    doneBtn.addEventListener('click', closeTypologyModal);
  }
  const downloadBtn = document.getElementById('downloadAssignmentsBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadAssignmentsAsCsv);
  }
  const modal = document.getElementById('typologyModal');
  if (modal) {
    modal.addEventListener('click', event => {
      if (event.target === modal) {
        closeTypologyModal();
      }
    });
  }
}

function handleAssignmentNameChange(index, value) {
  if (!studentAssignments[index]) {
    return;
  }
  studentAssignments[index].nombre = value;
  studentAssignments = normaliseAssignments(studentAssignments);
  syncTextareasFromAssignments();
  renderAssignmentsTable();
  saveAppState();
}

function handleAssignmentTypeClick(index, tipo) {
  if (!studentAssignments[index]) {
    return;
  }
  studentAssignments[index].tipo = normaliseStudentType(tipo);
  studentAssignments = normaliseAssignments(studentAssignments);
  syncTextareasFromAssignments();
  renderAssignmentsTable();
  saveAppState();
}

function handleAssignmentDelete(index) {
  if (index < 0 || index >= studentAssignments.length) {
    return;
  }
  studentAssignments.splice(index, 1);
  studentAssignments = normaliseAssignments(studentAssignments);
  syncTextareasFromAssignments();
  renderAssignmentsTable();
  saveAppState();
}

function syncTextareasFromAssignments() {
  const locale = getCurrentLocale();
  const grouped = { A: [], B: [], C: [] };
  studentAssignments.forEach(student => {
    if (!grouped[student.tipo]) {
      grouped[student.tipo] = [];
    }
    grouped[student.tipo].push(student.nombre);
  });
  STUDENT_TYPES.forEach(tipo => {
    const textarea = document.getElementById('grupo' + tipo);
    if (!textarea) {
      return;
    }
    const names = grouped[tipo] || [];
    names.sort((a, b) => a.localeCompare(b, locale, { sensitivity: 'base' }));
    textarea.value = names.join('\n');
    delete textarea.dataset.sampleLang;
  });
  updateInfoGrupos();
  saveAppState();
}

function updateAssignmentsFromTextareas(options = {}) {
  const { renderTable = true } = options;
  const { grupoA, grupoB, grupoC } = getStudentLists();
  const merged = [
    ...grupoA.map(nombre => ({ nombre, tipo: 'A' })),
    ...grupoB.map(nombre => ({ nombre, tipo: 'B' })),
    ...grupoC.map(nombre => ({ nombre, tipo: 'C' }))
  ];
  studentAssignments = normaliseAssignments(merged);
  if (renderTable) {
    renderAssignmentsTable();
  }
}

function parseBulkInput(rawText) {
  return rawText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      const cleaned = line.replace(/"/g, '');
      // Solo tabulador o punto y coma como separador de columnas; la coma puede formar parte del nombre
      const parts = cleaned.split(/\t|;/);
      const name = (parts[0] || '').trim();
      if (!name) {
        return null;
      }
      const typeValue = parts.length > 1 ? parts[1].trim() : '';
      return { nombre: name, tipo: typeValue };
    })
    .filter(Boolean);
}

function replaceStudentAssignments(assignments) {
  studentAssignments = normaliseAssignments(assignments);
  syncTextareasFromAssignments();
  incompatibleGroups = [];
  refreshIncompatiblesUI();
  renderAssignmentsTable();
  const resultadosDiv = document.getElementById('resultados');
  if (resultadosDiv) {
    resultadosDiv.innerHTML = '';
  }
  const reportDiv = document.getElementById('report');
  if (reportDiv) {
    reportDiv.innerHTML = '';
  }
  const successMsg = document.getElementById('copySuccess');
  if (successMsg) {
    successMsg.textContent = '';
    successMsg.classList.remove('show');
  }
  lastReportData = null;
  mostrarInforme(null, getCurrentTipoGrupo(), getCurrentNumAlumnos(), getCurrentSobrantes());
  saveAppState();
}

function addStudentsFromBulk(rawText) {
  const text = (rawText || '').trim();
  if (!text) {
    showImportStatus('bulkInput.status.noRows', {}, 'error');
    return null;
  }
  const parsed = parseBulkInput(text);
  if (!parsed || parsed.length === 0) {
    showImportStatus('bulkInput.status.noRows', {}, 'error');
    return null;
  }
  const uniqueKeys = new Set();
  parsed.forEach(item => {
    const key = (item.nombre || '').trim().toLowerCase();
    if (key) {
      uniqueKeys.add(key);
    }
  });
  replaceStudentAssignments(parsed);
  return uniqueKeys.size;
}

function triggerImportFileSelection() {
  const input = document.getElementById('importFileInput');
  if (input) {
    input.value = '';
    input.click();
  }
}

function handleImportFileChange(event) {
  const file = event.target?.files?.[0];
  if (!file) {
    return;
  }
  const name = file.name ? file.name.toLowerCase() : '';
  const isCsv = name.endsWith('.csv');
  if (!isCsv && file.type && !file.type.includes('csv') && !file.type.includes('text')) {
    showImportStatus('bulkInput.status.fileType', {}, 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = event => {
    const content = event.target?.result;
    const count = addStudentsFromBulk(typeof content === 'string' ? content : '');
    if (count !== null) {
      closeImportModal();
      openTypologyModal();
    }
  };
  reader.onerror = () => {
    showImportStatus('bulkInput.status.fileRead', {}, 'error');
  };
  reader.readAsText(file, 'UTF-8');
}

function openImportModal() {
  const modal = document.getElementById('importModal');
  if (!modal || isImportModalOpen) {
    return;
  }
  lastFocusedImportElement = document.activeElement;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  isImportModalOpen = true;
  showImportStatus(null);
  const textarea = document.getElementById('importTextarea');
  if (textarea) {
    textarea.value = '';
    textarea.focus();
  }
  const fileInput = document.getElementById('importFileInput');
  if (fileInput) {
    fileInput.value = '';
  }
  document.addEventListener('keydown', handleImportModalKeydown);
  refreshBodyModalState();
}

function buildExportPayload() {
  const students = studentAssignments && studentAssignments.length > 0
    ? studentAssignments
    : (() => {
        const { grupoA, grupoB, grupoC } = getStudentLists();
        return normaliseAssignments([
          ...grupoA.map(nombre => ({ nombre, tipo: 'A' })),
          ...grupoB.map(nombre => ({ nombre, tipo: 'B' })),
          ...grupoC.map(nombre => ({ nombre, tipo: 'C' }))
        ]);
      })();
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    data: {
      students,
      incompatibleGroups,
      teams: lastReportData?.equipos || null
    }
  };
  return data;
}

function exportAllData() {
  const payload = buildExportPayload();
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const time = now.toTimeString().slice(0,8).replace(/:/g, '-');
  link.download = `geco-export-${date}_${time}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function openFullImportModal() {
  const modal = document.getElementById('fullImportModal');
  if (!modal || isFullImportModalOpen) return;
  fullImportSelectedData = null;
  lastFocusedElement = document.activeElement;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  isFullImportModalOpen = true;
  showFullImportStatus('');
  document.addEventListener('keydown', handleFullImportModalKeydown);
  refreshBodyModalState();
}

function closeFullImportModal() {
  const modal = document.getElementById('fullImportModal');
  if (!modal || !isFullImportModalOpen) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  isFullImportModalOpen = false;
  document.removeEventListener('keydown', handleFullImportModalKeydown);
  refreshBodyModalState();
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
}

function handleFullImportModalKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeFullImportModal();
  }
}

function triggerFullImportFileSelection() {
  const input = document.getElementById('fullImportFileInput');
  if (input) { input.value = ''; input.click(); }
}

function handleFullImportFileChange(event) {
  const file = event.target?.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const content = e.target?.result;
      const parsed = JSON.parse(typeof content === 'string' ? content : '{}');
      if (!parsed || !parsed.data) throw new Error('Invalid file');
      fullImportSelectedData = parsed.data;
      showFullImportStatus(t('fullImport.status.ready') || 'Archivo cargado. Elige qué importar.', 'success');
    } catch (err) {
      showFullImportStatus(t('fullImport.status.invalid') || 'Archivo no válido.', 'error');
      fullImportSelectedData = null;
    }
  };
  reader.onerror = () => showFullImportStatus(t('fullImport.status.readError') || 'No se pudo leer el archivo.', 'error');
  reader.readAsText(file, 'UTF-8');
}

function applyFullImport() {
  if (!fullImportSelectedData) {
    showFullImportStatus(t('fullImport.status.noData') || 'Primero selecciona un archivo válido.', 'error');
    return;
  }
  const withNames = document.getElementById('importNamesChk')?.checked;
  const withTypes = document.getElementById('importTypesChk')?.checked;
  const withIncompat = document.getElementById('importIncompatChk')?.checked;
  const withTeams = document.getElementById('importTeamsChk')?.checked;

  const incomingStudents = Array.isArray(fullImportSelectedData.students) ? fullImportSelectedData.students : [];
  const incomingIncompat = Array.isArray(fullImportSelectedData.incompatibleGroups) ? fullImportSelectedData.incompatibleGroups : [];
  const incomingTeams = Array.isArray(fullImportSelectedData.teams) ? fullImportSelectedData.teams : null;

  // Import students
  if (withNames || withTypes) {
    if (withNames && withTypes) {
      replaceStudentAssignments(incomingStudents);
    } else if (withNames && !withTypes) {
      // Añadir/actualizar nombres manteniendo tipo actual o B por defecto.
      const current = new Map((studentAssignments || []).map(s => [s.nombre.toLowerCase(), s]));
      incomingStudents.forEach(s => {
        const key = (s.nombre || '').toLowerCase();
        if (!key) return;
        if (current.has(key)) {
          // mantener su tipo actual
          const cur = current.get(key);
          cur.nombre = s.nombre; // normaliza mayúsculas
        } else {
          current.set(key, { nombre: s.nombre, tipo: 'B' });
        }
      });
      studentAssignments = normaliseAssignments(Array.from(current.values()));
      syncTextareasFromAssignments();
      renderAssignmentsTable();
    } else if (!withNames && withTypes) {
      // Actualiza tipos para nombres existentes; ignora desconocidos
      const current = new Map((studentAssignments || []).map(s => [s.nombre.toLowerCase(), s]));
      incomingStudents.forEach(s => {
        const key = (s.nombre || '').toLowerCase();
        if (current.has(key)) {
          current.get(key).tipo = normaliseStudentType(s.tipo);
        }
      });
      studentAssignments = normaliseAssignments(Array.from(current.values()));
      syncTextareasFromAssignments();
      renderAssignmentsTable();
    }
  }

  // Import incompatibles
  if (withIncompat) {
    const nameSet = new Set((studentAssignments || []).map(s => s.nombre));
    incompatibleGroups = incomingIncompat
      .map(group => group.filter(n => nameSet.has(n)))
      .filter(group => group.length >= 2);
    refreshIncompatiblesUI();
  }

  // Import teams
  if (withTeams && incomingTeams) {
    mostrarEquipos(incomingTeams);
    const tipoGrupo = getCurrentTipoGrupo();
    const numAlumnos = getCurrentNumAlumnos();
    const opcionSobrantes = getCurrentSobrantes();
    lastReportData = {
      equipos: cloneEquipos(incomingTeams),
      tipoGrupo,
      numAlumnos,
      opcionSobrantes
    };
    mostrarInforme(incomingTeams, tipoGrupo, numAlumnos, opcionSobrantes);
  }

  showFullImportStatus(t('fullImport.status.done') || 'Importación finalizada.', 'success');
  closeFullImportModal();
  saveAppState();
}

function closeImportModal() {
  const modal = document.getElementById('importModal');
  if (!modal || !isImportModalOpen) {
    return;
  }
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  isImportModalOpen = false;
  document.removeEventListener('keydown', handleImportModalKeydown);
  refreshBodyModalState();
  if (lastFocusedImportElement && typeof lastFocusedImportElement.focus === 'function') {
    lastFocusedImportElement.focus();
  }
  lastFocusedImportElement = null;
}

function handleImportModalKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeImportModal();
  }
}

function initImportModal() {
  const openBtn = document.getElementById('openImportModal');
  if (openBtn) {
    openBtn.addEventListener('click', openImportModal);
  }
  const closeBtn = document.getElementById('importModalClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeImportModal);
  }
  const doneBtn = document.getElementById('importModalDone');
  if (doneBtn) {
    doneBtn.addEventListener('click', closeImportModal);
  }
  const modal = document.getElementById('importModal');
  if (modal) {
    modal.addEventListener('click', event => {
      if (event.target === modal) {
        closeImportModal();
      }
    });
  }
  const pasteBtn = document.getElementById('importPasteBtn');
  if (pasteBtn) {
    pasteBtn.addEventListener('click', () => {
      const textarea = document.getElementById('importTextarea');
      const value = textarea ? textarea.value : '';
      const count = addStudentsFromBulk(value);
      if (count !== null) {
        if (textarea) {
          textarea.value = '';
        }
        closeImportModal();
        openTypologyModal();
      }
    });
  }
  const fileBtn = document.getElementById('importFileBtn');
  if (fileBtn) {
    fileBtn.addEventListener('click', triggerImportFileSelection);
  }
  const fileInput = document.getElementById('importFileInput');
  if (fileInput) {
    fileInput.addEventListener('change', handleImportFileChange);
  }
}

function initFullImport() {
  const openBtn = document.getElementById('openFullImportBtn');
  if (openBtn) openBtn.addEventListener('click', openFullImportModal);
  const closeBtn = document.getElementById('fullImportClose');
  if (closeBtn) closeBtn.addEventListener('click', closeFullImportModal);
  const cancelBtn = document.getElementById('fullImportCancel');
  if (cancelBtn) cancelBtn.addEventListener('click', closeFullImportModal);
  const fileBtn = document.getElementById('fullImportFileBtn');
  if (fileBtn) fileBtn.addEventListener('click', triggerFullImportFileSelection);
  const fileInput = document.getElementById('fullImportFileInput');
  if (fileInput) fileInput.addEventListener('change', handleFullImportFileChange);
  const applyBtn = document.getElementById('fullImportApply');
  if (applyBtn) applyBtn.addEventListener('click', applyFullImport);
}

function addStudentsFromNamesOnly(rawText) {
  const text = (rawText || '').trim();
  if (!text) {
    showQuickPasteStatus('state.status.noRows', {}, 'error');
    return null;
  }
  // Solo separa por líneas; ignora comas dentro de una misma línea
  const lines = text.split(/\r?\n/).map(l => l.replace(/^"|"$/g, '').trim());
  const unique = Array.from(new Set(lines.filter(Boolean)));
  if (unique.length === 0) {
    showQuickPasteStatus('state.status.noRows', {}, 'error');
    return null;
  }
  const assignments = unique.map(nombre => ({ nombre, tipo: 'B' }));
  replaceStudentAssignments(assignments);
  showQuickPasteStatus('state.status.parsed', { count: unique.length }, 'success');
  return unique.length;
}

function downloadAssignmentsAsCsv() {
  if (!studentAssignments || studentAssignments.length === 0) {
    alert(t('bulkInput.status.noRows'));
    return;
  }
  const header = t('bulkInput.csvHeader') || 'Nombre;Tipología';
  const lines = studentAssignments.map(student => `${student.nombre};${student.tipo}`);
  const csvContent = [header, ...lines].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const date = new Date().toISOString().slice(0, 10);
  link.download = `alumnado-${date}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getStudentLists() {
  const grupoA = parseNames(document.getElementById('grupoA').value);
  const grupoB = parseNames(document.getElementById('grupoB').value);
  const grupoC = parseNames(document.getElementById('grupoC').value);
  return { grupoA, grupoB, grupoC };
}

function getAllStudentsArray() {
  const { grupoA, grupoB, grupoC } = getStudentLists();
  return [...grupoA, ...grupoB, ...grupoC];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function etiquetarAlumnos(lista, tipo) {
  return lista.map(nombre => ({ nombre, tipo }));
}

function calculateMaxGroups(totalStudents, membersPerGroup, leftoversOption) {
  if (!membersPerGroup || membersPerGroup <= 0 || totalStudents <= 0) {
    return 0;
  }
  const baseGroups = Math.floor(totalStudents / membersPerGroup);
  const remainder = totalStudents % membersPerGroup;
  if (baseGroups === 0 && remainder > 0) {
    return 1;
  }
  if (remainder > 0 && leftoversOption === 'grupoNuevo') {
    return baseGroups + 1;
  }
  return baseGroups > 0 ? baseGroups : (remainder > 0 ? 1 : 0);
}

function getIncompatibleNamesSet() {
  return new Set(incompatibleGroups.flat());
}

function syncIncompatibleGroupsWithStudents() {
  const available = new Set(getAllStudentsArray());
  incompatibleGroups = incompatibleGroups
    .map(group => group.filter(name => available.has(name)))
    .filter(group => group.length >= 2);
}

function updateIncompatiblesSelect() {
  const select = document.getElementById('incompatiblesSelect');
  if (!select) return;
  const locale = getCurrentLocale();
  const usedNames = getIncompatibleNamesSet();
  const uniqueStudents = Array.from(new Set(getAllStudentsArray()))
    .filter(name => !usedNames.has(name))
    .sort((a, b) => a.localeCompare(b, locale, { sensitivity: 'base' }));
  select.innerHTML = '';
  uniqueStudents.forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
  select.disabled = uniqueStudents.length === 0;
}

function renderIncompatiblesList() {
  const container = document.getElementById('incompatiblesList');
  if (!container) return;
  container.innerHTML = '';
  const locale = getCurrentLocale();
  if (incompatibleGroups.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'incompatibles-empty';
    empty.textContent = t('incompatiblesEmpty');
    container.appendChild(empty);
    return;
  }
  incompatibleGroups.forEach((group, index) => {
    const item = document.createElement('div');
    item.className = 'incompatibles-group';
    const label = document.createElement('span');
    const nombres = [...group].sort((a, b) => a.localeCompare(b, locale, { sensitivity: 'base' }));
    label.textContent = `${t('incompatiblesGroupLabel', { index: index + 1 })}: ${nombres.join(', ')}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'incompatibles-remove';
    button.textContent = '×';
    button.setAttribute('aria-label', t('removeIncompatibleAria', { index: index + 1 }));
    button.addEventListener('click', () => removeIncompatibleGroup(index));
    item.appendChild(label);
    item.appendChild(button);
    container.appendChild(item);
  });
}

function updateIncompatiblesInfo(totalStudents, membersPerGroup, leftoversOption) {
  const label = document.getElementById('incompatibles-limit');
  if (!label) return 0;
  const maxGroups = calculateMaxGroups(totalStudents, membersPerGroup, leftoversOption);
  label.textContent = t('incompatiblesLimit', { count: incompatibleGroups.length, max: maxGroups });
  const hasOversizeGroup = incompatibleGroups.some(group => maxGroups > 0 && group.length > maxGroups);
  label.classList.toggle('warning', hasOversizeGroup);
  return maxGroups;
}

function refreshIncompatiblesUI() {
  const { grupoA, grupoB, grupoC } = getStudentLists();
  const membersPerGroup = parseInt(document.getElementById('numAlumnos').value, 10) || 0;
  const leftoversOption = document.querySelector('input[name="sobrantes"]:checked')?.value || 'grupoNuevo';
  const totalStudents = grupoA.length + grupoB.length + grupoC.length;
  syncIncompatibleGroupsWithStudents();
  updateIncompatiblesSelect();
  updateIncompatiblesInfo(totalStudents, membersPerGroup, leftoversOption);
  renderIncompatiblesList();
}

function addIncompatibleGroup() {
  const select = document.getElementById('incompatiblesSelect');
  if (!select || select.disabled) return;
  const selected = Array.from(select.selectedOptions).map(opt => opt.value.trim()).filter(Boolean);
  if (selected.length < 2) {
    alert(t('incompatiblesSelectHint'));
    return;
  }
  const { grupoA, grupoB, grupoC } = getStudentLists();
  const membersPerGroup = parseInt(document.getElementById('numAlumnos').value, 10) || 0;
  const leftoversOption = document.querySelector('input[name="sobrantes"]:checked')?.value || 'grupoNuevo';
  const totalStudents = grupoA.length + grupoB.length + grupoC.length;
  const maxGroups = calculateMaxGroups(totalStudents, membersPerGroup, leftoversOption);
  if (maxGroups === 0) {
    alert(t('errors.noTeamsForIncompatibles'));
    return;
  }
  if (maxGroups > 0 && selected.length > maxGroups) {
    alert(t('incompatiblesWarning'));
    return;
  }
  const usedNames = getIncompatibleNamesSet();
  if (selected.some(name => usedNames.has(name))) {
    alert(t('incompatiblesDuplicate'));
    return;
  }
  incompatibleGroups.push(selected);
  Array.from(select.options).forEach(option => {
    option.selected = false;
  });
  refreshIncompatiblesUI();
  saveAppState();
}

function removeIncompatibleGroup(index) {
  incompatibleGroups.splice(index, 1);
  refreshIncompatiblesUI();
  saveAppState();
}

function clearIncompatibleGroups() {
  incompatibleGroups = [];
  refreshIncompatiblesUI();
  saveAppState();
}

function setupSampleNamesMetadata() {
  Object.entries(SAMPLE_NAME_GROUPS).forEach(([elementId, groupKey]) => {
    const textarea = document.getElementById(elementId);
    if (!textarea) return;
    const matchedLang = findSampleLanguageForValue(textarea.value, groupKey);
    if (matchedLang) {
      textarea.dataset.sampleLang = matchedLang;
    } else {
      delete textarea.dataset.sampleLang;
    }
  });
}

function applySampleNamesForLanguage(targetLang, previousLang) {
  const sampleData = SAMPLE_NAMES[targetLang];
  if (!sampleData) {
    return;
  }
  Object.entries(SAMPLE_NAME_GROUPS).forEach(([elementId, groupKey]) => {
    const textarea = document.getElementById(elementId);
    if (!textarea) return;
    const sampleValue = formatSampleNames(targetLang, groupKey);
    if (!sampleValue) return;
    const currentValue = textarea.value.trim();
    const datasetLang = textarea.dataset.sampleLang;
    const matchesPrevSample = previousLang ? isSampleValueForLang(currentValue, previousLang, groupKey) : false;
    const shouldApply = !currentValue || datasetLang || matchesPrevSample;
    if (!shouldApply) {
      return;
    }
    textarea.value = sampleValue;
    textarea.dataset.sampleLang = targetLang;
  });
}

function handleNamesInput(event) {
  const textarea = event.target;
  const groupKey = SAMPLE_NAME_GROUPS[textarea.id];
  if (!groupKey) {
    return;
  }
  const datasetLang = textarea.dataset.sampleLang;
  if (datasetLang && !isSampleValueForLang(textarea.value, datasetLang, groupKey)) {
    delete textarea.dataset.sampleLang;
  } else if (!datasetLang) {
    const detected = findSampleLanguageForValue(textarea.value, groupKey);
    if (detected) {
      textarea.dataset.sampleLang = detected;
    }
  }
  updateInfoGrupos();
  refreshIncompatiblesUI();
  updateAssignmentsFromTextareas();
}

function setLanguage(lang) {
  const previousLanguage = currentLanguage;
  if (!TRANSLATIONS[lang]) {
    lang = DEFAULT_LANGUAGE;
  }
  currentLanguage = lang;
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('preferredLanguage', lang);
  if (typeof window !== 'undefined' && window.gecoAPI && typeof window.gecoAPI.setLanguage === 'function') {
    window.gecoAPI.setLanguage(lang);
  }
  applyTranslations();
  buildLanguageSwitcher();
  applySampleNamesForLanguage(currentLanguage, previousLanguage);
  updateAssignmentsFromTextareas({ renderTable: false });
  updateInfoGrupos();
  refreshIncompatiblesUI();
  studentAssignments = normaliseAssignments(studentAssignments);
  renderAssignmentsTable();
  showImportStatus(null);
  if (isTypologyModalOpen) {
    focusFirstTypologyField();
  }
  if (lastReportData) {
    const { equipos, tipoGrupo, numAlumnos, opcionSobrantes } = lastReportData;
    mostrarInforme(cloneEquipos(equipos), tipoGrupo, numAlumnos, opcionSobrantes);
  } else {
    mostrarInforme(null, getCurrentTipoGrupo(), getCurrentNumAlumnos(), getCurrentSobrantes());
  }
}

function clearAllNames() {
  ['grupoA', 'grupoB', 'grupoC'].forEach(id => {
    const textarea = document.getElementById(id);
    if (!textarea) return;
    textarea.value = '';
    delete textarea.dataset.sampleLang;
  });
  studentAssignments = [];
  renderAssignmentsTable();
  showImportStatus('bulkInput.status.cleared', {}, 'success');
  clearIncompatibleGroups();
  updateInfoGrupos();
  const successMsg = document.getElementById('copySuccess');
  if (successMsg) {
    successMsg.textContent = '';
    successMsg.classList.remove('show');
  }
  lastReportData = null;
  mostrarInforme(null, getCurrentTipoGrupo(), getCurrentNumAlumnos(), getCurrentSobrantes());
}

function updateInfoGrupos() {
  const { grupoA, grupoB, grupoC } = getStudentLists();
  const numAlumnos = parseInt(document.getElementById('numAlumnos').value, 10) || 0;
  const totalAlumnos = grupoA.length + grupoB.length + grupoC.length;
  const numEquipos = numAlumnos > 0 ? Math.floor(totalAlumnos / numAlumnos) : 0;
  const sobrantes = numAlumnos > 0 ? totalAlumnos % numAlumnos : totalAlumnos;
  document.getElementById('infoGrupos').textContent = t('infoGroups', {
    teams: numEquipos,
    leftovers: sobrantes
  });
  document.getElementById('infoTotales').textContent = t('infoTotals', {
    total: totalAlumnos,
    countA: grupoA.length,
    countB: grupoB.length,
    countC: grupoC.length
  });
  const countAEl = document.getElementById('countA');
  const countBEl = document.getElementById('countB');
  const countCEl = document.getElementById('countC');
  if (countAEl) countAEl.textContent = t('groupCount', { count: grupoA.length });
  if (countBEl) countBEl.textContent = t('groupCount', { count: grupoB.length });
  if (countCEl) countCEl.textContent = t('groupCount', { count: grupoC.length });
  syncIncompatibleGroupsWithStudents();
  const leftoversOption = getCurrentSobrantes();
  updateIncompatiblesInfo(totalAlumnos, numAlumnos, leftoversOption);
}

function initTypologyColumns() {
  const columns = document.querySelectorAll('.typology-column');
  const textareas = document.querySelectorAll('.typology-column textarea');
  if (columns.length > 0) {
    columns[0].classList.add('active');
  }
  columns.forEach((column, index) => {
    column.addEventListener('click', () => {
      columns.forEach(c => c.classList.remove('active'));
      column.classList.add('active');
    });
    const textarea = textareas[index];
    if (textarea) {
      textarea.addEventListener('focus', () => {
        columns.forEach(c => c.classList.remove('active'));
        column.classList.add('active');
      });
    }
  });
}

function initNumberSelector() {
  const bubbles = document.querySelectorAll('.bubble');
  const hiddenInput = document.getElementById('numAlumnos');
  if (!hiddenInput) return;
  const initialValue = hiddenInput.value;
  const initialBubble = document.querySelector(`.bubble[data-value="${initialValue}"]`);
  if (initialBubble) {
    initialBubble.classList.add('active');
  }
  bubbles.forEach(bubble => {
    bubble.addEventListener('click', () => {
      bubbles.forEach(b => b.classList.remove('active'));
      bubble.classList.add('active');
      hiddenInput.value = bubble.getAttribute('data-value');
      updateInfoGrupos();
      refreshIncompatiblesUI();
      saveAppState();
    });
  });
}

function preAsignarIncompatibles(grupos, incompatSets, numAlumnos) {
  if (grupos.length === 0 && incompatSets.length > 0) {
    grupos.push([]);
  }
  incompatSets.forEach(set => {
    const nombresSet = new Set(set.map(alumno => alumno.nombre));
    set.forEach(alumno => {
      let asignado = false;
      for (let i = 0; i < grupos.length; i++) {
        const grupo = grupos[i];
        if (grupo.length >= numAlumnos) continue;
        const conflicto = grupo.some(miembro => nombresSet.has(miembro.nombre));
        if (!conflicto) {
          grupo.push(alumno);
          asignado = true;
          break;
        }
      }
      if (!asignado) {
        grupos.push([alumno]);
      }
    });
  });
}

function distribuirAlumnosPorGrupo(alumnos, grupos, numAlumnos, sobrantes) {
  if (grupos.length === 0) {
    sobrantes.push(...alumnos);
    return;
  }
  let indicePreferente = 0;
  alumnos.forEach(alumno => {
    let colocado = false;
    for (let i = 0; i < grupos.length; i++) {
      const indice = (indicePreferente + i) % grupos.length;
      if (grupos[indice].length < numAlumnos) {
        grupos[indice].push(alumno);
        indicePreferente = indice + 1;
        colocado = true;
        break;
      }
    }
    if (!colocado) {
      sobrantes.push(alumno);
    }
  });
}

function balancearGruposHeterogeneos(grupos, incompatiblesSet) {
  grupos.forEach((grupo, indiceGrupo) => {
    const tieneA = grupo.some(alumno => alumno.tipo === 'A');
    const tieneC = grupo.some(alumno => alumno.tipo === 'C');
    if (tieneA || tieneC) return;
    const indiceBDisponible = grupo.findIndex(alumno => alumno.tipo === 'B' && !incompatiblesSet.has(alumno.nombre));
    if (indiceBDisponible === -1) return;
    for (let j = 0; j < grupos.length; j++) {
      if (j === indiceGrupo) continue;
      const grupoDonante = grupos[j];
      const indiceA = grupoDonante.findIndex(alumno => alumno.tipo === 'A' && !incompatiblesSet.has(alumno.nombre));
      if (indiceA !== -1) {
        const intercambio = grupoDonante[indiceA];
        grupoDonante[indiceA] = grupo[indiceBDisponible];
        grupo[indiceBDisponible] = intercambio;
        return;
      }
      const indiceC = grupoDonante.findIndex(alumno => alumno.tipo === 'C' && !incompatiblesSet.has(alumno.nombre));
      if (indiceC !== -1) {
        const intercambio = grupoDonante[indiceC];
        grupoDonante[indiceC] = grupo[indiceBDisponible];
        grupo[indiceBDisponible] = intercambio;
        return;
      }
    }
  });
}

function manejarSobrantes(grupos, opcion, numAlumnos, sobrantes) {
  if (!sobrantes || sobrantes.length === 0) {
    return grupos;
  }
  if (opcion === 'grupoNuevo') {
    grupos.push([...sobrantes]);
    return grupos;
  }
  if (grupos.length === 0) {
    grupos.push([]);
  }
  let indicePreferente = 0;
  sobrantes.forEach(alumno => {
    let colocado = false;
    for (let i = 0; i < grupos.length; i++) {
      const indice = (indicePreferente + i) % grupos.length;
      if (grupos[indice].length < numAlumnos) {
        grupos[indice].push(alumno);
        indicePreferente = indice + 1;
        colocado = true;
        break;
      }
    }
    if (!colocado) {
      let indiceMin = 0;
      let longitudMin = grupos[0].length;
      for (let i = 1; i < grupos.length; i++) {
        if (grupos[i].length < longitudMin) {
          longitudMin = grupos[i].length;
          indiceMin = i;
        }
      }
      grupos[indiceMin].push(alumno);
      indicePreferente = indiceMin + 1;
    }
  });
  return grupos;
}

function distribuirHomogeneosPorTipo(alumnos, grupos, numAlumnos, sobrantes, tipo) {
  alumnos.forEach(alumno => {
    let colocado = false;
    for (let i = 0; i < grupos.length; i++) {
      const grupo = grupos[i];
      if (grupo.length >= numAlumnos) continue;
      const mezcla = grupo.some(miembro => miembro.tipo !== tipo);
      if (!mezcla) {
        grupo.push(alumno);
        colocado = true;
        break;
      }
    }
    if (!colocado) {
      grupos.push([alumno]);
    }
  });
  grupos.forEach(grupo => {
    while (grupo.length > numAlumnos) {
      sobrantes.push(grupo.pop());
    }
  });
}

function agruparSobrantesHomogeneos(sobrantes, numAlumnos) {
  if (sobrantes.length === 0) return [];
  const copia = [...sobrantes];
  const grupos = [];
  while (copia.length > 0) {
    const size = Math.min(numAlumnos, copia.length);
    grupos.push(copia.splice(0, size));
  }
  for (let i = grupos.length - 1; i >= 0; i--) {
    if (grupos[i].length === 1 && grupos.length > 1) {
      const donante = grupos.find(g => g.length > 2);
      if (donante) {
        grupos[i].push(donante.pop());
      } else if (i > 0) {
        grupos[i - 1].push(grupos[i][0]);
        grupos.splice(i, 1);
      }
    }
  }
  return grupos;
}

function tipoPredominante(grupo) {
  const contador = grupo.reduce((acc, alumno) => {
    acc[alumno.tipo] = (acc[alumno.tipo] || 0) + 1;
    return acc;
  }, {});
  let mejorTipo = null;
  let mejorConteo = -1;
  Object.entries(contador).forEach(([tipo, conteo]) => {
    if (conteo > mejorConteo) {
      mejorTipo = tipo;
      mejorConteo = conteo;
    }
  });
  return mejorTipo;
}

function agregarSobrantesHomogeneos(grupos, alumnos) {
  alumnos.forEach(alumno => {
    const preferencias = alumno.tipo === 'A'
      ? ['B', 'A', 'C']
      : alumno.tipo === 'C'
        ? ['B', 'C', 'A']
        : ['A', 'C', 'B'];
    let destino = null;
    for (const pref of preferencias) {
      destino = grupos.find(grupo => tipoPredominante(grupo) === pref);
      if (destino) break;
    }
    if (!destino) {
      destino = grupos[0];
    }
    if (destino) {
      destino.push(alumno);
    } else {
      grupos.push([alumno]);
    }
  });
}

function fusionarGruposUnitarios(grupos, numAlumnos) {
  for (let i = grupos.length - 1; i >= 0; i--) {
    if (grupos[i].length === 1) {
      const alumno = grupos[i][0];
      grupos.splice(i, 1);
      agregarSobrantesHomogeneos(grupos, [alumno]);
    }
  }
}

function generarGruposHeterogeneos(listaA, listaB, listaC, numAlumnos, incompatSets, totalAlumnosOriginal, opcionSobrantes) {
  let numGrupos = Math.floor(totalAlumnosOriginal / numAlumnos);
  if (numGrupos === 0 && totalAlumnosOriginal > 0) {
    numGrupos = 1;
  }
  const grupos = Array.from({ length: numGrupos }, () => []);
  const sobrantes = [];
  preAsignarIncompatibles(grupos, incompatSets, numAlumnos);
  distribuirAlumnosPorGrupo(listaA, grupos, numAlumnos, sobrantes);
  distribuirAlumnosPorGrupo(listaC, grupos, numAlumnos, sobrantes);
  distribuirAlumnosPorGrupo(listaB, grupos, numAlumnos, sobrantes);
  const incompatiblesSet = new Set(incompatSets.flat().map(alumno => alumno.nombre));
  balancearGruposHeterogeneos(grupos, incompatiblesSet);
  if (grupos.length > numGrupos) {
    const extras = grupos.splice(numGrupos);
    extras.flat().forEach(alumno => sobrantes.push(alumno));
  }
  return { grupos, sobrantes };
}

function generarGruposHomogeneos(listaA, listaB, listaC, numAlumnos, incompatSets, totalAlumnosOriginal, opcionSobrantes) {
  let numGrupos = Math.floor(totalAlumnosOriginal / numAlumnos);
  if (numGrupos === 0 && totalAlumnosOriginal > 0) {
    numGrupos = 1;
  }
  const grupos = Array.from({ length: numGrupos }, () => []);
  const sobrantes = [];
  preAsignarIncompatibles(grupos, incompatSets, numAlumnos);
  distribuirHomogeneosPorTipo(listaA, grupos, numAlumnos, sobrantes, 'A');
  distribuirHomogeneosPorTipo(listaB, grupos, numAlumnos, sobrantes, 'B');
  distribuirHomogeneosPorTipo(listaC, grupos, numAlumnos, sobrantes, 'C');
  const gruposSobrantes = agruparSobrantesHomogeneos(sobrantes, numAlumnos);
  if (opcionSobrantes === 'agregar') {
    agregarSobrantesHomogeneos(grupos, gruposSobrantes.flat());
    fusionarGruposUnitarios(grupos, numAlumnos);
    return { grupos, sobrantes: [] };
  }
  if (gruposSobrantes.length === 1 && gruposSobrantes[0].length === 1 && grupos.length > 0) {
    agregarSobrantesHomogeneos(grupos, gruposSobrantes[0]);
  } else {
    gruposSobrantes.forEach(grupo => grupos.push(grupo));
  }
  fusionarGruposUnitarios(grupos, numAlumnos);
  return { grupos, sobrantes: [] };
}

function generarGruposEsporadicos(listaRestante, numAlumnos, incompatSets, totalAlumnosOriginal) {
  let numGrupos = Math.floor(totalAlumnosOriginal / numAlumnos);
  if (numGrupos === 0 && totalAlumnosOriginal > 0) {
    numGrupos = 1;
  }
  const grupos = Array.from({ length: numGrupos }, () => []);
  const sobrantes = [];
  preAsignarIncompatibles(grupos, incompatSets, numAlumnos);
  const mezcla = shuffleArray([...listaRestante]);
  distribuirAlumnosPorGrupo(mezcla, grupos, numAlumnos, sobrantes);
  return { grupos, sobrantes };
}

function generarEquipos() {
  const { grupoA, grupoB, grupoC } = getStudentLists();
  const numAlumnos = parseInt(document.getElementById('numAlumnos').value, 10) || 0;
  const tipoGrupo = document.querySelector('input[name="tipoGrupo"]:checked').value;
  const opcionSobrantes = document.querySelector('input[name="sobrantes"]:checked').value;
  if (numAlumnos < 2) {
    alert(t('errors.minGroupSize', { min: 2 }));
    return null;
  }
  const totalAlumnos = grupoA.length + grupoB.length + grupoC.length;
  if (totalAlumnos === 0) {
    alert(t('errors.noStudents'));
    return null;
  }
  const maxGrupos = calculateMaxGroups(totalAlumnos, numAlumnos, opcionSobrantes);
  if (maxGrupos === 0 && incompatibleGroups.length > 0) {
    alert(t('errors.noTeamsForIncompatibles'));
    return null;
  }
  const hasOversizeGroup = incompatibleGroups.some(grupo => maxGrupos > 0 && grupo.length > maxGrupos);
  if (hasOversizeGroup) {
    alert(t('incompatiblesWarning'));
    return null;
  }
  let listaAlumnosA = shuffleArray(etiquetarAlumnos(grupoA, 'A'));
  let listaAlumnosB = shuffleArray(etiquetarAlumnos(grupoB, 'B'));
  let listaAlumnosC = shuffleArray(etiquetarAlumnos(grupoC, 'C'));
  const mapaAlumnos = new Map([
    ...listaAlumnosA.map(alumno => [alumno.nombre, alumno]),
    ...listaAlumnosB.map(alumno => [alumno.nombre, alumno]),
    ...listaAlumnosC.map(alumno => [alumno.nombre, alumno])
  ]);
  const incompatSets = incompatibleGroups
    .map(grupo => grupo.map(nombre => mapaAlumnos.get(nombre)).filter(Boolean))
    .filter(grupo => grupo.length >= 2);
  const nombresIncompatibles = new Set(incompatSets.flat().map(alumno => alumno.nombre));
  listaAlumnosA = listaAlumnosA.filter(alumno => !nombresIncompatibles.has(alumno.nombre));
  listaAlumnosB = listaAlumnosB.filter(alumno => !nombresIncompatibles.has(alumno.nombre));
  listaAlumnosC = listaAlumnosC.filter(alumno => !nombresIncompatibles.has(alumno.nombre));
  const totalOriginal = totalAlumnos;
  let resultado;
  if (tipoGrupo === 'heterogeneos') {
    resultado = generarGruposHeterogeneos(listaAlumnosA, listaAlumnosB, listaAlumnosC, numAlumnos, incompatSets, totalOriginal, opcionSobrantes);
  } else if (tipoGrupo === 'homogeneos') {
    resultado = generarGruposHomogeneos(listaAlumnosA, listaAlumnosB, listaAlumnosC, numAlumnos, incompatSets, totalOriginal, opcionSobrantes);
  } else {
    const combinados = [...listaAlumnosA, ...listaAlumnosB, ...listaAlumnosC];
    resultado = generarGruposEsporadicos(combinados, numAlumnos, incompatSets, totalOriginal);
  }
  if (!resultado) {
    return null;
  }
  if (tipoGrupo === 'homogeneos') {
    return resultado.grupos;
  }
  return manejarSobrantes(resultado.grupos, opcionSobrantes, numAlumnos, resultado.sobrantes);
}

function generarYMostrarEquipos() {
  updateInfoGrupos();
  const equipos = generarEquipos();
  if (!equipos) {
    return;
  }
  mostrarEquipos(equipos);
  const tipoGrupo = getCurrentTipoGrupo();
  const numAlumnos = getCurrentNumAlumnos();
  const opcionSobrantes = getCurrentSobrantes();
  lastReportData = {
    equipos: cloneEquipos(equipos),
    tipoGrupo,
    numAlumnos,
    opcionSobrantes
  };
  mostrarInforme(equipos, tipoGrupo, numAlumnos, opcionSobrantes);
  saveAppState();
}

function mostrarEquipos(equipos) {
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = '';
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.style.marginTop = '20px';
  const locale = getCurrentLocale();
  equipos.forEach((equipo, index) => {
    const row = table.insertRow();
    const cellNum = row.insertCell();
    cellNum.style.padding = '10px';
    cellNum.style.borderBottom = '1px solid #ddd';
    cellNum.style.fontWeight = 'bold';
    const cellMiembros = row.insertCell();
    cellMiembros.style.padding = '10px';
    cellMiembros.style.borderBottom = '1px solid #ddd';
    cellNum.textContent = `${t('teamLabel', { index: index + 1 })}:`;
    const miembrosTexto = equipo
      .map(alumno => `(${alumno.tipo}) ${alumno.nombre}`)
      .sort((a, b) => a.localeCompare(b, locale, { sensitivity: 'base' }))
      .join(', ');
    cellMiembros.textContent = miembrosTexto;
  });
  resultadosDiv.appendChild(table);
  const actions = document.createElement('div');
  actions.className = 'result-actions';
  const exportAllButton = document.createElement('button');
  exportAllButton.id = 'exportAllBtnResults';
  exportAllButton.className = 'btn';
  exportAllButton.textContent = t('topButtons.exportAll');
  exportAllButton.addEventListener('click', exportAllData);
  const copyButton = document.createElement('button');
  copyButton.id = 'copiarEquipos';
  copyButton.className = 'btn';
  copyButton.textContent = t('copyButton');
  copyButton.addEventListener('click', () => copiarEquipos(equipos));
  const exportButton = document.createElement('button');
  exportButton.id = 'exportTeamsCsv';
  exportButton.className = 'btn';
  exportButton.textContent = t('exportTeamsButton');
  exportButton.addEventListener('click', () => downloadTeamsAsCsv(equipos));
  actions.appendChild(exportAllButton);
  actions.appendChild(exportButton);
  actions.appendChild(copyButton);
  resultadosDiv.appendChild(actions);
}

function copiarEquipos(equipos) {
  const locale = getCurrentLocale();
  let textoCopiar = '';
  equipos.forEach((equipo, index) => {
    textoCopiar += `${t('teamLabel', { index: index + 1 })}: `;
    const miembrosTexto = equipo
      .map(alumno => `(${alumno.tipo}) ${alumno.nombre}`)
      .sort((a, b) => a.localeCompare(b, locale, { sensitivity: 'base' }))
      .join(', ');
    textoCopiar += miembrosTexto + '\n';
  });
  navigator.clipboard.writeText(textoCopiar).then(() => {
    const successMsg = document.getElementById('copySuccess');
    successMsg.textContent = t('copySuccess');
    successMsg.classList.add('show');
    setTimeout(() => {
      successMsg.classList.remove('show');
    }, 3000);
  });
}

function csvEscape(value) {
  const s = (value === null || value === undefined) ? '' : String(value);
  return '"' + s.replace(/"/g, '""') + '"';
}

function downloadTeamsAsCsv(equipos) {
  if (!equipos || equipos.length === 0) {
    alert(t('bulkInput.status.noRows'));
    return;
  }
  // Formato apilado por equipos:
  // Col A: "Equipo X" (solo en la primera fila del bloque)
  // Col B: Nombre
  // Col C: Tipología
  // Fila en blanco entre equipos
  const rows = [];
  equipos.forEach((grupo, index) => {
    const teamLabel = t('teamLabel', { index: index + 1 });
    grupo.forEach((alumno, i) => {
      const colA = i === 0 ? teamLabel : '';
      rows.push([csvEscape(colA), csvEscape(alumno.nombre), csvEscape(alumno.tipo)].join(';'));
    });
    if (index < equipos.length - 1) {
      rows.push('"";"";""');
    }
  });
  const csvContent = rows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const time = now.toTimeString().slice(0, 8).replace(/:/g, '-');
  link.download = `equipos-${date}_${time}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function analizarEquipos(equipos, tipoGrupo, numAlumnos, opcionSobrantes) {
  const analysis = {
    status: 'ok',
    messages: []
  };

  const registrar = (nivel, clave, parametros = {}) => {
    analysis.messages.push(t(`report.messages.${clave}`, parametros));
    if (nivel === 'error') {
      analysis.status = 'fail';
    } else if (nivel === 'warning' && analysis.status !== 'fail') {
      analysis.status = 'partial';
    }
  };

  const nameToTeam = new Map();
  equipos.forEach((grupo, index) => {
    grupo.forEach(alumno => {
      nameToTeam.set(alumno.nombre, index + 1);
    });
  });

  incompatibleGroups.forEach(grupo => {
    const contador = {};
    grupo.forEach(nombre => {
      const equipo = nameToTeam.get(nombre);
      if (equipo !== undefined) {
        contador[equipo] = (contador[equipo] || 0) + 1;
      }
    });
    Object.entries(contador).forEach(([equipo, cuenta]) => {
      if (cuenta > 1) {
        registrar('error', 'incompatibles', { names: grupo.join(', '), team: equipo });
      }
    });
  });

  const totalStudents = equipos.reduce((acc, grupo) => acc + grupo.length, 0);
  if (numAlumnos > 0) {
    const baseExpected = Math.floor(totalStudents / numAlumnos);
    const remainder = totalStudents % numAlumnos;
    const expected = opcionSobrantes === 'grupoNuevo' && remainder > 0 ? baseExpected + 1 : baseExpected;
    if (tipoGrupo !== 'homogeneos' && opcionSobrantes === 'agregar' && equipos.length !== baseExpected) {
      registrar('warning', 'groupCountDifferent', { current: equipos.length, expected: baseExpected });
    } else if (tipoGrupo !== 'homogeneos' && opcionSobrantes === 'grupoNuevo' && equipos.length > expected) {
      registrar('warning', 'groupCountDifferent', { current: equipos.length, expected });
    }
  }

  equipos.forEach((grupo, index) => {
    const size = grupo.length;
    if (size === 1) {
      registrar('warning', 'groupSingle', { team: index + 1 });
    }
    if (tipoGrupo !== 'esporadicos' && numAlumnos > 0 && size !== numAlumnos) {
      registrar('warning', 'sizeDifferent', { team: index + 1, size, target: numAlumnos });
    }
    if (tipoGrupo === 'heterogeneos') {
      const tieneClave = grupo.some(alumno => alumno.tipo === 'A' || alumno.tipo === 'C');
      if (!tieneClave) {
        registrar('warning', 'heteroNoAC', { team: index + 1 });
      }
    }
    if (tipoGrupo === 'homogeneos') {
      const tipos = new Set(grupo.map(alumno => alumno.tipo));
      if (tipos.size > 1) {
        registrar('warning', 'homoMixed', { team: index + 1, types: Array.from(tipos).join(', ') });
      }
    }
    if (tipoGrupo === 'esporadicos' && numAlumnos > 0 && Math.abs(size - numAlumnos) > 1) {
      registrar('warning', 'randomSize', { team: index + 1, size, target: numAlumnos });
    }
  });

  return analysis;
}

function mostrarInforme(equipos, tipoGrupo, numAlumnos, opcionSobrantes) {
  const container = document.getElementById('report');
  if (!container) return;
  container.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = t('report.title');
  container.appendChild(title);

  const mode = document.createElement('p');
  mode.textContent = t(`report.modeLabel.${tipoGrupo}`);
  container.appendChild(mode);

  if (!equipos || equipos.length === 0) {
    const info = document.createElement('p');
    info.textContent = t('report.noTeams');
    container.appendChild(info);
    return;
  }

  const analysis = analizarEquipos(equipos, tipoGrupo, numAlumnos, opcionSobrantes);

  const status = document.createElement('p');
  status.className = `report-status ${analysis.status}`;
  status.textContent = t(`report.status.${analysis.status}`);
  container.appendChild(status);

  const summary = document.createElement('p');
  summary.textContent = t(`report.summary.${analysis.status}`);
  container.appendChild(summary);

  if (analysis.messages.length > 0) {
    const list = document.createElement('ul');
    list.className = 'report-messages';
    analysis.messages.forEach(message => {
      const item = document.createElement('li');
      item.textContent = message;
      list.appendChild(item);
    });
    container.appendChild(list);
  }
}

function resetApplication() {
  try { localStorage.clear(); } catch (e) {}
  incompatibleGroups = [];
  lastReportData = null;
  // Rellenar con ejemplos según el idioma actual
  Object.entries(SAMPLE_NAME_GROUPS).forEach(([elementId, groupKey]) => {
    const textarea = document.getElementById(elementId);
    if (!textarea) return;
    const sampleValue = formatSampleNames(currentLanguage, groupKey);
    textarea.value = sampleValue || '';
    textarea.dataset.sampleLang = currentLanguage;
  });
  // Sincroniza estructuras y UI
  updateAssignmentsFromTextareas();
  clearIncompatibleGroups();
  const resultadosDiv = document.getElementById('resultados');
  if (resultadosDiv) resultadosDiv.innerHTML = '';
  const reportDiv = document.getElementById('report');
  if (reportDiv) reportDiv.innerHTML = '';
  showImportStatus(null);
  showFullImportStatus('');
  showQuickPasteStatus(null);
  updateInfoGrupos();
  refreshIncompatiblesUI();
  mostrarInforme(null, getCurrentTipoGrupo(), getCurrentNumAlumnos(), getCurrentSobrantes());
  saveAppState();
}

function initialise() {
  setupSampleNamesMetadata();
  const savedLang = localStorage.getItem('preferredLanguage');
  const initialLang = savedLang || detectBrowserLanguage();
  setLanguage(initialLang);
  // Intentar cargar estado persistente (nombres por líneas, sin comas)
  loadAppState();
  initNumberSelector();
  initTypologyColumns();
  initImportModal();
  initFullImport();
  initTypologyModal();
  renderAssignmentsTable();
  document.getElementById('grupoA').addEventListener('input', handleNamesInput);
  document.getElementById('grupoB').addEventListener('input', handleNamesInput);
  document.getElementById('grupoC').addEventListener('input', handleNamesInput);
  document.getElementById('addIncompatibleBtn').addEventListener('click', addIncompatibleGroup);
  document.getElementById('clearIncompatiblesBtn').addEventListener('click', clearIncompatibleGroups);
  document.querySelectorAll('input[name="sobrantes"]').forEach(radio => {
    radio.addEventListener('change', () => { refreshIncompatiblesUI(); saveAppState(); });
  });
  document.querySelectorAll('input[name="tipoGrupo"]').forEach(radio => {
    radio.addEventListener('change', () => { saveAppState(); if (lastReportData) mostrarInforme(lastReportData.equipos, getCurrentTipoGrupo(), getCurrentNumAlumnos(), getCurrentSobrantes()); });
  });
  document.getElementById('generarGrupos').addEventListener('click', generarYMostrarEquipos);
  document.getElementById('clearAllBtn').addEventListener('click', clearAllNames);
  const exportAllBtn = document.getElementById('exportAllBtn');
  if (exportAllBtn) exportAllBtn.addEventListener('click', exportAllData);
  const exportAllBtn2 = document.getElementById('exportAllBtn2');
  if (exportAllBtn2) exportAllBtn2.addEventListener('click', exportAllData);
  const openFullImportBtn = document.getElementById('openFullImportBtn');
  if (openFullImportBtn) openFullImportBtn.addEventListener('click', openFullImportModal);
  const openFullImportBtn2 = document.getElementById('openFullImportBtn2');
  if (openFullImportBtn2) openFullImportBtn2.addEventListener('click', openFullImportModal);
  const quickPasteBtn = document.getElementById('quickPasteBtn');
  if (quickPasteBtn) quickPasteBtn.addEventListener('click', () => {
    const area = document.getElementById('quickPasteNames');
    const count = addStudentsFromNamesOnly(area ? area.value : '');
    if (count !== null && area) area.value = '';
  });
  const resetBtn = document.getElementById('resetAppBtn');
  if (resetBtn) resetBtn.addEventListener('click', resetApplication);
  updateInfoGrupos();
  refreshIncompatiblesUI();
  mostrarInforme(null, getCurrentTipoGrupo(), getCurrentNumAlumnos(), getCurrentSobrantes());
}

document.addEventListener('DOMContentLoaded', initialise);
