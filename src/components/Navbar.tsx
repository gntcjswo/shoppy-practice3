import { Link } from 'react-router-dom';
import { Button } from './ui/buttons/Button';
import styles from './Navbar.module.scss';
import UserProfile from './UserProfile';
import classNames from 'classnames';
import { useAuthContext } from 'context/authContext';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  return (
    <header className={styles.header}>
      <div className={classNames('inner', styles.headerInner)}>
        <h1>
          <Link to='/'>
            <img src='/img/logo.svg' alt='Home' />
          </Link>
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
            <li>
              <Link to='/portfolio'>Portfolio</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
