import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PageWrapper } from './commons';
import InputWrapper from './InputWrapper';
import OutputWrapper from './OutputWrapper';

function HomePage() {

    return (
        <div className='w-full min-h-screen bg-slate-50 font-sans' >
            {/* Header */}
            <div className='bg-white h-16 p-8 w-full flex items-center cursor-default' >
                <div className='mr-6 font-bold text-xl text-orange-400' >요 르 댕</div>
                <div> Video Face Style Transfer </div>
            </div>
            <PageWrapper >
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