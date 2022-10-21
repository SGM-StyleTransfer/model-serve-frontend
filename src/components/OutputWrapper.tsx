import React from 'react';
import { useMedia } from '@hooks/useMedia';
import { useNavigate } from 'react-router-dom';
import { KeyButton, PageDescription, PageTitle } from './commons';

function OutputWrapper() {
    const navigate = useNavigate();
    const { outputVideoURL } = useMedia();

    const returnHome = () => {
        navigate('/');
    }

    return (
        <div className='w-full max-w-3xl'>
            <PageTitle> OUTPUT&nbsp; VIDEO  </PageTitle>
            <PageDescription>
                변환된 비디오를 확인하세요 !
            </PageDescription>


            {/* Wrapper */}
            <div className='w-full h-0 relative overflow-hidden mb-6' style={{paddingBottom: '60%'}}>
                {/* Video Content */}
                <div className='absolute top-0 left-0 w-full h-full bg-slate-200'>
                    { outputVideoURL &&
                        <video src={outputVideoURL} controls />
                    }
                </div>
            </div>

            <KeyButton onClick={returnHome} > RETURN HOME </KeyButton>
        </div>
    )
}

export default OutputWrapper;