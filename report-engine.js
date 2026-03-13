(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.GecoReportEngine = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function analyzeTeams(options) {
    const {
      equipos = [],
      tipoGrupo,
      numAlumnos,
      opcionSobrantes,
      incompatibleGroups = [],
      translate
    } = options || {};

    const t = typeof translate === 'function' ? translate : (key) => key;
    const analysis = {
      status: 'ok',
      messages: []
    };

    const registrar = (nivel, clave, parametros) => {
      analysis.messages.push(t(`report.messages.${clave}`, parametros || {}));
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

  function buildReportCriteria(options) {
    const {
      tipoGrupo,
      numAlumnos,
      opcionSobrantes,
      translate
    } = options || {};

    const t = typeof translate === 'function' ? translate : (key) => key;
    const items = [
      t('report.criteria.items.incompatibles'),
      t('report.criteria.items.teamCount', { leftovers: t(`report.criteria.leftovers.${opcionSobrantes}`) }),
      t('report.criteria.items.noSingles')
    ];

    if (tipoGrupo === 'esporadicos') {
      items.push(t('report.criteria.items.randomSize', { target: numAlumnos }));
    } else {
      items.push(t('report.criteria.items.teamSize', { target: numAlumnos }));
    }

    if (tipoGrupo === 'heterogeneos') {
      items.push(t('report.criteria.items.heterogeneousBalance'));
    } else if (tipoGrupo === 'homogeneos') {
      items.push(t('report.criteria.items.homogeneousSimilarity'));
    }

    return items;
  }

  return {
    analyzeTeams,
    buildReportCriteria
  };
}));
