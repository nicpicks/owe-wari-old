import React, { useRef } from 'react';

function CameraClip({ onCapture }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
    };

    const takePicture = async () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        onCapture(imageData);
    };

    return (
        <div>
            <video ref={videoRef} autoPlay />
            <canvas ref={canvasRef} />
            <button
                onClick={startCamera}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Open Camera</button>
            <button
                onClick={takePicture}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
            >Take Picture</button>
        </div>
    );
}

export default CameraClip;