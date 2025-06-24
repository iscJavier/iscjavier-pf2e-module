import { logger } from '../utils';

const isCritFromPlayer = (damageRoll: DamageRoll): boolean => {
  const fromPlayer = playerCharacter(damageRoll) !== undefined;
  const isCrit = damageRoll.options.degreeOfSuccess >= 3;
  const isCritFromPlayer = fromPlayer && isCrit;
  logger.debug({
    on: '#isCritFromPlayer',
    fromPlayer,
    isCrit,
  });
  return isCritFromPlayer;
};

const playerCharacter = (damageRoll: DamageRoll): Character | undefined => {
  const character = damageRoll.roller?.character;
  const fromPlayer = character?.hasPlayerOwner ?? false;
  logger.debug({
    on: '#playerCharacter',
    fromPlayer,
    character,
  });
  return fromPlayer ? character : undefined;
};

export const rollInspector = {
  isCritFromPlayer,
  playerCharacter,
};
