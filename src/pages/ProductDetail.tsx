import { useQuery } from '@tanstack/react-query';
import { getPortfolioDetail } from 'api/firebase';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: portfolios,
  } = useQuery({
    queryKey: ['portfolios'],
    queryFn: () => getPortfolioDetail(id),
  });
  return (
    <div>
      {portfolios &&
        portfolios.map((portfolio) => {
          return (
            <div>
              {portfolio.image.map((img: string, index: number) => (
                <img src={img} alt={`detail image ${index}`} />
              ))}
            </div>
          );
        })}
    </div>
  );
}
