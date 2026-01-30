import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import LoginPage from '../Pages/LoginPage'
import RegisterPage from '../Pages/RegisterPage'
import VenuePage from '../Pages/VenuePage'
import VenueDetail from '../Pages/VenuePage/VenueDetail'
import AccessoriesMakeupPage from '../Pages/AccessoriesMakeupPage'
import ServiceDetail from '../Pages/AccessoriesMakeupPage/ServiceDetail'
import VendorServiceDetail from '../Pages/ServiceDetail/ServiceDetail'
import ArtistsPage from '../Pages/ArtistsPage/index'
import ArtistDetail from '../Pages/ArtistsPage/ArtistDetail'
import DecoratorsPage from '../Pages/DecoratorsPage/index'
import DecoratorDetail from '../Pages/DecoratorsPage/DecoratorDetail'
import CaterersPage from '../Pages/CaterersPage/index'
import CatererDetail from '../Pages/CaterersPage/CatererDetail'
import BlogsPage from '../Pages/BlogsPage/index'
import BlogDetail from '../Pages/BlogsPage/BlogDetail'
import VendorPage from '../Pages/VendorPage/index'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProtectedRoute from '../components/ProtectedRoute'


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/venues',
        element: <VenuePage />
      },
      {
        path: '/venues/:id',
        element: <VenueDetail />
      },
      {
        path: '/accessories-makeup',
        element: <AccessoriesMakeupPage />
      },
      {
        path: '/accessories-makeup/:id',
        element: <ServiceDetail />
      },
      {
        path: '/artists',
        element: <ArtistsPage />
      },
      {
        path: '/artists/:id',
        element: <ArtistDetail />
      },
      {
        path: '/decorators',
        element: <DecoratorsPage />
      },
      {
        path: '/decorators/:id',
        element: <DecoratorDetail />
      },
      {
        path: '/caterers',
        element: <CaterersPage />
      },
      {
        path: '/caterers/:id',
        element: <CatererDetail />
      },
      {
        path: '/blogs',
        element: <BlogsPage />
      },
      {
        path: '/blogs/:id',
        element: <BlogDetail />
      },
      {
        path: '/service/:id/:serviceType',
        element: <VendorServiceDetail />
      },
      {
        path: '/vendor',
        element: <ProtectedRoute requiredRole="vendor" />,
        children: [
          {
            index: true,
            element: <VendorPage />
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
