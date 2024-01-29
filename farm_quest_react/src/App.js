
import Header from './pages/Header';
import Footer from './pages/Footer';
import SideNav from './pages/SideNav';
import Top from './pages/Top';

import './css/common.css';

function App() {
  return (
    <div className="App">
      {/* <div className="header_wrap"></div> */}
        <Header/>
        {/* <SideNav/> */}
        <Top />
        {/* <Footer/> */}
        {/* <FooterJS/> */}
      {/* <div className="footer_wrap"></div>       */}
    </div>
  );
}

export default App;