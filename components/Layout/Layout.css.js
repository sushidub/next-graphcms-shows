import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ background, theme }) => background ? background : theme.background};
  color: ${(p) => p.color};
  padding: ${(p) => p.padding};
`

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(p) => p.alignItems};
  width: 100%;
  max-width: ${(p) => p.maxWidth};

  blockquote {
    position: relative;
    z-index: 1;
    font-size: 1.5rem;
    font-weight: bold;
    font-style: italic;
  }

  blockquote::before {
    content: '"';
    z-index: 0;
    position: absolute;
    font-size: 10rem;
    font-family: ui-monospace, monospaced;
    font-style: italic;
    font-weight: 900;
    transform: translate(-50px,-50px);
    opacity: .25;
  }
`

export const Footer = styled.footer`
  width: auto;
  max-width: 700px;
  min-height: 100px;
  margin: 1rem;
  padding: 1rem;
  border-top: 1px solid #eaeaea;

  a {
    margin-left: 4px;
  }
`
