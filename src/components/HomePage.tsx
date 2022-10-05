import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PageWrapper } from './commons';
import InputWrapper from './InputWrapper';
import { API_UPLOAD_FILE_URL } from '@constants';
import { useMedia } from '@hooks/useMedia';

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
        <PageWrapper >
        
            {/* Title */}
            <h1 className='text-5xl mt-4 mb-10' >요르댕 ❕</h1>

            <Link className='text-2xl mb-4' to='/media-pipe' > Go to MediaPipe </Link>

            <InputWrapper />

            {/* Upload Mideo Files Button */}
            <button className='mt-4 py-4 px-10 bg-slate-200' onClick={uploadFile} >Upload Files</button>

            {/* Output Container */}
            <div className='w-full max-w-3xl'>
                <h3 className='text-4xl my-4'>
                    Output Video
                </h3>

                {/* Wrapper */}
                <div className='w-full h-0 relative overflow-hidden' style={{paddingBottom: '60%'}}>
                    {/* Video Content */}
                    <div className='absolute top-0 left-0 w-full h-full bg-slate-100'>
                        { outputVideoURL &&
                            <video src={outputVideoURL} controls />
                        }
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default HomePage;