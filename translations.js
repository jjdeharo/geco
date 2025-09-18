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
    copySuccess: 'Equipos copiados al portapapeles',
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
    teamLabel: 'Equipo {index}',
    incompatiblesGroupLabel: 'Grupo {index}',
    removeIncompatibleAria: 'Eliminar grupo incompatible {index}',
    errors: {
      minGroupSize: 'El número mínimo de alumnos por equipo es {min}.',
      noStudents: 'No hay alumnos para formar equipos.',
      noTeamsForIncompatibles: 'No se pueden marcar personas incompatibles hasta que haya equipos disponibles.',
      homogeneousMixed: 'Los grupos incompatibles deben ser del mismo tipo en modo homogéneo.'
    },
    gecoDoi: "GeCo - <a href='https://doi.org/10.5281/zenodo.7934796' target='_blank'>DOI: 10.5281/zenodo.7934796</a>",
    labText: "Laboratorio de aplicaciones educativas <a href='https://labia.tiddlyhost.com' target='_blank'>LABIA</a>",
    authorText: "Aplicación hecha por <a href='https://bilateria.org' target='_blank'>Juan José de Haro</a>",
    licenseText: "Esta obra está bajo una licencia <a href='https://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>Creative Commons BY-SA</a>",
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
        groupSingle: 'El equipo {team} se ha quedado con una sola persona y se ha combinado con otro grupo.',
        homoMixed: 'El equipo {team} mezcla tipologías: {types}.',
        incompatibles: 'Las personas incompatibles {names} han coincidido en el equipo {team}.',
        randomSize: 'El equipo {team} tiene {size} miembros (objetivo {target}).'
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
    copySuccess: 'Equips copiats al portapapers',
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
    teamLabel: 'Equip {index}',
    incompatiblesGroupLabel: 'Grup {index}',
    removeIncompatibleAria: 'Eliminar grup incompatible {index}',
    errors: {
      minGroupSize: "El nombre mínim d'alumnes per equip és {min}.",
      noStudents: 'No hi ha alumnes per formar equips.',
      noTeamsForIncompatibles: 'No es poden marcar persones incompatibles fins que hi hagi equips disponibles.',
      homogeneousMixed: 'Els grups incompatibles han de ser del mateix tipus en mode homogeni.'
    },
    gecoDoi: "GeCo - <a href='https://doi.org/10.5281/zenodo.7934796' target='_blank'>DOI: 10.5281/zenodo.7934796</a>",
    labText: "Laboratori d'aplicacions educatives <a href='https://labia.tiddlyhost.com' target='_blank'>LABIA</a>",
    authorText: "Aplicació feta per <a href='https://bilateria.org' target='_blank'>Juan José de Haro</a>",
    licenseText: "Aquesta obra està sota una llicència <a href='https://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>Creative Commons BY-SA</a>",
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
        groupSingle: "L'equip {team} s'ha quedat amb una sola persona i s'ha integrat en un altre grup.",
        homoMixed: "L'equip {team} barreja tipologies: {types}.",
        incompatibles: "Les persones incompatibles {names} han coincidit a l'equip {team}.",
        randomSize: "L'equip {team} té {size} membres (objectiu {target})."
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
    copySuccess: 'Teams copied to the clipboard',
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
    teamLabel: 'Team {index}',
    incompatiblesGroupLabel: 'Group {index}',
    removeIncompatibleAria: 'Remove incompatible group {index}',
    errors: {
      minGroupSize: 'The minimum number of students per team is {min}.',
      noStudents: 'There are no students to create teams.',
      noTeamsForIncompatibles: 'You cannot mark incompatible people until there are teams available.',
      homogeneousMixed: 'Incompatible groups must contain students of the same type when using homogeneous teams.'
    },
    gecoDoi: "GeCo - <a href='https://doi.org/10.5281/zenodo.7934796' target='_blank'>DOI: 10.5281/zenodo.7934796</a>",
    labText: "Educational Applications Lab <a href='https://labia.tiddlyhost.com' target='_blank'>LABIA</a>",
    authorText: "Application by <a href='https://bilateria.org' target='_blank'>Juan José de Haro</a>",
    licenseText: "This work is licensed under <a href='https://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>Creative Commons BY-SA</a>",
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
        groupSingle: 'Team {team} ended up with a single member and has been merged into another group.',
        homoMixed: 'Team {team} mixes typologies: {types}.',
        incompatibles: 'Incompatible students {names} ended up together in team {team}.',
        randomSize: 'Team {team} has {size} members (target {target}).'
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
    copySuccess: 'Equipos copiados ao portapapeis',
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
    teamLabel: 'Equipo {index}',
    incompatiblesGroupLabel: 'Grupo {index}',
    removeIncompatibleAria: 'Eliminar grupo incompatible {index}',
    errors: {
      minGroupSize: 'O número mínimo de persoas por equipo é {min}.',
      noStudents: 'Non hai persoas para formar equipos.',
      noTeamsForIncompatibles: 'Non se poden marcar incompatibles ata que haxa equipos dispoñibles.',
      homogeneousMixed: 'Os grupos incompatibles deben ser do mesmo tipo cando os equipos son homoxéneos.'
    },
    gecoDoi: "GeCo - <a href='https://doi.org/10.5281/zenodo.7934796' target='_blank'>DOI: 10.5281/zenodo.7934796</a>",
    labText: "Laboratorio de aplicacións educativas <a href='https://labia.tiddlyhost.com' target='_blank'>LABIA</a>",
    authorText: "Aplicación creada por <a href='https://bilateria.org' target='_blank'>Juan José de Haro</a>",
    licenseText: "Esta obra está baixo unha licenza <a href='https://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>Creative Commons BY-SA</a>",
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
        groupSingle: 'O equipo {team} quedou cunha soa persoa e integrouse noutro grupo.',
        homoMixed: 'O equipo {team} mestura tipoloxías: {types}.',
        incompatibles: 'As persoas incompatibles {names} coincidiron no equipo {team}.',
        randomSize: 'O equipo {team} ten {size} membros (obxectivo {target}).'
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
    copySuccess: 'Taldeak arbelean kopiatu dira',
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
    teamLabel: 'Taldea {index}',
    incompatiblesGroupLabel: 'Talde {index}',
    removeIncompatibleAria: 'Ezabatu bateraezinen taldea {index}',
    errors: {
      minGroupSize: 'Talde bakoitzeko gutxieneko kide kopurua {min} da.',
      noStudents: 'Ez dago talderik osatzeko ikaslerik.',
      noTeamsForIncompatibles: 'Bateraezinak markatzeko, lehenik taldeak egon behar dira eskuragarri.',
      homogeneousMixed: 'Bateraezinen taldeek tipologia bereko kideak izan behar dituzte talde homogeneoak sortzean.'
    },
    gecoDoi: "GeCo - <a href='https://doi.org/10.5281/zenodo.7934796' target='_blank'>DOI: 10.5281/zenodo.7934796</a>",
    labText: "Hezkuntza-aplikazioen laborategia <a href='https://labia.tiddlyhost.com' target='_blank'>LABIA</a>",
    authorText: "Aplikazioa <a href='https://bilateria.org' target='_blank'>Juan José de Haro</a>-k egina", 
    licenseText: "Lan hau <a href='https://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>Creative Commons BY-SA</a> lizentziapean dago",
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
        groupSingle: 'Talde {team} kide bakarrarekin geratu da eta beste talde batean txertatu da.',
        homoMixed: 'Talde {team} tipologia desberdinak nahasten ditu: {types}.',
        incompatibles: 'Bateraezinak diren {names} pertsonak talde {team} berean bukatu dute.',
        randomSize: 'Talde {team}k {size} kide ditu (helburua {target}).'
      }
    }
  }
};
