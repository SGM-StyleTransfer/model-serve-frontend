import React from 'react';
import { useMedia } from '@hooks/useMedia';

type Props = {
    imageUrls: string[]
}

function FrameList ({ imageUrls }: Props) {
    const { selectImageIdx } = useMedia();

    return (
        <div className='flex' >
            {
                imageUrls.map((imageUrl, idx) => {
                    return (
                        <div 
                            key={idx}
                            className='bg-center bg-cover w-10 h-10 mx-1 cursor-pointer'
                            style={{
                                backgroundImage: `url(${imageUrl})`
                            }}
                            onClick={() => {selectImageIdx(idx)}}
                        />
                    )
                })
            }
        </div>
    )
}

export default FrameList;