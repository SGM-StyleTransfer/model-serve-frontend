import React, { useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import ImageUploadButton from './ImageUploadButton';
import CanvasLayer from './CanvasLayer';
import ImageBackgroundLayer from './ImageBackgrondLayer';


function CanvasTest () {
    const [imageURL, setImageURL] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fakeCanvasRef = useRef<HTMLCanvasElement>(null);

    const clearCanvas = () => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.getContext('2d')!!.clearRect(0, 0, canvas.width, canvas.height);
    }

    const saveImage = () => {
        if (!canvasRef.current || !fakeCanvasRef.current ) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const fakeCanvas: HTMLCanvasElement = fakeCanvasRef.current;

        const context = canvas.getContext("2d");
        const fakeContext = fakeCanvas.getContext('2d');

        if (context && fakeContext) {
            
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            /* 마스크 이미지 GrayScale 처리 */
            for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] > 0) {
                    data[i]     = 0;    // red
                    data[i + 1] = 0;    // green
                    data[i + 2] = 0;    // blue
                    data[i + 3] = 255;
                }
                else {
                    data[i]     = 255;    // red
                    data[i + 1] = 255;    // green
                    data[i + 2] = 255;    // blue
                    data[i + 3] = 255;
                }
            }

            fakeContext.putImageData(imageData, 0, 0);
            const maskURL = fakeCanvas.toDataURL('image/png');
            if (maskURL) {
                saveAs(maskURL, 'mask.jpg');
            }
        }
    }

    return (
        <div>
            <h1 className='text-3xl mb-4' >Canvas Test</h1>

            <div className='relative' style={{width: 256, height: 256}} >
                <ImageBackgroundLayer imageURL={imageURL} />
                <CanvasLayer canvasRef={canvasRef} />
                <canvas 
                    className='absolute -z-10 top-0 left-0'
                    ref={fakeCanvasRef} 
                    width={256} 
                    height={256} 
                ></canvas>
            </div>

            <button onClick={clearCanvas} >Clear</button>
            <button onClick={saveImage} >Save</button>
            
            <ImageUploadButton 
                imageURL={imageURL} 
                setImageURL={setImageURL} 
            />
        </div>
    );
}


export default CanvasTest;