import React from 'react';
import styles from './AllProducts.module.scss';
import { LinkButton } from 'components/ui/buttons/Button';

export default function AllProducts() {
  return (
    <div>
      <div className={styles.head}>
        <h2>Title</h2>
        <LinkButton theme='strong' size='s' href='/portfolio/new' text='포트폴리오 등록' />
      </div>
    </div>
  );
}
