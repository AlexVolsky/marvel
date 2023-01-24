import { CharState, CharAction, CharActionType } from "../type/chars";


const {GET_CHARTERS, GET_CHARTERS_BY_NAME, LOADING_CHANGE_CHARS, ERROR_LOADING_CHANGE_CHARS} = CharActionType

export const charsReducer = (
    state: CharState = { chars: [], offset: 210, loading: false, error: false},
    action: CharAction
  ) => {
    switch (action.type) {
      case GET_CHARTERS:
        return {
          ...state, 
          chars: [...state.chars].concat(action.payload),
          offset: state.offset + 9,
          loading: !state.loading,
          
        };
      case GET_CHARTERS_BY_NAME:
        return {
          ...state, 
          chars: action.payload, 

        };
      case LOADING_CHANGE_CHARS:
        return { 
            ...state,
            loading: !state.loading
        };
      case ERROR_LOADING_CHANGE_CHARS:
        return { 
            ...state,
            error: action.payload /* ? action.payload : !state.error */
        };

      default:
        return state;
    }
  };

