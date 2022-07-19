import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AppRouter } from '../AppRouter';

const App = () => {
  return (
    <Suspense fallback={<div> ... Загрузка</div>}>
      <ErrorBoundary fallback={<div>Что-то пошло не так...</div>}>
        <AppRouter />
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
