import React from 'react';
import { IRanChar } from '../../store/type/chars';
const View = ({char, onCharSelected} : {char: IRanChar, onCharSelected: (id: number) => void}) => {
    
    const {id, name, description, thumbnail, homepage, wiki} = char;
    let imgStyleCover : object  = {'objectFit' : 'cover'};
    let linkImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    let imgStyleContain : object= {'objectFit' : 'contain'};
    console.log(id);
   
    
    return <div 
        className="randomchar__block"
        onClick={() => onCharSelected(id)}
        >
                <img src={thumbnail} alt="Random character" className="randomchar__img" style={thumbnail === linkImg ? imgStyleContain : imgStyleCover}/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">{!description ? 'Unfortunately there is no description for this character.' : description}</p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
};

export default View;