import { Constants } from '../constants.js';

const primivites = ['string', 'number', 'boolean'];
export const log = (data: any) => {
  if (primivites.includes(typeof data)) {
    return console.log(`${Constants.moduleId} | ${data}`);
  }
  console.log(`${Constants.moduleId} | `, { ...data });
};
