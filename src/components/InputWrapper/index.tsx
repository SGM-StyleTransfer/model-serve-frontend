import React from 'react';
import CanvasTest from './CanvasTest';
import VideoUploader from './VideoUploader';
import { InputContainer, InputTitle } from '@components/commons';
import { RightArrow, Plus } from '@images'

function InputWrapper() {
    return (
        <div className='h-96 flex flex-row flex-nowrap justify-between items-center'>
        
            {/* Video Uploader */}
            <InputContainer >
                <InputTitle>
                    Video Uploader
                </InputTitle>

                <VideoUploader />
            </InputContainer>
        
            {/* Arrow Icon */}
            <img 
                src={RightArrow} alt="arrow" 
                className='w-16 h-16'  
            />

            {/* Face Detector */}
            <InputContainer >
                <InputTitle>
                    Face Detector
                </InputTitle>

                <div className='w-64 h-64 bg-slate-50' >

                </div>
            </InputContainer>

            {/* Arrow Icon */}
            <img 
                src={Plus} alt="plus" 
                className='w-8 h-8'  
            />

            {/* Reference Image */}
            <InputContainer >
                <CanvasTest />
            </InputContainer>
        </div>
    )
}

export default InputWrapper;