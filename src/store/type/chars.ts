

export enum CharActionType{
    GET_CHARTERS = 'GET_CHARTERS',
    GET_CHARTERS_BY_NAME = 'GET_CHARTERS_BY_NAME',
    LOADING_CHANGE_CHARS = 'LOADING_CHANGE_CHARS',
    ERROR_LOADING_CHANGE_CHARS = 'ERROR_LOADING_CHANGE_CHARS'
  
}
export interface CharState {
    chars: IChar[], 
    loading: boolean,
    offset: number,
    error: boolean
}

export interface IRanChar{
    name: string;
    description: string;
    thumbnail: string;
    homepage: string;
    wiki: string;
    id: number;
}

export interface IChar {
    id: number
    name: string;
    description: string;
    thumbnail: string;
    homepage: string ;
    wiki: string;
    comics: IComics[];
  }

  export interface IComics {
    name: string;
    resourceURI: string
  }

  interface GetChartersAction  {
    type: CharActionType.GET_CHARTERS,
    payload: IChar[]
  }
  
  interface GetChartersActionByName  {
    type: CharActionType.GET_CHARTERS_BY_NAME,
    payload: IChar
  }
  interface GetChartersActionByName  {
    type: CharActionType.GET_CHARTERS_BY_NAME,
    payload: IChar
  }

  interface CharsLoadingChange  {
    type: CharActionType.LOADING_CHANGE_CHARS,
    payload?: Boolean
  }

  interface ErrorCharsLoadingChange  {
    type: CharActionType.ERROR_LOADING_CHANGE_CHARS,
    payload?: Boolean
  }

  export type CharAction = GetChartersAction | GetChartersActionByName | CharsLoadingChange | ErrorCharsLoadingChange