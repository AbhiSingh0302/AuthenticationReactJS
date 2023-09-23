import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import { Context } from '../../stores/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MainNavigation = () => {
  const history = useHistory();
  const ctx = useContext(Context);

  const logoutHandler = () => {
    ctx.logout();
    history.replace('/auth');
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!ctx.isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}

          {ctx.isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          
          {ctx.isLoggedIn && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
