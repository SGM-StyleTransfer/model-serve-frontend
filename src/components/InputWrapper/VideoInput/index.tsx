import React, { 
    ChangeEventHandler, 
    MouseEventHandler, 
    useEffect, 
    useRef, 
    useState,
} from "react";
import FrameList from "./FrameList";

type BoxSize = {
    w: number;
    h: number; 
}

const wait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay))

function VideoInput() {

    const inputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [videoSource, setVideoSource] = useState<string>('');
    const [frames, setFrames] = useState<string[]>([]);

    let seeking: boolean = false;
    const containerSize: BoxSize = {w: 40, h: 30}

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!event.target.files) { return; }

        const file = event.target.files[0]  
        const url = URL.createObjectURL(file);
        if (videoSource) {
            URL.revokeObjectURL(videoSource)
            setFrames([]);
        }
        setVideoSource(url);
    };

    const handleChoose: 
        MouseEventHandler<HTMLButtonElement | HTMLDivElement> 
    = (event) => {
        inputRef.current?.click();
    };

    const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
        setVideoSource('');
        setFrames([]);
    }

    const captureFrames = async () => {

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (canvas && video) {
            const ctx = canvas.getContext("2d");

            // 비디오 재생시간 관련 변수 및 상수
            const totalSecond = video.duration;
            const numOfFrames = 5
            const interval = totalSecond / numOfFrames;
            let cur_time = 0;
            
            // 캡처한 프레임의 사이즈 설정 관련 변수 및 상수
            const scale_w = containerSize.w / video.videoWidth ;
            const scale_h = containerSize.h / video.videoHeight;
            const scale_ratio = scale_w > scale_h ? scale_w : scale_h ;
            
            canvas.width  = video.videoWidth  * scale_ratio;
            canvas.height = video.videoHeight * scale_ratio;
            
            if (ctx) {
                while (cur_time < totalSecond) {
                    // 1. video의 재생시간을 interval 만큼 이동한 포인트로 이동
                    video.currentTime = cur_time;
                    seeking = true;
                    
                    // 2. video 컴포넌트가 실제로 currentTime으로 이동하는 시간을 기다리기 
                    // (seeked event 기다리기)
                    // 우선은 setTimeout으로 대체했지만, 이 부분은 수정 필요
                    await wait(30);

                    // 3. 이동한 포인트의 비디오 프레임을 canvas에 그리기
                    ctx.drawImage( video, 0, 0, canvas.width, canvas.height );
                    let base64ImageData = canvas.toDataURL()
                    setFrames( (frames) => [...frames, base64ImageData] )

                    // 4. 다음 interval의 재생시간을 변수에 저장
                    cur_time += interval;
                }
            }
            // video를 처음 포인트로 이동
            video.currentTime = 0;
        }
    };

    const completeSeek = (): void => { seeking = false; }
    // const isSeeking = (): boolean => seeking === true;

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('loadeddata', captureFrames);
            video.addEventListener('seeked', completeSeek);
        }
    }, [videoRef])

    return (
        <div>
            <input
                ref={inputRef}
                className="hidden"
                type="file"
                onChange={handleFileChange}
                accept=".mov,.mp4"
            />
            
            {/* Video component */}
            <div className={`flex flex-col items-center ${!videoSource && 'hidden'}`}>
                <video
                    ref={videoRef}
                    className={`mb-4 w-64 h-64 `}
                    controls
                    src={videoSource}
                /> 
                <FrameList frames={frames} />
            </div>
            {!videoSource &&
                // Video가 없을 때, 비디오가 선택되지 않았음을 알려주는 박스
                <div 
                    onClick={handleChoose}
                    className="w-64 h-64 bg-slate-50 flex items-center justify-center mb-4 cursor-pointer"
                >
                    Video Not Selected
                </div>
            }

            {/* Button Container */}
            <div className="flex justify-around" >
                <button onClick={handleChoose}>Choose</button>
                <button onClick={handleDelete} >Delete</button>
                {/* <button onClick={captureFrames}>capture</button> */}
            </div>

            <canvas
                ref={canvasRef}
                className="hidden"
            ></canvas>
        </div>
    );
}

export default VideoInput