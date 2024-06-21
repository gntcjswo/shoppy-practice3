import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/buttons/Button';
import { v4 as uuidv4 } from 'uuid';
import styles from './Navbar.module.scss';
import UserProfile from './UserProfile';
import { login, logout, onUserStateChange } from 'api/firebase';
import classNames from 'classnames';

export default function Navbar() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <header className={styles.header}>
      <div className={classNames('inner', styles.headerInner)}>
        <h1>
          <Link to='/'>Shop</Link>
        </h1>
        <nav>
          <div className={styles.user}>
            <UserProfile />
            {!user && (
              <Button theme='strong' icon='login' size='max' onClick={login}>
                Login
              </Button>
            )}
            {user && (
              <Button theme='strong' icon='logout' size='max' onClick={logout}>
                Logout
              </Button>
            )}
          </div>
          <ul className={styles.gnb}>
            <li key={uuidv4()}>
              <Link to='/products'>Products</Link>
            </li>
            <li key={uuidv4()}>
              <Link to='/cartss'>My Carts</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
