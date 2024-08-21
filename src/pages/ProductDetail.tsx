import { useQuery } from '@tanstack/react-query';
import { getPortfolioDetail } from 'api/firebase';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetail.module.scss';
import { Button, LinkButton } from 'components/ui/buttons/Button';
import { useAuthContext } from 'context/authContext';
import useProducts from 'hooks/useProducts';

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

  const navigate = useNavigate();

  const modifyPortfolio = (portfolio: any) => {
    if (user && user.isAdmin) {
      navigate(`/portfolio/modify/${id}`, { state: { portfolio } });
    }
  };

  const { removePortfolio } = useProducts();
  const deletePortfolio = () => {
    if (user && user.isAdmin && id) {
      const confirmation = window.confirm('삭제하시겠습니까?');
      if (confirmation) {
        removePortfolio.mutate(id);
        navigate('/portfolio');
      }
    }
  };

  return (
    <div>
      {/* {isLoading && <p>Loading...</p>} */}
      {portfolios &&
        portfolios.map((portfolio, index) => {
          return (
            <div className={styles.detailWrap} key={`${portfolio.id}-${index}`}>
              <div className={styles.txtBox}>
                <h3>{portfolio.title}</h3>
                <ul>
                  {portfolio.description && portfolio.description.includes('\n') ? ( //
                    portfolio.description.split('\n').map((line: string, index: number) => <li key={`des-${portfolio.id}-${index}`}>{line}</li>)
                  ) : (
                    <li key={`des-${portfolio.id}`}>{portfolio.description}</li>
                  )}
                </ul>
                <div className={styles.btn}>
                  <LinkButton theme='conversion' size='max' text='바로가기' href={portfolio.link} target='_blank' />
                  {
                    <div className={styles.adminBtn}>
                      <Button
                        theme='conversion'
                        size='max'
                        text='수정하기'
                        onClick={() => modifyPortfolio(portfolio)}
                        disabled={user && user.isAdmin ? false : true}
                        title={user && user.isAdmin ? '포트폴리오 등록하기' : '관리자 권한이 필요합니다.'}
                      />
                      <Button
                        theme='default'
                        size='max'
                        text='삭제하기'
                        onClick={() => deletePortfolio()}
                        disabled={user && user.isAdmin ? false : true}
                        title={user && user.isAdmin ? '포트폴리오 등록하기' : '관리자 권한이 필요합니다.'}
                      />
                    </div>
                  }
                </div>
              </div>
              <div className={styles.imgBox}>
                {portfolio.image.map((img: string, index: number) => (
                  <img src={img} alt={`detail image ${index}`} key={`img-${portfolio.id}-${index}`} />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
