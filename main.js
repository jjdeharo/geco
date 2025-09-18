const DEFAULT_LANGUAGE = 'es';
let currentLanguage = DEFAULT_LANGUAGE;
let incompatibleGroups = [];

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
  return value
    .split(/[\n,]+/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
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
}

function removeIncompatibleGroup(index) {
  incompatibleGroups.splice(index, 1);
  refreshIncompatiblesUI();
}

function clearIncompatibleGroups() {
  incompatibleGroups = [];
  refreshIncompatiblesUI();
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) {
    lang = DEFAULT_LANGUAGE;
  }
  currentLanguage = lang;
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('preferredLanguage', lang);
  applyTranslations();
  buildLanguageSwitcher();
  updateInfoGrupos();
  refreshIncompatiblesUI();
}

function clearAllNames() {
  document.getElementById('grupoA').value = '';
  document.getElementById('grupoB').value = '';
  document.getElementById('grupoC').value = '';
  clearIncompatibleGroups();
  updateInfoGrupos();
  const successMsg = document.getElementById('copySuccess');
  if (successMsg) {
    successMsg.textContent = '';
    successMsg.classList.remove('show');
  }
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
  syncIncompatibleGroupsWithStudents();
  const leftoversOption = document.querySelector('input[name="sobrantes"]:checked')?.value || 'grupoNuevo';
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

function generarGruposHeterogeneos(listaA, listaB, listaC, numAlumnos, incompatSets, totalAlumnosOriginal) {
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
    return { grupos, sobrantes: [] };
  }
  if (gruposSobrantes.length === 1 && gruposSobrantes[0].length === 1 && grupos.length > 0) {
    agregarSobrantesHomogeneos(grupos, gruposSobrantes[0]);
  } else {
    gruposSobrantes.forEach(grupo => grupos.push(grupo));
  }
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
  if (tipoGrupo === 'homogeneos') {
    const mezclaTipos = incompatSets.some(set => new Set(set.map(alumno => alumno.tipo)).size > 1);
    if (mezclaTipos) {
      alert(t('errors.homogeneousMixed'));
      return null;
    }
  }
  const totalOriginal = totalAlumnos;
  let resultado;
  if (tipoGrupo === 'heterogeneos') {
    resultado = generarGruposHeterogeneos(listaAlumnosA, listaAlumnosB, listaAlumnosC, numAlumnos, incompatSets, totalOriginal);
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
  const copyButton = document.createElement('button');
  copyButton.id = 'copiarEquipos';
  copyButton.className = 'btn';
  copyButton.textContent = t('copyButton');
  resultadosDiv.appendChild(copyButton);
  copyButton.addEventListener('click', () => copiarEquipos(equipos));
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

function initialise() {
  const savedLang = localStorage.getItem('preferredLanguage');
  const initialLang = savedLang || detectBrowserLanguage();
  setLanguage(initialLang);
  initNumberSelector();
  initTypologyColumns();
  document.getElementById('grupoA').addEventListener('input', () => {
    updateInfoGrupos();
    refreshIncompatiblesUI();
  });
  document.getElementById('grupoB').addEventListener('input', () => {
    updateInfoGrupos();
    refreshIncompatiblesUI();
  });
  document.getElementById('grupoC').addEventListener('input', () => {
    updateInfoGrupos();
    refreshIncompatiblesUI();
  });
  document.getElementById('addIncompatibleBtn').addEventListener('click', addIncompatibleGroup);
  document.getElementById('clearIncompatiblesBtn').addEventListener('click', clearIncompatibleGroups);
  document.querySelectorAll('input[name="sobrantes"]').forEach(radio => {
    radio.addEventListener('change', refreshIncompatiblesUI);
  });
  document.getElementById('generarGrupos').addEventListener('click', generarYMostrarEquipos);
  document.getElementById('clearAllBtn').addEventListener('click', clearAllNames);
  updateInfoGrupos();
  refreshIncompatiblesUI();
}

document.addEventListener('DOMContentLoaded', initialise);
