const test = require('node:test');
const assert = require('node:assert/strict');

const reportEngine = require('../report-engine.js');

const messages = {
  'report.messages.incompatibles': ({ names, team }) => `INC:${names}:${team}`,
  'report.messages.groupCountDifferent': ({ current, expected }) => `COUNT:${current}:${expected}`,
  'report.messages.groupSingle': ({ team }) => `SINGLE:${team}`,
  'report.messages.sizeDifferent': ({ team, size }) => `SIZE:${team}:${size}`,
  'report.messages.heteroNoAC': ({ team }) => `NOAC:${team}`,
  'report.messages.homoMixed': ({ team, types }) => `MIXED:${team}:${types}`,
  'report.messages.randomSize': ({ team, size }) => `RANDOM:${team}:${size}`,
  'report.criteria.leftovers.grupoNuevo': () => 'nuevo',
  'report.criteria.leftovers.agregar': () => 'agregar',
  'report.criteria.items.incompatibles': () => 'crit-incompat',
  'report.criteria.items.teamCount': ({ leftovers }) => `crit-count:${leftovers}`,
  'report.criteria.items.noSingles': () => 'crit-single',
  'report.criteria.items.teamSize': ({ target }) => `crit-size:${target}`,
  'report.criteria.items.randomSize': ({ target }) => `crit-random:${target}`,
  'report.criteria.items.heterogeneousBalance': () => 'crit-hetero',
  'report.criteria.items.homogeneousSimilarity': () => 'crit-homo'
};

function t(key, params = {}) {
  const value = messages[key];
  if (typeof value === 'function') {
    return value(params);
  }
  return value || key;
}

test('analyzeTeams returns fail when incompatible students end up together', () => {
  const analysis = reportEngine.analyzeTeams({
    equipos: [[{ nombre: 'Ana', tipo: 'A' }, { nombre: 'Luis', tipo: 'B' }]],
    tipoGrupo: 'heterogeneos',
    numAlumnos: 2,
    opcionSobrantes: 'grupoNuevo',
    incompatibleGroups: [['Ana', 'Luis']],
    translate: t
  });

  assert.equal(analysis.status, 'fail');
  assert.ok(analysis.messages.includes('INC:Ana, Luis:1'));
});

test('analyzeTeams returns partial for homogeneous mixed typologies', () => {
  const analysis = reportEngine.analyzeTeams({
    equipos: [[{ nombre: 'Ana', tipo: 'A' }, { nombre: 'Luis', tipo: 'B' }]],
    tipoGrupo: 'homogeneos',
    numAlumnos: 2,
    opcionSobrantes: 'grupoNuevo',
    incompatibleGroups: [],
    translate: t
  });

  assert.equal(analysis.status, 'partial');
  assert.ok(analysis.messages.includes('MIXED:1:A, B'));
});

test('analyzeTeams returns ok when teams satisfy expected constraints', () => {
  const analysis = reportEngine.analyzeTeams({
    equipos: [
      [{ nombre: 'Ana', tipo: 'A' }, { nombre: 'Luis', tipo: 'B' }, { nombre: 'Marta', tipo: 'C' }],
      [{ nombre: 'Pau', tipo: 'A' }, { nombre: 'Noa', tipo: 'B' }, { nombre: 'Iris', tipo: 'C' }]
    ],
    tipoGrupo: 'heterogeneos',
    numAlumnos: 3,
    opcionSobrantes: 'agregar',
    incompatibleGroups: [['Ana', 'Pau']],
    translate: t
  });

  assert.equal(analysis.status, 'ok');
  assert.deepEqual(analysis.messages, []);
});

test('buildReportCriteria adapts criteria to mode', () => {
  const hetero = reportEngine.buildReportCriteria({
    tipoGrupo: 'heterogeneos',
    numAlumnos: 4,
    opcionSobrantes: 'grupoNuevo',
    translate: t
  });
  const random = reportEngine.buildReportCriteria({
    tipoGrupo: 'esporadicos',
    numAlumnos: 3,
    opcionSobrantes: 'agregar',
    translate: t
  });

  assert.deepEqual(hetero, [
    'crit-incompat',
    'crit-count:nuevo',
    'crit-single',
    'crit-size:4',
    'crit-hetero'
  ]);
  assert.deepEqual(random, [
    'crit-incompat',
    'crit-count:agregar',
    'crit-single',
    'crit-random:3'
  ]);
});

test('analyzeTeams warns when random team sizes drift too far from target', () => {
  const analysis = reportEngine.analyzeTeams({
    equipos: [
      [{ nombre: 'Ana', tipo: 'A' }, { nombre: 'Luis', tipo: 'B' }, { nombre: 'Marta', tipo: 'C' }, { nombre: 'Noa', tipo: 'B' }],
      [{ nombre: 'Pau', tipo: 'A' }]
    ],
    tipoGrupo: 'esporadicos',
    numAlumnos: 2,
    opcionSobrantes: 'grupoNuevo',
    incompatibleGroups: [],
    translate: t
  });

  assert.equal(analysis.status, 'partial');
  assert.ok(analysis.messages.includes('RANDOM:1:4'));
  assert.ok(analysis.messages.includes('SINGLE:2'));
});
