import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppLayout } from './AppLayout';
import ShowBookList from './screens/Books';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' index element={<ShowBookList />} />
      </Route>
    </Routes>
  );
}

export default App;

