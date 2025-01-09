import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Basic types
export type Attribute = 'might' | 'agility' | 'reason' | 'intuition' | 'presence';
export type AttributeValues = Record<Attribute, number>;

export type CharacterInfo = {
  name: string;
  ancestry: string;
  class: string;
  career: string;
  subclass: string;
  level: number;
  wealth: number;
  renown: number;
  xp: number;
  speed: number;
  size: string;
  stability: number;
  surges: number;
}

export type Stamina = {
  current: number;
  max: number;
  temporary: number;
}

export type SkillCategory = keyof Skills;
// Skills types
export type CraftingSkills = {
  alchemy: boolean;
  architecture: boolean;
  fletching: boolean;
  forgery: boolean;
  jewelry: boolean;
  mechanics: boolean;
  tailoring: boolean;
}

export type IntrigueSkills = {
  alertness: boolean;
  concealObject: boolean;
  disguise: boolean;
  eavesdrop: boolean;
  escapeArtist: boolean;
  hide: boolean;
  performance: boolean;
  pickLock: boolean;
  pickPocket: boolean;
  sabotage: boolean;
  search: boolean;
  sneak: boolean;
  track: boolean;
}

export type LoreSkills = {
  culture: boolean;
  criminalUnderground: boolean;
  history: boolean;
  magic: boolean;
  monsters: boolean;
  nature: boolean;
  psionics: boolean;
  religion: boolean;
  rumors: boolean;
  society: boolean;
  timescape: boolean;
}

export type InterpersonalSkills = {
  brag: boolean;
  empathize: boolean;
  flirt: boolean;
  gamble: boolean;
  handleAnimals: boolean;
  interrogate: boolean;
  intimidate: boolean;
  lead: boolean;
  lie: boolean;
  music: boolean;
  persuade: boolean;
  readPerson: boolean;
}


export type ExplorationSkills = {
  climb: boolean;
  drive: boolean;
  endurance: boolean;
  gymnastics: boolean;
  heal: boolean;
  jump: boolean;
  lift: boolean;
  navigate: boolean;
  ride: boolean;
  swim: boolean;
}

export type Skills = {
  crafting: CraftingSkills;
  intrigue: IntrigueSkills;
  lore: LoreSkills;
  interpersonal: InterpersonalSkills;
  exploration: ExplorationSkills;
}

// Get all nested keys as a union
export type NestedKeys<T> = {
  [K in keyof T]: T[K] extends object 
    ? keyof T[K] 
    : never
}[keyof T]

// Usage example:
export type AllSkillKeys = NestedKeys<Skills>

// Power types
export type PowerEffects = {
  low: string;
  mid: string;
  high: string;
}

export type Power = {
  name: string;
  type: string;
  keywords: string[];
  distance: string;
  target: string;
  powerRoll: number;
  effects: PowerEffects;
}

export type HeroicResource = {
  name: string;
  current: number;
}

export type Recoveries = {
  stamina: number;
  current: number;
  max: number;
}

export type Character = {
  attributes: AttributeValues;
  characterInfo: CharacterInfo;
  stamina: Stamina;
  skills: Skills;
  powers: Power[];
  heroicResource: HeroicResource;
  recoveries: Recoveries;
}

