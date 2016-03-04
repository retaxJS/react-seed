import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import * as ACTIONS from 'constants/actions';

function getInitialState() {
  return fromJS({
    value: {},
  });
}

function startLoading(ACTION, state) {
  const currentValue = state.getIn(['value', ACTION, 'value']);
  const currentMax = state.getIn(['value', ACTION, 'max']);

  return state.mergeIn(['value'], {
    [ACTION]: {
      isLoading: true,
      value: currentValue || 0,
      max: currentMax || 0,
    },
  });
}

function finishLoading(ACTION, state) {
  return state.setIn(['value', ACTION], fromJS({}));
}

const reducers = Object.values(ACTIONS).reduce((res, ACTION) => {
  if (!ACTION.LOADING || !ACTION.ERROR || !ACTION.SUCCESS) return res;

  return {
    ...res,
    [ACTION.LOADING]: startLoading.bind(null, ACTION.value),
    [ACTION.ERROR]: finishLoading.bind(null, ACTION.value),
    [ACTION.SUCCESS]: finishLoading.bind(null, ACTION.value),
  };
}, {});

export default handleActions({
  ...reducers,

  [ACTIONS.SET_LOADING_STEPS](state, action) {
    const { payload: { ACTION, max } } = action;

    return state.setIn(['value', ACTION, 'max'], max);
  },

  [ACTIONS.UPDATE_LOADING_VALUE](state, action) {
    const { payload: { ACTION, value } } = action;

    return state.setIn(['value', ACTION, 'value'], value);
  },
}, getInitialState());