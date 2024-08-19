import { useQuery } from '@tanstack/react-query';
import { getPortfolio } from 'api/firebase';
import React from 'react';
import PortfolioCard from './PortfolioCard';
import styles from './Products.module.scss';

export default function Products() {
  const {
    isLoading,
    error,
    data: portfolios,
  } = useQuery({
    queryKey: ['portfolios'],
    queryFn: getPortfolio,
  });
  return (
    <div className={styles.portfolioWrap}>
      {isLoading && <p>Loading...</p>}
      {error && <p>{(error as Error).message}</p>}
      <ul className={styles.portfolioInner}>{portfolios && portfolios.map((portfolio) => <PortfolioCard key={portfolio.id} portfolio={portfolio} />)}</ul>
    </div>
  );
}
