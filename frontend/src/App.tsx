import React from 'react';
import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Router, Routes} from 'react-router-dom';
import Login from './pages/Login/Login';
import Form from './pages/Form/Form';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Login />} />
      <Route path="/form" element={<Form />} />
    </Route>
   
  )
);

function App() {
  return (
     <RouterProvider router={router}/>
  );
}

export default App;
