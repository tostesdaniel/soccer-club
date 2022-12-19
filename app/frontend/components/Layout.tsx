import type { ReactElement } from 'react'
import Footer from './Footer'
import Navigation from './Navigation'

type Props = {
  children: ReactElement
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navigation />
      <main className="h-full grow">{children}</main>
      <Footer />
    </>
  )
}
