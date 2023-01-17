import React, {useState} from 'react';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';

const Comics = () => {
  const [selectedComic, setSelectedComic] = useState<number>(0);

  const onComicSelected = (id: number) => {
    setSelectedComic(id);
    console.log(selectedComic);
  };
    return (
        <>
          <AppBanner/>
          <SingleComic ComicId={selectedComic}/>
          <ComicsList onComicSelected={onComicSelected}/>   
        </>
    );
};

export default Comics;