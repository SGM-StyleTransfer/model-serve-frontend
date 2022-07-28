import React from 'react';
import { PageWrapper } from '@components/commons';
import InputWrapper from '@components/InputWrapper';

function App() {
  return (

    /* Page Container */
    <PageWrapper >
      
      {/* Title */}
      <h1 className='text-5xl mt-4 mb-10' >요르댕 ❕</h1>

      <InputWrapper />

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
    </PageWrapper>
  );
}

export default App;
