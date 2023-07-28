import { useRouter } from "next/router"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import '@/styles/globals.css'
import { checkJwt } from "@/utils/checkJwt"
import { parseJwt } from "@/utils/parsejwt"
import type { AppProps } from 'next/app'
import { useEffect, useState } from "react"


export default function App({ Component, pageProps }: AppProps) {

  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const bearerToken = localStorage.getItem("token")
    const [, token] = bearerToken?.split(" ");  
    
    if (token === undefined || null) {
      setAuthenticated(false);
    } else {
      const decodedToken = parseJwt(token);
      const isLogged = checkJwt(decodedToken)
      if (!isLogged) {
        router.push("/login")
      }
      setAuthenticated(isLogged);
    }

  },[router])

  return (
    <div>
      {
        authenticated ? 
          <div>
            <Navbar />
            <Sidebar />   
          </div> : <></>
          
      }
      
      <Component {...pageProps} />
    </div>
  )
    
}
