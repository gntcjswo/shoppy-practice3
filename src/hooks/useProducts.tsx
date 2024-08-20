import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPortfolio as fetchPortfolios, addNewPortfolio } from '../api/firebase';
import { Portfolio } from 'pages/NewProducts';

export default function useProducts() {
  const queryClient = useQueryClient();

  const portfoliosQuery = useQuery({
    queryKey: ['portfolios'],
    queryFn: fetchPortfolios,
    staleTime: 1000 * 60,
  });

  type AddPortfolioTypes = {
    portfolio: Portfolio;
    url: string;
  };

  const addPortfolio = useMutation({
    mutationFn: ({ portfolio, url }: AddPortfolioTypes) => addNewPortfolio(portfolio, url),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['portfolios'] }),
  });

  return { portfoliosQuery, addPortfolio };
}
