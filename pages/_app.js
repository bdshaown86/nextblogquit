import '../styles/globals.css'
import Head from 'next/head';
import Navbar from '../components/Navbar';
import {auth} from '../firebase';
import {useState,useEffect} from 'react';

function MyApp({ Component, pageProps }) {
 const [user,setUser] = useState(null);

 useEffect(() => {
  auth.onAuthStateChanged(user => {
    console.log("login user:",user)
    if(user) setUser(user)
    else setUser(null)
  })
 },[])

  return (
    <>
      <Head>
      {/* <!-- Compiled and minified CSS --> */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
  {/* 
      <!-- Compiled and minified JavaScript --> */}
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
              
      </Head>
      <Navbar user={user}/>
     <Component {...pageProps} user={user} />
  </>
  )
}

export default MyApp
