const test = require('node:test');
const assert = require('node:assert/strict');

const engine = require('../team-engine.js');

function namesOf(teams) {
  return teams.flat().map(student => student.nombre).sort();
}

function teamContaining(teams, name) {
  return teams.find(team => team.some(student => student.nombre === name));
}

test('calculateMaxGroups respects leftover mode', () => {
  assert.equal(engine.calculateMaxGroups(10, 4, 'grupoNuevo'), 3);
  assert.equal(engine.calculateMaxGroups(10, 4, 'agregar'), 2);
  assert.equal(engine.calculateMaxGroups(3, 4, 'grupoNuevo'), 1);
});

test('heterogeneous generation preserves all students and separates incompatibles', () => {
  const teams = engine.generateTeams({
    grupoA: ['A1', 'A2'],
    grupoB: ['B1', 'B2', 'B3', 'B4'],
    grupoC: ['C1', 'C2'],
    numAlumnos: 4,
    tipoGrupo: 'heterogeneos',
    opcionSobrantes: 'grupoNuevo',
    incompatibleGroups: [['A1', 'B1']],
    random: () => 0
  }).teams;

  assert.deepEqual(namesOf(teams), ['A1', 'A2', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2']);
  const teamA1 = teamContaining(teams, 'A1');
  assert.ok(teamA1);
  assert.equal(teamA1.some(student => student.nombre === 'B1'), false);
});

test('homogeneous generation avoids single-member teams when adding leftovers', () => {
  const teams = engine.generateTeams({
    grupoA: ['A1', 'A2', 'A3'],
    grupoB: ['B1', 'B2', 'B3'],
    grupoC: ['C1'],
    numAlumnos: 2,
    tipoGrupo: 'homogeneos',
    opcionSobrantes: 'agregar',
    incompatibleGroups: [],
    random: () => 0
  }).teams;

  assert.deepEqual(namesOf(teams), ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1']);
  assert.equal(teams.some(team => team.length === 1), false);
});

test('sporadic generation preserves all students and keeps incompatible groups apart', () => {
  const teams = engine.generateTeams({
    grupoA: ['A1'],
    grupoB: ['B1', 'B2', 'B3'],
    grupoC: ['C1', 'C2'],
    numAlumnos: 3,
    tipoGrupo: 'esporadicos',
    opcionSobrantes: 'agregar',
    incompatibleGroups: [['B1', 'C1']],
    random: () => 0
  }).teams;

  assert.deepEqual(namesOf(teams), ['A1', 'B1', 'B2', 'B3', 'C1', 'C2']);
  const teamB1 = teamContaining(teams, 'B1');
  assert.ok(teamB1);
  assert.equal(teamB1.some(student => student.nombre === 'C1'), false);
});

test('grupoNuevo keeps leftovers in a separate team when division is not exact', () => {
  const teams = engine.generateTeams({
    grupoA: ['A1'],
    grupoB: ['B1', 'B2', 'B3'],
    grupoC: ['C1'],
    numAlumnos: 2,
    tipoGrupo: 'heterogeneos',
    opcionSobrantes: 'grupoNuevo',
    incompatibleGroups: [],
    random: () => 0
  }).teams;

  assert.deepEqual(teams.map(team => team.length), [2, 2, 1]);
});

test('heterogeneous generation still preserves all students when A or C are scarce', () => {
  const teams = engine.generateTeams({
    grupoA: ['A1'],
    grupoB: ['B1', 'B2', 'B3', 'B4', 'B5'],
    grupoC: [],
    numAlumnos: 2,
    tipoGrupo: 'heterogeneos',
    opcionSobrantes: 'agregar',
    incompatibleGroups: [],
    random: () => 0
  }).teams;

  assert.deepEqual(namesOf(teams), ['A1', 'B1', 'B2', 'B3', 'B4', 'B5']);
  assert.equal(teams.length, 3);
});
