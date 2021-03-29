import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { Provider } from 'react-redux';
import 'tailwindcss/tailwind.css';
import store from '../store';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </Provider>
);
App.displayName = 'App';

export default App;
