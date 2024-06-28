import React from 'react';
import styles from './UserProfile.module.scss';
import { User } from './Navbar';

type userProps = {
  user: User;
};

export default function UserProfile({ user }: userProps) {
  return (
    <div className={styles.userInfo}>
      <div className={styles.thumbs}>
        <img src={user.photoURL} alt={user.displayName} />
      </div>
      <span>{user.displayName}</span>
    </div>
  );
}
