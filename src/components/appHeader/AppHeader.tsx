import './appHeader.scss';
import React,{ useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Context from '../../context/context';

const AppHeader = () => {
  const currenLocation = useLocation();
  const {isLogin, setIsLogin } = useContext(Context);
  const routes = [
    {
      path: '/chars',
      name: 'Characters',
    },
    {
      path: '/comics',
      name: 'Comics',
    },

  ];

  
  const exitLogin = () => {
    setIsLogin(false);
    localStorage.removeItem('token');
  }

  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span><br/> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        {isLogin?<ul>
                     {
                            routes.map(route =>  
                                <li className="nav-item" key={route.path}>
                                    <Link 
                                        className={`nav-link ${route.path === currenLocation.pathname && 'active'}`}
                             /*            style={({ isActive }) => ({color: isActive ? "#9F0013" : 'inherit'})} */
                                        to={route.path}>{route.name}

                                    </Link>
                                </li>)
                        }
                      <li 
                          className="nav-item"
                          onClick={() => exitLogin()}
                          >
                                    <p className={`nav-link`}>Exit</p>
                                </li>
        </ul>: <></>}
      </nav>
    </header>
  );
};

export default AppHeader;