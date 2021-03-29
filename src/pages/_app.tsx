import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { Provider } from 'react-redux';
import 'tailwindcss/tailwind.css';
import useBodyClassName from '../hooks/useBodyClassName';
import store from '../store';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useBodyClassName('antialiased', 'bg-gray-200', 'text-gray-700');
  return (
    <Provider store={store}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Provider>
  );
};
App.displayName = 'App';

export default App;
