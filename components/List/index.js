import Link from 'next/link'
import styled, { css } from 'styled-components'
import { truncateText } from '@l/utils'

const StyledList= styled.ul`
  // styled component
`

export function List({ children, header, href, title }) {
  return href ? (
    <Link href={href} passHref>
      <a css={ListStyle} title={title}>
        <h3>{header} &rarr;</h3>
        {children}
      </a>
    </Link>
  ) : (
    <ul css={LinkStyle} title={title}>
      <li title={header}>{truncateText(header, 22)} &rarr;</li>
      {children}
    </ul>
  )
}

export function List({ children }) {
  return (
    <StyledList>
      {children}
    </StyledList>
  )
}
