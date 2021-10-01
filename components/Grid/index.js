import Link from 'next/link'
import styled, { css } from 'styled-components'
import { truncateText } from '@l/utils'

const CardStyle = css`
  flex: 1 1 auto;
  width: 100%;
  min-height: 130px;
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  border: 1px solid var(--gallery-grey);
  border-radius: 10px;
  background-color: transparent;
  color: inherit;
  transition: background-color 150ms linear, color 150ms linear;

  :hover,
  :focus,
  :active {
    background-color: white;
    color: black;
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    white-space: nowrap;
  }

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (min-width: 576px) {
    width: calc(50% - (3rem + 2px));
  }

  @media (min-width: 768px) {
    flex: 1 1 45%;
    width: auto;
    h3 {
      font-size: 1.5rem;
      white-space: normal;
    }
    p {
      font-size: 1.25rem;
    }
  }
`

const StyledGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  margin: auto;
`

export function Card({ children, header, href, title }) {
  return href ? (
    <Link href={href} passHref>
      <a css={CardStyle} className="link-cloak" title={title}>
        <h3>{header} &rarr;</h3>
        {children}
      </a>
    </Link>
  ) : (
    <div css={CardStyle} title={title}>
      <h3 title={header}>{truncateText(header, 22)} &rarr;</h3>
      {children}
    </div>
  )
}

export function Grid({ children }) {
  return (
    <StyledGrid>
      {children}
    </StyledGrid>
  )
}