const defaultCharacter: Character = {
  attributes: {
    might: 0,
    agility: 0,
    reason: 0,
    intuition: 0,
    presence: 0
  },
  recoveries: {
    stamina: 0,
    current: 0,
    max: 0
  },
  heroicResource: {
    name: 'Heroic Resource',
    current: 0,
  },
  characterInfo: {
    name: '',
    ancestry: '',
    class: '',
    career: '',
    subclass: '',
    level: 1,
    wealth: 0,
    renown: 0,
    xp: 0,
    speed: 0,
    size: '',
    stability: 0,
    surges: 0,
  },
  stamina: {
    current: 0,
    max: 0,
    temporary: 0
  },
  skills: {
    crafting: {
      alchemy: false,
      architecture: false,
      fletching: false,
      forgery: false,
      jewelry: false,
      mechanics: false,
      tailoring: false
    },
    intrigue: {
      alertness: false,
      concealObject: false,
      disguise: false,
      eavesdrop: false,
      escapeArtist: false,
      hide: false,
      performance: false,
      pickLock: false,
      pickPocket: false,
      sabotage: false,
      search: false,
      sneak: false,
      track: false
    },
    lore: {
      culture: false,
      criminalUnderground: false,
      history: false,
      magic: false,
      monsters: false,
      nature: false,
      psionics: false,
      religion: false,
      rumors: false,
      society: false,
      timescape: false
    },
    interpersonal: {
      brag: false,
      empathize: false,
      flirt: false,
      gamble: false,
      handleAnimals: false,
      interrogate: false,
      intimidate: false,
      lead: false,
      lie: false,
      music: false,
      persuade: false,
      readPerson: false
    },
    exploration: {
      climb: false,
      drive: false,
      endurance: false,
      gymnastics: false,
      heal: false,
      jump: false,
      lift: false,
      navigate: false,
      ride: false,
      swim: false
    }
  },
  powers: [{
    name: 'Melee Free Strike',
    type: 'Action',
    keywords: ['Charge', 'Melee', 'Strike', 'Weapon'],
    distance: '1+Kit',
    target: '1 Creature or Object',
    powerRoll: 0,
    effects: {
      low: '2 + Might or Agility Damage',
      mid: '4 + Might or Agility Damage',
      high: '6 + Might or Agility Damage'
    }
  }]
};

export const characterAtom = atomWithStorage('character', defaultCharacter);
export const useCharacterInfo = () => {
  const [character, setCharacter] = useAtom<Character>(characterAtom);

  const updateAttributes = (newAttributes: Partial<AttributeValues>) => {
    setCharacter(prev => ({
      ...prev,
      attributes: { ...prev.attributes, ...newAttributes }
    }));
  };

  const setAttribute = (attribute: Attribute, value: number | string) => {
    typeof value === 'string' ?
      updateAttributes({[attribute]: parseInt(value)}) :
      updateAttributes({[attribute]: value});
  }

  const updateCharacterInfo = (newInfo: Partial<CharacterInfo>) => {
    setCharacter(prev => ({
      ...prev,
      characterInfo: { ...prev.characterInfo, ...newInfo }
    }));
  };

  const updateStamina = (newStamina: Partial<Stamina>) => {
    setCharacter(prev => ({
      ...prev,
      stamina: { ...prev.stamina, ...newStamina }
    }));
  };

  const updateRecoveries = (newRecoveries: Partial<Recoveries>) => {
    setCharacter(prev => ({
      ...prev,
      recoveries: { ...prev.recoveries, ...newRecoveries }
    }));
  };

  const updateHeroicResource = (newHeroicResource: Partial<HeroicResource>) => {
    setCharacter(prev => ({
      ...prev,
      heroicResource: { ...prev.heroicResource, ...newHeroicResource }
    }));
  };

  const toggleSkill = <T extends SkillCategory>(categoryKey: T, skill: NestedKeys<T>, value: boolean) => {
    setCharacter(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [categoryKey]: {
          ...prev.skills[categoryKey],
          [skill]: value,
        }
      }
    }));
  };

  const addPower = (power: Power) => {
    setCharacter(prev => ({
      ...prev,
      powers: [...prev.powers, power]
    }));
  };

  const updatePower = (index: number, power: Partial<Power>) => {
    setCharacter(prev => ({
      ...prev,
      powers: prev.powers.map((p, i) => 
        i === index ? { ...p, ...power } : p
      )
    }));
  };

  const removePower = (index: number) => {
    setCharacter(prev => ({
      ...prev,
      powers: prev.powers.filter((_, i) => i !== index)
    }));
  };

  return {
    character,
    updateAttributes,
    setAttribute,
    updateCharacterInfo,
    updateStamina,
    updateRecoveries,
    updateHeroicResource,
    toggleSkill,
    addPower,
    updatePower,
    removePower
  };
};
