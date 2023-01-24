import { ComicsState, ComicsAction, ComicsActionType } from "../type/comics";

const {GET_COMICS, GET_COMICS_BY_ID} = ComicsActionType
export const comicsReducer = (
    state: ComicsState = { comics: []},
    action: ComicsAction
  ) => {
    switch (action.type) {
      case GET_COMICS:
        return { comics: action.payload };
      case GET_COMICS_BY_ID:
        return { comics: action.payload };

      default:
        return state;
    }
  };