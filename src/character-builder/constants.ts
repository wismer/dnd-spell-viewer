import {
  Race,
  Armor,
  PrimaryClass,
  SubClass,
  SkillName,
  Weapon,
  WeaponProperty,
  SkillInfo,
} from '../typings';


export const FINESSE: WeaponProperty = {
  name: 'Finesse',
  description: `
    When Making an Attack with a finesse weapon, you use your choice of your Strength or Dexterity
    modifier for the Attack and Damage Rolls. You must use the same modifier for both rolls.
  `
};

export const VERSATILE: WeaponProperty = {
  name: 'Versatile',
  description: `
    This weapon can be used with one or two hands. A damage value in parentheses appears with the
    property—the damage when the weapon is used with two hands to make a melee Attack.
  `
};

export const SILVERED: WeaponProperty = {
  name: 'Silvered',
  description: `
    Some Monsters that have immunity or Resistance to nonmagical Weapons are susceptible to silver Weapons,
    so cautious adventurers invest extra coin to plate their Weapons with silver. You can silver a single
    weapon or ten pieces of Ammunition for 100 gp. This cost represents not only the price of the silver,
    but the time and expertise needed to add silver to the weapon without making it less effective.
  `
};

export const LIGHT: WeaponProperty = {
  name: 'Light',
  description: `
    A light weapon is small and easy to handle, making it ideal for use when fighting with two Weapons.
  `
};

export const HEAVY: WeaponProperty = {
  name: 'Heavy',
  description: `
    Small creatures have disadvantage on Attack rolls with heavy Weapons. A heavy weapon’s size and bulk make it too large for a Small creature to use effectively.
  `
};

export const AMMUNITION: WeaponProperty = {
  name: 'Ammunition',
  description: `
    You can use a weapon that has the Ammunition property to make a ranged Attack only if you have Ammunition to fire
    from the weapon. Each time you Attack with the weapon, you expend one piece of Ammunition. Drawing the Ammunition
    from a Quiver, case, or other container is part of the Attack (you need a free hand to load a one-handed weapon).
    At the end of the battle, you can recover half your expended Ammunition by taking a minute to Search the battlefield.
    If you use a weapon that has the Ammunition property to make a melee Attack, you treat the weapon as an Improvised
    Weapon (see “Improvised Weapons” later in the section). A sling must be loaded to deal any damage when used in this way.
  `
};

export const LOADING: WeaponProperty = {
  name: 'Loading',
  description: `
    Because of the time required to load this weapon, you can fire only one piece of Ammunition from it when you use an action,
    Bonus Action, or reaction to fire it, regardless of the number of attacks you can normally make.
  `
};

export const RANGE: WeaponProperty = {
  name: 'Range',
  description: `
    A weapon that can be used to make a ranged Attack has a range in parentheses after the Ammunition or thrown property.
    The range lists two numbers. The first is the weapon’s normal range in feet, and the second indicates the weapon’s long
    range. When attacking a target beyond normal range, you have disadvantage on the Attack roll. You can’t Attack a target
    beyond the weapon’s long range.
  `
};

export const REACH: WeaponProperty = {
  name: 'Reach',
  description: `
    This weapon adds 5 feet to your reach when you Attack with it, as well as when determining your reach for Opportunity Attacks with it.
  `
};

export const TWO_HANDED: WeaponProperty = {
  name: 'Two-Handed',
  description: `This weapon requires two hands when you Attack with it.`
};

export const THROWN: WeaponProperty = {
  name: 'Thrown',
  description: `
    If a weapon has the thrown property, you can throw the weapon to make a ranged Attack.
    If the weapon is a melee weapon, you use the same ability modifier for that Attack roll
    and damage roll that you would use for a melee Attack with the weapon. For example, if you
    throw a Handaxe, you use your Strength, but if you throw a Dagger, you can use either your
    Strength or your Dexterity, since the Dagger has the finesse property.
  `
};

