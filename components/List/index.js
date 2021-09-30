import Link from 'next/link'
import styled from 'styled-components'
import { truncateText } from '@l/utils'

const StyledList= styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  list-style-type: none;
  width: inherit;
  margin: 1rem 0 3rem 0;
  padding: 0 1rem;
`

const StyledListItem= styled.li`
  border-bottom: 1px solid white;
  padding: 2rem 1rem;
  background-color: transparent;
  color: white;
  transition: background-color 150ms linear, color 150ms linear;
  
  :hover {
    background-color: white;
    color: black;
  }

  :last-of-type {
    border-bottom: none;
  }
}


  a {
    color: inherit;
    text-decoration: none;

    :hover,
    :focus,
    :active {
      background-color: var(--gallery-grey);
      color: #000;
    }
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  .show-docket {
    font-size: 1.25rem;
  }

  .show-date-start {
    font-size: .75rem;
  }
`

export function ListItem({ children, header, href, title }) {
  return (
    <StyledListItem>
      { href ? (
        <Link href={href} passHref>
          <a title={title}>
            <h3>{header} &rarr;</h3>
          </a>
        </Link>
      ) : (
        <h3 title={header}>{truncateText(header, 22)} &rarr;</h3>
      )}
      {children}
    </StyledListItem>
  )
}

export function List({ children }) {
  return (
    <StyledList>
      {children}
    </StyledList>
  )
}
