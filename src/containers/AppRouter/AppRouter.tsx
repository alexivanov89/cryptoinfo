import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

const Layout = lazy(() => import('../../components/Layout/Layout'));
const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
const Page2 = lazy(() => import('../../pages/Page2/Page2'));
const CoinPage = lazy(() => import('../../pages/CoinPage/CoinPage'));

export const enum AppRoutes {
  mainPage = '/',
  cryptaPage = 'crypta/:id',
  page2 = '/page2',
}

const AppRouter = () => {
  const routes = useRoutes([
    {
      path: AppRoutes.mainPage,
      element: <Layout />,
      children: [
        { path: AppRoutes.mainPage, element: <MainPage /> },
        { path: AppRoutes.page2, element: <Page2 /> },
        { path: AppRoutes.cryptaPage, element: <CoinPage /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to={AppRoutes.mainPage} replace />,
    },
  ]);
  return routes;
};

export default AppRouter;
