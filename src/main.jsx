import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import './jvs/cookiefunc.js'
// import './jvs/setlang.jsx'
// import './jvs/settheme.js'
// import './style/style1.css'
// import './jvs/lang/thlang.jsx'
// import './jvs/lang/thlang.js'

// console.Log(t("htrCancelled"));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