export const ALL_RACES: Race[] = [
  {
    name: 'Dwarf',
    abilityScores: [] as number[],
    subraceOf: null,
    summary: `
      Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.
      Though they stand well under 5 feet tall, dwarves are so broad and compact that they can weigh as much as a human standing nearly two feet taller.
      Their courage and endurance are also easily a match for any of the larger folk. Dwarven skin ranges from deep brown to a paler
      hue tinged with red, but the most common shades are light brown or deep tan, like certain tones of earth.
      Their hair, worn long but in simple styles, is usually black, gray, or brown, though paler dwarves often have red hair.
      Male dwarves value their beards highly and groom them carefully.`,
    bonusSkills: [] as SkillName[],
    isPlayable: false
  },

  {
    name: 'Hill Dwarf',
    abilityScores: [0, 1, 0, 0, 2, 0],
    subraceOf: 'Dwarf',
    summary: '',
    bonusSkills: [] as SkillName[],
    isPlayable: true
  },
  {
    name: 'Mountain Dwarf',
    abilityScores: [2, 1, 0, 0, 0, 0],
    subraceOf: 'Dwarf',
    summary: '',
    bonusSkills: [] as SkillName[],
    isPlayable: true,
  },

  {
    name: 'Elf',
    abilityScores: [] as number[],
    subraceOf: null,
    summary: `
      Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.
      They live in places of ethereal beauty, in the midst of ancient forests or in silvery spires glittering with faerie light,
      where soft music drifts through the air and gentle fragrances waft on the breeze.
      Elves love nature and magic, art and artistry, music and poetry, and the good things
      of the world.
      `,
    bonusSkills: [] as SkillName[],
    isPlayable: false
  },
  {
    name: 'Wood Elf',
    abilityScores: [0, 1, 0, 0, 0, 2],
    subraceOf: 'Elf',
    summary: `
      As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly and stealthily
      through your native forests. This category includes the wild elves (grugach) of Greyhawk and the Kagonesti of Dragonlance,
      as well as the races called wood elves in Greyhawk and the Forgotten Realms. In Faerun, wood elves (also called wild elves,
      green elves, or forest elves) are reclusive and distrusting of non-elves.
      `,
    isPlayable: true,
    bonusSkills: ['Perception']
  },
  {
    name: 'High Elf',
    abilityScores: [0, 0, 1, 0, 0, 2],
    subraceOf: 'Elf',
    summary: `
      As a high elf, you have a keen mind and a mastery of at least the basics of magic. In many of the worlds
      of D&D, there are two kinds of high elves. One type (which includes the gray elves and valley elves of Greyhawk,
      the Silvanesti of Dragonlance, and the sun elves of the Forgotten Realms) is haughty and reclusive, believing
      themselves to be superior to non-elves and even other elves. The other type (including the high elves of Greyhawk,
      the Qualinesti of Dragonlance, and the moon elves of the Forgotten Realms) are more common
      and more friendly, and often encountered among humans and other races.`,
    isPlayable: true,
    bonusSkills: ['Perception']
  }
];

export const RACE_TOC: string[] = ALL_RACES.map((race: Race) => race.name);

export const SAMPLE_ARMOR: Armor[] = [
  {
    name: 'Ringmail',
    armorClass: 14,
    armorType: 'heavy',
    hasDexterityBonus: false,
    stealthDisadvantage: true,
    strengthReq: 0
  },
  {
    name: 'Scale Mail',
    armorClass: 14,
    hasDexterityBonus: true,
    maxBonus: 2,
    stealthDisadvantage: true,
    strengthReq: 0,
    armorType: 'medium'
  },
  {
    name: 'Leather',
    armorClass: 11,
    hasDexterityBonus: true,
    stealthDisadvantage: false,
    strengthReq: 0,
    armorType: 'light'
  },
  {
    name: 'Padded Leather',
    stealthDisadvantage: true,
    armorClass: 11,
    armorType: 'light',
    hasDexterityBonus: true,
    strengthReq: 0
  }
];

export const CHARACTER_CLASSES: PrimaryClass[] = [
  {
    name: 'Cleric',
    bonusSkills: ['Perception', 'History', 'Insight', 'Medicine', 'Persuasion', 'Religion'],
    skillAllowance: 2,
    savingThrows: ['wisdom', 'charisma'],
    subClassIDs: [1, 2, 3, 4]
  },

  {
    name: 'Druid',
    skillAllowance: 2,
    bonusSkills: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'],
    savingThrows: ['intelligence', 'wisdom'],
    subClassIDs: []
  },

  {
    name: 'Thief',
    bonusSkills: [],
    skillAllowance: 2,
    savingThrows: ['dexterity', 'charisma'],
    subClassIDs: []
  },
  {
    name: 'Thief',
    bonusSkills: [],
    skillAllowance: 2,
    savingThrows: ['dexterity', 'charisma'],
    subClassIDs: []
  },
  {
    name: 'Thief',
    bonusSkills: [],
    skillAllowance: 2,
    savingThrows: ['dexterity', 'charisma'],
    subClassIDs: []
  },
  {
    name: 'Thief',
    bonusSkills: [],
    skillAllowance: 2,
    savingThrows: ['dexterity', 'charisma'],
    subClassIDs: []
  },
  {
    name: 'Thief',
    bonusSkills: [],
    skillAllowance: 2,
    savingThrows: ['dexterity', 'charisma'],
    subClassIDs: []
  },
]

