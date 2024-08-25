import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import NewProducts from './pages/NewProducts';
import ProductDetail from './pages/ProductDetail';
import ProtectedRoute from 'pages/ProtectedRoute';
import ModifyProducts from 'pages/ModifyProducts';
import Intro from 'Intro';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Intro /> },
      { path: '/home', element: <Home /> },
      { path: '/portfolio', element: <AllProducts /> },
      {
        path: '/portfolio/new',
        element: (
          <ProtectedRoute requireAdmin>
            <NewProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: '/portfolio/modify/:id',
        element: (
          <ProtectedRoute requireAdmin>
            <ModifyProducts />
          </ProtectedRoute>
        ),
      },
      { path: '/portfolio/:id', element: <ProductDetail /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
