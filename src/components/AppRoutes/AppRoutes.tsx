import React, {useState, useContext, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import Chars from '../pages/Chars';
import Comics from '../pages/Comics';
import Login from '../Login/Login';
import Context from '../../context/context';


const AppRoutes = () => {
    const { isLogin, setIsLogin} = useContext(Context);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            return setIsLogin(false);
        }
        else {console.log('err' + token)};
    }, [])
    return (
        isLogin ? 

      <>
        <Routes>
                <Route path='/comics' element={<Comics/>}/>
                <Route path='*' element={<Chars/>}/>
            </Routes>
      </>
         :
        <Routes>
             <Route path='*' element={<Login/>}/>
        </Routes>
    );
};

export default AppRoutes;