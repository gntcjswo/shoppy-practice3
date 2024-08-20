import React from 'react';
import styles from './PortfolioCard.module.scss';
import { Button } from './ui/buttons/Button';
import { useNavigate } from 'react-router-dom';

type portfolioProps = {
  portfolio: {
    id: string;
    image: string;
    title: string;
    description: string;
  };
};

export default function PortfolioCard({ portfolio: { id, image, title, description } }: portfolioProps) {
  const navigate = useNavigate();

  return (
    <li className={styles.portfolioBox}>
      <figure>
        <img src={image[0]} alt={title} />
      </figure>
      <div className={styles.txtbox}>
        <h3>{title}</h3>
        <ul>
          {description.split('\n').map((line, index) => {
            return <li key={id + index}>{line}</li>;
          })}
        </ul>
      </div>
      <div className={styles.btn}>
        <Button theme='conversion' size='max' text='상세보기' onClick={() => navigate(`/portfolio/${id}`)} />
      </div>
    </li>
  );
}
