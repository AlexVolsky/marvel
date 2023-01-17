import React, {useState, ChangeEvent, FormEvent, useContext} from 'react';
import http from '../../http';
import Context from '../../context/context';
import './login.scss';

const Login = () => { 
    const {setIsLogin } = useContext(Context);
    const [loginData, setloginData] = useState<{username: string; password: string}>({username: 'mor_2314', password: '83r5^_'});
    
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.id
        setloginData({...loginData, [field]: event.target.value})
        }

       /*  if(localStorage.getItem('token')){
            setIsLogin(true);
        } */

        /* console.log(localStorage.getItem('token')); */

        const login = async(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            try{
                const isLoginDta = await http.post('https://fakestoreapi.com/auth/login', loginData);
                if(isLoginDta.data){
                    alert('Welcom');
                    localStorage.setItem('token', isLoginDta.data.token);
                    setIsLogin(true);
                }
            }
            catch(err){
                console.log(err);
                alert('err');
            
            }
            
        }
    return (
        <form className="row g-3 d-flex h-100 w-100  justify-content-center align-items-center" onSubmit={login}>
            <div className="col-auto">
                <label htmlFor="staticEmail2" className="visually-hidden">Email</label>
                <input type="text"  
                       className="form-control"
                       placeholder='Login' 
                       id="username" 
                       value={loginData.username}
                       onChange={onChange}/>
                      
            </div>
            <div className="col-auto">
                <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={loginData.password}
                       onChange={onChange}/>
                      
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-danger" >Confirm identity</button>
            </div>
      </form>
    );
};

export default Login;