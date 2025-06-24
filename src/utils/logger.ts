import { Constants } from './constants';

const primivites = ['string', 'number', 'boolean'];
const log = (data: any) => {
  if (primivites.includes(typeof data)) {
    return console.log(`${Constants.moduleId} | ${data}`);
  }
  console.log(`${Constants.moduleId} | `, { ...data });
};

const debug = (data: { on: string; [data: string]: any }) => {
  console.debug(`${Constants.moduleId} | `, { ...data });
};

export const logger = { log, debug };
