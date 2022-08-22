import React from 'react';

type Props = {
    frames: string[]
}

function FrameList ({ frames }: Props) {
    // console.log(frames)
    return (
        <div className='flex' >
            {
                frames.map((frame, idx) => {
                    return (
                        <div 
                            key={idx}
                            className='bg-center bg-cover w-10 h-10 mx-1'
                            style={{
                                backgroundImage: `url(${frame})`
                            }}
                        />
                    )
                })
            }
        </div>
    )
}

export default FrameList;