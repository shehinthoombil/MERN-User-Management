import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store.js'
import { Provider } from 'react-redux'
import { ThemeProvider } from "@material-tailwind/react";
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx';

import Dashboard from './components/Dashboard.jsx'
import AdminLogin from "./components/AdminLogin.jsx"
import AdminPrivateRoute from "./components/AdminPrivateRour.jsx";
import AddNewUser from "./components/AddNewUser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path='/register' element={<Register />} />
       {/*Private Routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
      </Route>
      
      <Route path="" element={<AdminPrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="addNewUser" element={<AddNewUser />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
)
