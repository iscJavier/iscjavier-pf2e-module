type DamageRoll = {
  options: {
    degreeOfSuccess: number;
    damage: {
      damage: {
        modifiers: Array<{
          predicate: { isValid: boolean };
          domains: Array<string>;
        }>;
      };
    };
  };
  roller?: {
    character?: Character;
  };
  terms: Array<{
    rolls: Array<{
      critRule: {};
      terms: Array<{
        term: RollTermOperands;
        total: number;
      }>;
      _total: number;
    }>;
    dice: Array<{
      options: {
        flavor?: string;
      };
      results: Array<{}>;
      faces: number;
    }>;
    results: Array<{
      result: number;
      valid: boolean;
    }>;
  }>;
  _total: number;
};

type RollTermResult = {
  options: { flavor: string };
  results: Array<{ result: number; active: boolean }>;
  faces: number;
};

type RollTermOperands = {
  operands?: Array<{
    operands?: Array<RollTermResult>;
  }>;
  results?: Array<RollTermResult>;
};

type Character = {
  hasPlayerOwner: boolean;
  id: string;
  inventory: {
    contents: Array<Item>;
  };
};

type Item = {
  id: string;
  name: string;
  container?: {
    name: string;
  };
  handsHeld: 0 | 1 | 2;
  system: {
    property1: {
      damageType: string;
      dice: number | null; // number of dice
      die: string; // d<faces>
      value: string;
    };
  };
  update: (options: { [key: string]: object }) => void;
};
