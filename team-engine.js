(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.GecoTeamEngine = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function shuffleArray(array, randomFn) {
    const random = typeof randomFn === 'function' ? randomFn : Math.random;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
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

  function countStudentsByType(grupo) {
    return grupo.reduce((acc, alumno) => {
      acc[alumno.tipo] = (acc[alumno.tipo] || 0) + 1;
      return acc;
    }, { A: 0, B: 0, C: 0 });
  }

  function getAvailableGroups(grupos, numAlumnos) {
    return grupos.filter(grupo => grupo.length < numAlumnos);
  }

  function getMinimumTypeCount(grupos, tipo, numAlumnos) {
    const availableGroups = getAvailableGroups(grupos, numAlumnos);
    if (availableGroups.length === 0) {
      return 0;
    }
    return Math.min(...availableGroups.map(grupo => countStudentsByType(grupo)[tipo]));
  }

  function getMinimumSupportCount(grupos, numAlumnos) {
    const availableGroups = getAvailableGroups(grupos, numAlumnos);
    if (availableGroups.length === 0) {
      return 0;
    }
    return Math.min(...availableGroups.map(grupo => {
      const counts = countStudentsByType(grupo);
      return counts.A + counts.C;
    }));
  }

  function puntuarGrupoParaIncompatible(grupo, alumno, grupos, numAlumnos, mode) {
    if (grupo.length >= numAlumnos) {
      return Number.NEGATIVE_INFINITY;
    }
    let score = (numAlumnos - grupo.length) * 25;
    if (mode === 'heterogeneos') {
      const counts = countStudentsByType(grupo);
      const minTipo = getMinimumTypeCount(grupos, alumno.tipo, numAlumnos);
      const minApoyo = getMinimumSupportCount(grupos, numAlumnos);
      score -= counts[alumno.tipo] * 20;
      if (counts[alumno.tipo] === minTipo) {
        score += 80;
      }
      if ((alumno.tipo === 'A' || alumno.tipo === 'C') && (counts.A + counts.C) === minApoyo) {
        score += 90;
      }
    } else if (mode === 'homogeneos') {
      const counts = countStudentsByType(grupo);
      const mixedPenalty = Object.entries(counts).reduce((acc, [tipo, cantidad]) => {
        if (tipo !== alumno.tipo && cantidad > 0) {
          return acc + cantidad * 25;
        }
        return acc;
      }, 0);
      score -= mixedPenalty;
      score += counts[alumno.tipo] * 15;
    }
    return score;
  }

  function preAsignarIncompatibles(grupos, incompatSets, numAlumnos, mode) {
    if (grupos.length === 0 && incompatSets.length > 0) {
      grupos.push([]);
    }
    const orderedSets = [...incompatSets].sort((a, b) => {
      if (b.length !== a.length) {
        return b.length - a.length;
      }
      const apoyoA = a.filter(alumno => alumno.tipo === 'A' || alumno.tipo === 'C').length;
      const apoyoB = b.filter(alumno => alumno.tipo === 'A' || alumno.tipo === 'C').length;
      return apoyoB - apoyoA;
    });
    orderedSets.forEach(set => {
      const nombresSet = new Set(set.map(alumno => alumno.nombre));
      set.forEach(alumno => {
        let mejorIndice = -1;
        let mejorPuntuacion = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < grupos.length; i++) {
          const grupo = grupos[i];
          const conflicto = grupo.some(miembro => nombresSet.has(miembro.nombre));
          if (conflicto) continue;
          const puntuacion = puntuarGrupoParaIncompatible(grupo, alumno, grupos, numAlumnos, mode);
          if (puntuacion > mejorPuntuacion) {
            mejorPuntuacion = puntuacion;
            mejorIndice = i;
          }
        }
        if (mejorIndice === -1) {
          grupos.push([alumno]);
        } else {
          grupos[mejorIndice].push(alumno);
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

  function puntuarGrupoHeterogeneoParaAlumno(grupo, alumno, grupos, numAlumnos) {
    if (grupo.length >= numAlumnos) {
      return Number.NEGATIVE_INFINITY;
    }
    const counts = countStudentsByType(grupo);
    const minTipo = getMinimumTypeCount(grupos, alumno.tipo, numAlumnos);
    const minApoyo = getMinimumSupportCount(grupos, numAlumnos);
    let score = (numAlumnos - grupo.length) * 30;
    score -= counts[alumno.tipo] * 20;
    if (counts[alumno.tipo] === minTipo) {
      score += 110;
    } else {
      score -= (counts[alumno.tipo] - minTipo) * 35;
    }

    if (alumno.tipo === 'A' || alumno.tipo === 'C') {
      const totalApoyo = counts.A + counts.C;
      if (totalApoyo === minApoyo) {
        score += 120;
      }
      if (totalApoyo === 0) {
        score += 220;
      } else if (counts[alumno.tipo] === 0) {
        score += 110;
      } else {
        score -= totalApoyo * 35;
      }
      if (counts[alumno.tipo] === 0) {
        score += 40;
      }
      if (counts.B > 0) {
        score += 15;
      }
    } else {
      if (counts.A > 0) {
        score += 35;
      } else {
        score -= 30;
      }
      if (counts.C > 0) {
        score += 35;
      } else {
        score -= 30;
      }
      if (counts.B === 0) {
        score += 10;
      }
    }

    return score;
  }

  function asignarAlumnosHeterogeneos(alumnos, grupos, numAlumnos, sobrantes) {
    alumnos.forEach(alumno => {
      let mejorIndice = -1;
      let mejorPuntuacion = Number.NEGATIVE_INFINITY;
      for (let i = 0; i < grupos.length; i++) {
        const puntuacion = puntuarGrupoHeterogeneoParaAlumno(grupos[i], alumno, grupos, numAlumnos);
        if (puntuacion > mejorPuntuacion) {
          mejorPuntuacion = puntuacion;
          mejorIndice = i;
        }
      }
      if (mejorIndice === -1) {
        sobrantes.push(alumno);
        return;
      }
      grupos[mejorIndice].push(alumno);
    });
  }

  function evaluarGrupoHeterogeneo(grupo, numAlumnos) {
    const counts = countStudentsByType(grupo);
    let penalty = 0;

    if (grupo.length === 0) {
      return 100;
    }
    if (grupo.length < numAlumnos) {
      penalty += (numAlumnos - grupo.length) * 4;
    }
    if (counts.A === 0) {
      penalty += 12;
    }
    if (counts.C === 0) {
      penalty += 12;
    }
    if (grupo.length >= 3 && counts.B === 0) {
      penalty += 6;
    }
    if (counts.A > 1) {
      penalty += (counts.A - 1) * 3;
    }
    if (counts.C > 1) {
      penalty += (counts.C - 1) * 3;
    }
    if (counts.B > Math.max(1, grupo.length - 2)) {
      penalty += counts.B - Math.max(1, grupo.length - 2);
    }

    return penalty;
  }

  function optimizarGruposHeterogeneos(grupos, numAlumnos, incompatiblesSet) {
    for (let pass = 0; pass < 4; pass++) {
      let improved = false;
      for (let i = 0; i < grupos.length; i++) {
        for (let j = i + 1; j < grupos.length; j++) {
          const grupoA = grupos[i];
          const grupoB = grupos[j];
          const basePenalty = evaluarGrupoHeterogeneo(grupoA, numAlumnos) + evaluarGrupoHeterogeneo(grupoB, numAlumnos);

          for (let a = 0; a < grupoA.length; a++) {
            if (incompatiblesSet.has(grupoA[a].nombre)) continue;
            for (let b = 0; b < grupoB.length; b++) {
              if (incompatiblesSet.has(grupoB[b].nombre)) continue;
              const alumnoA = grupoA[a];
              const alumnoB = grupoB[b];

              grupoA[a] = alumnoB;
              grupoB[b] = alumnoA;

              const newPenalty = evaluarGrupoHeterogeneo(grupoA, numAlumnos) + evaluarGrupoHeterogeneo(grupoB, numAlumnos);
              if (newPenalty < basePenalty) {
                improved = true;
                break;
              }

              grupoA[a] = alumnoA;
              grupoB[b] = alumnoB;
            }
            if (improved) {
              break;
            }
          }
          if (improved) {
            break;
          }
        }
        if (improved) {
          break;
        }
      }
      if (!improved) {
        break;
      }
    }
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
        const donante = grupos.find(grupo => grupo.length > 2);
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

  function fusionarGruposUnitarios(grupos) {
    for (let i = grupos.length - 1; i >= 0; i--) {
      if (grupos[i].length === 1) {
        const alumno = grupos[i][0];
        grupos.splice(i, 1);
        agregarSobrantesHomogeneos(grupos, [alumno]);
      }
    }
  }

  function generarGruposHeterogeneos(listaA, listaB, listaC, numAlumnos, incompatSets, totalAlumnosOriginal) {
    let numGrupos = Math.floor(totalAlumnosOriginal / numAlumnos);
    if (numGrupos === 0 && totalAlumnosOriginal > 0) {
      numGrupos = 1;
    }
    const grupos = Array.from({ length: numGrupos }, () => []);
    const sobrantes = [];
    preAsignarIncompatibles(grupos, incompatSets, numAlumnos, 'heterogeneos');
    asignarAlumnosHeterogeneos(listaA, grupos, numAlumnos, sobrantes);
    asignarAlumnosHeterogeneos(listaC, grupos, numAlumnos, sobrantes);
    asignarAlumnosHeterogeneos(listaB, grupos, numAlumnos, sobrantes);
    const incompatiblesSet = new Set(incompatSets.flat().map(alumno => alumno.nombre));
    balancearGruposHeterogeneos(grupos, incompatiblesSet);
    optimizarGruposHeterogeneos(grupos, numAlumnos, incompatiblesSet);
    if (grupos.length > numGrupos) {
      const extras = grupos.splice(numGrupos);
      extras.flat().forEach(alumno => sobrantes.push(alumno));
    }
    return { grupos, sobrantes };
  }

  function generarGruposHomogeneos(listaA, listaB, listaC, numAlumnos, incompatSets, opcionSobrantes, totalAlumnosOriginal) {
    let numGrupos = Math.floor(totalAlumnosOriginal / numAlumnos);
    if (numGrupos === 0 && totalAlumnosOriginal > 0) {
      numGrupos = 1;
    }
    const grupos = Array.from({ length: numGrupos }, () => []);
    const sobrantes = [];
    preAsignarIncompatibles(grupos, incompatSets, numAlumnos, 'homogeneos');
    distribuirHomogeneosPorTipo(listaA, grupos, numAlumnos, sobrantes, 'A');
    distribuirHomogeneosPorTipo(listaB, grupos, numAlumnos, sobrantes, 'B');
    distribuirHomogeneosPorTipo(listaC, grupos, numAlumnos, sobrantes, 'C');
    const gruposSobrantes = agruparSobrantesHomogeneos(sobrantes, numAlumnos);
    if (opcionSobrantes === 'agregar') {
      agregarSobrantesHomogeneos(grupos, gruposSobrantes.flat());
      fusionarGruposUnitarios(grupos);
      return { grupos, sobrantes: [] };
    }
    if (gruposSobrantes.length === 1 && gruposSobrantes[0].length === 1 && grupos.length > 0) {
      agregarSobrantesHomogeneos(grupos, gruposSobrantes[0]);
    } else {
      gruposSobrantes.forEach(grupo => grupos.push(grupo));
    }
    fusionarGruposUnitarios(grupos);
    return { grupos, sobrantes: [] };
  }

  function generarGruposEsporadicos(listaRestante, numAlumnos, incompatSets, totalAlumnosOriginal, randomFn) {
    let numGrupos = Math.floor(totalAlumnosOriginal / numAlumnos);
    if (numGrupos === 0 && totalAlumnosOriginal > 0) {
      numGrupos = 1;
    }
    const grupos = Array.from({ length: numGrupos }, () => []);
    const sobrantes = [];
    preAsignarIncompatibles(grupos, incompatSets, numAlumnos, 'default');
    const mezcla = shuffleArray([...listaRestante], randomFn);
    distribuirAlumnosPorGrupo(mezcla, grupos, numAlumnos, sobrantes);
    return { grupos, sobrantes };
  }

  function buildInputMap(listaAlumnosA, listaAlumnosB, listaAlumnosC) {
    return new Map([
      ...listaAlumnosA.map(alumno => [alumno.nombre, alumno]),
      ...listaAlumnosB.map(alumno => [alumno.nombre, alumno]),
      ...listaAlumnosC.map(alumno => [alumno.nombre, alumno])
    ]);
  }

  function buildIncompatibilitySets(incompatibleGroups, mapaAlumnos) {
    return incompatibleGroups
      .map(grupo => grupo.map(nombre => mapaAlumnos.get(nombre)).filter(Boolean))
      .filter(grupo => grupo.length >= 2);
  }

  function generateTeams(options) {
    const {
      grupoA = [],
      grupoB = [],
      grupoC = [],
      numAlumnos,
      tipoGrupo,
      opcionSobrantes,
      incompatibleGroups = [],
      random
    } = options || {};

    let listaAlumnosA = shuffleArray(etiquetarAlumnos(grupoA, 'A'), random);
    let listaAlumnosB = shuffleArray(etiquetarAlumnos(grupoB, 'B'), random);
    let listaAlumnosC = shuffleArray(etiquetarAlumnos(grupoC, 'C'), random);

    const mapaAlumnos = buildInputMap(listaAlumnosA, listaAlumnosB, listaAlumnosC);
    const incompatSets = buildIncompatibilitySets(incompatibleGroups, mapaAlumnos);
    const nombresIncompatibles = new Set(incompatSets.flat().map(alumno => alumno.nombre));

    listaAlumnosA = listaAlumnosA.filter(alumno => !nombresIncompatibles.has(alumno.nombre));
    listaAlumnosB = listaAlumnosB.filter(alumno => !nombresIncompatibles.has(alumno.nombre));
    listaAlumnosC = listaAlumnosC.filter(alumno => !nombresIncompatibles.has(alumno.nombre));

    const totalOriginal = grupoA.length + grupoB.length + grupoC.length;
    let resultado;

    if (tipoGrupo === 'heterogeneos') {
      resultado = generarGruposHeterogeneos(listaAlumnosA, listaAlumnosB, listaAlumnosC, numAlumnos, incompatSets, totalOriginal);
      return {
        teams: manejarSobrantes(resultado.grupos, opcionSobrantes, numAlumnos, resultado.sobrantes),
        incompatSets
      };
    }

    if (tipoGrupo === 'homogeneos') {
      resultado = generarGruposHomogeneos(listaAlumnosA, listaAlumnosB, listaAlumnosC, numAlumnos, incompatSets, opcionSobrantes, totalOriginal);
      return {
        teams: resultado.grupos,
        incompatSets
      };
    }

    const combinados = [...listaAlumnosA, ...listaAlumnosB, ...listaAlumnosC];
    resultado = generarGruposEsporadicos(combinados, numAlumnos, incompatSets, totalOriginal, random);
    return {
      teams: manejarSobrantes(resultado.grupos, opcionSobrantes, numAlumnos, resultado.sobrantes),
      incompatSets
    };
  }

  return {
    calculateMaxGroups,
    countStudentsByType,
    generateTeams,
    shuffleArray
  };
}));
