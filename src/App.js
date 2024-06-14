import React, { useState } from 'react';
import CameraClip from './components/cameraClip';
import axios from 'axios';

export default function App() {
  const [ocrResult, setOcrResult] = useState(null);
  const handleCapture = async (imageData) => {
    try {
      const formData = new FormData();
      formData.append("base64image", imageData);

      const response = await axios.post("https://api.ocr.space/parse/image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'apikey': 'K89350350188957',
          'isTable': 'true',
        },
      });
      setOcrResult(response.data);
    } catch (error) {
      console.error('Error processing image', error);
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center text-primary">
      <h1 className="text-4xl mb-8">OweWari</h1>
      <CameraClip onCapture={handleCapture} />
      {ocrResult && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-2xl mb-4">Receipt Details:</h2>
          <pre className="whitespace-pre-wrap">
            {typeof ocrResult === 'string' ? ocrResult : JSON.stringify(ocrResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
