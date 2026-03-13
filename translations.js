const TRANSLATIONS = {
  es: {
    languageName: 'ES',
    locale: 'es-ES',
    title: 'Generador de equipos cooperativos',
    groupsTitle: 'Grupos de estudiantes',
    clearAll: 'Borrar todos los nombres',
    guideLink: 'Guía de uso',
    guide: {
      pageTitle: 'Guía de GeCo',
      backLink: 'Volver a GeCo',
      introText: 'El programa GeCo facilita la formación de equipos de alumnos para el trabajo cooperativo, promoviendo la diversidad y mejorando la colaboración. La composición de los equipos puede ser <strong>heterogénea</strong>, <strong>homogénea</strong> o <strong>temporal</strong> según el objetivo del aprendizaje.',
      justificationTitle: 'Justificación teórica para la creación de equipos homogéneos y heterogéneos',
      distributionText: 'Para formar equipos, hay que distribuir a los estudiantes en tres subgrupos (tipologías A, B y C en este programa), según la propuesta de <a href="https://cife-ei-caac.com/wp-content/uploads/2015/06/EL_APRENDIZAJE_COOPERATIVO.pdf">Pujolàs & Lago, 2011</a>. Cada grupo de 4 personas constará de los siguientes miembros:',
      memberList: ['A: Una persona con capacidad para ayudar.', 'B: Un par de miembros que sean más o menos autónomos.', 'C: Una persona que necesita ayuda.'],
      idealSize: 'El tamaño ideal de los equipos cooperativos es de 4 integrantes. Si no es posible hacer grupos de 4, entonces se pueden hacer de 3 o de 5, pero nunca de más.',
      heterogeneousTitle: 'Equipos heterogéneos (equipos base)',
      heterogeneousText: 'Son grupos que durarán todo el curso o un trimestre. Favorecen el aprendizaje de nuevos conocimientos y se crean haciendo que en cada equipo estén representadas las tres tipologías (A, B y C).',
      homogeneousTitle: 'Equipos homogéneos (similares)',
      homogeneousText: 'Están formados por miembros con características similares y son adecuados para reforzar conocimientos ya adquiridos. Estos grupos se crean intentando que sean todos de la misma tipología (A, B o C). Como que normalmente los alumnos no cuadran exactamente en una tipología por grupo, podrán aparecer grupos con tipologías mezcladas.',
      temporaryTitle: 'Equipos temporales (esporádicos)',
      temporaryText: 'Estos equipos se forman para tareas cortas o cuando no se conoce al alumnado y se utilizan especialmente al principio del curso o para actividades simples y rápidas. Estas agrupaciones son uniformes, ya que no hay distinción entre unos grupos y otros. Se forman mediante una selección aleatoria de alumnos. En este caso, el programa elimina las etiquetas de los alumnos, A, B y C, puesto que ya no tienen sentido.',
      howtoTitle: 'Cómo utilizar GeCo',
      gecoIntro: 'GeCo crea equipos aleatorios basándose en las condiciones definidas por el usuario.',
      introNames: 'Introducir los nombres de los alumnos: un nombre por línea (las comas no separan)',
      typicallyText: 'Típicamente, se harán de la siguiente manera:',
      typeA: 'Tipología A: Personas autosuficientes que no requieren apoyo.',
      typeB: 'Tipología B: Personas que pueden trabajar de manera independiente pero con asistencia ocasional (la mayoría).',
      typeC: 'Tipología C: Personas que necesitan apoyo para poder progresar.',
      otherGroups: 'Lógicamente, podemos hacer otras agrupaciones, por ejemplo, si queremos hacer grupos para jugar al ajedrez podríamos poner en A aquellos que saben jugar, en B los que solo saben mover las piezas y en C los que desconocen el juego.',
      dataSection: '<strong>Datos del alumnado</strong>: puedes <em>importar un archivo exportado en JSON</em> (incluye nombres, tipologías, incompatibilidades y equipos) o <em>pegar los nombres</em> (un nombre por línea). También puedes <em>Exportar todo (formato JSON)</em> para guardarlo.',
      assignTypologies: '<strong>Asignar tipologías</strong>: usa el botón <em>Asignar tipologías</em> para abrir la ventana, editar nombres y marcar A/B/C por fila. Los cambios se guardan automáticamente.',
      membersNumber: '<strong>Definir el número de alumnos por equipo</strong>. Si la división no es exacta, algunos equipos tendrán un tamaño diferente.',
      teamType: '<strong>Elegir el tipo de los equipos</strong>: heterogéneo, homogéneo o esporádico.',
      leftoverMembers: '<strong>Decidir qué hacer con los miembros sobrantes</strong>. Puedes repartirlos entre los equipos existentes o crear uno nuevo.',
      incompatiblesStep: '<strong>Configurar personas incompatibles</strong>. Selecciona los alumnos que no deben coincidir y añádelos como grupos incompatibles.',
      generateButton: 'Pulsa <strong>Generar equipos</strong> para obtenerlos. Cada pulsación produce una nueva distribución y un informe de cumplimiento.',
      exportTeams: '<strong>Tras generar equipos</strong>: puedes <em>Exportar equipos a hoja de cálculo</em> (CSV entrecomillado, listo para editar) o <em>Copiar equipos</em> al portapapeles.',
      goToGeco: 'Ir a GeCo',
      footerLab: 'Laboratorio de aplicaciones educativas <a href="https://labia.tiddlyhost.com" target="_blank">LABIA</a>',
      footerAuthor: 'Aplicación hecha por <a href="https://bilateria.org" target="_blank">Juan José de Haro</a>',
      footerLicense: 'Esta obra está bajo una licencia <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">Creative Commons BY-SA</a>'
    },
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
      meta: "© 2025–2026 · <a href='https://bilateria.org' rel='author'>Juan José de Haro</a> · <a href='https://github.com/jjdeharo/geco'>https://github.com/jjdeharo/geco</a>",
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
      criteria: {
        title: 'Qué comprueba este informe',
        leftovers: {
          grupoNuevo: 'crear un equipo nuevo con las personas sobrantes',
          agregar: 'repartir las personas sobrantes entre otros equipos'
        },
        items: {
          incompatibles: 'Que las personas marcadas como incompatibles no coincidan en el mismo equipo.',
          teamCount: 'Que el número de equipos encaje con la opción elegida para los sobrantes: {leftovers}.',
          noSingles: 'Que no quede nadie solo en un equipo.',
          teamSize: 'Que los equipos se acerquen al tamaño configurado: {target} personas.',
          randomSize: 'Que los equipos no se alejen demasiado del tamaño orientativo de {target} personas.',
          heterogeneousBalance: 'Que cada equipo tenga perfiles variados y, si es posible, presencia de alumnado A o C.',
          homogeneousSimilarity: 'Que cada equipo reúna alumnado de tipología similar, salvo cuando los números obliguen a mezclar.'
        }
      },
      messages: {
        heteroNoAC: 'El equipo {team} no incluye alumnado A ni C.',
        sizeDifferent: 'El equipo {team} tiene {size} miembros.',
        groupCountDifferent: 'Se han generado {current} equipos cuando se esperaban {expected}.',
        groupSingle: 'El equipo {team} se ha quedado con una sola persona y se ha combinado con otro grupo.',
        homoMixed: 'El equipo {team} mezcla tipologías: {types}.',
        incompatibles: 'Las personas incompatibles {names} han coincidido en el equipo {team}.',
        randomSize: 'El equipo {team} tiene {size} miembros.'
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
    guide: {
      pageTitle: 'Guia de GeCo',
      backLink: 'Tornar a GeCo',
      introText: "El programa GeCo facilita la formació d'equips d'alumnes per al treball cooperatiu, promovent la diversitat i millorant la col·laboració. La composició dels equips pot ser <strong>heterogènia</strong>, <strong>homogènia</strong> o <strong>temporal</strong> segons l'objectiu de l'aprenentatge.",
      justificationTitle: "Justificació teòrica per a la creació d'equips homogenis i heterogenis",
      distributionText: 'Per formar equips, cal distribuir els estudiants en tres subgrups (tipologies A, B i C en aquest programa), segons la proposta de <a href="https://cife-ei-caac.com/wp-content/uploads/2015/06/EL_APRENDIZAJE_COOPERATIVO.pdf">Pujolàs & Lago, 2011</a>. Cada grup de 4 persones constarà dels següents membres:',
      memberList: ['A: Una persona amb capacitat per ajudar.', 'B: Un parell de membres que siguin més o menys autònoms.', 'C: Una persona que necessita ajuda.'],
      idealSize: 'La mida ideal dels equips cooperatius és de 4 integrants. Si no és possible fer grups de 4, llavors es poden fer de 3 o de 5, però mai de més.',
      heterogeneousTitle: 'Equips heterogenis (equips base)',
      heterogeneousText: "Són grups que duraran tot el curs o un trimestre. Afavoreixen l'aprenentatge de nous coneixements i es creen fent que a cada equip estiguin representades les tres tipologies (A, B i C).",
      homogeneousTitle: 'Equips homogenis (similars)',
      homogeneousText: 'Estan formats per membres amb característiques similars i són adequats per reforçar coneixements ja adquirits. Aquests grups es creen intentant que siguin tots de la mateixa tipologia (A, B o C). Com que normalment els alumnes no quadren exactament en una tipologia per grup, podran aparèixer grups amb tipologies barrejades.',
      temporaryTitle: 'Equips temporals (esporàdics)',
      temporaryText: "Aquests equips es formen per a tasques curtes o quan no es coneix l'alumnat i s'utilitzen especialment al principi del curs o per a activitats simples i ràpides. Aquestes agrupacions són uniformes, ja que no hi ha distinció entre uns grups i altres. Es formen mitjançant una selecció aleatòria d'alumnes. En aquest cas, el programa elimina les etiquetes dels alumnes, A, B i C, ja que no tenen sentit.",
      howtoTitle: 'Com utilitzar GeCo',
      gecoIntro: "GeCo crea equips aleatoris basant-se en les condicions definides per l'usuari.",
      introNames: 'Introduir els noms dels alumnes: un nom per línia (les comes no separen)',
      typicallyText: 'Típicament, es faran de la següent manera:',
      typeA: 'Tipologia A: Persones autosuficients que no requereixen suport.',
      typeB: 'Tipologia B: Persones que poden treballar de manera independent però amb assistència ocasional (la majoria).',
      typeC: 'Tipologia C: Persones que necessiten suport per poder progressar.',
      otherGroups: "Lògicament, podem fer altres agrupacions, per exemple, si volem fer grups per jugar als escacs podríem posar a A aquells que saben jugar, a B els que només saben moure les peces i a C els que desconeixen el joc.",
      dataSection: "<strong>Dades de l'alumnat</strong>: pots <em>importar un fitxer exportat en JSON</em> (inclou noms, tipologies, incompatibilitats i equips) o <em>enganxar els noms</em> (un nom per línia). També pots <em>Exportar tot (format JSON)</em> per desar-ho.",
      assignTypologies: "<strong>Assignar tipologies</strong>: fes servir el botó <em>Assignar tipologies</em> per obrir la finestra, editar noms i marcar A/B/C per fila. Els canvis es guarden automàticament.",
      membersNumber: "<strong>Definir el nombre d'alumnes per equip</strong>. Si la divisió no és exacta, alguns equips tindran una mida diferent.",
      teamType: '<strong>Triar el tipus dels equips</strong>: heterogeni, homogeni o esporàdic.',
      leftoverMembers: '<strong>Decidir què fer amb els membres sobrants</strong>. Pots repartir-los entre els equips existents o crear-ne un de nou.',
      incompatiblesStep: '<strong>Configurar persones incompatibles</strong>. Selecciona els alumnes que no han de coincidir i afegeix-los com a grups incompatibles.',
      generateButton: 'Prem <strong>Generar equips</strong> per obtenir-los. Cada vegada es genera una nova distribució i un informe de compliment.',
      exportTeams: '<strong>Després de generar els equips</strong>: pots <em>Exportar equips a full de càlcul</em> (CSV entrecomillat) o <em>Copiar equips</em> al porta-retalls.',
      goToGeco: 'Anar a GeCo',
      footerLab: 'Laboratori d\'aplicacions educatives <a href="https://labia.tiddlyhost.com" target="_blank">LABIA</a>',
      footerAuthor: 'Aplicació feta per <a href="https://bilateria.org" target="_blank">Juan José de Haro</a>',
      footerLicense: 'Aquesta obra està sota una llicència <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">Creative Commons BY-SA</a>'
    },
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
      meta: "© 2025–2026 · <a href='https://bilateria.org' rel='author'>Juan José de Haro</a> · <a href='https://github.com/jjdeharo/geco'>https://github.com/jjdeharo/geco</a>",
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
      criteria: {
        title: "Què comprova aquest informe",
        leftovers: {
          grupoNuevo: 'crear un equip nou amb les persones sobrants',
          agregar: 'repartir les persones sobrants entre altres equips'
        },
        items: {
          incompatibles: 'Que les persones marcades com a incompatibles no coincideixin al mateix equip.',
          teamCount: "Que el nombre d'equips encaixi amb l'opció triada per als sobrants: {leftovers}.",
          noSingles: 'Que ningú no quedi tot sol en un equip.',
          teamSize: 'Que els equips s’acostin a la mida configurada: {target} persones.',
          randomSize: 'Que els equips no s’allunyin gaire de la mida orientativa de {target} persones.',
          heterogeneousBalance: 'Que cada equip tingui perfils variats i, si és possible, presència d’alumnat A o C.',
          homogeneousSimilarity: 'Que cada equip agrupi alumnat de tipologia similar, excepte quan els nombres obliguin a barrejar.'
        }
      },
      messages: {
        heteroNoAC: "L'equip {team} no inclou alumnat A ni C.",
        sizeDifferent: "L'equip {team} té {size} membres.",
        groupCountDifferent: "S'han generat {current} equips quan s'esperaven {expected}.",
        groupSingle: "L'equip {team} s'ha quedat amb una sola persona i s'ha integrat en un altre grup.",
        homoMixed: "L'equip {team} barreja tipologies: {types}.",
        incompatibles: "Les persones incompatibles {names} han coincidit a l'equip {team}.",
        randomSize: "L'equip {team} té {size} membres."
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
    guide: {
      pageTitle: 'GeCo Guide',
      backLink: 'Back to GeCo',
      introText: 'The GeCo program helps teachers create cooperative student teams, promoting diversity and improving collaboration. Teams can be <strong>heterogeneous</strong>, <strong>homogeneous</strong>, or <strong>temporary</strong> depending on the learning goal.',
      justificationTitle: 'Theoretical justification for heterogeneous and homogeneous teams',
      distributionText: 'To build teams, split the students into three subgroups (typologies A, B and C in this tool) following the proposal by <a href="https://cife-ei-caac.com/wp-content/uploads/2015/06/EL_APRENDIZAJE_COOPERATIVO.pdf">Pujolàs & Lago, 2011</a>. Every group of four should contain:',
      memberList: ['A: A student who can support peers.', 'B: Two fairly autonomous students.', 'C: A student who needs support.'],
      idealSize: 'The ideal size for cooperative teams is four members. If that is not possible, use teams of three or five, but never larger.',
      heterogeneousTitle: 'Heterogeneous teams (base teams)',
      heterogeneousText: 'These groups usually last a term or the whole year. They favour new learning and ensure that each team includes the three typologies (A, B and C).',
      homogeneousTitle: 'Homogeneous teams (similar)',
      homogeneousText: 'They group students with similar characteristics and are appropriate to consolidate previously learned content. The tool tries to keep all members within the same typology (A, B or C). Because numbers seldom match perfectly, some teams may mix typologies.',
      temporaryTitle: 'Temporary teams (random)',
      temporaryText: 'These teams are created for short tasks or when the teacher does not yet know the class. They are especially useful at the beginning of the year or for quick activities. All teams are uniform because students are assigned randomly, so the A, B, C labels are ignored.',
      howtoTitle: 'How to use GeCo',
      gecoIntro: 'GeCo creates teams based on the options you choose.',
      introNames: 'Enter student names: one name per line (commas do not split)',
      typicallyText: 'Typically:',
      typeA: 'Type A: Self-sufficient students who do not need support.',
      typeB: 'Type B: Students who work independently with occasional support (most of them).',
      typeC: 'Type C: Students who need support to progress.',
      otherGroups: 'You can adapt the typologies to your needs (e.g., chess skill levels).',
      dataSection: '<strong>Student data</strong>: you can <em>import an exported JSON file</em> (includes names, typologies, incompatible groups and teams) or <em>paste names</em> (one per line). You can also <em>Export all (JSON)</em> to save.',
      assignTypologies: '<strong>Assign typologies</strong>: use the <em>Assign typologies</em> button to edit names and mark A/B/C per row. Changes are saved automatically.',
      membersNumber: '<strong>Set the target team size</strong>. Some teams may differ if the division is not exact.',
      teamType: '<strong>Choose the team type</strong>: heterogeneous, homogeneous or random.',
      leftoverMembers: '<strong>Decide what to do with leftovers</strong>: add to others or create a new team.',
      incompatiblesStep: '<strong>Set incompatible students</strong>: select and add them as incompatible groups.',
      generateButton: 'Click <strong>Generate teams</strong>. Each click produces a fresh distribution and a compliance report.',
      exportTeams: '<strong>After generating teams</strong>: you can <em>Export teams to spreadsheet</em> (quoted CSV) or <em>Copy teams</em> to the clipboard.',
      goToGeco: 'Go to GeCo',
      footerLab: 'Educational Applications Lab <a href="https://labia.tiddlyhost.com" target="_blank">LABIA</a>',
      footerAuthor: 'Application by <a href="https://bilateria.org" target="_blank">Juan José de Haro</a>',
      footerLicense: 'This work is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">Creative Commons BY-SA</a>'
    },
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
      meta: "© 2025–2026 · <a href='https://bilateria.org' rel='author'>Juan José de Haro</a> · <a href='https://github.com/jjdeharo/geco'>https://github.com/jjdeharo/geco</a>",
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
      criteria: {
        title: 'What this report checks',
        leftovers: {
          grupoNuevo: 'create a new team for leftover students',
          agregar: 'distribute leftover students across other teams'
        },
        items: {
          incompatibles: 'That students marked as incompatible do not end up in the same team.',
          teamCount: 'That the number of teams matches the selected leftover option: {leftovers}.',
          noSingles: 'That nobody is left alone in a team.',
          teamSize: 'That teams stay close to the configured size: {target} students.',
          randomSize: 'That teams do not drift too far from the reference size of {target} students.',
          heterogeneousBalance: 'That each team keeps a varied mix and, when possible, includes at least one A or C student.',
          homogeneousSimilarity: 'That each team groups similar typologies, except when the numbers make some mixing unavoidable.'
        }
      },
      messages: {
        heteroNoAC: 'Team {team} does not include any A or C students.',
        sizeDifferent: 'Team {team} has {size} members.',
        groupCountDifferent: 'Generated {current} teams but {expected} were expected.',
        groupSingle: 'Team {team} ended up with a single member and has been merged into another group.',
        homoMixed: 'Team {team} mixes typologies: {types}.',
        incompatibles: 'Incompatible students {names} ended up together in team {team}.',
        randomSize: 'Team {team} has {size} members.'
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
    guide: {
      pageTitle: 'Guía de GeCo',
      backLink: 'Volver a GeCo',
      introText: 'O programa GeCo facilita a formación de equipos de alumnado para o traballo cooperativo, promovendo a diversidade e mellorando a colaboración. A composición dos equipos pode ser <strong>heteroxénea</strong>, <strong>homoxénea</strong> ou <strong>temporal</strong> segundo o obxectivo da aprendizaxe.',
      justificationTitle: 'Xustificación teórica para a creación de equipos homoxéneos e heteroxéneos',
      distributionText: 'Para formar equipos cómpre distribuír o alumnado en tres subgrupos (tipoloxías A, B e C neste programa), segundo a proposta de <a href="https://cife-ei-caac.com/wp-content/uploads/2015/06/EL_APRENDIZAJE_COOPERATIVO.pdf">Pujolàs & Lago, 2011</a>. Cada grupo de 4 persoas incluirá:',
      memberList: ['A: Unha persoa con capacidade para axudar.', 'B: Dúas persoas máis ou menos autónomas.', 'C: Unha persoa que precisa apoio.'],
      idealSize: 'O tamaño ideal dos equipos cooperativos é de 4 integrantes. Se non é posible facer grupos de 4, pueden facerse de 3 ou de 5, pero nunca máis grandes.',
      heterogeneousTitle: 'Equipos heteroxéneos (equipos base)',
      heterogeneousText: 'Son grupos que duran todo o curso ou un trimestre. Favorecen a aprendizaxe de novos contidos e créanse asegurando que en cada equipo aparezan as tres tipoloxías (A, B e C).',
      homogeneousTitle: 'Equipos homoxéneos (semellantes)',
      homogeneousText: 'Formados por alumnado con características semellantes, son axeitados para reforzar coñecementos xa adquiridos. O programa tenta que cada equipo sexa dunha soa tipoloxía, aínda que pode haber mesturas cando os números non cadran.',
      temporaryTitle: 'Equipos temporais (aleatorios)',
      temporaryText: 'Formanse para tarefas curtas ou cando o profesorado aínda non coñece o alumnado. Úsanse especialmente a comezos de curso ou para actividades rápidas. Todos os equipos son uniformes e os alumnos asígnanse ao azar, polo que as etiquetas A, B e C pérdense.',
      howtoTitle: 'Como utilizar GeCo',
      gecoIntro: 'GeCo crea equipos aleatorios en función das condicións definidas polo profesorado.',
      introNames: 'Introducir os nomes do alumnado: un nome por liña (as comas non separan)',
      typicallyText: 'Habitualmente as listas cúbrense do seguinte xeito:',
      typeA: 'Tipoloxía A: Persoas autónomas que non precisan apoio.',
      typeB: 'Tipoloxía B: Persoas que traballan con autonomía pero precisan axuda puntual (a maioría).',
      typeC: 'Tipoloxía C: Persoas que precisan apoio para progresar.',
      otherGroups: 'Evidentemente pódense facer outras agrupacións; por exemplo, para unha actividade de xadrez poderiamos colocar en A quen xa sabe xogar, en B quen só coñece os movementos e en C quen non coñece o xogo.',
      dataSection: '<strong>Datos do alumnado</strong>: podes <em>importar un ficheiro exportado en JSON</em> (inclúe nomes, tipoloxías, incompatibilidades e equipos) ou <em>pegar os nomes</em> (un por liña). Tamén podes <em>Exportar todo (formato JSON)</em> para gardar.',
      assignTypologies: '<strong>Asignar tipoloxías</strong>: usa o botón <em>Asignar tipoloxías</em> para abrir a xanela, editar nomes e marcar A/B/C por fila. Os cambios gárdanse automaticamente.',
      membersNumber: '<strong>Definir o número de persoas por equipo</strong>. Se a división non é exacta, algún equipo terá un tamaño diferente.',
      teamType: '<strong>Escoller o tipo de equipo</strong>: heteroxéneo, homoxéneo ou aleatorio.',
      leftoverMembers: '<strong>Decidir que facer co alumnado sobrante</strong>. Pódese repartilo entre os equipos existentes ou crear un grupo novo.',
      incompatiblesStep: '<strong>Configurar persoas incompatibles</strong>. Selecciona os estudantes que non deben coincidir e engádeos como grupos incompatibles.',
      generateButton: 'Preme <strong>Xerar equipos</strong> para obtelos. Cada xeración produce unha nova distribución e un informe de cumprimento.',
      exportTeams: '<strong>Despois de xerar os equipos</strong>: podes <em>Exportar equipos a folla de cálculo</em> (CSV entrecomillado) ou <em>Copiar equipos</em> ao portapapeis.',
      goToGeco: 'Ir a GeCo',
      footerLab: 'Laboratorio de aplicacións educativas <a href="https://labia.tiddlyhost.com" target="_blank">LABIA</a>',
      footerAuthor: 'Aplicación creada por <a href="https://bilateria.org" target="_blank">Juan José de Haro</a>',
      footerLicense: 'Esta obra está baixo unha licenza <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">Creative Commons BY-SA</a>'
    },
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
      meta: "© 2025–2026 · <a href='https://bilateria.org' rel='author'>Juan José de Haro</a> · <a href='https://github.com/jjdeharo/geco'>https://github.com/jjdeharo/geco</a>",
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
      criteria: {
        title: 'Que comproba este informe',
        leftovers: {
          grupoNuevo: 'crear un equipo novo coas persoas sobrantes',
          agregar: 'repartir as persoas sobrantes entre outros equipos'
        },
        items: {
          incompatibles: 'Que as persoas marcadas como incompatibles non coincidan no mesmo equipo.',
          teamCount: 'Que o número de equipos encaixe coa opción escollida para os sobrantes: {leftovers}.',
          noSingles: 'Que ninguén quede só nun equipo.',
          teamSize: 'Que os equipos se acheguen ao tamaño configurado: {target} persoas.',
          randomSize: 'Que os equipos non se afasten demasiado do tamaño orientativo de {target} persoas.',
          heterogeneousBalance: 'Que cada equipo teña perfís variados e, se é posible, presenza de alumnado A ou C.',
          homogeneousSimilarity: 'Que cada equipo reúna alumnado de tipoloxía similar, salvo cando os números obriguen a mesturar.'
        }
      },
      messages: {
        heteroNoAC: 'O equipo {team} non inclúe alumnado A nin C.',
        sizeDifferent: 'O equipo {team} ten {size} membros.',
        groupCountDifferent: 'Xeráronse {current} equipos cando se agardaban {expected}.',
        groupSingle: 'O equipo {team} quedou cunha soa persoa e integrouse noutro grupo.',
        homoMixed: 'O equipo {team} mestura tipoloxías: {types}.',
        incompatibles: 'As persoas incompatibles {names} coincidiron no equipo {team}.',
        randomSize: 'O equipo {team} ten {size} membros.'
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
    guide: {
      pageTitle: 'GeCo gida',
      backLink: 'Itzuli GeCora',
      introText: 'GeCo programak ikasleen talde kooperatiboak sortzea errazten du, aniztasuna eta lankidetza sustatuz. Taldeen osaera <strong>heterogeneoa</strong>, <strong>homogeneoa</strong> edo <strong>aldi baterakoa</strong> izan daiteke ikasketa helburuaren arabera.',
      justificationTitle: 'Talde homogeneo eta heterogeneoen oinarri teorikoa',
      distributionText: 'Taldeak osatzeko, ikasleak hiru azpitaldetan (A, B eta C tipologiak) banatzen dira, <a href="https://cife-ei-caac.com/wp-content/uploads/2015/06/EL_APRENDIZAJE_COOPERATIVO.pdf">Pujolàs & Lago, 2011</a> proposamenari jarraituz. Lau kideko talde bakoitzak honakoak izango ditu:',
      memberList: ['A: Besteak laguntzeko gaitasuna duen ikasle bat.', 'B: Nahiko autonomoak diren bi kide.', 'C: Laguntza behar duen ikasle bat.'],
      idealSize: 'Talde kooperatiboetarako tamaina egokiena 4 kidekoa da. Hala ezin bada, taldeak 3 edo 5 kidekoak izan daitezke, baina ez handiagoak.',
      heterogeneousTitle: 'Talde heterogeneoak (oinarrizko taldeak)',
      heterogeneousText: 'Kurtso osoan edo hiruhileko batean mantentzen diren taldeak dira. Ezagutza berriak ikastea errazten dute eta hiru tipologiak (A, B eta C) talde bakoitzean egotea bilatzen da.',
      homogeneousTitle: 'Talde homogeneoak (antzekoak)',
      homogeneousText: 'Antzeko ezaugarriak dituzten pertsonez osatuta daude eta aurrez ikasitako edukiak sendotzeko egokiak dira. Taldeak tipologia bereko ikasleekin osatzen saiatzen da, baina askotan zenbakiak ez datozenez bat, tipologia nahasiak ager daitezke.',
      temporaryTitle: 'Aldi baterako taldeak (ausazkoak)',
      temporaryText: 'Epe laburreko jardueretarako edo irakasleak oraindik ikasleak ezagutzen ez dituenean erabiltzen dira, ikasturte hasieran bereziki. Taldeak uniformea dira eta ikasleak ausaz esleitzen dira, beraz A, B eta C etiketek ez dute zentzurik.',
      howtoTitle: 'Nola erabili GeCo',
      gecoIntro: 'GeCok irakasleak definitutako baldintzetan oinarrituta sortzen ditu taldeak.',
      introNames: 'Idatzi ikasleen izenak: lerroko izen bat (komek ez dute banatzen)',
      typicallyText: 'Orokorrean, zerrendak honela betetzen dira:',
      typeA: 'A tipologia: Autonomoak eta laguntzarik behar ez duten pertsonak.',
      typeB: 'B tipologia: Bere kabuz lan egiten duten baina noizbehinka laguntza behar dutenak (gehienak).',
      typeC: 'C tipologia: Aurrera egiteko laguntza behar dutenak.',
      otherGroups: 'Jakina, beste sailkapen batzuk ere erabil daitezke; esaterako, xake jarduera baterako A taldean jada jokatzen dakitenak jarri, B taldean mugimenduak besterik ez dakitenak eta C taldean erabat berriak direnak.',
      dataSection: '<strong>Ikasleen datuak</strong>: <em>JSON gisa esportatutako fitxategia</em> inporta dezakezu (izenak, tipologiak, bateraezinak eta taldeak barne) edo <em>izenak itsatsi</em> (lerroko izen bat). Halaber, <em>Dena esportatu (JSON)</em> aukera dago gordetzeko.',
      assignTypologies: '<strong>Tipologiak esleitu</strong>: erabili <em>Tipologiak esleitu</em> botoia leihoa irekitzeko, izenak editatzeko eta A/B/C markatzeko errenkada bakoitzean. Aldaketak automatikoki gordetzen dira.',
      membersNumber: '<strong>Zehaztu taldeko kide kopurua</strong>. Zatiketa ez bada zehatza, talde batek baino gehiagok neurri desberdina izango du.',
      teamType: '<strong>Aukeratu taldeen mota</strong>: heterogeneoa, homogeneoa edo ausazkoa.',
      leftoverMembers: '<strong>Erabaki zer egin soberan geratzen direnekin</strong>. Taldeetan bana ditzakezu edo talde berri bat sor dezakezu.',
      incompatiblesStep: '<strong>Konfiguratu bateraezinak</strong>. Hautatu elkarrekin egon ezin duten ikasleak eta gorde talde bateraezin gisa.',
      generateButton: 'Sakatu <strong>Taldeak sortu</strong> banaketa berria eta betetze-txostena lortzeko.',
      exportTeams: '<strong>Taldeak sortu ondoren</strong>: <em>Taldeak kalkulu-orritara esportatu</em> (CSV komatxoekin) edo <em>Taldeak kopiatu</em> arbelean.',
      goToGeco: 'Joan GeCora',
      footerLab: 'Hezkuntza-aplikazioen laborategia <a href="https://labia.tiddlyhost.com" target="_blank">LABIA</a>',
      footerAuthor: 'Aplikazioa <a href="https://bilateria.org" target="_blank">Juan José de Haro</a>-k egina',
      footerLicense: 'Lan hau <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">Creative Commons BY-SA</a> lizentziapean dago'
    },
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
      meta: "© 2025–2026 · <a href='https://bilateria.org' rel='author'>Juan José de Haro</a> · <a href='https://github.com/jjdeharo/geco'>https://github.com/jjdeharo/geco</a>",
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
      criteria: {
        title: 'Txosten honek zer egiaztatzen duen',
        leftovers: {
          grupoNuevo: 'soberan geratzen direnentzat talde berri bat sortzea',
          agregar: 'soberan geratzen direnak beste taldeetan banatzea'
        },
        items: {
          incompatibles: 'Bateraezin gisa markatutako pertsonak talde berean ez bukatzea.',
          teamCount: 'Talde kopurua soberakinen aukerarekin bat etortzea: {leftovers}.',
          noSingles: 'Inor talderen batean bakarrik ez geratzea.',
          teamSize: 'Taldeak ezarritako tamainara hurbiltzea: {target} pertsona.',
          randomSize: 'Taldeak {target} pertsonako orientaziozko tamainatik gehiegi ez urruntzea.',
          heterogeneousBalance: 'Talde bakoitzak profil anitzak izatea eta, ahal bada, A edo C motako ikasleren bat edukitzea.',
          homogeneousSimilarity: 'Talde bakoitzean antzeko tipologiak elkartzea, zenbakiek nahastea saihestea ezinezkoa egiten dutenean izan ezik.'
        }
      },
      messages: {
        heteroNoAC: 'Talde {team}k ez du A edo C motako ikaslerik.',
        sizeDifferent: 'Talde {team}k {size} kide ditu.',
        groupCountDifferent: '{current} talde sortu dira baina {expected} espero ziren.',
        groupSingle: 'Talde {team} kide bakarrarekin geratu da eta beste talde batean txertatu da.',
        homoMixed: 'Talde {team} tipologia desberdinak nahasten ditu: {types}.',
        incompatibles: 'Bateraezinak diren {names} pertsonak talde {team} berean bukatu dute.',
        randomSize: 'Talde {team}k {size} kide ditu.'
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
