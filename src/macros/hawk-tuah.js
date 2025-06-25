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

  const weaponEntries = actor.inventory.contents
    .reduce((acc, item) => {
      const validWeapon = item.type === 'weapon' && !item.traits.has('consumable');
      const accesible = item.container === null || item.container.name === "Thrower's Bandolier";
      if (validWeapon && accesible) {
        const hawkTuahd = item.system.rules.find((r) => r.label === 'Hawk Tuah') !== undefined;
        acc.push({ weapon: item, hawkTuahd });
      }
      return acc;
    }, [])
    .sort((left, right) => {
      if (left.hawkTuahd) return 1;
      if (right.hawkTuahd) return -1;
      return 0;
    });

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

  const weaponOptions = weaponEntries
    .map(({ weapon, hawkTuahd }, index) => {
      const label = hawkTuahd ? `💦 Sloppy — ${weapon.name}` : `🍆 ${weapon.name} — Spit on that thang `;
      return `<option value=${index}>${label}</option>`;
    })
    .join('');
  const weaponSelection = [
    '<span style="display:flex;flex-direction:column;justify-content:center;">',
    '<h3>Select a weapon to spit into.</h3>',
    `<select id="selected-weapon">${weaponOptions}</select>`,
    '<span>&nbsp;</span>',
    '</span>',
  ].join('');
  const selectedEntry = await showDialog('Hawk Tuah', weaponSelection, '#selected-weapon', weaponEntries);
  if (!selectedEntry) return;

  const { weapon, hawkTuahd } = selectedEntry;
  if (!hawkTuahd) {
    const itemsRules = weapon.toObject().system.rules;
    itemsRules.push({
      key: 'DamageDice',
      label: 'Hawk Tuah',
      diceNumber: 1,
      dieSize: 'd4',
      damageType: 'poison',
      selector: '{item|id}-damage',
    });
    await actor.updateEmbeddedDocuments('Item', [{ _id: weapon._id, system: { rules: itemsRules } }]);
  }

  const content = `<strong>Hawk Tuah</strong> Spit on that thang.<br />${weapon.name} infused with 1d4 poison damage for the next hit.`;
  await ChatMessage.create({
    user: game.user.id,
    speaker: ChatMessage.getSpeaker({ token, actor }),
    content,
  });
})();
