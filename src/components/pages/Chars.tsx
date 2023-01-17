import React, {useState} from 'react';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import SearchChar from '../searchChar/SearchChar';

const Chars = () => {
    const [selectedChar, setSelectedChar] = useState<number>(0);

    const onCharSelected = (id: number) => {
      setSelectedChar(id);
    };
    return (
        <>
           <RandomChar onCharSelected={onCharSelected}/>
                  <div className="char__content">
                      <CharList onCharSelected={onCharSelected}/>
                      <div>
                            
                            <SearchChar  onCharSelected={onCharSelected}/>
                            <CharInfo charId={selectedChar}/>
                      </div>
                      
                  </div>  
        </>
    );
};

export default Chars;