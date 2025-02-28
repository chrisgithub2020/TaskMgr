import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ErrorElement from './components/erroElement.tsx'
import Login from './Pages/login.tsx'
import SignUp from './Pages/signup.tsx'

const rounter = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <ErrorElement/>
  },
  {
    path: "login",
    element:<Login/>
  },
  {
    path: "signup",
    element: <SignUp/>
  },
  {
    path: "home/:id",
    element: <App/>
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rounter} />
  </StrictMode>,
)
