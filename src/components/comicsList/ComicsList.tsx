import React, { useState , useEffect, useRef} from 'react';
import './comicsList.scss';
import { IComics } from '../../store/type/comics';
import ViewComics from './ComicsCard';
import useMarvelService from '../../services/marvelService';






import Spinner from '../Spinner';

const ComicsList = ({ onComicSelected }: { onComicSelected: (id: number) => void}) => {
    const { getAllComics } = useMarvelService();
    const[comics, setComics] = useState<IComics[]>([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(false);
    const[newItemLoading, setNewItemLoading] = useState(false);
    const[offset, setOffset] = useState(210);
    const[comicsEnded, setComicsEnded] = useState(false);
    useEffect(() => {updateComics()}, []);

   const updateComics = () => {
       onRequest();   
   }

   const onRequest = async (offset?: number) => {
       onComicsListLoading();
       setLoading(true);
       await getAllComics(offset)
       .then(onComicsListLoaded)
       .catch(onError) 
   }

   const onComicsListLoading = () => {
         setNewItemLoading(true);
    }

   const onComicsListLoaded = (newComics: IComics[]) => {
    let ended = false;
    if(newComics.length < 9){
        ended = true;
    }

    setComics([...comics, ...newComics]);
    setLoading(false);
    setNewItemLoading(false);
    setOffset(offset => offset + 8);
    setComicsEnded(ended);
    


}

const onError = () => {
    setLoading(false);
        setError(true);
   
}
const loadingSpiner = loading ? <Spinner/> : null;
const content = comics ? <ViewComics comics={comics} onComicSelected={onComicSelected}/> : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                   
                    
                    {content}
                    {loadingSpiner}
                    
            </ul>
            <button 
                className="button button__main button__long"
               
                onClick={() => onRequest(offset)}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;



