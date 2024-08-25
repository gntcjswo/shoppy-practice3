import PortfolioCard from './PortfolioCard';
import styles from './Products.module.scss';
import useProducts from 'hooks/useProducts';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Products() {
  const {
    portfoliosQuery: { isLoading, error, data: portfolios },
  } = useProducts();
  return (
    <div className={styles.portfolioWrap}>
      {isLoading && <DotLottieReact src='/path/loading.json' loop autoplay />}
      {error && <p>{(error as Error).message}</p>}
      <ul className={styles.portfolioInner}>{portfolios && portfolios.map((portfolio) => <PortfolioCard key={portfolio.id} portfolio={portfolio} />)}</ul>
    </div>
  );
}
