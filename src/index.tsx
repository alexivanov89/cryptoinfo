import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store';
import { App } from './containers/App';
import { ThemeConfig } from './styles/theme/ThemeConfig/ThemeConfig';
import { GlobalStyles } from './styles/theme/GlobalStyles';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <HelmetProvider>
    <Router>
      <Provider store={store}>
        <ThemeConfig>
          <GlobalStyles />
          <App />
        </ThemeConfig>
      </Provider>
    </Router>
  </HelmetProvider>,
);
