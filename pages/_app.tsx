import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import store from '../store/redux-store'

import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default App
