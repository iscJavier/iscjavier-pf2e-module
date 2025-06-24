import { logger } from '../utils';

const isTermResult = (target: any): target is RollTermResult =>
  target.results && target.options?.flavor && target.faces;

const fudgeDoubledDice = (target: RollTermResult) => {
  if (target.options.flavor !== 'doubled') return;
  // max lower half of doubled dice
  target.results.sort((a, b) => a.result - b.result);
  const numberOfDiceToMax = target.results.filter((r) => r.active).length / 2;
  const diceFaces = target.faces;
  const maxedResults = Array.from({ length: numberOfDiceToMax }, () => ({
    result: diceFaces,
    active: true,
  }));
  const oldRolls = JSON.stringify(target.results.slice().map((d) => d.result));
  target.results.splice(0, numberOfDiceToMax, ...maxedResults);
  const newRolls = JSON.stringify(target.results.slice().map((d) => d.result));
  logger.debug({
    on: '#fudgeDoubledDice',
    maxedDie: numberOfDiceToMax,
    oldRolls,
    newRolls,
  });
};

export const hardCrit = (damageRoll: DamageRoll): void => {
  let newTotal = 0;
  for (const term of damageRoll.terms) {
    for (const [index, roll] of Object.entries(term.rolls)) {
      if (roll.critRule !== 'double-dice') {
        newTotal += roll._total;
        continue;
      }
      let rollTotal = 0;
      for (const rollTerm of roll.terms) {
        if (rollTerm.term.operands) {
          for (const operand of rollTerm.term.operands) {
            if (isTermResult(operand)) {
              fudgeDoubledDice(operand);
            } else {
              for (const innerOperand of operand.operands || []) {
                if (innerOperand.options.flavor !== 'doubled') continue;
                fudgeDoubledDice(innerOperand);
              }
            }
          }
        } else if (isTermResult(rollTerm.term)) {
          fudgeDoubledDice(rollTerm.term);
        }
        rollTotal += rollTerm.total;
      }
      // update rolls total
      roll._total = rollTotal;
      newTotal += rollTotal;
      const rollIndex = Number(index);
      if (term.results[rollIndex]) {
        term.results[rollIndex].result = rollTotal;
      }
    }
  }
  logger.debug({
    on: '#hardCrit',
    newTotal,
    oldTotal: damageRoll._total,
  });
  // update roll total
  damageRoll._total = newTotal;
};
