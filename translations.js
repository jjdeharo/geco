const TRANSLATIONS = {
  es: {
    languageName: 'ES',
    locale: 'es-ES',
    title: 'Generador de equipos cooperativos',
    groupsTitle: 'Grupos de estudiantes',
    clearAll: 'Borrar todos los nombres',
    guideLink: 'Guía de uso',
    groupALabel: '<strong>Tipología A</strong> (no necesitan ayuda):',
    groupBLabel: '<strong>Tipología B</strong> (necesitan alguna ayuda):',
    groupCLabel: '<strong>Tipología C</strong> (necesitan ayuda):',
    membersPerTeam: 'Número de miembros por equipo:',
    teamTypeTitle: 'Tipo de los equipos:',
    heterogeneousLabel: 'Heterogéneos (base)',
    homogeneousLabel: 'Homogéneos (similares)',
    temporaryLabel: 'Temporales (esporádicos)',
    leftoverTitle: '¿Qué hacemos con los miembros sobrantes?',
    newTeamLabel: 'Crear un equipo nuevo',
    addToOthersLabel: 'Agregar a otros equipos',
    generateButton: 'Generar equipos',
    copyButton: 'Copiar equipos',
    exportTeamsButton: 'Exportar equipos a hoja de cálculo',
    topButtons: {
      exportAll: 'Exportar todo (formato JSON)',
      importAll: 'Importar archivo (exportado en JSON)'
    },
    fullImport: {
      title: 'Importar datos',
      description: 'Selecciona qué datos quieres importar. Todo viene marcado por defecto.',
      fileButton: 'Seleccionar archivo',
      applyButton: 'Importar',
      cancelButton: 'Cancelar',
      options: {
        names: 'Nombres',
        types: 'Tipología',
        incompat: 'Incompatibilidades',
        teams: 'Equipos'
      },
      status: {
        ready: 'Archivo cargado. Elige qué importar.',
        invalid: 'Archivo no válido.',
        readError: 'No se pudo leer el archivo.',
        noData: 'Primero selecciona un archivo válido.',
        done: 'Importación finalizada.'
      }
    },
    copySuccess: 'Equipos copiados al portapapeles',
    bulkInput: {
      openButton: 'Importar hoja de cálculo',
      modalTitle: 'Añade tu hoja de cálculo',
      replaceNotice: 'La importación sustituye al alumnado actual.',
      pasteTitle: 'Pegar datos desde la hoja de cálculo',
      pastePlaceholder: 'Nombre\tTipología (opcional)',
      parseButton: 'Cargar alumnado',
      fileTitle: 'Abrir una hoja de cálculo',
      fileButton: 'Seleccionar archivo',
      fileHint: 'Usa un archivo CSV exportado desde tu hoja de cálculo.',
      closeButton: 'Cerrar',
      downloadButton: 'Descargar hoja de cálculo',
      csvHeader: 'Nombre;Tipología',
      emptyTable: 'No hay alumnado en la tabla. Importa o añade nombres para empezar.',
      deleteRow: 'Quitar',
      table: {
        name: 'Alumno',
        typeA: 'Tipología A',
        typeB: 'Tipología B',
        typeC: 'Tipología C',
        actions: 'Acciones'
      },
      status: {
        parsed: 'Se han importado {count} alumnos.',
        noRows: 'No se detectaron datos válidos para importar.',
        fileType: 'Selecciona un archivo CSV válido.',
        fileRead: 'No se pudo leer el archivo seleccionado.',
        cleared: 'El alumnado se ha vaciado.'
      }
    },
    assignModal: {
      openButton: 'Asignar tipologías',
      helper: 'Escribe los nombres en las tres tipologías y ajústalas en la ventana de asignación o pulsa el botón Asignar tipologías.',
      title: 'Asignar tipologías',
      description: 'Edita los nombres y selecciona la tipología adecuada para cada alumno. Los cambios se guardan automáticamente.',
      closeButton: 'Cerrar'
    },
    incompatiblesTitle: 'Personas incompatibles',
    incompatiblesDescription: 'Selecciona varias personas (Ctrl o Shift + clic) y crea grupos que no deban coincidir en un mismo equipo.',
    incompatiblesAdd: 'Crear grupo incompatible',
    incompatiblesClear: 'Vaciar incompatibles',
    incompatiblesEmpty: 'No hay grupos incompatibles definidos.',
    incompatiblesLimit: 'Grupos incompatibles: {count}. Máximo {max} miembros por grupo.',
    incompatiblesWarning: 'Cada grupo incompatible no puede tener más miembros que el número de equipos disponibles.',
    incompatiblesSelectHint: 'Selecciona al menos dos personas para crear un grupo incompatible.',
    incompatiblesDuplicate: 'Alguna persona ya está en otro grupo incompatible.',
    infoGroups: 'Equipos: {teams} | Sobran: {leftovers}',
    infoTotals: 'Total: {total} personas (A: {countA}, B: {countB}, C: {countC})',
    groupCount: 'Alumnos: {count}',
    teamLabel: 'Equipo {index}',
    incompatiblesGroupLabel: 'Grupo {index}',
    removeIncompatibleAria: 'Eliminar grupo incompatible {index}',
    errors: {
      minGroupSize: 'El número mínimo de alumnos por equipo es {min}.',
      noStudents: 'No hay alumnos para formar equipos.',
      noTeamsForIncompatibles: 'No se pueden marcar personas incompatibles hasta que haya equipos disponibles.',
      homogeneousMixed: 'Los grupos incompatibles deben ser del mismo tipo en modo homogéneo.'
    },
    footer: {
      heading: 'Generador de equipos cooperativos',
      meta: "© 2025 · <a href='https://bilateria.org' rel='author'>Juan José de Haro</a> · <a href='https://github.com/jjdeharo/geco'>https://github.com/jjdeharo/geco</a>",
      code: "El código de esta aplicación está disponible bajo licencia <a rel='license' href='https://www.gnu.org/licenses/agpl-3.0.html'>AGPL v3</a>.",
      content: "Los contenidos educativos (textos, ejercicios, vídeos e imágenes) están bajo licencia <a rel='license' href='https://creativecommons.org/licenses/by-sa/4.0/'>CC BY-SA 4.0</a>."
    },
    report: {
      title: 'Informe de equipos',
      noTeams: 'Genera equipos para ver el informe.',
      modeLabel: {
        heterogeneos: 'Modo heterogéneo',
        homogeneos: 'Modo homogéneo',
        esporadicos: 'Modo esporádico'
      },
      status: {
        ok: 'Cumple las expectativas.',
        partial: 'Cumple parcialmente.',
        fail: 'No cumple las expectativas.'
      },
      summary: {
        ok: 'Se cumplen las condiciones definidas para este modo.',
        partial: 'Existen desviaciones respecto a las condiciones:',
        fail: 'Las condiciones principales no se cumplen:'
      },
      messages: {
        heteroNoAC: 'El equipo {team} no incluye alumnado A ni C.',
        sizeDifferent: 'El equipo {team} tiene {size} miembros (objetivo {target}).',
        groupCountDifferent: 'Se han generado {current} equipos cuando se esperaban {expected}.',
        groupSingle: 'El equipo {team} se ha quedado con una sola persona y se ha combinado con otro grupo.',
        homoMixed: 'El equipo {team} mezcla tipologías: {types}.',
        incompatibles: 'Las personas incompatibles {names} han coincidido en el equipo {team}.',
        randomSize: 'El equipo {team} tiene {size} miembros (objetivo {target}).'
      }
    }
    ,
    state: {
      title: 'Datos del alumnado',
      legend: 'Puedes importar un archivo de exportación de GeCo (.json) o pegar los nombres en la caja de la derecha.',
      pasteTitle: 'O pegar nombres del alumnado',
      pastePlaceholder: 'Un nombre por línea',
      pasteButton: 'Cargar nombres',
      pasteHint: 'Un nombre por línea. Las comas no separan.',
      resetButton: 'Reiniciar aplicación',
      status: {
        parsed: 'Se han cargado {count} nombres.',
        noRows: 'No hay nombres para cargar.'
      }
    }
  },
  ca: {
    languageName: 'CA',
    locale: 'ca-ES',
    title: "Generador d'equips cooperatius",
    groupsTitle: "Grups d'estudiants",
    clearAll: 'Esborrar tots els noms',
    guideLink: "Guia d'ús",
    groupALabel: '<strong>Tipologia A</strong> (no necessiten ajuda):',
    groupBLabel: '<strong>Tipologia B</strong> (necessiten alguna ajuda):',
    groupCLabel: '<strong>Tipologia C</strong> (necessiten ajuda):',
    membersPerTeam: 'Nombre de membres per equip:',
    teamTypeTitle: 'Tipus dels equips:',
    heterogeneousLabel: 'Heterogenis (base)',
    homogeneousLabel: 'Homogenis (similars)',
    temporaryLabel: 'Temporals (esporàdics)',
    leftoverTitle: 'Què fem amb els membres sobrants?',
    newTeamLabel: 'Crear un equip nou',
    addToOthersLabel: 'Afegir a altres equips',
    generateButton: 'Generar equips',
    copyButton: 'Copiar equips',
    exportTeamsButton: 'Exportar equips a full de càlcul',
    topButtons: {
      exportAll: 'Exportar tot (format JSON)',
      importAll: 'Importar fitxer (exportat en JSON)'
    },
    fullImport: {
      title: 'Importar dades',
      description: 'Selecciona quines dades vols importar. Tot ve marcat per defecte.',
      fileButton: 'Selecciona fitxer',
      applyButton: 'Importa',
      cancelButton: 'Cancel·la',
      options: { names: 'Noms', types: 'Tipologia', incompat: 'Incompatibilitats', teams: 'Equips' },
      status: { ready: 'Fitxer carregat. Tria què importar.', invalid: 'Fitxer no vàlid.', readError: 'No s\'ha pogut llegir el fitxer.', noData: 'Selecciona un fitxer vàlid.', done: 'Importació finalitzada.' }
    },
    copySuccess: 'Equips copiats al portapapers',
    bulkInput: {
      openButton: "Importar full de càlcul",
      modalTitle: "Afegeix el teu full de càlcul",
      replaceNotice: "La importació substitueix l'alumnat actual.",
      pasteTitle: 'Enganxa dades des del full de càlcul',
      pastePlaceholder: 'Nom\tTipologia (opcional)',
      parseButton: 'Carrega alumnat',
      fileTitle: "Obre un full de càlcul",
      fileButton: 'Selecciona fitxer',
      fileHint: 'Fes servir un fitxer CSV exportat del teu full de càlcul.',
      closeButton: 'Tanca',
      downloadButton: 'Descarrega el full de càlcul',
      csvHeader: 'Nom;Tipologia',
      emptyTable: "No hi ha alumnat a la taula. Importa o afegeix noms per començar.",
      deleteRow: 'Treure',
      table: {
        name: 'Alumne',
        typeA: 'Tipologia A',
        typeB: 'Tipologia B',
        typeC: 'Tipologia C',
        actions: 'Accions'
      },
      status: {
        parsed: "S'han importat {count} alumnes.",
        noRows: 'No s\'han detectat dades vàlides per importar.',
        fileType: 'Selecciona un fitxer CSV vàlid.',
        fileRead: 'No s\'ha pogut llegir el fitxer seleccionat.',
        cleared: "L'alumnat s'ha buidat."
      }
    },
    assignModal: {
      openButton: 'Assignar tipologies',
      helper: "Escriu els noms a les tres tipologies i ajusta-les a la finestra d'assignació o prem el botó Assignar tipologies.",
      title: 'Assignar tipologies',
      description: 'Edita els noms i selecciona la tipologia adequada per a cada alumne. Els canvis es guarden automàticament.',
      closeButton: 'Tanca'
    },
    incompatiblesTitle: 'Persones incompatibles',
    incompatiblesDescription: 'Selecciona diverses persones (Ctrl o Shift + clic) i crea grups que no han de coincidir al mateix equip.',
    incompatiblesAdd: 'Crear grup incompatible',
    incompatiblesClear: 'Buidar incompatibles',
    incompatiblesEmpty: 'No hi ha grups incompatibles definits.',
    incompatiblesLimit: 'Grups incompatibles: {count}. Màxim {max} membres per grup.',
    incompatiblesWarning: "Cada grup incompatible no pot tenir més membres que el nombre d'equips disponibles.",
    incompatiblesSelectHint: 'Selecciona almenys dues persones per crear un grup incompatible.',
    incompatiblesDuplicate: "Alguna persona ja forma part d'un altre grup incompatible.",
    infoGroups: 'Equips: {teams} | Sobren: {leftovers}',
    infoTotals: 'Total: {total} persones (A: {countA}, B: {countB}, C: {countC})',
    groupCount: 'Alumnes: {count}',
    teamLabel: 'Equip {index}',
    incompatiblesGroupLabel: 'Grup {index}',
    removeIncompatibleAria: 'Eliminar grup incompatible {index}',
    errors: {
      minGroupSize: "El nombre mínim d'alumnes per equip és {min}.",
      noStudents: 'No hi ha alumnes per formar equips.',
      noTeamsForIncompatibles: 'No es poden marcar persones incompatibles fins que hi hagi equips disponibles.',
      homogeneousMixed: 'Els grups incompatibles han de ser del mateix tipus en mode homogeni.'
    },
    footer: {
      heading: "Generador d'equips cooperatius",
      meta: "© 2025 · <a href='https://bilateria.org' rel='author'>Juan José de Haro</a> · <a href='https://github.com/jjdeharo/geco'>https://github.com/jjdeharo/geco</a>",
      code: "El codi d'aquesta aplicació està disponible amb llicència <a rel='license' href='https://www.gnu.org/licenses/agpl-3.0.html'>AGPL v3</a>.",
      content: "Els continguts educatius (textos, exercicis, vídeos i imatges) estan sota llicència <a rel='license' href='https://creativecommons.org/licenses/by-sa/4.0/'>CC BY-SA 4.0</a>."
    },
    report: {
      title: "Informe d'equips",
      noTeams: "Genera els equips per veure l'informe.",
      modeLabel: {
        heterogeneos: 'Mode heterogeni',
        homogeneos: 'Mode homogeni',
        esporadicos: 'Mode esporàdic'
      },
      status: {
        ok: 'Compleix les expectatives.',
        partial: 'Les compleix parcialment.',
        fail: 'No compleix les expectatives.'
      },
      summary: {
        ok: 'Es compleixen les condicions definides per a aquest mode.',
        partial: 'Hi ha desviacions respecte a les condicions:',
        fail: 'Les condicions principals no es compleixen:'
      },
      messages: {
        heteroNoAC: "L'equip {team} no inclou alumnat A ni C.",
        sizeDifferent: "L'equip {team} té {size} membres (objectiu {target}).",
        groupCountDifferent: "S'han generat {current} equips quan s'esperaven {expected}.",
        groupSingle: "L'equip {team} s'ha quedat amb una sola persona i s'ha integrat en un altre grup.",
        homoMixed: "L'equip {team} barreja tipologies: {types}.",
        incompatibles: "Les persones incompatibles {names} han coincidit a l'equip {team}.",
        randomSize: "L'equip {team} té {size} membres (objectiu {target})."
      }
    }
    ,
    state: {
      title: 'Dades de l\'alumnat',
      legend: "Pots importar un fitxer d'exportació de GeCo (.json) o enganxar els noms a la caixa de la dreta.",
      pasteTitle: "O enganxa els noms de l'alumnat",
      pastePlaceholder: 'Un nom per línia',
      pasteButton: 'Carregar noms',
      pasteHint: 'Un nom per línia. Les comes no separen.',
      resetButton: 'Reiniciar l\'aplicació',
      status: {
        parsed: "S'han carregat {count} noms.",
        noRows: 'No hi ha noms per carregar.'
      }
    }
  },
  en: {
    languageName: 'EN',
    locale: 'en-US',
    title: 'Cooperative Team Generator',
    groupsTitle: 'Student groups',
    clearAll: 'Clear all names',
    guideLink: 'User guide',
    groupALabel: '<strong>Type A</strong> (no support needed):',
    groupBLabel: '<strong>Type B</strong> (need some support):',
    groupCLabel: '<strong>Type C</strong> (need support):',
    membersPerTeam: 'Members per team:',
    teamTypeTitle: 'Team type:',
    heterogeneousLabel: 'Heterogeneous (default)',
    homogeneousLabel: 'Homogeneous (similar)',
    temporaryLabel: 'Random (occasional)',
    leftoverTitle: 'What should we do with leftovers?',
    newTeamLabel: 'Create a new team',
    addToOthersLabel: 'Add to other teams',
    generateButton: 'Generate teams',
    copyButton: 'Copy teams',
    exportTeamsButton: 'Export teams to spreadsheet',
    topButtons: { exportAll: 'Export all (JSON)', importAll: 'Import exported JSON file' },
    fullImport: {
      title: 'Import data',
      description: 'Select which data to import. Everything is checked by default.',
      fileButton: 'Choose file',
      applyButton: 'Import',
      cancelButton: 'Cancel',
      options: { names: 'Names', types: 'Typology', incompat: 'Incompatibilities', teams: 'Teams' },
      status: { ready: 'File loaded. Choose what to import.', invalid: 'Invalid file.', readError: 'Could not read the file.', noData: 'Select a valid file first.', done: 'Import complete.' }
    },
    copySuccess: 'Teams copied to the clipboard',
    bulkInput: {
      openButton: 'Import spreadsheet',
      modalTitle: 'Add your spreadsheet',
      replaceNotice: 'Importing will replace the current students.',
      pasteTitle: 'Paste data from your spreadsheet',
      pastePlaceholder: 'Name\tTypology (optional)',
      parseButton: 'Load students',
      fileTitle: 'Open a spreadsheet',
      fileButton: 'Choose file',
      fileHint: 'Use a CSV file exported from your spreadsheet.',
      closeButton: 'Close',
      downloadButton: 'Download spreadsheet',
      csvHeader: 'Name;Typology',
      emptyTable: 'The table is empty. Import or add names to get started.',
      deleteRow: 'Remove',
      table: {
        name: 'Student',
        typeA: 'Type A',
        typeB: 'Type B',
        typeC: 'Type C',
        actions: 'Actions'
      },
      status: {
        parsed: 'Imported {count} students.',
        noRows: 'No valid data detected to import.',
        fileType: 'Please choose a valid CSV file.',
        fileRead: 'The selected file could not be read.',
        cleared: 'The student list has been cleared.'
      }
    },
    assignModal: {
      openButton: 'Assign typologies',
      helper: 'Type names in the three typologies and adjust them in the assignment window or click the Assign typologies button.',
      title: 'Assign typologies',
      description: 'Edit the names and pick the right typology for each student. Changes are saved automatically.',
      closeButton: 'Close'
    },
    incompatiblesTitle: 'Incompatible people',
    incompatiblesDescription: 'Select several students (Ctrl or Shift + click) to create groups that must not be in the same team.',
    incompatiblesAdd: 'Create incompatible group',
    incompatiblesClear: 'Clear incompatible groups',
    incompatiblesEmpty: 'No incompatible groups defined.',
    incompatiblesLimit: 'Incompatible groups: {count}. Maximum {max} members per group.',
    incompatiblesWarning: 'Each incompatible group cannot have more members than the number of teams available.',
    incompatiblesSelectHint: 'Select at least two people to create an incompatible group.',
    incompatiblesDuplicate: 'A person in this selection already belongs to another incompatible group.',
    infoGroups: 'Teams: {teams} | Leftovers: {leftovers}',
    infoTotals: 'Total: {total} people (A: {countA}, B: {countB}, C: {countC})',
    groupCount: 'Students: {count}',
    teamLabel: 'Team {index}',
    incompatiblesGroupLabel: 'Group {index}',
    removeIncompatibleAria: 'Remove incompatible group {index}',
    errors: {
      minGroupSize: 'The minimum number of students per team is {min}.',
      noStudents: 'There are no students to create teams.',
      noTeamsForIncompatibles: 'You cannot mark incompatible people until there are teams available.',
      homogeneousMixed: 'Incompatible groups must contain students of the same type when using homogeneous teams.'
    },
    footer: {
      heading: 'Cooperative Team Generator',
      meta: "© 2025 · <a href='https://bilateria.org' rel='author'>Juan José de Haro</a> · <a href='https://github.com/jjdeharo/geco'>https://github.com/jjdeharo/geco</a>",
      code: "The source code is released under the <a rel='license' href='https://www.gnu.org/licenses/agpl-3.0.html'>AGPL v3</a> license.",
      content: "Educational content (text, exercises, videos and images) is licensed under <a rel='license' href='https://creativecommons.org/licenses/by-sa/4.0/'>CC BY-SA 4.0</a>."
    },
    report: {
      title: 'Team report',
      noTeams: 'Generate teams to view the report.',
      modeLabel: {
        heterogeneos: 'Heterogeneous mode',
        homogeneos: 'Homogeneous mode',
        esporadicos: 'Random mode'
      },
      status: {
        ok: 'Meets the expectations.',
        partial: 'Partially meets the expectations.',
        fail: 'Does not meet the expectations.'
      },
      summary: {
        ok: 'The defined conditions for this mode are satisfied.',
        partial: 'There are deviations from the expected conditions:',
        fail: 'The main conditions are not satisfied:'
      },
      messages: {
        heteroNoAC: 'Team {team} does not include any A or C students.',
        sizeDifferent: 'Team {team} has {size} members (target {target}).',
        groupCountDifferent: 'Generated {current} teams but {expected} were expected.',
        groupSingle: 'Team {team} ended up with a single member and has been merged into another group.',
        homoMixed: 'Team {team} mixes typologies: {types}.',
        incompatibles: 'Incompatible students {names} ended up together in team {team}.',
        randomSize: 'Team {team} has {size} members (target {target}).'
      }
    }
    ,
    state: {
      title: 'Student data',
      legend: 'Import a previously exported GeCo file (.json) or paste the names on the right.',
      pasteTitle: 'Or paste student names',
      pastePlaceholder: 'One name per line',
      pasteButton: 'Load names',
      pasteHint: 'One name per line. Commas do not split names.',
      resetButton: 'Reset application',
      status: {
        parsed: 'Loaded {count} names.',
        noRows: 'No names to load.'
      }
    }
  },
  gl: {
    languageName: 'GL',
    locale: 'gl-ES',
    title: 'Xerador de equipos cooperativos',
    groupsTitle: 'Grupos de estudantes',
    clearAll: 'Borrar todos os nomes',
    guideLink: 'Guía de uso',
    groupALabel: '<strong>Tipoloxía A</strong> (non precisan axuda):',
    groupBLabel: '<strong>Tipoloxía B</strong> (precisan algo de axuda):',
    groupCLabel: '<strong>Tipoloxía C</strong> (precisan axuda):',
    membersPerTeam: 'Número de persoas por equipo:',
    teamTypeTitle: 'Tipo de equipos:',
    heterogeneousLabel: 'Heteroxéneos (base)',
    homogeneousLabel: 'Homoxéneos (semellantes)',
    temporaryLabel: 'Aleatorios (puntuais)',
    leftoverTitle: 'Que facemos coas persoas sobrantes?',
    newTeamLabel: 'Crear un equipo novo',
    addToOthersLabel: 'Engadir a outros equipos',
    generateButton: 'Xerar equipos',
    copyButton: 'Copiar equipos',
    exportTeamsButton: 'Exportar equipos a folla de cálculo',
    topButtons: { exportAll: 'Exportar todo (formato JSON)', importAll: 'Importar ficheiro (exportado en JSON)' },
    fullImport: {
      title: 'Importar datos',
      description: 'Selecciona que datos queres importar. Todo vén marcado por defecto.',
      fileButton: 'Seleccionar ficheiro',
      applyButton: 'Importar',
      cancelButton: 'Cancelar',
      options: { names: 'Nomes', types: 'Tipoloxía', incompat: 'Incompatibilidades', teams: 'Equipos' },
      status: { ready: 'Ficheiro cargado. Escolle que importar.', invalid: 'Ficheiro non válido.', readError: 'Non se puido ler o ficheiro.', noData: 'Selecciona un ficheiro válido.', done: 'Importación rematada.' }
    },
    copySuccess: 'Equipos copiados ao portapapeis',
    bulkInput: {
      openButton: 'Importar folla de cálculo',
      modalTitle: 'Engade a túa folla de cálculo',
      replaceNotice: 'A importación substitúe o alumnado actual.',
      pasteTitle: 'Pega datos da túa folla de cálculo',
      pastePlaceholder: 'Nome\tTipoloxía (opcional)',
      parseButton: 'Cargar alumnado',
      fileTitle: 'Abrir unha folla de cálculo',
      fileButton: 'Seleccionar ficheiro',
      fileHint: 'Usa un ficheiro CSV exportado desde a túa folla de cálculo.',
      closeButton: 'Pechar',
      downloadButton: 'Descargar folla de cálculo',
      csvHeader: 'Nome;Tipoloxía',
      emptyTable: 'Non hai alumnado na táboa. Importa ou engade nomes para comezar.',
      deleteRow: 'Quitar',
      table: {
        name: 'Alumno',
        typeA: 'Tipoloxía A',
        typeB: 'Tipoloxía B',
        typeC: 'Tipoloxía C',
        actions: 'Accións'
      },
      status: {
        parsed: 'Importáronse {count} alumnos.',
        noRows: 'Non se detectaron datos válidos para importar.',
        fileType: 'Escolle un ficheiro CSV válido.',
        fileRead: 'Non se puido ler o ficheiro seleccionado.',
        cleared: 'A táboa quedou baleira.'
      }
    },
    assignModal: {
      openButton: 'Asignar tipoloxías',
      helper: 'Escribe os nomes nas tres tipoloxías e axústaas na xanela de asignación ou preme o botón Asignar tipoloxías.',
      title: 'Asignar tipoloxías',
      description: 'Edita os nomes e selecciona a tipoloxía axeitada para cada alumno. Os cambios gárdanse automaticamente.',
      closeButton: 'Pechar'
    },
    incompatiblesTitle: 'Persoas incompatibles',
    incompatiblesDescription: 'Selecciona varias persoas (Ctrl ou Shift + clic) para crear grupos que non deben coincidir no mesmo equipo.',
    incompatiblesAdd: 'Crear grupo incompatible',
    incompatiblesClear: 'Baleirar incompatibles',
    incompatiblesEmpty: 'Non hai grupos incompatibles definidos.',
    incompatiblesLimit: 'Grupos incompatibles: {count}. Máximo {max} persoas por grupo.',
    incompatiblesWarning: 'Cada grupo incompatible non pode ter máis membros que o número de equipos dispoñibles.',
    incompatiblesSelectHint: 'Selecciona polo menos dúas persoas para crear un grupo incompatible.',
    incompatiblesDuplicate: 'Algunha destas persoas xa pertence a outro grupo incompatible.',
    infoGroups: 'Equipos: {teams} | Sobran: {leftovers}',
    infoTotals: 'Total: {total} persoas (A: {countA}, B: {countB}, C: {countC})',
    groupCount: 'Alumnado: {count}',
    teamLabel: 'Equipo {index}',
    incompatiblesGroupLabel: 'Grupo {index}',
    removeIncompatibleAria: 'Eliminar grupo incompatible {index}',
    errors: {
      minGroupSize: 'O número mínimo de persoas por equipo é {min}.',
      noStudents: 'Non hai persoas para formar equipos.',
      noTeamsForIncompatibles: 'Non se poden marcar incompatibles ata que haxa equipos dispoñibles.',
      homogeneousMixed: 'Os grupos incompatibles deben ser do mesmo tipo cando os equipos son homoxéneos.'
    },
    footer: {
      heading: 'Xerador de equipos cooperativos',
      meta: "© 2025 · <a href='https://bilateria.org' rel='author'>Juan José de Haro</a> · <a href='https://github.com/jjdeharo/geco'>https://github.com/jjdeharo/geco</a>",
      code: "O código desta aplicación publícase baixo licenza <a rel='license' href='https://www.gnu.org/licenses/agpl-3.0.html'>AGPL v3</a>.",
      content: "Os contidos educativos (textos, exercicios, vídeos e imaxes) están baixo licenza <a rel='license' href='https://creativecommons.org/licenses/by-sa/4.0/'>CC BY-SA 4.0</a>."
    },
    report: {
      title: 'Informe de equipos',
      noTeams: 'Xera os equipos para ver o informe.',
      modeLabel: {
        heterogeneos: 'Modo heteroxéneo',
        homogeneos: 'Modo homoxéneo',
        esporadicos: 'Modo aleatorio'
      },
      status: {
        ok: 'Cumpre as expectativas.',
        partial: 'Cumpre parcialmente.',
        fail: 'Non cumpre as expectativas.'
      },
      summary: {
        ok: 'Cúmprense as condicións definidas para este modo.',
        partial: 'Existen desviacións respecto ás condicións:',
        fail: 'As condicións principais non se cumpren:'
      },
      messages: {
        heteroNoAC: 'O equipo {team} non inclúe alumnado A nin C.',
        sizeDifferent: 'O equipo {team} ten {size} membros (obxectivo {target}).',
        groupCountDifferent: 'Xeráronse {current} equipos cando se agardaban {expected}.',
        groupSingle: 'O equipo {team} quedou cunha soa persoa e integrouse noutro grupo.',
        homoMixed: 'O equipo {team} mestura tipoloxías: {types}.',
        incompatibles: 'As persoas incompatibles {names} coincidiron no equipo {team}.',
        randomSize: 'O equipo {team} ten {size} membros (obxectivo {target}).'
      }
    }
    ,
    state: {
      title: 'Datos do alumnado',
      legend: 'Importa un ficheiro de exportación de GeCo (.json) ou pega os nomes na caixa da dereita.',
      pasteTitle: 'Ou pegar nomes do alumnado',
      pastePlaceholder: 'Un nome por liña',
      pasteButton: 'Cargar nomes',
      pasteHint: 'Un nome por liña. As comas non separan.',
      resetButton: 'Reiniciar aplicación',
      status: {
        parsed: 'Cargáronse {count} nomes.',
        noRows: 'Non hai nomes para cargar.'
      }
    }
  },
  eu: {
    languageName: 'EU',
    locale: 'eu-ES',
    title: 'Talde kooperatiboen sortzailea',
    groupsTitle: 'Ikasleen taldeak',
    clearAll: 'Izen guztiak ezabatu',
    guideLink: 'Erabilera gida',
    groupALabel: '<strong>A tipologia</strong> (laguntzarik behar ez dutenak):',
    groupBLabel: '<strong>B tipologia</strong> (laguntza pixka bat behar dutenak):',
    groupCLabel: '<strong>C tipologia</strong> (laguntza behar dutenak):',
    membersPerTeam: 'Taldeko kide kopurua:',
    teamTypeTitle: 'Talde motak:',
    heterogeneousLabel: 'Talde heterogeneoak (lehenetsia)',
    homogeneousLabel: 'Talde homogeneoak (antzekoak)',
    temporaryLabel: 'Ausazkoak (aldi baterako)',
    leftoverTitle: 'Zer egin soberan geratzen direnekin?',
    newTeamLabel: 'Talde berri bat sortu',
    addToOthersLabel: 'Gainerako taldeen artean banatu',
    generateButton: 'Taldeak sortu',
    copyButton: 'Taldeak kopiatu',
    exportTeamsButton: 'Taldeak kalkulu-orritara esportatu',
    topButtons: { exportAll: 'Dena esportatu (JSON)', importAll: 'JSON gisa esportatutako fitxategia inportatu' },
    fullImport: {
      title: 'Datuak inportatu',
      description: 'Aukeratu zein datu inportatu nahi dituzun. Lehenespenez dena markatuta dago.',
      fileButton: 'Aukeratu fitxategia',
      applyButton: 'Inportatu',
      cancelButton: 'Utzi',
      options: { names: 'Izenak', types: 'Tipologia', incompat: 'Bateraezintasunak', teams: 'Taldeak' },
      status: { ready: 'Fitxategia kargatuta. Aukeratu zer inportatu.', invalid: 'Fitxategi baliogabea.', readError: 'Ezin izan da fitxategia irakurri.', noData: 'Aukeratu fitxategi baliodun bat lehenik.', done: 'Inportazioa amaituta.' }
    },
    copySuccess: 'Taldeak arbelean kopiatu dira',
    bulkInput: {
      openButton: 'Kargatu kalkulu-orria',
      modalTitle: 'Gehitu zure kalkulu-orria',
      replaceNotice: 'Inportazioak uneko ikasle guztiak ordezkatuko ditu.',
      pasteTitle: 'Itsatsi datuak kalkulu-orritik',
      pastePlaceholder: 'Izena\tTipologia (aukerakoa)',
      parseButton: 'Ikasleak kargatu',
      fileTitle: 'Ireki kalkulu-orri bat',
      fileButton: 'Aukeratu fitxategia',
      fileHint: 'Erabili kalkulu-orritik esportatutako CSV fitxategia.',
      closeButton: 'Itxi',
      downloadButton: 'Deskargatu kalkulu-orria',
      csvHeader: 'Izena;Tipologia',
      emptyTable: 'Taula hutsik dago. Inportatu edo gehitu izenak hasteko.',
      deleteRow: 'Kendu',
      table: {
        name: 'Ikaslea',
        typeA: 'A tipologia',
        typeB: 'B tipologia',
        typeC: 'C tipologia',
        actions: 'Ekintzak'
      },
      status: {
        parsed: '{count} ikasle inportatu dira.',
        noRows: 'Ez da datu baliagarririk aurkitu inportatzeko.',
        fileType: 'Aukeratu baliozko CSV fitxategi bat.',
        fileRead: 'Ezin izan da aukeratutako fitxategia irakurri.',
        cleared: 'Ikasleen zerrenda garbitu da.'
      }
    },
    assignModal: {
      openButton: 'Tipologiak esleitu',
      helper: 'Idatzi izenak hiru tipologietan eta doituak esleipen leihoan.',
      title: 'Tipologiak esleitu',
      description: 'Editatu izenak eta aukeratu ikasle bakoitzarentzako tipologia egokia. Aldaketak automatikoki gordetzen dira.',
      closeButton: 'Itxi'
    },
    incompatiblesTitle: 'Bateraezinak',
    incompatiblesDescription: 'Hautatu hainbat pertsona (Ctrl edo Shift + klik) talde berean egon ez daitezen.',
    incompatiblesAdd: 'Sortu bateraezinen taldea',
    incompatiblesClear: 'Garbitu bateraezinak',
    incompatiblesEmpty: 'Ez dago bateraezinen talderik.',
    incompatiblesLimit: 'Bateraezinen taldeak: {count}. Gehienez {max} kide taldeko.',
    incompatiblesWarning: 'Bateraezinen talde bakoitzak ezin du talde kopurua baino kide gehiago izan.',
    incompatiblesSelectHint: 'Hautatu gutxienez bi pertsona bateraezinen taldea sortzeko.',
    incompatiblesDuplicate: 'Pertsona hauetako batek dagoeneko beste bateraezin talde batean parte hartzen du.',
    infoGroups: 'Taldeak: {teams} | Soberan: {leftovers}',
    infoTotals: 'Guztira: {total} pertsona (A: {countA}, B: {countB}, C: {countC})',
    groupCount: 'Ikasleak: {count}',
    teamLabel: 'Taldea {index}',
    incompatiblesGroupLabel: 'Talde {index}',
    removeIncompatibleAria: 'Ezabatu bateraezinen taldea {index}',
    errors: {
      minGroupSize: 'Talde bakoitzeko gutxieneko kide kopurua {min} da.',
      noStudents: 'Ez dago talderik osatzeko ikaslerik.',
      noTeamsForIncompatibles: 'Bateraezinak markatzeko, lehenik taldeak egon behar dira eskuragarri.',
      homogeneousMixed: 'Bateraezinen taldeek tipologia bereko kideak izan behar dituzte talde homogeneoak sortzean.'
    },
    footer: {
      heading: 'Talde kooperatiboen sortzailea',
      meta: "© 2025 · <a href='https://bilateria.org' rel='author'>Juan José de Haro</a> · <a href='https://github.com/jjdeharo/geco'>https://github.com/jjdeharo/geco</a>",
      code: "Aplikazio honen kodea <a rel='license' href='https://www.gnu.org/licenses/agpl-3.0.html'>AGPL v3</a> lizentziapean argitaratua dago.",
      content: "Eduki didaktikoak (testuak, ariketak, bideoak eta irudiak) <a rel='license' href='https://creativecommons.org/licenses/by-sa/4.0/'>CC BY-SA 4.0</a> lizentziapean daude."
    },
    report: {
      title: 'Talde txostena',
      noTeams: 'Txostena ikusteko sortu taldeak.',
      modeLabel: {
        heterogeneos: 'Modu heterogeneoa',
        homogeneos: 'Modu homogeneoa',
        esporadicos: 'Ausazko modua'
      },
      status: {
        ok: 'Itxaropenak betetzen ditu.',
        partial: 'Zati batean betetzen ditu.',
        fail: 'Ez ditu itxaropenak betetzen.'
      },
      summary: {
        ok: 'Modu honetarako ezarritako baldintzak betetzen dira.',
        partial: 'Baldintzekiko desbideratzeak daude:',
        fail: 'Baldintza nagusiak ez dira betetzen:'
      },
      messages: {
        heteroNoAC: 'Talde {team}k ez du A edo C motako ikaslerik.',
        sizeDifferent: 'Talde {team}k {size} kide ditu (helburua {target}).',
        groupCountDifferent: '{current} talde sortu dira baina {expected} espero ziren.',
        groupSingle: 'Talde {team} kide bakarrarekin geratu da eta beste talde batean txertatu da.',
        homoMixed: 'Talde {team} tipologia desberdinak nahasten ditu: {types}.',
        incompatibles: 'Bateraezinak diren {names} pertsonak talde {team} berean bukatu dute.',
        randomSize: 'Talde {team}k {size} kide ditu (helburua {target}).'
      }
    }
    ,
    state: {
      title: 'Ikasleen datuak',
      legend: 'GeCo-tik esportatutako fitxategi bat (.json) inportatu edo eskuineko koadroan izenak itsatsi.',
      pasteTitle: 'Edo itsatsi ikasleen izenak',
      pastePlaceholder: 'Izen bat lerroko',
      pasteButton: 'Izenak kargatu',
      pasteHint: 'Izen bat lerroko. Komek ez dute banatzen.',
      resetButton: 'Aplikazioa berrezarri',
      status: {
        parsed: '{count} izen kargatu dira.',
        noRows: 'Ez dago kargatzeko izenik.'
      }
    }
  }
};
