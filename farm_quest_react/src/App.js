import './App.css';
import Header from './pages/Header';
import Footer from './pages/Footer';
import SideNav from './pages/SideNav';
import './css/common.css';
import './css/style_kdy.css';
import './css/login.css';
import './css/scheduler.css';
import './css/style_ltj.css';
import './css/community.css';
// import Calender from './components/Calender.js';



function App() {
  return (
    <div className="App">
      <div className="header_wrap">        
      </div>
        <Header/>
        <SideNav/>
        {/* <Calender></Calender> */}

        <Footer/>
        {/* <FooterJS/> */}
      <div className="footer_wrap">
      </div>
    </div>
  );
}

export default App;
