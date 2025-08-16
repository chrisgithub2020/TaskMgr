import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
// import ErrorElement from './components/erroElement.tsx'
import Login from './Pages/login.tsx'
import SignUp from './Pages/signup.tsx'
import OAuth from './Pages/oauth.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Login/>} path='/' errorElement={<Login/>}/>
        <Route element={<Login/>} path='/login' errorElement={<Login/>}/>
        <Route element={<SignUp/>} path='/signup' errorElement={<Login/>}/>
        <Route element={<App/>} path='/home/:id' errorElement={<Login/>}/>
        <Route element={<OAuth/>} path='/signinauth' errorElement={<Login/>}/>
        {/* <Route element={<Login/>} path='*' errorElement={<Login/>}/> */}
      </Routes>
    </HashRouter>
  </StrictMode>,
)
