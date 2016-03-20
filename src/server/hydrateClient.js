import debug from 'debug';
import warning from 'warning';
import { trigger } from 'redial';

import configManager from 'helpers/configManager';
import preboot from 'config/preboot';

const logger = debug('ReactSeed-buildApp');

export async function waitForPreboot(
  store,
  cookies,
) {
  logger('waitForPreboot: Prebooting');
  try {
    const token = cookies[configManager.get('TOKEN_COOKIE_KEY')];

    if (!token) {
      throw new Error(`Missing ${configManager.get('TOKEN_COOKIE_KEY')} from cookies`);
    }

    await preboot(token, store);
  } catch (e) {
    warning(false, e.message);
  } finally {
    logger('waitForPreboot: Done');
  }
}

export async function getInitialState(
  components,
  { dispatch },
) {
  logger('getInitialState: Running prefetchers');

  try {
    await trigger('fetch', components, {
      dispatch,
    });
  } catch (e) {
    warning(false, e.message);
  } finally {
    logger('getInitialState: Done');
  }
}
