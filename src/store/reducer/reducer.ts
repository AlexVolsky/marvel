import { combineReducers } from "redux";
import { comicsReducer } from "./comicsReducer";
import { charsReducer } from "./charsReduser";



export const rootReducer = combineReducers({
    comics: comicsReducer,
    chars: charsReducer,
});

