import { Race, Armor, PrimaryClass, Skill, SubClass } from '../typings';


export const ALL_RACES: Race[] = [
  {
    name: 'Hill Dwarf',
    attributes: [0, 1, 0, 0, 2, 0],
    subraceOf: 'Dwarf'
  },
  {
    name: 'Mountain Dwarf',
    attributes: [2, 1, 0, 0, 0, 0],
    subraceOf: 'Dwarf'
  },
  {
    name: 'Wood Elf',
    attributes: [0, 1, 0, 0, 0, 2],
    subraceOf: 'Elf'
  },
  {
    name: 'High Elf',
    attributes: [0, 0, 1, 0, 0, 2],
    subraceOf: 'Elf'
  }
];


export const SAMPLE_ARMOR: Armor[] = [
  { name: 'Ringmail', value: 14, category: 'medium' },
  { name: 'Scale Mail', value: 16, category: 'heavy' },
  { name: 'Leather', value: 11, category: 'light' },
  { name: 'Padded Leather', value: 12, category: 'light' }
];

export const SKILLS: Skill[] = [
  { name: 'Investigation', relatedAttribute: 'intelligence', value: 0, isProficient: false },
  { name: 'History', relatedAttribute: 'intelligence', value: 0, isProficient: false },
  { name: 'Perception', relatedAttribute: 'wisdom', value: 0, isProficient: false },
  { name: 'Intimidation', relatedAttribute: 'strength', value: 0, isProficient: false },
  { name: 'Arcana', relatedAttribute: 'intelligence', value: 0, isProficient: false },
  { name: 'Acrobatics', relatedAttribute: 'dexterity', value: 0, isProficient: false }
];

export const CHARACTER_CLASSES: PrimaryClass[] = [
  {
    name: 'Cleric',
    bonusSkills: ['Perception', 'History', 'Insight', 'Medicine', 'Persuasion', 'Religion'],
    skillAllowance: 2,
    armorClass: ['light', 'medium'],
    savingThrows: ['wisdom', 'charisma'],
    subClassIDs: [1, 2, 3, 4]
  }
]

export const SUBCLASSES: SubClass[] = [
  {
    id: 1,
    parentClass: 'Cleric',
    name: 'Life',
    armorClass: ['light', 'medium'],
    bonusSkills: []
  },
  {
    id: 2,
    parentClass: 'Cleric',
    name: 'War',
    armorClass: ['light', 'medium', 'heavy'],
    bonusSkills: []
  },
  {
    id: 3,
    parentClass: 'Cleric',
    name: 'Knowledge',
    armorClass: ['light', 'medium'],
    bonusSkills: []
  },
  {
    id: 4,
    parentClass: 'Cleric',
    name: 'Nature',
    armorClass: ['light', 'medium'],
    bonusSkills: []
  }
];