import { AnyAction } from 'redux';
import { Spell, SpellStore, SpellLookup, School } from './typings';

export const QUERY_ADD = 'QUERY_ADD';
export const QUERY_DEL = 'QUERY_DEL';
export const QUERY_RESULTS = 'QUERY_RESULTS'; 
export const LOAD_SPELLS = 'LOAD_SPELLS';
export const FILTER_SCHOOL_ADD = 'FILTER_SCHOOL_ADD';
export const FILTER_SCHOOL_DEL = 'FILTER_SCHOOL_DEL';
export const FILTER_LEVEL_ADD = 'FILTER_LEVEL_ADD';
export const FILTER_LEVEL_DEL = 'FILTER_LEVEL_DEL';


export function queryAdd(qs: string): AnyAction {
  return {
    qs,
    type: QUERY_ADD
  };
}

export function queryDelete(qs: string): AnyAction {
  return {
    qs,
    type: QUERY_DEL,
  };
}

export function spellResults(spells: [Spell]): AnyAction {
  return {
    spells,
    type: QUERY_RESULTS
  }
}

export function seedStore(spellsById: SpellStore, spells: SpellLookup) {
  return {
    spellsById,
    spells,
    type: LOAD_SPELLS
  }
}

export function toggleSchool(school: School) {
  return {
    school,
    type: FILTER_SCHOOL_ADD
  };
}

export function removeSchool(school: School) {
  return {
    school,
    type: FILTER_SCHOOL_DEL
  };
}
