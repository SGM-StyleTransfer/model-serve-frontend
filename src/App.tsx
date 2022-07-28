import React from 'react';
import VideoUploader from '@components/VideoUploader';
import CanvasTest from '@components/CanvasTest';
import RightArrow from '@images/arrow.png';
import Plus from '@images/plus.jpg';

function App() {
  return (

    /* Page Container */
    <div className='max-w-screen-xl mx-auto min-h-screen p-8 text-center flex flex-col items-center' >
      
      {/* Title */}
      <h1 className='text-5xl mt-4 mb-10' >요르댕 ❕</h1>

      {/* Input Container */}
      <div className='h-96 flex flex-row flex-nowrap justify-between items-center'>
        
        {/* Video Uploader */}
        <div className='ring-1 ring-slate-300 h-full p-4 mx-4' >
          <h3 className='text-3xl whitespace-nowrap mb-4' >
            Video Uploader
          </h3>

          <VideoUploader width={400} height={300} />
        </div>
        
        {/* Arrow Icon */}
        <img 
          src={RightArrow} alt="arrow" 
          className='w-16 h-16'  
        />

        {/* Face Detector */}
        <div className='ring-1 ring-slate-300 h-full p-4 mx-4' >
          <h3 className='text-3xl whitespace-nowrap mb-4' >
            Face Detector
          </h3>

          <div className='w-64 h-64 bg-slate-50' >

          </div>
        </div>

        {/* Arrow Icon */}
        <img 
          src={Plus} alt="plus" 
          className='w-8 h-8'  
        />

        {/* Reference Image */}
        <div className='ring-1 ring-slate-300 h-full p-4 mx-4' >
          <CanvasTest />
        </div>
      </div>

      {/* Output Container */}
      <div className='w-full max-w-3xl'>
        <h3 className='text-4xl my-4'>
          Output Video
        </h3>

        {/* Wrapper */}
        <div className='w-full h-0 relative overflow-hidden' style={{paddingBottom: '60%'}}>
          {/* Video Content */}
          <div className='absolute top-0 left-0 w-full h-full bg-slate-100'>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
