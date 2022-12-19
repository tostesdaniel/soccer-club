import type { ReactElement } from 'react'
import Navigation from './Navigation'

type Props = {
  children: ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}
