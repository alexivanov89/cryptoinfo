import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../components/Page';
import { useAppDispatch } from '../../hooks';
import { fetchCurrentCoin } from '../../store/slices/coinsSlice';

const CoinPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(fetchCurrentCoin(id));
  }, [dispatch, id]);
  return (
    <Page title={`${id} | CryptaInfo`} description={`${id}`}>
      <div>CoinPage {id}</div>
    </Page>
  );
};

export default CoinPage;
