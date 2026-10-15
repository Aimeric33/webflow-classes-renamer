import { createBrowserRouter } from 'react-router'
import Layout from './Layout'
import Home from './pages/Home'
import Renamer from './pages/Renamer'
//import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    //errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'renamer', element: <Renamer /> },
    ],
  },
])