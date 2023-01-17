import React from 'react';
import { IChar } from '../charInfo/CharInfo';

const CharCard = ({ chars, onCharSelected } : { chars: IChar[], onCharSelected: (id: number) => void})=> {
  let imgStyleCover: object = { 'objectFit': 'cover' };
  let linkImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  let imgStyleContain = { 'objectFit': 'contain' };

    return (
      <>
        {chars.map((item) => 

          <li className="char__item"
              key={item.id}
              onClick={() => {
                onCharSelected(item.id);
              }}
          >
            <img src={item.thumbnail} alt="abyss" style={item.thumbnail === linkImg ? imgStyleContain : imgStyleCover}/>
            <div className="char__name">{item.name}</div>
          </li>
        )
        }
      </>
    );

};

export default CharCard;