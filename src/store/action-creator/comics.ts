import http from "../../http";
import { Dispatch } from "react";
import { ComicsActionType, ComicsAction } from "../type/comics";

const {GET_COMICS, GET_COMICS_BY_ID} = ComicsActionType


    const _apiKey = process.env.REACT_APP_API_KEY || '64f63a18b77252098a09fa6b7f149abb';
    const _baseOffset = 210;

    const getResource = async (url: string) => {
      try {
        return await http.get(url);
      } catch (err) {
        alert(err);
      }
    };
  
   
  
export const getAllComics = async (offset = _baseOffset) => {
  return async (dispatch: Dispatch<ComicsAction>) => {
        try {
          const res = await getResource(`/comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
          const comics =  res?.data.data.results.map(_transformComics);
          dispatch({ type: GET_COMICS, payload: comics });
        } catch (err) {
          console.log(err);
          throw 'Bad request for get all comics' + err;
        }
    }
  };

export const getComics = async (id: number) => {
  return async (dispatch: Dispatch<ComicsAction>) => {
      try {
          const res = await getResource(`/comics/${id}?${_apiKey}`);
          const comics = _transformComics(res?.data.data.results[0]);
          dispatch({ type: GET_COMICS_BY_ID, payload: comics });
        } catch (err) {
          console.log(err);
          throw 'Bad request for get comics' + err;
        }
    }
  };

    

export const _transformComics = (comics: any) => {
    return {
        id: comics.id,
        title: comics.title,
        description: comics.description || 'There is no description',
        pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
        thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
        language: comics.textObjects.language || 'en-us',
        price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
    };
    };