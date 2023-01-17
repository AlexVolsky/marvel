import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { IRanChar } from '../randomChar/interfaceChar';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/marvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './searchChar.scss';

const SearchChar = ({ onCharSelected }: { onCharSelected: (id: number) => void}) => {
    const [char, setChar] = useState<IRanChar[]>();
    const [error, setError] = useState<boolean>(false);
    const {getCharactersByName} = useMarvelService();
    const [charName, setCharName] = useState<string>('');

    const onCharLoaded = (char: IRanChar[]) => {
        setChar(char);
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCharName(event.target.value)
    }
    const updateChar = (name: string) => {
        getCharactersByName(name)
            .then((charRespons: IRanChar[]) => {
                onCharLoaded(charRespons);
                onCharSelected(charRespons[0].id)
                setError(false)
            })
            .catch(() => setError(true));
    }
    const submitFunctiom = () => {
            if(charName === '')return;
            updateChar(charName)
        
    }
    const results = !char ? null : char.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">your character {char[0].name} is found</div>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className="char__search-form">
            <div>
                <label htmlFor="">Find a character by name:</label>
                <div className="char__search-wrapper">
                    <input 
                        id="charName" 
                        name='charName' 
                        type='text' 
                        placeholder="Enter name"
                        onChange={event => onChange(event)}
                    />
                    <button 
                            type='submit' 
                            className="button button__main"
                            onClick={submitFunctiom}
                        >
                            <div className="inner">find</div>
                    </button>
                </div>
            </div>

            {results}
        </div>
    )
}

export default SearchChar;















































































 {/* <Formik
                initialValues = {{
                    charName: ''
                }}
                onSubmit = { ({charName} : {charName: string}) => {
                    if(charName !== ''){updateChar(charName)};
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik> */}