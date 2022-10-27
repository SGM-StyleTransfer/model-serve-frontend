import React, { useRef } from 'react';
import CanvasLayer from './CanvasLayer';
import ImageBackgroundLayer from './ImageBackgrondLayer';
import { useMedia } from '@hooks/useMedia';


function MaskCanvas () {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);

    const { 
        videoUrl, videoHeight, videoWidth, 
        setMaskImg,
    } = useMedia();

    const clearCanvas = () => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.getContext('2d')!!.clearRect(0, 0, canvas.width, canvas.height);
    }

    const saveImage = async () => {
        if (!canvasRef.current || !hiddenCanvasRef.current ) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const hiddenCanvas: HTMLCanvasElement = hiddenCanvasRef.current;

        const context = canvas.getContext("2d");
        const hiddenContext = hiddenCanvas.getContext('2d');

        if (context && hiddenContext) {
            
            hiddenCanvas.height = videoHeight;
            hiddenCanvas.width = videoWidth;

            hiddenContext.drawImage(canvas, 0, 0, videoWidth, videoHeight);

            const imageData = hiddenContext.getImageData(0, 0, videoWidth, videoHeight);
            const data = imageData.data;
            
            /* 마스크 이미지 GrayScale 처리 */
            for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] > 0) {
                    data[i]     = 255;    // red
                    data[i + 1] = 255;    // green
                    data[i + 2] = 255;    // blue
                    data[i + 3] = 255;
                }
                else {
                    data[i]     = 0;    // red
                    data[i + 1] = 0;    // green
                    data[i + 2] = 0;    // blue
                    data[i + 3] = 255;
                }
            }

            hiddenContext.putImageData(imageData, 0, 0);
            const maskURL = hiddenCanvas.toDataURL('image/png');
            if (maskURL) {
                const maskFile = await fetch(maskURL).then(r => r.blob());
                setMaskImg({
                    maskImgUrl: maskURL,
                    maskImgFile: maskFile,
                })
            }
        }
    }

    return (
        <div className='flex flex-col' >

            <div 
                className='relative mb-4 flex items-center justify-center' 
                style={{width: 256, height: 256}} 
            >
                <ImageBackgroundLayer />
                { videoUrl &&
                    <>
                        <CanvasLayer canvasRef={canvasRef} />
                        {/* Hidden Canvas for Render Mask Image */}
                        <canvas 
                            className='absolute -z-10 top-0 left-0 hidden'
                            ref={hiddenCanvasRef}
                        ></canvas>
                    </>
                }
            </div>

            <div className='flex justify-around' >
                <button onClick={clearCanvas} >Clear</button>
                <button onClick={saveImage} >Save</button>
            </div>
        </div>
    );
}


export default MaskCanvas;