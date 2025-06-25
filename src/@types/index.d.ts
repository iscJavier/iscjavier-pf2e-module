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
  clone: () => DamageRoll;
  reroll: () => Primise<DamageRoll>;
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
  updateEmbeddedDocuments: (key: string, newValues: Array<{ _id: strring; [props: string]: unknown }>) => Promise<void>;
};

type Item = {
  id: string;
  name: string;
  container?: {
    name: string;
  };
  handsHeld: 0 | 1 | 2;
  system: {
    rules: Array<{ label: string }>;
  };
  update: (options: { [key: string]: object }) => void;
  _id: string;
};
