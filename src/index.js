(() => {
  // do nothing if we couldn't find the player's character
  if (!actor || !token) {
    new Dialog({
      title: `Problem with auto-detection`,
      content: `Unfortunately, this macro wasn't able to automatically detect which token is yours.<br/><br/>Please manually select your token and try again.`,
      buttons: {},
    }).render(true);
    return;
  }
  const actorFeatSlugs = actor.items.filter((item) => item.type === 'feat').map((feat) => feat.system.slug);

  const skillActions = {
    directory: {
      Acrobatics: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('acrobatics');
          },
        },
        {
          actionName: 'Balance',
          actionType: 'enc',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('balance');
          },
        },
        {
          actionName: 'Tumble Through',
          actionType: 'enc',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('tumbleThrough');
          },
        },
        {
          actionName: 'Maneuver in Flight',
          actionType: 'enc',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('maneuverInFlight');
          },
        },
        {
          actionName: 'Squeeze',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('squeeze');
          },
        },
      ],
      Arcana: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('arcana');
          },
        },
        {
          actionName: 'Recall Knowledge, Arcana',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.recallKnowledge('arcana');
          },
        },
        {
          actionName: 'Borrow an Arcane Spell',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('arcana');
          },
        },
        {
          actionName: 'Decipher Writing',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('decipherWriting', 'arcana');
          },
        },
        {
          actionName: 'Identify Magic',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('arcana');
          },
        },
        {
          actionName: 'Learn a Spell',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('arcana');
          },
        },
      ],
      Athletics: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('athletics');
          },
        },
        {
          actionName: 'Climb',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('climb');
          },
        },
        {
          actionName: 'Force Open',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('forceOpen');
          },
        },
        {
          actionName: 'Grapple',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('grapple');
          },
        },
        {
          actionName: 'High Jump',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('highJump');
          },
        },
        {
          actionName: 'Long Jump',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('longJump');
          },
        },
        {
          actionName: 'Shove',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('shove');
          },
        },
        {
          actionName: 'Swim',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('swim');
          },
        },
        {
          actionName: 'Trip',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('trip');
          },
        },
        {
          actionName: 'Disarm',
          actionType: 'enc',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('disarm');
          },
        },
        {
          actionName: 'Whirling Throw',
          actionType: 'enc',
          proficiency: 'trained',
          prerequisite: 'whirling-throw',
          actionCost: 1,
          command: () => {
            skillActions.coreAction('whirlingThrow');
          },
        },
      ],
      Crafting: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('crafting');
          },
        },
        {
          actionName: 'Recall Knowledge',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.recallKnowledge('crafting');
          },
        },
        {
          actionName: 'Repair',
          actionType: 'exp',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('repair');
          },
        },
        {
          actionName: 'Craft',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('craft');
          },
        },
        {
          actionName: 'Identify Alchemy',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('crafting');
          },
        },
      ],
      Deception: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('deception');
          },
        },
        {
          actionName: 'Create a Diversion: Words',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.createADiversion('distracting-words');
          },
        },
        {
          actionName: 'Create a Diversion: Gesture',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.createADiversion('gesture');
          },
        },
        {
          actionName: 'Create a Diversion: Trick',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.createADiversion('trick');
          },
        },
        {
          actionName: 'Impersonate',
          actionType: 'exp',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('impersonate');
          },
        },
        {
          actionName: 'Lie',
          actionType: 'exp',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('lie');
          },
        },
        {
          actionName: 'Feint',
          actionType: 'enc',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('feint');
          },
        },
      ],
      Diplomacy: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('diplomacy');
          },
        },
        {
          actionName: 'Gather Information',
          actionType: 'exp',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('gatherInformation');
          },
        },
        {
          actionName: 'Make an Impression',
          actionType: 'exp',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('makeAnImpression');
          },
        },
        {
          actionName: 'Request',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('request');
          },
        },
      ],
      Intimidation: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('intimidation');
          },
        },
        {
          actionName: 'Coerce',
          actionType: 'exp',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('coerce');
          },
        },
        {
          actionName: 'Demoralize',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('demoralize');
          },
        },
      ],
      Medicine: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('medicine');
          },
        },
        {
          actionName: 'Administer First Aid',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 2,
          command: () => {
            skillActions.coreAction('administerFirstAid');
          },
        },
        {
          actionName: 'Recall Knowledge',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.recallKnowledge('medicine');
          },
        },
        {
          actionName: 'Treat Disease',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('treatDisease');
          },
        },
        {
          actionName: 'Treat Poison',
          actionType: 'enc',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('treatPoison');
          },
        },
      ],
      Nature: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('nature');
          },
        },
        {
          actionName: 'Command an Animal',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('commandAnAnimal');
          },
        },
        {
          actionName: 'Recall Knowledge',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.recallKnowledge('nature');
          },
        },
        {
          actionName: 'Identify Magic',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('nature');
          },
        },
        {
          actionName: 'Learn a Spell',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('nature');
          },
        },
      ],
      Occultism: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('occultism');
          },
        },
        {
          actionName: 'Recall Knowledge',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.recallKnowledge('occultism');
          },
        },
        {
          actionName: 'Decipher Writing',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('decipherWriting', 'occultism');
          },
        },
        {
          actionName: 'Identify Magic',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('occultism');
          },
        },
        {
          actionName: 'Learn a Spell',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('occultism');
          },
        },
      ],
      Performance: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('performance');
          },
        },
        {
          actionName: 'Perform',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('perform');
          },
        },
      ],
      Perception: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('perception');
          },
        },
        {
          actionName: 'Seek',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('seek');
          },
        },
        {
          actionName: 'Sense Motive',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('senseMotive');
          },
        },
      ],
      Religion: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('religion');
          },
        },
        {
          actionName: 'Recall Knowledge',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.recallKnowledge('religion');
          },
        },
        {
          actionName: 'Decipher Writing',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('decipherWriting', 'religion');
          },
        },
        {
          actionName: 'Identify Magic',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('religion');
          },
        },
        {
          actionName: 'Learn a Spell',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('religion');
          },
        },
      ],
      Society: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('society');
          },
        },
        {
          actionName: 'Recall Knowledge',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.recallKnowledge('society');
          },
        },
        {
          actionName: 'Subsist',
          actionType: 'exp',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('subsist', 'society');
          },
        },
        {
          actionName: 'Create Forgery',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('createForgery');
          },
        },
        {
          actionName: 'Decipher Writing',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('decipherWriting');
          },
        },
      ],
      Stealth: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('stealth');
          },
        },
        {
          actionName: 'Conceal an Object',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('concealAnObject');
          },
        },
        {
          actionName: 'Hide',
          actionType: 'exp',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('hide');
          },
        },
        {
          actionName: 'Sneak',
          actionType: 'exp',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('sneak');
          },
        },
        {
          actionName: 'Create Forgery',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('createForgery');
          },
        },
      ],
      Survival: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('survival');
          },
        },
        {
          actionName: 'Sense Direction',
          actionType: 'exp',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('senseDirection');
          },
        },
        {
          actionName: 'Subsist',
          actionType: 'exp',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('subsist', 'survival');
          },
        },
        {
          actionName: 'Cover Tracks',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('sur');
          },
        },
        {
          actionName: 'Track',
          actionType: 'exp',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.coreAction('track');
          },
        },
      ],
      Thievery: [
        {
          actionName: 'Unspecified',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: null,
          command: () => {
            skillActions.unspecifiedActivity('theivery');
          },
        },
        {
          actionName: 'Palm an Object',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('palmAnObject');
          },
        },
        {
          actionName: 'Steal',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('steal');
          },
        },
        {
          actionName: 'Disable Device',
          actionType: 'enc',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: 2,
          command: () => {
            skillActions.coreAction('disableDevice');
          },
        },
        {
          actionName: 'Pick a Lock',
          actionType: 'enc',
          proficiency: 'trained',
          prerequisite: null,
          actionCost: 2,
          command: () => {
            skillActions.coreAction('pickALock');
          },
        },
      ],
      'Unarmed Escape': [
        {
          actionName: 'Escape',
          actionType: 'enc',
          proficiency: 'untrained',
          prerequisite: null,
          actionCost: 1,
          command: () => {
            skillActions.coreAction('escape');
          },
        },
      ],
    },
    coreAction: (action, skill = '') => {
      const actionProperties = { event: event };
      if (skill) {
        actionProperties['skill'] = skill;
      }
      game.pf2e.actions[action](actionProperties);
    },
    createADiversion: (variant) => {
      game.pf2e.actions.createADiversion({ event: event, variant });
    },
    recallKnowledge: (skillName) => {
      game.pf2e.actions.get('recall-knowledge').use({ statistic: skillName });
    },
    unspecifiedActivity: (skillName) => {
      const _title = skillName.charAt(0).toUpperCase() + skillName.slice(1) + ' Check'; // uppercase first letter
      const _skill = skillName == 'perception' ? actor.perception : actor.skills[skillName];
      const checkData = {
        actor,
        type: 'skill-check',
        createMessage: true,
      };
      game.pf2e.Check.roll(new game.pf2e.CheckModifier(_title, _skill), checkData);
    },
  };

  class SkillActionDialog extends Dialog {
    static get defaultOptions() {
      return {
        ...super.defaultOptions,
        height: 'auto',
      };
    }

    activateListeners($html) {
      super.activateListeners($html);
      const $app = $html.closest('.window-app.dialog');
      let $content = $app.children('.window-content');
      const $buttons = $content.children('.dialog-buttons');
    }
  }

  const selectorNames = {
    skill: 'skill-selector',
    action: 'action-selector',
  };

  const skillsHtml = (newSkill) =>
    Object.keys(skillActions.directory)
      .map((skill) => {
        const selectedAttr = skill === newSkill ? 'selected' : '';
        return `<option value="${skill}" ${selectedAttr}>${skill}</option>`;
      })
      .join('\n');
  const actionsHtml = (skill, newAction) =>
    skillActions.directory[skill]
      .filter((action) => !action.prerequisite || actorFeatSlugs.includes(action.prerequisite))
      .sort((a, b) => (a.actionName > b.actionName ? 1 : b.actionName > a.actionName ? -1 : 0))
      .map((action) => {
        const actionCost = action.actionCost ? ` (${action.actionCost})` : '';
        const selectedAttr = action.actionName === newAction ? 'selected' : '';
        return `<option value="${action.actionName}" ${selectedAttr}>${action.actionName + actionCost}</option>`;
      })
      .join('\n');
  const updateSelectorHTML = (selectorName, html) => {
    $(`select[name="${selectorName}"]`).empty().append(html);
  };
  const updateDialogSkill = (newSkill) => {
    updateSelectorHTML(selectorNames.skill, skillsHtml(newSkill));
    updateDialogActions(newSkill, skillActions.directory[newSkill][0].actionName);
  };
  const updateDialogActions = (skill, newAction) => {
    updateSelectorHTML(selectorNames.action, actionsHtml(skill, newAction));
  };
  const addOnChangeHandler = (dialogContent, selectorName, handler) => {
    dialogContent.querySelector(`[name=${selectorName}]`).addEventListener('change', handler(dialogContent));
  };

  const selectedValue = (dialogContent, selectorName) =>
    dialogContent.querySelector(`[name=${selectorName}] > option[selected]`).value;

  const dialogOptions = {
    changeSkill: (dialogContent) => (event) => {
      const newSkill = event.target.value;
      updateDialogSkill(newSkill);
    },
    changeAction: (dialogContent) => (event) => {
      const newAction = event.target.value;
      const selectedSkill = selectedValue(dialogContent, selectorNames.skill);
      updateDialogActions(selectedSkill, newAction);
    },
    performSelectedAction: (dialogContent) => {
      const selectedSkill = selectedValue(dialogContent, selectorNames.skill);
      const selectedAction = selectedValue(dialogContent, selectorNames.action);
      const action = skillActions.directory[selectedSkill].find((action) => action.actionName === selectedAction);
      action.command();
    },
  };

  const firstSkill = Object.keys(skillActions.directory)[0];
  const firstAction = skillActions.directory[firstSkill][0].actionName;
  new SkillActionDialog({
    title: 'Action Selector',
    content: `
<form name="skill-action-dialog">
  <div class="form-group">
    <label>Skill:</label>
    <select name="${selectorNames.skill}">${skillsHtml(firstSkill)}</select>
  </div>
  <div class="form-group">
    <label>Action:</label>
    <select name="${selectorNames.action}">${actionsHtml(firstSkill, firstAction)}</select>
  </div>
</form>`,
    buttons: {
      performAction: {
        label: 'Use Action',
        callback: ([dialogContent]) => dialogOptions.performSelectedAction(dialogContent),
      },
      cancel: {
        label: 'Cancel',
      },
    },
    default: 'cancel',
    render: ([dialogContent]) => {
      addOnChangeHandler(dialogContent, selectorNames.skill, dialogOptions.changeSkill);
      addOnChangeHandler(dialogContent, selectorNames.action, dialogOptions.changeAction);
    },
  }).render(true);
})();

(async () => {
  if (!token) {
    console.log('no token');
    return;
  }

  const auraRingModule = game.modules.get('token-aura-ring');
  if (!auraRingModule?.API?.refreshToken) {
    console.log('no aura ring module API');
    return;
  }

  const auras =
    token.document && token.document.flags && token.document.flags['token-aura-ring']
      ? token.document.flags['token-aura-ring']['aura-rings'] || []
      : [];
  const detectMagicIndex = auras.findIndex((aura) => aura.name === 'Detect Magic');
  if (detectMagicIndex < 0) {
    console.log('no detect magic aura');
    return;
  }

  auras[detectMagicIndex].visibility = auras[detectMagicIndex].visibility === 'PLAYER' ? 'NONE' : 'PLAYER';

  token.document.flags['token-aura-ring']['aura-rings'] = auras;
  token.document.update({
    'flags.token-aura-ring.aura-rings': auras,
  });
  auraRingModule.API.refreshToken(token);

  const content = auras[detectMagicIndex].visibility === 'PLAYER' ? '<em>Wussshhhhh</em>' : '<em>poof</em>';

  await ChatMessage.create({
    user: game.user.id,
    speaker: ChatMessage.getSpeaker({ token, actor }),
    content,
  });
})();
