import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.js'
import {MevProvider} from './context/MevContext.jsx'
import BrowserRouter from 'react-router-dom/BrowserRouter'

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
  <MevProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </MevProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
