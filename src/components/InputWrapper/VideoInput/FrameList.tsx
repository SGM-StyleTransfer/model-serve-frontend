import React from 'react';
import { useMedia } from '@hooks/useMedia';

type Props = {
    frameUrls: string[]
}

function FrameList ({ frameUrls }: Props) {
    const { selectKeyFrameIdx } = useMedia();

    return (
        <div className='flex' >
            {
                frameUrls.map((frameUrl, idx) => {
                    return (
                        <div 
                            key={idx}
                            className='bg-center bg-cover w-10 h-10 mx-1 cursor-pointer'
                            style={{
                                backgroundImage: `url(${frameUrl})`
                            }}
                            onClick={() => {selectKeyFrameIdx(idx)}}
                        />
                    )
                })
            }
        </div>
    )
}

export default FrameList;