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

            context.strokeStyle = 'rgba(250, 234, 72)';
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
            className='z-50 opacity-30 hover:cursor-pointer'
            width={256}
            height={256}
        ></canvas>
    )
}

export default Canvas;