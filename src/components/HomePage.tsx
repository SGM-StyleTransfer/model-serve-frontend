import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PageWrapper } from './commons';
import InputWrapper from './InputWrapper';
import { API_UPLOAD_FILE_URL } from '@constants';
import { useMedia } from '@hooks/useMedia';
import OutputWrapper from './OutputWrapper';

function HomePage() {

    const { 
        videoFile,
        frameUrls,
        keyFrameIdx,
        refImgFile,
        maskImgFile 
    } = useMedia();

    const [outputVideoURL, setOutputVideoURL] = useState<string>();

    const uploadFile = async () => {
        const keyFrameImage = await fetch(frameUrls[keyFrameIdx]).then(
            r => r.blob()
        );

        const formdata = new FormData();

        if (videoFile && keyFrameImage && refImgFile && maskImgFile ) {
            formdata.append('original_video', videoFile);
            formdata.append('key_frame', keyFrameImage);
            formdata.append('reference_img', refImgFile);
            formdata.append('mask_img', maskImgFile);

            try {
                const res = await axios({
                    method: 'post',
                    url: API_UPLOAD_FILE_URL,
                    data: formdata,
                    headers: {"Content-Type": 'multipart/form-data'},
                    responseType: 'blob'
                })
                const url = URL.createObjectURL(res.data)
                setOutputVideoURL(url);
            } catch (error) {
                console.log(error)
            }
        }
    }

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