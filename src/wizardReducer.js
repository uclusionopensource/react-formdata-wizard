const RESET_VALUES = 'RESET_VALUES';
const UPDATE_VALUES = 'UPDATE_VALUES';

/**
 * Returns a message to the reducer that updates
 * the values in the state with the key/values in the
 * new values object
 * @param newValues an object whose key/values will overwrite
 * the corresponding values in the state (or be added)
 * @returns {{type: string, newValues: *}}
 */
export function updateValues(newValues) {
  return {
    type: UPDATE_VALUES,
    newValues
  };
}

/**
 * Returns a message to the reducer that
 * will empty out the state
 * @returns {{type: string}}
 */
export function resetValues() {
  return {
    type: RESET_VALUES
  };
}

export function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case UPDATE_VALUES:
      return {
        ...state,
        ...action.newValues
      };
    case RESET_VALUES:
      return {};
    default:
      return state;
  }
}
