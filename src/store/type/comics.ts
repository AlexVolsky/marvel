export enum ComicsActionType{
    GET_COMICS = 'GET_COMICS',
    GET_COMICS_BY_ID = 'GET_COMICS_BY_ID',
  }

  export interface ComicsState {
    comics: IComics[];
}



  export interface IComics {
    description: string;
    id: number;
    language: string;
    pageCount: string;
    price: string;
    thumbnail: string;
    title: string;
  }

  interface GetComicsAction {
    type: ComicsActionType.GET_COMICS, 
    payload: IComics[]
  }
  interface GetComicsByIdAction {
    type: ComicsActionType.GET_COMICS_BY_ID,
    payload: IComics
  }

  export type ComicsAction = GetComicsAction | GetComicsByIdAction