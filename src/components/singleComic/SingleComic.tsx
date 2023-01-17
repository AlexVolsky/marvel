import React, { useEffect, useState } from 'react';
import './singleComic.scss';
import { IComics } from '../InterfaceComic';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/marvelService';
import Spinner from '../Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SingleComic = ({ ComicId }: { ComicId: number }) => {
    const initialComic = {
        description: '',
        id: 0,
        language: '',
        pageCount: '',
        price:  '',
        thumbnail: '',
        title:  '',
      };

      const {getComics} = useMarvelService();
      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<boolean>(false);
      const [comic, setComic] = useState<IComics>(initialComic);

      useEffect(() => {
        updateComic();
      }, [ComicId]);
    
    
      const updateComic = () => {
        if (!ComicId) return;
        onCharLoading();
        getComics(ComicId)
          .then(onCharLoaded)
          .catch(onError);
      };

      const closeSingleComic = () =>{
        setComic(initialComic);
        
      }
    
      const onCharLoaded = (char: IComics) => {
        setComic(char);
        setLoading(false);
      };
    
      const onCharLoading = () => {
        setLoading(true);
      };
    
      const onError = () => {
        setLoading(false);
        setError(true);
      };

      const errorMessage = error ? <ErrorMessage/> : null;
      const spinner = loading ? <div style={{position: 'absolute', top: "40vh", zIndex: '50', left: '28vw'}}><Spinner /></div> : null;
      const content = !(loading || error || !comic.description) ? <ViewComic comic={comic} closeSingleComic={closeSingleComic}/> : null;

    return (
        <>
        {errorMessage}
        {spinner}
        {content}
        
        </>
       
    )
}

const ViewComic = ({ comic, closeSingleComic }: { comic: IComics, closeSingleComic:() => void }) => {
    const { description, thumbnail, language, pageCount, price, title} = comic;
 
    return (
      <>
            <div className="single-comic" >
                <img src={thumbnail} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">page count: {pageCount}</p>
                    <p className="single-comic__descr">language: {language}</p>
                    <div className="single-comic__price">price: {price}</div>
                </div>
                <button 
                    className="single-comic__back"
                    onClick={closeSingleComic}
                >	
                🞮</button>
            </div>
      </>
    );
  };

export default SingleComic;