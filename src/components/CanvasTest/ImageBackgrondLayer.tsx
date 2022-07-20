import React from 'react'

type Props = {
    imageURL: string;
}

function ImageBackgroundLayer({imageURL}: Props) {

    return (
        <div
            className='bg-cover bg-center absolute top-0 bottom-0 left-0 right-0' 
            style={{
                backgroundImage: `url(${imageURL})`
            }}
        />
    )
}

export default ImageBackgroundLayer;
