import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import { Context } from '../../stores/Context';

const AuthForm = () => {
  const ctx = useContext(Context);

  const emailInputRef = useRef('');
  const passwordInputRef = useRef('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = e => {
    e.preventDefault();
    
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDb3kl9vHPRPfr26tmQ8MpBW_tTJktLk7M'
    }else{
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDb3kl9vHPRPfr26tmQ8MpBW_tTJktLk7M';
    }

    fetch(url,{
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        setIsLoading(false);
        if(res.ok){
          return res.json()
        }else{
          return res.json().then(data => {
            let errorMessage = 'Authentication Failed!';
            // if(data && data.error && data.error.message){
            //   errorMessage = data.error.message;
            // }
            throw new Error(errorMessage);
          })
        }
      }).then(data => {
        ctx.login(data.idToken);
      }).catch(err => {
        alert(err.message);
      })

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {isLoading ? <p>Sending Request...</p> : <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
