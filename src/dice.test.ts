import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { powerRoll, getTier, getTierBase, adjustRollTier, d3, d100 } from './dice';

describe('dice', () => {
  // Mock Math.random for predictable tests
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockImplementation(() => 0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getTierBase', () => {
    it('should return 1 for tier 1', () => {
      expect(getTierBase(1)).toBe(1);
    });

    it('should return 12 for tier 2', () => {
      expect(getTierBase(2)).toBe(12);
    });

    it('should return 17 for tier 3', () => {
      expect(getTierBase(3)).toBe(17);
    });

    it('should return 1 for invalid tiers', () => {
      expect(getTierBase(0)).toBe(1);
      expect(getTierBase(4)).toBe(1);
    });
  });

  describe('powerRoll', () => {
    it('should roll 3d10 without bonuses', () => {
      // With Math.random mocked to 0.5, each d10 will return 6
      // (Math.floor(0.5 * 10) + 1 = 6)
      expect(powerRoll().roll).toBe(12); // 6 + 6
    });

    it('should add bonuses to the roll', () => {
      expect(powerRoll([2, 3]).roll).toBe(17); // 12 + 2 + 3
    });

    it('should boost tier when specified', () => {
      expect(powerRoll([], 'boost').roll).toBe(17); // Tier 2 -> Tier 3
    });

    it('should downgrade tier when specified', () => {
      expect(powerRoll([], 'downgrade').roll).toBe(1); // Tier 2 -> Tier 1
    });
  });

  describe('getTier', () => {
    it('should return tier 1 for rolls 11 and under', () => {
      expect(getTier(11)).toBe(1);
      expect(getTier(5)).toBe(1);
    });

    it('should return tier 2 for rolls 12-16', () => {
      expect(getTier(12)).toBe(2);
      expect(getTier(16)).toBe(2);
    });

    it('should return tier 3 for rolls 17 and above', () => {
      expect(getTier(17)).toBe(3);
      expect(getTier(20)).toBe(3);
    });
  });

  describe('adjustRollTier', () => {
    it('should boost tier up when possible', () => {
      expect(adjustRollTier(11, 'boost')).toBe(12); // Tier 1 -> 2
      expect(adjustRollTier(15, 'boost')).toBe(17); // Tier 2 -> 3
      expect(adjustRollTier(18, 'boost')).toBe(18); // Already Tier 3
    });

    it('should downgrade tier when possible', () => {
      expect(adjustRollTier(17, 'downgrade')).toBe(12); // Tier 3 -> 2
      expect(adjustRollTier(15, 'downgrade')).toBe(1); // Tier 2 -> 1
      expect(adjustRollTier(5, 'downgrade')).toBe(5);   // Already Tier 1
    });

    it('should not change roll with no adjustment', () => {
      expect(adjustRollTier(15)).toBe(15);
      expect(adjustRollTier(15, '0')).toBe(15);
    });
  });

  describe('d3', () => {
    it('should roll 1d3 without bonuses', () => {
      // With Math.random mocked to 0.5, d3 will return 2
      expect(d3()).toBe(2);
    });

    it('should add bonuses to the roll', () => {
      expect(d3([1, 2])).toBe(5); // 2 + 1 + 2
    });
  });

  describe('d100', () => {
    it('should roll 1d100 without bonuses', () => {
      // With Math.random mocked to 0.5, d100 will return 51
      expect(d100()).toBe(51);
    });

    it('should add bonuses to the roll', () => {
      expect(d100([10, 5])).toBe(66); // 51 + 10 + 5
    });
  });
}); 