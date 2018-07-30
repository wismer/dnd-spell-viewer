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

export interface CharacterAbilityScore {
  short: string;
  full: string;
  value: number;
  modifier: number;
}

interface BaseClass {
  name: string;
  bonusSkills?: SkillName[];
}

export interface PrimaryClass extends BaseClass {
  skillAllowance: number;
  savingThrows: AbilityName[];
  subClassIDs: number[];
}

export interface SubClass extends BaseClass {
  parentClass: PrimaryClassChoice;
  bonusProficiencies: string[];
  id: number;
  levelRequirement: number;
}


export interface CharacterBuildState {
  // primaryClass: PrimaryClass;
  // secondaryClass: SecondaryClass;
  alignment: Alignment,
  characterName: string;
  abilityScores: CharacterAbilityScore[];
  proficiencies: string[];
  race: Race | null;
  skills: Skill[];
  availablePoints: number;
  activeAbility: AbilityName | null;
  currentClass: PrimaryClass | null;
  currentSubClass: SubClass | null;
  activeSpotlight: string | null;
  level: number;
}

type FaerunRaces = 'Elf' | 'Dwarf' | 'Tiefling' | 'Gnome' | 'Halfling';

export interface Race<T = number> {
  name: string;
  abilityScores: T[];
  subraceOf: null | FaerunRaces;
  isPlayable: boolean;
  summary: string;
  bonusSkills: SkillName[];
}

interface GameProperty<T> {
  name: T;
  description?: string;
}

interface BaseSkill extends GameProperty<SkillName> {
  relatedAbility: AbilityName;
}

export interface Skill extends BaseSkill {
  relatedAbility: AbilityName;
  isProficient: boolean;
  value: number;
}

export interface SkillInfo extends BaseSkill {
  addendum?: string;
  addendumItems?: string[];
  other?: string;
}

export interface AlignmentInfo extends GameProperty<Alignment> {}

export interface Weapon {
  name: string;
  damageType: 'bludgeoning' | 'slashing' | 'piercing';
  damage: Die;
  properties: WeaponProperty[];
  isMartialWeapon: boolean;
  isRanged: boolean;
  range?: number[];
  versatileDamage?: Die;
  cost?: number;
}

export interface Armor {
  name: string;
  armorClass: number;
  strengthReq: number;
  armorType: 'light' | 'medium' | 'heavy';
  hasDexterityBonus: boolean;
  stealthDisadvantage: boolean;
  maxBonus?: number;
}

export interface ItemProperty {
  name: string;
  description: string;
  weight?: number;
}

export interface WeaponProperty extends ItemProperty {}

export interface Die {
  die: 4 | 6 | 8 | 10 | 12 | 20;
  count: number;
}

export type PrimaryClassChoice = 'Fighter' | 'Paladin' | 'Wizard' | 'Sorcerer' | 'Ranger' | 'Bard' | 'Druid' | 'Thief' | 'Monk' | 'Cleric';
export type AbilityName = 'dexterity' | 'strength' | 'intelligence' | 'charisma' | 'wisdom' | 'constitution';
export type SkillName = 'Investigation' | 'History' | 'Perception' | 'Intimidation' | 'Arcana' | 'Acrobatics' | 'Medicine' | 'Insight' | 'Persuasion' | 'Religion' | 'Athletics' | 'Sleight of Hand' | 'Stealth' | 'Nature' | 'Animal Handling' | 'Survival' | 'Deception' | 'Performance'
export type ArmorClass = 'light' | 'medium' | 'heavy';
export type Alignment = 'Lawful Good' | 'Neutral Good' | 'Chaotic Good' | 'Lawful Neutral' | 'Chaotic Neutral' | 'Neutral (undecided)' | 'Lawful Evil' | 'Chaotic Evil' | 'Neutral Evil';

// REACT COMPONENT TYPES


export interface TOCButtonProps {
  label: string;
  expanded: boolean;
}

export interface TOCCategory {
  label: string;
  subItems: TOCCategory[];
}

export interface TOCProps {
  categories: TOCCategory[];
  skillNames: SkillName[];
  activeSpotlight: string | null;
}

export interface TOCDispatch {
  changeSpotlight(className: string): void;
}

// React Router Types

export interface RouteType {
  path: string;
  component: React.ComponentClass;
  exact?: boolean;
  routes?: RouteType[];
}

export interface RaceRoute {
  path: string;
  component: React.ComponentClass;
}