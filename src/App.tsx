import React from 'react';
import HomePage from '@components/HomePage';
import MediaPipe from '@components/MediaPipe';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    // <Router>
    //   <Routes>
    //     {/* <HomePage /> */}
    //     <Route path='/' element={<HomePage />} />
    //     <Route path='/media-pipe' element={<MediaPipe />} />
    //   </Routes>
    // </Router>
    <HomePage />
  );
}

export default App;
