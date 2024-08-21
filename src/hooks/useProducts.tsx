import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPortfolio as fetchPortfolios, addNewPortfolio, updateOldPortfolio, removeFromPortfolio } from '../api/firebase';
import { Portfolio } from 'pages/NewProducts';

type AddPortfolioTypes = {
  portfolio: Portfolio;
  urls: string[];
};

type UpdatePortfolioTypes = {
  portfolio: Portfolio;
  urls: string[];
  id: string;
};

export default function useProducts() {
  const queryClient = useQueryClient();

  const portfoliosQuery = useQuery({
    queryKey: ['portfolios'],
    queryFn: fetchPortfolios,
    staleTime: 1000 * 60,
  });

  const addPortfolio = useMutation({
    mutationFn: ({ portfolio, urls }: AddPortfolioTypes) => addNewPortfolio(portfolio, urls),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['portfolios'] }),
  });

  const updatePortfolio = useMutation({
    mutationFn: ({ portfolio, urls, id }: UpdatePortfolioTypes) => updateOldPortfolio(portfolio, urls, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['portfolios'] }),
  });

  const removePortfolio = useMutation({
    mutationFn: (id: string) => removeFromPortfolio(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] });
    },
  });

  return { portfoliosQuery, addPortfolio, updatePortfolio, removePortfolio };
}
