import { useQuery } from '@tanstack/react-query';
import { getPortfolioDetail } from 'api/firebase';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.scss';
import { Button, LinkButton } from 'components/ui/buttons/Button';
import { useAuthContext } from 'context/authContext';

export default function ProductDetail() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: portfolios,
  } = useQuery({
    queryKey: ['portfoliosDetail', id],
    queryFn: () => getPortfolioDetail(id),
  });

  return (
    <div>
      {/* {isLoading && <p>Loading...</p>} */}
      {portfolios &&
        portfolios.map((portfolio) => {
          return (
            <div className={styles.detailWrap}>
              <div className={styles.txtBox}>
                <h3>{portfolio.title}</h3>
                <ul>
                  {portfolio.description.split('\n').map((line: string, index: number) => {
                    return <li key={portfolio.id + index}>{line}</li>;
                  })}
                </ul>
                <div className={styles.btn}>
                  <LinkButton theme='conversion' size='max' text='바로가기' href={portfolio.link} target='_blank' />
                  {user && user.isAdmin && (
                    <div className={styles.adminBtn}>
                      <Button theme='conversion' size='max' text='수정하기' />
                      <Button theme='default' size='max' text='삭제하기' />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.imgBox}>
                {portfolio.image.map((img: string, index: number) => (
                  <img src={img} alt={`detail image ${index}`} />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
