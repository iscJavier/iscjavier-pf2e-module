import { hardCrit, hawkTuah } from './scripts';
import { logger, rollInspector } from './utils';

Hooks.on('ready', () => {
  logger.log('module ready');
});

Hooks.on('pf2e.damageRoll', (damageRoll: DamageRoll) => {
  const pc = rollInspector.playerCharacter(damageRoll);
  if (pc) {
    hawkTuah(damageRoll, pc);
  }
});

Hooks.on('pf2e.fudgeDamageRoll', (damageRoll: DamageRoll) => {
  if (rollInspector.isCritFromPlayer(damageRoll)) {
    hardCrit(damageRoll);
  }
});
