import React, { useState , useEffect} from 'react';
import Spinner from '../Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import View from './View';
import './randomChar.scss';
import useMarvelService from '../../services/marvelService';

import mjolnir from '../../resources/img/mjolnir.png';





const RandomChar = ({ onCharSelected }: { onCharSelected: (id: number) => void}) => {

    const { getCharacter } = useMarvelService();
    
    const initianChar = {
        name: '',
        description: '',
        thumbnail: '',
        homepage: '',
        wiki: '',
        id: 0
    }
    const[char, setChar] = useState(initianChar);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(false);



    useEffect(() => {updateChar()}, []);

    const onError =() => {
        setLoading(false);
        setError(true)
        
    }
    
   
    const updateChar = async () => {
        const id =/*  1011005;  */Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        await getCharacter(id)
        .then(res => { setChar(res); setLoading(false);})
        .catch(onError)                               
    }


    const errorMessage = error ? <ErrorMessage/>: null;
    const spinner = loading ? <Spinner/> :  null;
    const content = !(loading || error) ? <View char={char} onCharSelected={onCharSelected}/> : null;




    return (
        <div className="randomchar">
            {errorMessage}
           {spinner}
           {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={() => updateChar()}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}



export default RandomChar;