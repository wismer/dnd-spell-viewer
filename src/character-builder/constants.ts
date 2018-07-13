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

export const RACE_TOC: string[] = ALL_RACES.map((race: Race) => race.name);

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

export const ALL_SKILLS = [
  {
    name: 'Acrobatics',
    relatedAttribute: 'dexterity',
    description: 
    `
      Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. The DM might also call for a Dexterity (Acrobatics) check to see if you can perform acrobatic stunts, including dives, rolls, somersaults, and flips.
    `
  },
  {
    name: 'Animal Handling',
    relatedAttribute: 'wisdom',
    description:
    `
      When there is any question whether you can calm down a domesticated animal,
      keep a mount from getting spooked, or intuit an animal’s intentions, the DM
      might call for a Wisdom (Animal Handling) check. You also make a Wisdom (Animal Handling)
      check to control your mount when you attempt a risky maneuver.
    `
  },
  {
    name: 'Arcana',
    relatedAttribute: 'intelligence',
    description:
    `
      Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.
    `
  },
  {
    name: 'Athletics',
    relatedAttribute: 'strength',
    description:
    `
      Your Strength (Athletics) check covers difficult situations you encounter while climbing,
      jumping, or swimming. Examples include the following activities:
      Other Strength Checks.
    `,
    addendum: 'The DM might also call for a Strength check when you try to accomplish tasks like the following:',
    addendumItems: [
      'You attempt to climb a sheer or slippery cliff, avoid hazards while scaling a wall, or cling to a surface while something is trying to knock you off.',
      'You try to jump an unusually long distance or pull off a stunt midjump.',
      'You struggle to swim or stay afloat in treacherous cur­ rents, storm-tossed waves, or areas of thick seaweed. Or another creature tries to push or pull you underwa­ter or otherwise interfere with your swimming.'
    ],
    other: 'You struggle to swim or stay afloat in treacherous cur­rents, storm-tossed waves, or areas of thick seaweed. Or another creature tries to push or pull you underwa­ter or otherwise interfere with your swimming.'
  },
  {
    name: 'Deception',
    relatedAttribute: 'charisma',
    description:
    `
      Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies. Typical situations include trying to fast-talk a guard, con a merchant, earn money through gambling, pass yourself off in a disguise, dull someone’s suspicions with false assurances, or maintain a straight face while telling
      a blatant lie.
    `
  },
  {
    name: 'History',
    relatedAttribute: 'intelligence',
    description:
    `
      Your Intelligence (History) check measures your ability to recall lore about historical events,
      legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.
    `
  },
  {
    name: 'Insight',
    relatedAttribute: 'wisdom',
    description:
    ``
  },
  {
    name: 'Intimidation',
    relatedAttribute: 'strength',
    description:
    ``
  },
  {
    name: 'Investigation',
    relatedAttribute: 'intelligence',
    description:
    ``
  },
  {
    name: 'Medicine',
    relatedAttribute: 'wisdom',
    description:
    ``
  },
  {
    name: 'Nature',
    relatedAttribute: 'wisdom',
    description:
    ``
  },
  {
    name: 'Perception',
    relatedAttribute: 'wisdom',
    description:
    ``
  },
  {
    name: 'Performance',
    relatedAttribute: 'charisma',
    description:
    ``
  },
  {
    name: 'Persuasion',
    relatedAttribute: 'charisma',
    description:
    ``
  },
  {
    name: 'Religion',
    relatedAttribute: 'intelligence',
    description:
    ``
  },
  {
    name: 'Sleight of Hand',
    relatedAttribute: 'dexterity',
    description:
    `
      Whenever you attempt an act of legerdemain or manual trickery,
      such as planting something on someone else or concealing an object on your person,
      make a Dexterity (Sleight of Hand) check. The DM might also call for a Dexterity (Sleight of Hand)
      check to determine whether you can lift a coin purse off another person or slip something out of another person’s pocket.
    `
  },
  {
    name: 'Stealth',
    relatedAttribute: 'dexterity',
    description:
    ``
  },
  {
    name: 'Survival',
    relatedAttribute: 'wisdom',
    description:
    ``
  }
];