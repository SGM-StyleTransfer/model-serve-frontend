import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PageWrapper } from './commons';
import InputWrapper from './InputWrapper';
import OutputWrapper from './OutputWrapper';

function HomePage() {

    return (
        <div className='w-full min-h-screen bg-slate-50' >
            {/* Header */}
            <div className='bg-white h-16 p-8 w-full flex items-center cursor-default' >
                <div className='mr-6 font-bold text-xl text-orange-400' >요 르 댕</div>
                <div> Video Face Style Transfer </div>
            </div>
            <PageWrapper >

                {/* Title */}
                {/* <h1 className='text-5xl mt-4 mb-10' >요르댕 ❕</h1> */}
                {/* <Link className='text-2xl mb-4' to='/media-pipe' > Go to MediaPipe </Link> */}

                {/* <Route path='/' element={<InputWrapper />} /> */}
                {/* <Route path='/output-video' element={<InputWrapper />} /> */}

                <Router>
                    <Routes>
                        <Route path='/' element={ <InputWrapper /> } />
                        <Route path='/output-video' element={ <OutputWrapper /> } />
                    </Routes>
                </Router>
                
            </PageWrapper>
        </div>
    )
}

export default HomePage;