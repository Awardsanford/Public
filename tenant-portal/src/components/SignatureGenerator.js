import React, { useRef, useCallback, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./SignatureGenerator.css";

function SignatureGenerator({ onSave, onClose }) {
  const padRef = useRef(null);
  const [canvas, setCanvas] = useState(undefined);
  const [canvasVisibility, setCanvasVisibility] = useState(false);
  const [signatureCreated, setSignatureCreated] = useState(false);

  const handleCanvasMouseDown = useCallback(() => {
    setSignatureCreated(true);
  }, []);

  const handleCanvasEnd = useCallback(() => {
    if (padRef.current.isEmpty()) {
      setSignatureCreated(false);
    }
  }, []);

  const clearSignatureCanvas = useCallback(() => {
    padRef.current.clear();
    setCanvas(undefined);
    setCanvasVisibility(false);
    setSignatureCreated(false);
  }, []);

  const handleGetCanvas = useCallback(() => {
    const canvasData = padRef.current.toDataURL();
    setCanvas(canvasData);
    setCanvasVisibility(true);
    onSave(canvasData);
    onClose();
  }, [onSave, onClose]);

  return (
    <div className="SignatureGenerator">
      <b style={{fontSize: "16px"}}>Please sign below</b>
      {/* <p>Please sign below</p> */}
      <div className="signature-area">
        <SignatureCanvas
          ref={padRef}
          canvasProps={{
            width: 400,
            height: 120,
            onMouseDown: handleCanvasMouseDown,
            onEnd: handleCanvasEnd,
          }}
        />
      </div>

      {canvasVisibility && <img src={canvas} alt="signature" />}

      <div className="button-container d-flex justify-content-between" style={{ marginTop: "10px" }} >
        <button className="btn btn-primary" onClick={clearSignatureCanvas}>
          Clear
        </button>
        <button
          className="btn btn-primary ms-2"
          onClick={handleGetCanvas}
          disabled={!signatureCreated}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default SignatureGenerator;
