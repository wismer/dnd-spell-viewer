import { ChangeEventHandler } from 'react';

export type SpellResult = Spell[];

export interface AppDispatchProps {
  queryAdd(input: string): void;
  seedStore(spellsById: SpellStore, lookup: SpellLookup): void;
}

export interface AppProps {
  searchResults?: SpellResult;
}

export interface SpellLookup {
  spell?: number,
  [propName: string]: any
}

export interface SpellStore {
  [prop: number]: Spell
}

export interface QueryState {
  qs: string;
  spells: SpellLookup;
  searchResults: SpellResult;
  spellsById: SpellStore;
  activeLevels: number[];
  activeSchools: School[];
}

export type School = 'Necromancy' | 'Evocation' | 'Divination' | 'Illusion' | 'Conjuration' | 'Transmutation' | 'Enchantment' | 'Abjuration';

export enum SpellComponent {
  Visual = 'V',
  Somatic = 'S',
  Material = 'M'
}

export interface Spell {
  id: number,
  name: string,
  desc: string,
  requiresConcentration: boolean,
  castingTime: string,
  components: SpellComponent[],
  componentsDesc?: string,
  spellRange: string,
  duration: string,
  level: number,
  school: School[]
}

export interface SearchBarProps {
  activeSchools: School[];
  activeLevels: number[];
  toggleSchool(school: School): void;
}
