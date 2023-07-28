import { ReactElement, ReactNode } from "react"

export type NextPageWithLayout = NextPage & {
  getLayout: (page: ReactElement) => ReactNode
  navbarLogo?: string
}