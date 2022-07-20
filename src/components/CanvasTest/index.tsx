import React, { useRef } from 'react';
import ImageUploadButton from './ImageUploadButton';
import CanvasLayer from './CanvasLayer';
import ImageBackgroundLayer from './ImageBackgrondLayer';


function CanvasTest () {
    const [imageURL, setImageURL] = React.useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const clearCanvas = () => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.getContext('2d')!!.clearRect(0, 0, canvas.width, canvas.height);
    }

    return (
        <div>
            <h1 className='text-3xl mb-4' >Canvas Test</h1>

            <div className='bg-slate-50 relative' style={{width: 256, height: 256}} >
                <ImageBackgroundLayer imageURL={imageURL} />
                <CanvasLayer canvasRef={canvasRef} />
            </div>

            <button onClick={clearCanvas} >Clear</button>
            
            <ImageUploadButton 
                imageURL={imageURL} 
                setImageURL={setImageURL} 
            />
        </div>
    );
}


export default CanvasTest;