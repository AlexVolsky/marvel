import { IComics } from "../InterfaceComic";
import React from 'react';

const ViewComics = ({comics, onComicSelected} : { comics: IComics[], onComicSelected: (id: number) => void})=> {

      return (
        <>
          {comics.map((item) => 
            
                    <li 
                            className="comics__item"
                            key={item.id}
                            onClick={() => {
                              onComicSelected(item.id);
                            }}
                        >
                            <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-text">
                                <h2 className="comics__item-text-header">{item.title}</h2> 
                                <div className="comics__item-text-name">{item.description}</div>
                                <div className="comics__item-text-price">price: {item.price}</div>
                            </div>
                           
                        
                    </li>
          )}
        </>
      );
  
  };

  export default ViewComics;