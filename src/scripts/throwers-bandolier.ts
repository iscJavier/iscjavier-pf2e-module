import { logger } from '../utils';

export const throwersBandolierWeapons = (damageRoll: DamageRoll, pc: Character): void => {
  const weaponIds = damageRoll.options.damage.damage.modifiers
    .filter((modifier) => modifier.predicate.isValid && modifier.domains.includes('weapon-damage'))
    .map((modifier) => modifier.domains.filter((domain) => /[a-zA-Z0-9]{16}-damage/.test(domain)))
    .flatMap((domains) => domains.map((domain) => domain.substring(0, 16)));
  const throwersWeapons = pc.inventory.contents.filter(
    (i) => weaponIds.includes(i.id) && i.container?.name.includes("Thrower's Bandolier") && i.handsHeld === 1,
  );
  logger.debug({
    on: '#throwersBandolierWeapons',
    throwersWeapons,
  });
};
