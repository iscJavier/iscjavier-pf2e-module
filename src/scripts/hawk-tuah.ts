import { logger } from '../utils';

export const hawkTuah = (damageRoll: DamageRoll, pc: Character): void => {
  const weaponIds = damageRoll.options.damage.damage.modifiers
    .filter((modifier) => modifier.predicate.isValid && modifier.domains.includes('weapon-damage'))
    .map((modifier) => modifier.domains.filter((domain) => /[a-zA-Z0-9]{16}-damage/.test(domain)))
    .flatMap((domains) => domains.map((domain) => domain.substring(0, 16)));
  const inventoryWeapons = pc.inventory.contents.filter((i) => weaponIds.includes(i.id));
  for (const weapon of inventoryWeapons) {
    if (weapon.system.property1.value === 'Hawk Tuah') {
      logger.debug({
        on: '#hawkTuah',
        action: `Clearing used Hawk Tuah from ${weapon.name}`,
      });
      weapon.update({
        'system.property1': {
          ...weapon.system.property1,
          damageType: '',
          dice: null,
          die: '',
          value: '',
        },
      });
    }
  }
};
