import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import store from '../store/redux-store'

import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.css'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <Provider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  )
}

export default App
