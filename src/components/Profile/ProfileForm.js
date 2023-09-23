import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import { Context } from '../../stores/Context';

const ProfileForm = () => {
  const newPasswordInputRef = useRef('');
  const ctx = useContext(Context);

  const submitHandler = e => {
    e.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDb3kl9vHPRPfr26tmQ8MpBW_tTJktLk7M',{
      method: 'POST',
      body: JSON.stringify({
        idToken:ctx.token,
        password:enteredNewPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {

    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength={7} ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
