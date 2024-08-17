import React from 'react';
import styles from './AllProducts.module.scss';
import { Link } from 'react-router-dom';

export default function AllProducts() {
  return (
    <div>
      <div className={styles.head}>
        <h2>Title</h2>
        <Link to='/portfolio/new'>포트폴리오 등록</Link>
      </div>
    </div>
  );
}
