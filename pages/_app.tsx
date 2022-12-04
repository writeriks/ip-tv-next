import '../styles/globals.css'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return <Component {...pageProps} />
}

export default App
