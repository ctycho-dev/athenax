// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MantineProvider, createTheme } from '@mantine/core';
import { Home } from './pages/home';

import '@mantine/core/styles.css';


const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  headings: { fontFamily: 'Inter, sans-serif' },
});



function App() {

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </MantineProvider>
  )
}

export default App
