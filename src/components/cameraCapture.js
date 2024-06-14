import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const CameraCapture = ({ onCapture }) => {
    const [data, setData] = useState(null);
    const [startScan, setStartScan] = useState(false);

    const handleScan = (result) => {
        if (result) {
            setData(result);
            onCapture(result);
            // stop scanning after a successful scan
            setStartScan(false);
        }
    };

    const handleStartScan = () => {
        setStartScan(true);
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full sm:w-1/2 lg:w-1/3">
                {startScan && (
                    <QrReader
                        onResult={(result, error) => {
                            if (!!result) {
                                handleScan(result);
                            }
                            if (!!error) {
                                handleError(error);
                            }
                        }}
                        style={{ width: "100%" }}
                    />
                )}
                <button onClick={handleStartScan}>Start Scan</button>
                <p className="mt-4 text-center">{data}</p>
            </div>
        </div>
    )
}

export default CameraCapture;
