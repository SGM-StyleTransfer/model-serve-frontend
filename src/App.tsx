import React from 'react';
import './App.css';
import VideoUploader from './components/VideoUploader';
import CanvasTest from './components/CanvasTest';

function App() {
  return (
    <div className='flex flex-row' >

      <VideoUploader width={400} height={300} />
      <CanvasTest />
    </div>
  );
}

export default App;
