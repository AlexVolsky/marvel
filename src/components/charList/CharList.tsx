import React, { useState , useEffect} from 'react';
import './charList.scss';
import Spinner from '../Spinner';
import CharCard from './CharCard';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useSelector } from 'react-redux';
import { useActionCreator } from '../../hooks/useActionCreator';

import { IChar } from '../../store/type/chars';

const CharList = ({ onCharSelected }: { onCharSelected: (id: number) => void}) => {


      const {chars, error, loading, offset} = useSelector(
        (store: { chars: { chars: IChar[]; error: boolean; loading: boolean; offset: number}}) => store.chars
      );
 
      const { getAllCharacters } = useActionCreator();

        const[newItemLoading, setNewItemLoading] = useState(false);
        const[charEnded, setCharEnded] = useState(false);


        useEffect(() => {getAllCharacters(offset)}, []);

        const updateChars =() => {
            onRequest();   
        }

        const onRequest = async (offset?: number) => {


            await getAllCharacters(offset);
            /* .then(onCharListLoaded)
            .catch(onError) */ 
        }

        const onCharListLoading = () => {
            setNewItemLoading(true);
        }

        const onCharListLoaded = (newChars: IChar[]) => {
            let ended = false;
            if(newChars.length < 9){
                ended = true;
            }
            setNewItemLoading(false);
            setCharEnded(ended);


        }

        const spinner = loading ? <div style={{position: 'relative', zIndex: '50', left: 'calc(8vw + 3.5vmax)'}}><Spinner /></div> :  null;
        const content = !error ? <CharCard /* chars={chars} */ onCharSelected={onCharSelected}/> : null;
        const errorMessage = !loading && error ? <ErrorMessage/> : null


    return (
        <div className="char__list">
            {errorMessage}
            <ul className="char__grid">
                {content}
                {spinner}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => getAllCharacters(offset)}>
                <div className="inner">load more</div>
            </button>

        </div>
    )
}

export default CharList;