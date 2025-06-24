// // custom hook on class DamagePF2e
// if (roll === null) return null;
// Hooks.callAll('pf2e.fudgeDamageRoll', roll);

// // CharacterPF2e#prepareStrike
// const weaponPotency = (() => {
//   const potency = attackDomains
//       .flatMap((key) => foundry.utils.deepClone(synthetics.weaponPotency[key] ?? []))
//       .filter((wp) => wp.predicate.test(initialRollOptions));
//   const inTb = weapon.container?.name.includes("Thrower's Bandolier");
//   const thrown1h = weapon.handsHeld === 1 && weapon.traits.has('thrown');
//   const tbBonus = inTb && thrown1h ? 1 : 0;
//   const rBonus = weapon.system.runes.potency;
//   const bonus = rBonus || tbBonus;
//   return (
//     bonus > 0 &&
//       potency.push({
//         label:
//           rBonus > tbBonus
//             ? 'PF2E.Item.Weapon.Rune.Potency'
//             : "Thrower's Bandolier",
//         bonus,
//         type: 'item',
//         predicate: new Predicate(),
//       }),
//     potency.length > 0
//       ? potency.reduce((highest, current) =>
//           highest.bonus > current.bonus ? highest : current
//         )
//       : null
//   );
// })();
