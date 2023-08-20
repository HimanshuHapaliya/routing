import './App.css';
import Header from './components/header/Header';
import Footer from './components/Footer';
import Home from './components/Home'
import AboutUs from './components/AboutUs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AuthWrapper from './context/auth'


function App() {

  let clgName = 'VVP Engineering College.'
  return (
    <div className='App'>
      <div>
        <BrowserRouter>
            <AuthWrapper>
              <div><Header /></div>
              <Routes>
                <Route path='/' element={<Home name={clgName} />} />
                <Route path='/about' element={<AboutUs />} />
              </Routes>
              <LoginPage />
            </AuthWrapper>
        </BrowserRouter>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}


export default App;
