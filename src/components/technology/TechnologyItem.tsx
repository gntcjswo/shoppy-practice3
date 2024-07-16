import React from 'react';
import styles from './TechnologyItem.module.scss';

export interface techProps {
  img: string;
  title: string;
  content: string;
}

export default function TechnologyItem({ img, title, content }: techProps) {
  return (
    <div className={styles.technologyItem}>
      <div className={styles.simple}>
        <figure>
          <img src={`/img/${img}.png`} alt={title} />
        </figure>
        <p>{title}</p>
      </div>
      <div className={styles.detail}>{content}</div>
    </div>
  );
}
