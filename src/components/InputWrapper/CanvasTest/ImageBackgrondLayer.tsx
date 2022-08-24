import { useMedia } from '@hooks/useMedia';
import React from 'react'

function ImageBackgroundLayer() {

    const {selectedImageIdx, imageUrls} = useMedia();

    return (
        <div
            className='bg-cover bg-center bg-slate-50 absolute top-0 bottom-0 left-0 right-0' 
            style={{
                backgroundImage: `
                    url(${selectedImageIdx === -1 ? '' : imageUrls[selectedImageIdx]})
                `,
            }}
        />
    )
}

export default ImageBackgroundLayer;
