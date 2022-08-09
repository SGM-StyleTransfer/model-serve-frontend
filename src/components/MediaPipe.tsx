import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import fm, { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors } from '@mediapipe/drawing_utils';
import { InputTitle, PageWrapper } from './commons';

function MediaPipe() {

    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const videoWidth  = 640;
    const videoHeight = 480;

    const onResults = (results: fm.Results) => { 

        // canvas, webcam, video가 null이면, 함수 종료
        if (canvasRef.current === null || 
            webcamRef.current === null ||
            webcamRef.current.video === null) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Setting H, W of Canvas
        canvas.width = webcamRef.current.video.videoWidth;
        canvas.height = webcamRef.current.video.videoHeight;
            
        if (context) {
            context.save();
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(results.image, 0, 0, canvas.width, canvas.height);

            if (results.multiFaceLandmarks) {
                for (const landmarks of results.multiFaceLandmarks) {
                    drawConnectors(context, landmarks, fm.FACEMESH_TESSELATION,
                                    {color: '#C0C0C070', lineWidth: 1});
                    drawConnectors(context, landmarks, fm.FACEMESH_RIGHT_EYE, {color: '#FF3030'});
                    drawConnectors(context, landmarks, fm.FACEMESH_RIGHT_EYEBROW, {color: '#FF3030'});
                    drawConnectors(context, landmarks, fm.FACEMESH_RIGHT_IRIS, {color: '#FF3030'});
                    drawConnectors(context, landmarks, fm.FACEMESH_LEFT_EYE, {color: '#30FF30'});
                    drawConnectors(context, landmarks, fm.FACEMESH_LEFT_EYEBROW, {color: '#30FF30'});
                    drawConnectors(context, landmarks, fm.FACEMESH_LEFT_IRIS, {color: '#30FF30'});
                    drawConnectors(context, landmarks, fm.FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
                    drawConnectors(context, landmarks, fm.FACEMESH_LIPS, {color: '#E0E0E0'});
                }
            }
        }
    }

    useEffect(() => {
        const faceMesh = new FaceMesh({
            locateFile: (filePath: string) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${filePath}`;
            }
        });
        faceMesh.setOptions({
            maxNumFaces: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        if (webcamRef.current && webcamRef.current.video) {
            const camera = new Camera(webcamRef.current.video, {
                onFrame: async () => {
                    if (webcamRef.current && webcamRef.current.video) {
                        await faceMesh.send({
                            image: webcamRef.current.video,
                        })
                    }
                },
                width: videoWidth,
                height: videoHeight,
            });
            camera.start();
        }

        faceMesh.onResults(onResults);   
    }, []);

    return (
        <PageWrapper>
            <InputTitle> Google Mediapipe Test </InputTitle>

            {/* Media pipe container */}
            <div className='my-8 w-full' style={{height: videoHeight}} >
                <Webcam ref={webcamRef} className='hidden' />
                <canvas
                    ref={canvasRef}
                    className='absolute mx-auto left-0 right-0 text-center z-10 bg-slate-400'
                    style={{
                        width: videoWidth,
                        height: videoHeight,
                    }}
                />
            </div>

            <Link to='/' > Back to Home </Link>
        </PageWrapper>
    )
}

export default MediaPipe;