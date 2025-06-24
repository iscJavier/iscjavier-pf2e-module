(async () => {
  const actor = game.user.character;
  if (!actor) {
    return ui.notifications.error("You don't have a Character.");
  }
  const token = actor.getActiveTokens().slice().pop();
  if (!token) {
    return ui.notifications.error(game.i18n.format('PF2E.Encounter.NoTokenInScene', { actor: actor.name }));
  }

  if (actor.ancestry.name !== 'Nagaji') {
    return ui.notifications.error('You are not a Nagaji.');
  }

  const weapons = actor.inventory.contents.filter((i) => i.type === 'weapon');

  const showDialog = (title, content, selectId, arr) =>
    new Promise((resolve) => {
      new Dialog({
        title,
        content,
        buttons: {
          ok: {
            label: 'OK',
            callback: (html) => {
              const index = html.find(selectId)[0].value;
              resolve(arr[index]);
            },
          },
          cancel: {
            label: 'Cancel',
            callback: () => resolve(undefined),
          },
        },
      }).render(true);
    });

  const weaponOptions = weapons.map((weapon, index) => {
    const extraDamage = weapon.system.property1.value || '-no extra damage-';
    return `<option value=${index}>${weapon.name}; extra damage: <strong>${extraDamage}</strong>;</option>`;
  });
  const weaponSelection = [
    '<span style="display:flex;flex-direction:column;justify-content:center;">',
    '<h3>Select a weapon to spit into.</h3>',
    `<select id="selected-weapon">${weaponOptions}</select>`,
    '<span>&nbsp;</span>',
    '</span>',
  ].join('');
  const selectedWeapon = await showDialog('Hawk Tuah', weaponSelection, '#selected-weapon', weapons);
  if (!selectedWeapon) return;
  selectedWeapon.update({
    'system.property1': {
      ...selectedWeapon.system.property1,
      damageType: 'poison',
      dice: 1,
      die: 'd4',
      value: 'Hawk Tuah',
    },
  });
  const content = `<strong>Hawk Tuah</strong> Spit on that thang.<br />${selectedWeapon.name} infused with 1d4 poison damage for the next hit.`;
  await ChatMessage.create({
    user: game.user.id,
    speaker: ChatMessage.getSpeaker({ token, actor }),
    content,
  });
})();
