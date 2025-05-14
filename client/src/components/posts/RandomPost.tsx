import { getRandomPost } from '@/services/postServices';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../common/Loading';

export const RandomPost = () => {
  const { data, isPending } = useQuery({
    queryFn: getRandomPost,
    queryKey: ['posts', { type: 'random' }],
  });

  if (isPending) return <Loading />;

  return <div>{data?.data.title}</div>;
};
