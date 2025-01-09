/**
 * Sums an array of numbers
 */
const sum = (numbers: number[]): number => 
  numbers.reduce((total, n) => total + n, 0);

/**
 * Rolls a single die of the specified sides
 */
const rollDie = (sides: number): number => {
  const roll = Math.floor(Math.random() * sides) + 1;
  console.log(`Rolled ${roll} for ${sides} sides`);
  return roll;
};


/**
 * Gets the tier (1-3) for a given roll value
 */
export const getTier = (roll: number): number => {
  if (roll <= 11) return 1;
  if (roll <= 16) return 2;
  return 3;
};

/**
 * Gets the minimum roll value for a given tier
 */
export const getTierBase = (tier: number): number => {
  switch (tier) {
    case 1: return 1;
    case 2: return 12;
    case 3: return 17;
    default: return 1;
  }
};

/**
 * Adjusts a roll result based on boost/downgrade status
 * @param roll The initial roll result
 * @param adjustment 'boost' for tier increase, 'downgrade' for tier decrease, or any other value for no change
 * @returns The adjusted roll result
 */
export const adjustRollTier = (roll: number, adjustment: string = '0'): number => {
  const currentTier = getTier(roll);

  if (adjustment === 'boost' && currentTier < 3) {
    return getTierBase(currentTier + 1);
  }

  if (adjustment === 'downgrade' && currentTier > 1) {
    return getTierBase(currentTier - 1);
  }

  return roll;
};
    
/**
 * Rolls 2d10 and sums the result with any bonuses, adjusting the tier if specified
 * @param bonuses Array of bonus values to add to the roll
 * @param adjustment 'boost' for tier increase, 'downgrade' for tier decrease, or any other value for no change
 * @returns The total of 2d10 plus all bonuses, with tier adjustment applied
 */
export const powerRoll = (bonuses: number[] = [], adjustment: string = '') => {
  const rolls = [rollDie(10), rollDie(10)];
  const baseResult = sum(rolls) + sum(bonuses);
  return {
    roll: adjustRollTier(baseResult, adjustment),
    rolls,
    bonuses: sum(bonuses),
  }
};

/**
 * Rolls 1d3 and adds any bonuses
 * @param bonuses Array of bonus values to add to the roll
 * @returns The total of 1d3 plus all bonuses
 */
export const d3 = (bonuses: number[] = []): number => {
  const roll = rollDie(3);
  return roll + sum(bonuses);
};

/**
 * Rolls 1d100 and adds any bonuses
 * @param bonuses Array of bonus values to add to the roll
 * @returns The total of 1d100 plus all bonuses
 */
export const d100 = (bonuses: number[] = []): number => {
  const roll = rollDie(100);
  return roll + sum(bonuses);
}; 