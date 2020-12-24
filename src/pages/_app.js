import '../styles/globals.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import {useEffect} from 'react'


function MyApp({ Component, pageProps }) {
  // Initalizing AOS on page load.
  useEffect(() => {
    AOS.init({
      duration : 1000
    });
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
