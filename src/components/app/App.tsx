import React, {useState} from 'react';
import AppHeader from '../appHeader/AppHeader';
import AppRoutes from '../AppRoutes/AppRoutes';
import Context from '../../context/context';




const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <Context.Provider value={{ isLogin, setIsLogin}}>
        <div className="app">
          <AppHeader/>
          <main>
              <AppRoutes/>
          </main>
        </div>
      </Context.Provider>
  );
};

export default App;