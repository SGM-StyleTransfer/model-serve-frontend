import React, { useRef } from 'react';

type Props = {
    source: string;
}

type BoxSize = {
    w: number;
    h: number; 
}

function CaptureFrame({ source }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
  
    const containerSize: BoxSize = {w: 240, h: 180}
    
    const capture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const frames = [];
        
        if (canvas && video) {
            const totalSecond = video.duration;
            let cur_time = 0;
            let ctx = canvas.getContext("2d");
            
            const scale_w = containerSize.w / video.videoWidth ;
            const scale_h = containerSize.h / video.videoHeight;
            const scale_ratio = scale_w > scale_h ? scale_w : scale_h ;
            
            canvas.width  = video.videoWidth  * scale_ratio;
            canvas.height = video.videoHeight * scale_ratio;
        
            if (ctx) {
                while (cur_time < totalSecond) {
                    video.currentTime = cur_time;
                    ctx.drawImage( video,0, 0, canvas.width, canvas.height );
                    let base64ImageData = canvas.toDataURL('image/jpeg')
                    frames.push(base64ImageData);
                    cur_time += 1;
                }
            }
        }
    };

  
    return (
      <div className="App">
        <video
          // style={{ visibility: "hidden" }}
          className='w-96 h-72'
          id="video"
          ref={videoRef}
          src={source}
        //   type="video/mp4"
          controls
        ></video>
        <button onClick={capture}>Capture</button>
        <canvas id="canvas" ref={canvasRef} style={{ overflow: "auto" }}></canvas>
      </div>
    );
}

export default CaptureFrame