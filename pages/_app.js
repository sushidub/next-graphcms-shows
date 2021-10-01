import '../styles/ress.css';
import '../styles/globals.css';

import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
  background: 'var(--gradient-crimson-blue)',
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
