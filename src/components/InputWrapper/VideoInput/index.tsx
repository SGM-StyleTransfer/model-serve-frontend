import React, { 
    ChangeEventHandler, 
    MouseEventHandler, 
    useCallback, 
    useEffect, 
    useRef,
} from "react";
import FrameList from "./FrameList";
import { useMedia } from "@hooks/useMedia";
import { SelectBox } from "@components/commons";


const wait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay))

function VideoInput() {

    const inputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {
        videoUrl, setVideo, setVideoSize,
        frameUrls, setFrameUrls, addFrameUrl,
        selectKeyFrameIdx,
    } = useMedia();

    // let seeking: boolean = false;

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!event.target.files) { return; }

        const file = event.target.files[0]  
        const url = URL.createObjectURL(file);
        if (videoUrl) {
            URL.revokeObjectURL(videoUrl)
            setFrameUrls([]);
        }
        setVideo({videoUrl: url, videoFile: file});
        selectKeyFrameIdx(0);
    };

    const handleChoose: 
        MouseEventHandler<HTMLButtonElement | HTMLDivElement> 
    = (event) => {
        inputRef.current?.click();
    };

    const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
        setVideo({videoUrl: '', videoFile: null});
        setFrameUrls([]);
        selectKeyFrameIdx(-1);
    }

    const captureFrames = useCallback(async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        /** 이미 이미지 리스트가 있을 때, 추가되던 오류 해결 
         * (실행될 때, 이전의 리스트 초기화) */
        setFrameUrls([]);

        if (canvas && video) {
            const ctx = canvas.getContext("2d");
            setVideoSize({
                videoHeight: video.videoHeight,
                videoWidth: video.videoWidth,
            })

            // 비디오 재생시간 관련 변수 및 상수
            const totalSecond = video.duration;
            const numOfFrames = 5
            const interval = totalSecond / numOfFrames;
            let cur_time = 0;
            
            // 캡처한 프레임의 사이즈 설정 관련 변수 및 상수
            canvas.width  = video.videoWidth;
            canvas.height = video.videoHeight;
            
            if (ctx) {
                while (cur_time < totalSecond) {
                    // 1. video의 재생시간을 interval 만큼 이동한 포인트로 이동
                    video.currentTime = cur_time;
                    // seeking = true;
                    
                    // 2. video 컴포넌트가 실제로 currentTime으로 이동하는 시간을 기다리기 
                    // (seeked event 기다리기)
                    // 우선은 setTimeout으로 대체했지만, 이 부분은 수정 필요
                    await wait(200);

                    // 3. 이동한 포인트의 비디오 프레임을 canvas에 그리기
                    ctx.drawImage( video, 0, 0, canvas.width, canvas.height );
                    let base64ImageData = canvas.toDataURL()
                    addFrameUrl(base64ImageData);

                    // 4. 다음 interval의 재생시간을 변수에 저장
                    cur_time += interval;
                }
            }
            // video를 처음 포인트로 이동
            video.currentTime = 0;
        }
    }, [addFrameUrl, setFrameUrls, setVideoSize])

    // const completeSeek = (): void => { seeking = false; }
    // const isSeeking = (): boolean => seeking === true;

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('loadeddata', captureFrames);
            // video.addEventListener('seeked', completeSeek);
        }
    }, [videoRef, captureFrames])

    return (
        <>
            <input
                ref={inputRef}
                className="hidden"
                type="file"
                onChange={handleFileChange}
                accept=".mov,.mp4"
            />
            
            {/* Video component */}
            <div className={`
                ${!videoUrl && 'hidden'}
                w-64 h-64 flex flex-col items-center mb-4
            `}>
                <video
                    ref={videoRef}
                    className={`mb-4 w-64 h-48`}
                    controls
                    src={videoUrl}
                /> 
                <FrameList frameUrls={frameUrls} />
            </div>
            {!videoUrl &&
                // Video가 없을 때, 비디오가 선택되지 않았음을 알려주는 박스
                <SelectBox onClick={handleChoose} >
                    Video Not Selected
                </SelectBox>
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
        </>
    );
}

export default VideoInput