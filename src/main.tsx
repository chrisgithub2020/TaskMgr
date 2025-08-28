import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
// import ErrorElement from './components/erroElement.tsx'
import Login from './Pages/login.tsx'
import SignUp from './Pages/signup.tsx'
import OAuth from './Pages/oauth.tsx'
import Settings from './components/Settings.tsx'
import Home from './components/Tasks.tsx'
import AddTaskModal from './components/AddTask.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Login/>} path='/' errorElement={<Login/>}/>
        <Route element={<Login/>} path='/login' errorElement={<Login/>}/>
        <Route element={<SignUp/>} path='/signup' errorElement={<Login/>}/>
        <Route element={<App/>} path='/home' errorElement={<Login/>}>
          <Route index element={<Home/>} path='/home/:id'/>
          <Route element={<AddTaskModal/>} path='/home/add_task'/>
          <Route element={<Settings/>} path='/home/settings'/>
        </Route>;
        <Route element={<OAuth/>} path='/signinauth' errorElement={<Login/>}/>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