export const SUBCLASSES: SubClass[] = [
  {
    id: 1,
    parentClass: 'Cleric',
    name: 'Life',
    bonusProficiencies: ['light', 'medium', 'heavy', 'simple'],
    bonusSkills: [],
    levelRequirement: 1,
  },
  {
    id: 2,
    parentClass: 'Cleric',
    name: 'War',
    bonusProficiencies: ['light', 'medium', 'heavy', 'simple', 'martial'],
    bonusSkills: [],
    levelRequirement: 1,
  },
  {
    id: 3,
    parentClass: 'Cleric',
    name: 'Knowledge',
    bonusProficiencies: ['light', 'medium'],
    bonusSkills: [],
    levelRequirement: 1,
  },
  {
    id: 4,
    parentClass: 'Cleric',
    name: 'Nature',
    bonusProficiencies: ['light', 'medium'],
    bonusSkills: [],
    levelRequirement: 1,
  },
  {
    id: 5,
    parentClass: 'Druid',
    name: 'Circle of the Land',
    bonusProficiencies: [],
    bonusSkills: [],
    levelRequirement: 2,
  },
  {
    id: 6,
    parentClass: 'Druid',
    name: 'Circle of the Moon',
    bonusProficiencies: [],
    bonusSkills: [],
    levelRequirement: 2,
  }
];

export const ALL_SKILLS: SkillInfo[] = [
  {
    name: 'Acrobatics',
    relatedAbility: 'dexterity',
    description: 
    `
      Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. The DM might also call for a Dexterity (Acrobatics) check to see if you can perform acrobatic stunts, including dives, rolls, somersaults, and flips.
    `
  },
  {
    name: 'Animal Handling',
    relatedAbility: 'wisdom',
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
    relatedAbility: 'intelligence',
    description:
    `
      Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.
    `
  },
  {
    name: 'Athletics',
    relatedAbility: 'strength',
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
    relatedAbility: 'charisma',
    description:
    `
      Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies. Typical situations include trying to fast-talk a guard, con a merchant, earn money through gambling, pass yourself off in a disguise, dull someone’s suspicions with false assurances, or maintain a straight face while telling
      a blatant lie.
    `
  },
  {
    name: 'History',
    relatedAbility: 'intelligence',
    description:
    `
      Your Intelligence (History) check measures your ability to recall lore about historical events,
      legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.
    `
  },
  {
    name: 'Insight',
    relatedAbility: 'wisdom',
    description:
    ``
  },
  {
    name: 'Intimidation',
    relatedAbility: 'strength',
    description:
    ``
  },
  {
    name: 'Investigation',
    relatedAbility: 'intelligence',
    description:
    ``
  },
  {
    name: 'Medicine',
    relatedAbility: 'wisdom',
    description:
    ``
  },
  {
    name: 'Nature',
    relatedAbility: 'wisdom',
    description:
    ``
  },
  {
    name: 'Perception',
    relatedAbility: 'wisdom',
    description: `Make a Perception check to notice clues, detect secret doors, spot imminent dangers,
      find traps, follow tracks, listen for sounds behind a closed door, or locate hidden objects.
      This skill is used against another creature’s Stealth check or against a DC set by the DM.
      In most situations, the DM uses your passive Perception check result to determine if you notice a clue or an imminent danger.`,
  },
  {
    name: 'Performance',
    relatedAbility: 'charisma',
    description:
    ``
  },
  {
    name: 'Persuasion',
    relatedAbility: 'charisma',
    description:
    ``
  },
  {
    name: 'Religion',
    relatedAbility: 'intelligence',
    description:
    ``
  },
  {
    name: 'Sleight of Hand',
    relatedAbility: 'dexterity',
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
    relatedAbility: 'dexterity',
    description:
    ``
  },
  {
    name: 'Survival',
    relatedAbility: 'wisdom',
    description:
    ``
  }
];

export const SIMPLE_WEAPONS: Weapon[] = [
  {
    damageType: 'bludgeoning',
    damage: { count: 1, die: 4 },
    isMartialWeapon: false,
    isRanged: false,
    name: 'Club',
    properties: [LIGHT],
  },
  {
    damageType: 'piercing',
    isRanged: true,
    isMartialWeapon: false,
    range: [20, 60],
    damage: { count: 1, die: 4 },
    name: 'Dagger',
    properties: [LIGHT, FINESSE, THROWN],
  }
]

export const MARTIAL_WEAPONS: Weapon[] = [
  {
    damageType: 'slashing',
    damage: { count: 1, die: 8 },
    versatileDamage: { count: 1, die: 10 },
    isMartialWeapon: true,
    isRanged: false,
    name: 'Battleaxe',
    properties: [VERSATILE],
  },

  {
    damageType: 'bludgeoning',
    damage: { count: 1, die: 8 },
    isMartialWeapon: true,
    isRanged: false,
    name: 'Flail',
    properties: [],
  },

  {
    damageType: 'slashing',
    damage: { count: 1, die: 10 },
    isMartialWeapon: true,
    isRanged: false,
    name: 'Glaive',
    properties: [REACH, TWO_HANDED, HEAVY]
  },

  {
    damageType: 'slashing',
    damage: { count: 1, die: 12 },
    isMartialWeapon: true,
    isRanged: false,
    name: 'Great Axe',
    properties: [HEAVY, TWO_HANDED],
  },

  {
    damageType: 'slashing',
    damage: { count: 2, die: 6 },
    isMartialWeapon: true,
    isRanged: false,
    name: 'Greatsword',
    properties: [HEAVY, TWO_HANDED]
  }
]