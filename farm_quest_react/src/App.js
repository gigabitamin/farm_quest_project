
import Header from './pages/Header';
import Footer from './pages/Footer';
import SideNav from './pages/SideNav';
import Top from './pages/Top';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import './css/common.css';

// 새로고침
let currentPath = "";

function App() {
  // 새로고침
  let location = useLocation();

  useEffect(() => {
    if(currentPath === location.pathname) window.location.reload();
     
    currentPath = location.pathname;
  }, [location]);


  return (
    <div className="App">
      {/* <div className="header_wrap"></div> */}
        <Header/>
        {/* <SideNav/> */}
        <Top />
        <Footer/>
        {/* <FooterJS/> */}
      {/* <div className="footer_wrap"></div>       */}
    </div>
  );
}

export default App;