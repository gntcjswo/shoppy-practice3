import { log } from 'console';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/buttons/Button';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <h1>
        <Link to='/'>Shop</Link>
      </h1>
      <nav>
        <div>
          <Button theme='strong' icon='login' size='max' onClick={() => console.log('click')}>
            Login
          </Button>
        </div>
        <ul className={styles.gnb}>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
