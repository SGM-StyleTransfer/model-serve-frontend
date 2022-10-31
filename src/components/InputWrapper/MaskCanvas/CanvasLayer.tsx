import { useMedia } from '@hooks/useMedia';
import React, {useCallback, useEffect, useState} from 'react';

type Props = {
    canvasRef: React.RefObject<HTMLCanvasElement>
}

type Coordinate = {
    x: number;
    y: number;
};

function Canvas({canvasRef}: Props) {
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
    const [isPainting, setIsPainting] = useState(false);
    const { videoHeight, videoWidth } = useMedia();

    useEffect(() => {
        /**
         * Set the Canvas Element size
         */
        const videoRatio = videoHeight / videoWidth
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = 256;
            canvas.height = 256;

            if (videoRatio < 1) {   
                /** H < W */
                canvas.height = Math.ceil(256 * videoRatio) 
            } else {
                /** W < H */
                canvas.width = Math.ceil(256 / videoRatio)
            }
        }
    }, [videoHeight, videoWidth, canvasRef])


    const getCoordinates = useCallback((event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }

        return {
            x: event.offsetX,
            y: event.offsetY
        };
    }, [canvasRef]);

    const drawLine = useCallback((originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context) {

            context.strokeStyle = 'rgb(250, 234, 72)';
            context.lineJoin = 'round';
            context.lineWidth = 24;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();

            context.stroke();

        }
    }, [canvasRef]);

    const startPaint = useCallback((event: MouseEvent) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setIsPainting(true);
            setMousePosition(coordinates);
        }
        
    }, [getCoordinates]);

    const paint = useCallback(
        (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();

            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition, drawLine, getCoordinates]
    );

    const exitPaint = useCallback(() => {
        setIsPainting(false);
    }, []);


    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;

        canvas.addEventListener('mousedown', startPaint);
        canvas.addEventListener('mousemove', paint);
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);

        return () => {
            canvas.removeEventListener('mousedown', startPaint);
            canvas.removeEventListener('mousemove', paint);
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [startPaint, paint, exitPaint, canvasRef]);

    return (
        <canvas 
            ref={canvasRef}
            className='z-10 opacity-50 hover:cursor-pointer'
        ></canvas>
    )
}

export default Canvas;