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

  .debug {
    display: block;
    width: 100%;
    padding: 0.5rem 2rem;
    font-style: normal;
    font-size: 1rem;
    background-color: red;
  }

  blockquote {
    position: relative;
    font-size: 1.5rem;
    font-weight: bold;
    font-style: italic;
  }

  blockquote::before {
    content: '"';
    z-index: 0;
    position: absolute;
    font-size: 10rem;
    transform: translate(-50px,-50px);
    font-family: monos;
    font-style: italic;
    opacity: .25;
  }
`

export const Footer = styled.footer`
  width: 100%;
  max-width: 700px;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    margin-left: 4px;
    text-decoration: underline;
  }
`
