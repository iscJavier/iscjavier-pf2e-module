import { logger } from '../utils';

export const hawkTuah = async (damageRoll: DamageRoll, pc: Character): Promise<void> => {
  const weaponIds = damageRoll.options.damage.damage.modifiers
    .filter((modifier) => modifier.predicate.isValid && modifier.domains.includes('weapon-damage'))
    .map((modifier) => modifier.domains.filter((domain) => /[a-zA-Z0-9]{16}-damage/.test(domain)))
    .flatMap((domains) => domains.map((domain) => domain.substring(0, 16)));
  const inventoryWeapons = pc.inventory.contents.filter((i) => weaponIds.includes(i.id));
  debugger;
  for (const weapon of inventoryWeapons) {
    const rulesWithoutHawkTuah = weapon.system.rules.filter((r) => r.label !== 'Hawk Tuah');
    if (weapon.system.rules.length !== rulesWithoutHawkTuah.length) {
      logger.debug({
        on: '#hawkTuah',
        action: `Clearing used Hawk Tuah from ${weapon.name}`,
      });
      await pc.updateEmbeddedDocuments('Item', [{ _id: weapon._id, system: { rules: rulesWithoutHawkTuah } }]);
    }
  }
};
