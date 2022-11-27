import { useMedia } from "@hooks/useMedia";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { KeyButton, PageDescription, PageTitle } from "./commons";

    export default function WebcamVideo() {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState('')
    const { setVideo } = useMedia();
    const navigate = useNavigate();

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    useEffect(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm",
            });
            const url = URL.createObjectURL(blob);
            setRecordedVideoUrl(url);
        }
    }, [recordedChunks])

    const handleUseVideo = useCallback(() => {
        const blob = new Blob(recordedChunks, {
            type: "video/webm",
        });
        const url = URL.createObjectURL(blob);
        setVideo({
            videoUrl: url,
            videoFile: blob,
        })
        navigate('/')
    }, [recordedChunks, navigate, setVideo]);

    const videoConstraints = {
        width: 720,
        height: 480,
        facingMode: "user",
    };

    return (
        <div className="flex flex-col items-center">
            <PageTitle> RECORD&nbsp;&nbsp;WEBCAM </PageTitle>
            <PageDescription>
                <span className="text-orange-500" >START</span>
                &nbsp;버튼을 이용해 웹캠을 시작하고,&nbsp;
                <span className="text-orange-500" >STOP</span>
                &nbsp;버튼으로 비디오를 생성할 수 있습니다.<br/>
                
                비디오 레코딩을 완료했다면,&nbsp;
                <span className="text-orange-500" >Use Video</span>
                &nbsp;버튼을 통해 이전 페이지로 돌아갈 수 있습니다.
            </PageDescription>

            <div className="flex flex-row items-center justify-between mb-4" >
                <Webcam
                    height={720}
                    width={480}
                    audio={false}
                    mirrored={true}
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                    className='mx-6'
                />
                {recordedVideoUrl && (
                    <video
                        src={recordedVideoUrl}
                        height={720}
                        width={480}
                        controls
                    />
                )}
            </div>
            
            <div className={`grid ${recordedChunks.length ? 'grid-cols-2' : 'grid-cols-1' }  gap-4`}>
                {capturing ? (
                    <KeyButton onClick={handleStopCaptureClick}>STOP</KeyButton>
                ) : (
                    <KeyButton onClick={handleStartCaptureClick}>START</KeyButton>
                )}
                {recordedChunks.length > 0 && (
                    <KeyButton onClick={handleUseVideo}>Use Video</KeyButton>
                )}
            </div>
            
        </div>
    );
}