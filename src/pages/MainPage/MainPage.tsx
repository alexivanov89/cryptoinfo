import { CoinsList } from '../../components/CoinsList';
import { Page } from '../../components/Page';

const MainPage = () => {
  return (
    <Page title="MainPage | CryptaInfo" description="Mainpage">
      <CoinsList />
    </Page>
  );
};

export default MainPage;
