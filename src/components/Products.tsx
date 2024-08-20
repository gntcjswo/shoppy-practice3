import { useQuery } from '@tanstack/react-query';
import { getPortfolio } from 'api/firebase';
import React from 'react';
import PortfolioCard from './PortfolioCard';
import styles from './Products.module.scss';
import useProducts from 'hooks/useProducts';

export default function Products() {
  const {
    portfoliosQuery: { isLoading, error, data: portfolios },
  } = useProducts();
  return (
    <div className={styles.portfolioWrap}>
      {isLoading && <p>Loading...</p>}
      {error && <p>{(error as Error).message}</p>}
      <ul className={styles.portfolioInner}>{portfolios && portfolios.map((portfolio) => <PortfolioCard key={portfolio.id} portfolio={portfolio} />)}</ul>
    </div>
  );
}
