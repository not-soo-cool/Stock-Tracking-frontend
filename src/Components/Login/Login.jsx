import React, { useEffect, useState } from 'react'
import './Login.css'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import googleImg from '../LandingPage/Assets/google.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { loginUser } from '../../Actions/UserAction';

const Login = () => {

  // const googleAuth = () => {
  //   window.open(
  //     'http://localhost:80/auth/google/callback', "self"
  //   );
  // }

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [href, setHref] = useState(false);

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, message, isAuthenticated} = useSelector(state => state.auth)

    const loginHandler = (e) => {
        e.preventDefault();

        dispatch(loginUser(email, password));
        if(window.location.pathname.toString() === '/login'){
          // setHref(true);
          window.location.pathname = '/';
        }
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch({type: "clearErrors"})
        }
        if(message){
            alert.success(message);
            dispatch({type: "clearMessage"})
        }
      }, [alert, error, message, dispatch]);

      // if(window.location.pathname.toString() === '/login' && isAuthenticated){
      //   window.location.pathname = '/';
      // }


  return (
    <div className='sign-in'>
      <section>
        <div className="sign-inok">
          <form className='loginForm' onSubmit={loginHandler} action="" >
            <h2>Sign In</h2>
            <div className="input-box first">
              <input type="email" placeholder='Email*' 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            <div className="input-box second">
                <input type="password" placeholder='Password*' 
                required 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} />
                
            </div>

            <div className="input-box seventh" style={{
              marginTop: '10px'
            }}>
                <input type="submit" value='Submit' id='btn' />
            </div>

            <div className="input-box tenth" style={{
              marginTop: '10px'
            }}>
                {/* <Link to={'/auth/google/callback'}> */}
                    <button 
                    className='google_btn' 
                    // onClick={googleAuth}
                    >
                        <img src={googleImg} alt="google icon" />
                        <span>Sign In with Google</span>
                    </button>
                {/* </Link> */}
            </div>

            <div className="group" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '0',
              padding: '0'
            }}>
              {/* <Link to={'/signup'}>New User? Sign Up</Link> */}
              <br />
              <a href="../forgot/password">Forgot Password?</a>
            </div>

          </form>
        </div>
      </section>
    </div>
  )
}

export default Login
