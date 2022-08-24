import React from 'react';

type Props = {
    imageUrls: string[]
}

function FrameList ({ imageUrls }: Props) {
    return (
        <div className='flex' >
            {
                imageUrls.map((imageUrl, idx) => {
                    return (
                        <div 
                            key={idx}
                            className='bg-center bg-cover w-10 h-10 mx-1'
                            style={{
                                backgroundImage: `url(${imageUrl})`
                            }}
                        />
                    )
                })
            }
        </div>
    )
}

export default FrameList;