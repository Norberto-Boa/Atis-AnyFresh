import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from "@/context/authContext";
import  store  from "@/redux/store";


export default function App({ Component, pageProps }: AppProps) {

  // useEffect(() => {
  //   const token = getToken();
    
  //   if (token === null) {
  //     setAuthenticated(false);
  //     router.push("/login");
  //     return;
  //   }

  //   const decodedToken = parseJwt(token);
  //   const isLogged = checkJwt(decodedToken)
  //   if (!isLogged) {
  //     router.push("/login")
  //   }

    
  //   const data = {
  //     id: decodedToken.sub,
  //     name: decodedToken.name,
  //     exp: decodedToken.exp
  //   }
    

  //   setAuthenticated(isLogged);
    


  // },[router])

  return (
    <AuthProvider>
        <Navbar />
        <Sidebar />
        <Component {...pageProps} />
    </AuthProvider>
  )
    
}
