import { StrictMode ,createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PortfolioPage from './miniProject/reactRounter/PortfolioPage.jsx'
// import SignUpandIn from './component/SignUpandIn.jsx'
// import CurrencyConverter from './miniProject/CourrencyConverter.jsx'
// import HomeSence from './miniProject/wallpaperFlash/HomeSence.jsx'
import { BrowserRouter } from 'react-router-dom'

let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <StrictMode>
  //   {/* <App /> */}
  //   {/* <CurrencyConverter /> */}
  //   <PortfolioPage />  
  //   {/* <HomeSence /> */}
  // </StrictMode>

  <BrowserRouter>
    <PortfolioPage />
  </BrowserRouter>
)
