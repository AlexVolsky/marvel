import React, { useState , useEffect, useRef} from 'react';
import './charList.scss';
import Spinner from '../Spinner';
import CharCard from './CharCard';
import useMarvelService from '../../services/marvelService';
import { IChar } from '../charInfo/CharInfo';


const CharList = ({ onCharSelected }: { onCharSelected: (id: number) => void}) => {
    
    const { getAllCharacters } = useMarvelService();
        const[chars, setChars] = useState<IChar[]>([]);
        const[loading, setLoading] = useState(true);
        const[error, setError] = useState(false);
        const[newItemLoading, setNewItemLoading] = useState(false);
        const[offset, setOffset] = useState(210);
        const[charEnded, setCharEnded] = useState(false);



        useEffect(() => {updateChars()}, []);

        const updateChars =() => {
            onRequest();   
        }

        const onRequest = async (offset?: number) => {
            onCharListLoading();
            setLoading(true);
            await getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError) 
        }

        const onCharListLoading = () => {
            setNewItemLoading(true);
        }

        const onCharListLoaded = (newChars: IChar[]) => {
            let ended = false;
            if(newChars.length < 9){
                ended = true;
            }

            setChars([...chars, ...newChars]);
            setLoading(false);
            setNewItemLoading(false);
            setOffset(offset => offset + 9);
            setCharEnded(ended);
            console.log(chars);


        }

        const onError = () => {
            setLoading(false);
            setError(true);
           
        }

        const spinner = loading ? <div style={{position: 'relative', zIndex: '50', left: 'calc(8vw + 3.5vmax)'}}><Spinner /></div> :  null;
        const content = !error ? <CharCard chars={chars} onCharSelected={onCharSelected}/> : null;


    return (
        <div className="char__list">
            {/* {errorMessage} */}
            <ul className="char__grid">
                {content}
                {spinner}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;