import React from 'react'
import { useMedia } from '@hooks/useMedia';

function ImageBackgroundLayer() {

    const {keyFrameIdx, frameUrls} = useMedia();

    return (
        <div
            className={`
                bg-contain bg-no-repeat bg-center bg-slate-50 
                absolute top-0 bottom-0 left-0 right-0 
                transition-all duration-200 ease-linear
            `}
            style={{
                backgroundImage: `
                    url(${keyFrameIdx === -1 ? '' : frameUrls[keyFrameIdx]})
                `,
            }}
        />
    )
}

export default ImageBackgroundLayer;
