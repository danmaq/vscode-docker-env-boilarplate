import type { AppProps } from 'next/app';
import type { FC } from 'react';
import 'tailwindcss/tailwind.css';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Component {...pageProps} />
);
App.displayName = 'App';

export default App;
