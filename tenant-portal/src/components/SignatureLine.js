// SignatureLine.js
import React, { useState } from "react";
import SignatureGenerator from "./SignatureGenerator";
import "./SignatureLine.css";


function SignatureLine({onSignatureSave}) {
  const [isSignatureGeneratorOpen, setIsSignatureGeneratorOpen] = useState(false);
  const [signatureImage, setSignatureImage] = useState(null);
  const [signatureDate, setSignatureDate] = useState(null);

  const handleOpenSignatureGenerator = () => {
    setIsSignatureGeneratorOpen(true);
  };

  const handleCloseSignatureGenerator = () => {
    setIsSignatureGeneratorOpen(false);
  };

  const handleSaveSignature = (imageData) => {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const timestamp = currentDate.toTimeString(undefined, options);    

    setSignatureImage(imageData);
    setSignatureDate(timestamp);
    onSignatureSave({
      signatureImage: imageData,
      signatureTimestamp: timestamp,
    });
  };

  return (
    <div className="SignatureLine">
      {/* Your signable area or text goes here */}
      <div className="signable-area" onClick={handleOpenSignatureGenerator}>
        {signatureImage ? (
          <>
            <div className="signature-container-final">
              <div className="signature-placeholder">
                <div className="x">X</div>
                <div className="signature-line">
                  <span>___________________________</span>
                </div>
              </div>
              
            </div>
            <img src={signatureImage} alt="Signature" style={{marginLeft: '45px'}}/>
            <p style={{fontSize: '12px',  position: 'relative', top: '10px', marginLeft: '345px'}}>Date: {new Date().toLocaleDateString()}</p>
            <p style={{ fontSize: '12px', position: 'relative', top: '-10px', marginLeft: '345px' }}>Time: {new Date().toLocaleTimeString()}</p>
            
          </>
        ) : (
          <>
  <div className="signature-container-init">
    <div className="signature-placeholder">
      <div className="signature-line-init">
        <div className="x">X</div>        
        <span className="signature-line-init">___________________________</span>
        <div className="click-to-sign">click here to sign</div>        
      </div>
    </div>
  </div>
</>
        )}
      </div>      
      {/* Open SignatureGenerator when isSignatureGeneratorOpen is true */}
      {isSignatureGeneratorOpen && (
        <SignatureGenerator onSave={handleSaveSignature} onClose={handleCloseSignatureGenerator} />

      )}
      {/* Display overlay blocks when SignatureGenerator is open */}
      {isSignatureGeneratorOpen && (
        <>
          <div className="overlay-block"></div>
        </>
      )}
      
      {/* <p style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)' }}>does this show?</p>
      <p style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translateX(-50%)' }}>does this show?</p>
      <p style={{ float: 'right' }}>does this show?</p> */}
      
    </div>
    

  );
}

export default SignatureLine;