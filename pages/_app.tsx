import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import store from '../store/redux-store'

import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
