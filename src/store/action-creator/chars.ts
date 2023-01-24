import http from "../../http";
import { Dispatch } from "react";
import { CharAction, CharActionType, IChar} from "../type/chars";


const {GET_CHARTERS, GET_CHARTERS_BY_NAME, LOADING_CHANGE_CHARS, ERROR_LOADING_CHANGE_CHARS } = CharActionType

const _apiKey = process.env.REACT_APP_API_KEY || '64f63a18b77252098a09fa6b7f149abb';
const _baseOffset = 210;
export  const getResource = async (url: string) => {
    try {
      return await http.get(url);
    } catch (err) {
      alert(err);
    }
  };

export const getAllCharacters = (offset =_baseOffset) => {
  return async (dispatch: Dispatch<CharAction>) => {
    try {
      dispatch({ type: ERROR_LOADING_CHANGE_CHARS, payload: false});
      dispatch({ type: LOADING_CHANGE_CHARS});
      const res: any = await getResource(`/characters?limit=9&offset=${offset}&${_apiKey}`);
      const data =  res?.data.data.results.map(_transformCharacter);
      dispatch({ type: GET_CHARTERS, payload: data });
      console.log(data);
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_LOADING_CHANGE_CHARS, payload: true});
      dispatch({ type: LOADING_CHANGE_CHARS});
      throw 'Bad request for get all charters' + err;
    }
  }
  };

export  const getCharactersByName = async (name: string) => {
  return async (dispatch: Dispatch<CharAction>) => {
      try {
          const res: any= await getResource(`/characters?name=${name}&${_apiKey}`);
          const data = res?.data.data.results.map(_transformCharacter);
          dispatch({ type: GET_CHARTERS_BY_NAME, payload: data });
      } catch (err) {
          console.log(err);
          throw 'Bad request for get charter by name' + err;
      }
  }
  };

export const _transformCharacter = (char: any) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    };
  };