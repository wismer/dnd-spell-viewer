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

export interface AppState {
  spellSearcher: QueryState;
  characterBuilder: CharacterBuildState;
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


export interface Character {
  name: string;
  level: number;
  role: string;
  player: string;
}

export interface CharacterAttributes {
  strength: number;
  wisdom: number;
  intelligence: number;
  charisma: number;
  constitution: number;
  dexterity: number;  
}

export interface CharacterAttribute {
  short: string;
  full: string;
  value: number;
  modifier: number;
}

interface BaseClass {
  name: string;
  bonusSkills: SkillName[];
  armorClass: ArmorClass[];
}

export interface Armor {
  name: string;
  category: ArmorClass;
  value: number;
}

export interface PrimaryClass extends BaseClass {
  skillAllowance: number;
  savingThrows: AttributeName[];
  subClassIDs: number[];
}

export interface SubClass extends BaseClass {
  parentClass: PrimaryClassChoice;
  id: number;
}

export interface CharacterBuildState {
  // primaryClass: PrimaryClass;
  // secondaryClass: SecondaryClass;
  attributes: CharacterAttribute[];
  race: Race | null;
  skills: Skill[];
  availablePoints: number;
  activeAttribute: AttributeName | null;
  currentClass: PrimaryClass | null;
  currentSubClass: SubClass | null;
}

type FaerunRaces = 'Elf' | 'Dwarf' | 'Tiefling' | 'Gnome' | 'Halfling';

export interface Race {
  name: string;
  attributes: number[];
  subraceOf: null | FaerunRaces;
}

export interface Skill {
  name: SkillName;
  relatedAttribute: AttributeName;
  isProficient: boolean;
  value: number;
}

export type PrimaryClassChoice = 'Fighter' | 'Paladin' | 'Wizard' | 'Sorcerer' | 'Ranger' | 'Bard' | 'Druid' | 'Thief' | 'Monk' | 'Cleric';
// export type PrimaryClassChoices = Fighter | Paladin | Wizard | Sorcerer | Ranger | Bard | Druid | Thief | Monk;
export type AttributeName = 'dexterity' | 'strength' | 'intelligence' | 'charisma' | 'wisdom' | 'constitution';
export type SkillName = 'Investigation' | 'History' | 'Perception' | 'Intimidation' | 'Arcana' | 'Acrobatics' | 'Medicine' | 'Insight' | 'Persuasion' | 'Religion';
export type ArmorClass = 'light' | 'medium' | 'heavy';