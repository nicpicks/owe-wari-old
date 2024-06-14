import React, { useRef } from 'react';

function CameraClip({ onCapture }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        const constraints = {
            video: {
                facingMode: 'environment'
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
    };

    const takePicture = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        const imageData = canvas.toDataURL('image/png', 1.0);
        onCapture(imageData);
    };

    return (
        <div className="w-full flex flex-col items-center">

            <video ref={videoRef} autoPlay playsInline />
            <canvas ref={canvasRef} className='m-2 max-w-full max-h-full' />
            <div className="p-5 justify-between flex-gap-2">
                <button
                    onClick={startCamera}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >Open Camera</button>
                <button
                    onClick={takePicture}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
                >Take Picture</button>
            </div>
        </div>
    );
}

export default CameraClip;