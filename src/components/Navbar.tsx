import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/buttons/Button';
import { v4 as uuidv4 } from 'uuid';
import styles from './Navbar.module.scss';
import UserProfile from './UserProfile';
import { login, logout, onUserStateChange } from 'api/firebase';
import classNames from 'classnames';
import { ButtonProps } from './ui/buttons/Button';

export type User = {
  accessToken: string;
  auth: object;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: object;
  phoneNumber: any;
  photoURL: string;
  proactiveRefresh: object;
  providerData: Array<any>;
  providerId: string;
  reloadListener: any;
  reloadUserInfo: object;
  photoUrl: string;
  stsTokenManager: object;
  expirationTime: number;
  tenantId: any;
  uid: string;
  refreshToken: any;
};

export default function Navbar() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onUserStateChange((user: User) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <header className={styles.header}>
      <div className={classNames('inner', styles.headerInner)}>
        <h1>
          <Link to='/'>Shop</Link>
        </h1>
        <nav>
          <div className={styles.user}>
            {!user && <Button theme='strong' icon='login' size='max' onClick={login} text='Login' />}
            {user && (
              <>
                <UserProfile user={user} />
                <Button theme='strong' icon='logout' size='max' onClick={logout} text='Logout' />
              </>
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
