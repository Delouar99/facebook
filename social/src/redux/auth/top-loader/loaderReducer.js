import { initialState } from "./initialState.js";
import { LOADER_END, LOADER_START } from "./loadertypes.js";

/**
 * create auth reducer
 */

export const LoaderReaducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADER_START:
      return 100;

    case LOADER_END:
      return 0;

    default:
      return state;
  }
};

//export deafult
export default LoaderReaducer;
