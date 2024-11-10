import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/NavigationBar/NavigationBar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavbarComponent />
    <App />
  </React.StrictMode>,
)