import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ErrorElement from './components/erroElement.tsx'
import Login from './Pages/login.tsx'
import SignUp from './Pages/signup.tsx'
import OAuth from './Pages/oauth.tsx'

const rounter = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <App/>
  },
  {
    path: "login",
    element:<Login/>,
    errorElement: <App/>
  },
  {
    path: "signup",
    element: <SignUp/>,
    errorElement: <App/>
  },
  {
    path: "home/:id",
    element: <App/>,
    errorElement: <App/>
  },
  {
    path: "signinauth",
    element: <OAuth/>,
    errorElement: <App/>
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rounter} />
  </StrictMode>,
)
