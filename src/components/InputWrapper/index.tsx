import React from 'react';
import CanvasTest from './CanvasTest';
import { InputContainer, InputTitle, KeyButton, PageDescription, PageTitle } from '@components/commons';
import { RightArrow, Plus } from '@images'
import ReferImage from './ReferImage';
import VideoInput from './VideoInput';
import { useNavigate } from 'react-router-dom';

function InputWrapper() {
    const navigate = useNavigate();

    const uploadFile= () => {
        navigate('/output-video')
    }

    return (
        <div className='flex flex-col items-center' >
            <PageTitle> FILE&nbsp; UPLOAD  </PageTitle>
            <PageDescription>
                비디오를 업로드한 뒤, 원하는 프레임을 선택하여 마스크를 색칠하세요.<br/>
                스타일을 가져올 사진까지 업로드 한 뒤, 하단의 <span className='text-orange-500' >SUBMIT</span> 버튼을 클릭하세요.
            </PageDescription>

            <div className='h-96 flex flex-row flex-nowrap justify-between items-center mb-8'>
                {/* Video Uploader */}
                <InputContainer >
                    <InputTitle> Video Uploader </InputTitle>
                    <VideoInput />
                </InputContainer>
            
                {/* Arrow Icon */}
                <img 
                    src={RightArrow} alt="arrow" 
                    className='w-16 h-16'  
                />

                {/* Key Frame */}
                <InputContainer >
                    <InputTitle> Key Frame </InputTitle>

                    <CanvasTest />
                </InputContainer>

                {/* Arrow Icon */}
                <img 
                    src={Plus} alt="plus" 
                    className='w-8 h-8'  
                />

                {/* Reference Image */}
                <InputContainer >
                    <InputTitle> Reference Image </InputTitle>
                    <ReferImage />
                </InputContainer>
            </div>

            {/* Upload Mideo Files Button */}
            <KeyButton onClick={uploadFile} >
                SUBMIT
            </KeyButton>
        </div>
    )
}

export default InputWrapper;