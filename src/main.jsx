import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout} from './components/index.js';

import Addpostcomponent from './components/pages/Addpostcomponent.jsx';
import AllPostcomponent from './components/pages/AllPostcomponent.jsx';
import Homecomponent from './components/pages/Homecomponent.jsx';
import Logincomponent from './components/pages/Logincomponent.jsx';
import Postcomponent from './components/pages/Postcomponent.jsx';
import Editpostcomponent from './components/pages/Editpostcomponent.jsx';
import Signupcomponent from './components/pages/Signupcomponent.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Homecomponent />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Logincomponent />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signupcomponent />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    <AllPostcomponent />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    <Addpostcomponent />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    <Editpostcomponent />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Postcomponent />,
        }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
