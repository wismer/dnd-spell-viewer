import { AnyAction } from 'redux';
import { QueryState, SpellLookup, Spell, SpellStore } from './typings';
import { QUERY_ADD, QUERY_DEL, LOAD_SPELLS, FILTER_SCHOOL_ADD } from './actions';


export function insertSpell(spell: Spell, root: SpellLookup): SpellLookup {
  let current: SpellLookup = root;
  for (const char of spell.name.toLowerCase()) {
    const level = current[char];
    if (typeof level === 'undefined') {
      current = current[char] = {};
    } else {
      current = current[char];
    }
  }
  
  current.spell = spell.id;

  return root;
}

export function gatherSpellsFromQuery(state: QueryState, qs: string): QueryState {
  const { spellsById, spells } = state;
  const searchResults: number[] = [];
  let node = spells;
  for (const char of qs.toLowerCase()) {
    node = node[char];
    if (typeof node === 'undefined') { // gather downwards
      return Object.assign(state, { qs, searchResults: [] });
    }
  }

  const results = getEmAll(node, searchResults, spellsById).map(id => spellsById[id]);
  console.log(results.length);
  return Object.assign({}, state, { qs, searchResults: results });
}

function getEmAll(node: SpellLookup, spellsSoFar: number[], spellsById: SpellStore): number[] {
  if (Object.keys(node).length === 1 && node.spell) {
    spellsSoFar.push(node.spell);
    return spellsSoFar;
  }

  for (const key of Object.keys(node)) {    
    if (node.spell) {
      spellsSoFar.push(node.spell);
    }

    if (key !== 'spell') {
      spellsSoFar = getEmAll(node[key], spellsSoFar, spellsById);
    }
  }
  
  return spellsSoFar;
}

const initialState: QueryState = {
  qs: '',
  spells: {} as SpellLookup,
  spellsById: {} as SpellStore,
  searchResults: [],
  activeLevels: [],
  activeSchools: []
};



export function spellSearcher(state: QueryState, action: AnyAction): QueryState {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case QUERY_ADD:
      return gatherSpellsFromQuery(state, action.qs);
    case QUERY_DEL:
      return gatherSpellsFromQuery(state, action.qs);
    case LOAD_SPELLS:
      return Object.assign(state, { spellsById: action.spellsById, spells: action.spells });
    case FILTER_SCHOOL_ADD:
      return state;
    default:
      return state;
  }
}