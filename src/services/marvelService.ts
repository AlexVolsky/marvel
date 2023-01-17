import http from '../http';


const useMarvelService = () => {
  const _apiKey = process.env.REACT_APP_API_KEY || '64f63a18b77252098a09fa6b7f149abb';
  const _baseOffset = 210;
  const getResource = async (url: string) => {
    try {
      return await http.get(url);
    } catch (err) {
      alert(err);
    }
  };

  const getAllCharacters = async (offset =_baseOffset) => {
    try {
    const res = await getResource(`/characters?limit=9&offset=${offset}&${_apiKey}`);
      return res?.data.data.results.map(_transformCharacter);
    } catch (err) {
      console.log(err);
      throw 'Bad request for get all charters' + err;
    }
    /* .then((res: any) => {res.data.ata.results.map(_transformCharacter)}) */
  };

  const getAllComics = async (offset = _baseOffset) => {
    try {
      const res = await getResource(`/comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
      return res?.data.data.results.map(_transformComics);
    } catch (err) {
      console.log(err);
      throw 'Bad request for get all comics' + err;
    }
  };

  const getCharacter = async (id: number) => {
    try {
      const res = await getResource(`/characters/${id}?${_apiKey}`);
      return _transformCharacter(res?.data.data.results[0]);
    } catch (err) {
      console.log(err);
      throw 'Bad request for get charter' + err;
    }
  };

  const getCharactersByName = async (name: string) => {
    try {
    const res = await getResource(`/characters?name=${name}&${_apiKey}`);
      return res?.data.data.results.map(_transformCharacter);
    } catch (err) {
      console.log(err);
      throw 'Bad request for get charter by name' + err;
    }
    /* .then((res: any) => {res.data.ata.results.map(_transformCharacter)}) */
  };

  const getComics = async (id: number) => {
    const res = await getResource(`/comics/${id}?${_apiKey}`);
    return _transformComics(res?.data.data.results[0]);
  };

  const _transformCharacter = (char: any) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    };
  };

  const _transformComics = (comics: any) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects.language || 'en-us',
      price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
    };
  };

  return { getAllCharacters, getCharacter, getAllComics, getComics, getCharactersByName}

}

export default useMarvelService;


