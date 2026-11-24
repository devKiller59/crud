import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaQuestion } from 'react-icons/fa';

export default function ActionBtn() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <button 
        className="btn-info" 
        onClick={() => setShowPopup(true)}
        title="Important Information"
      >
        <FaQuestion size={18} />
      </button>

      {/* El popup se renderiza directamente en el <body> */}
      {showPopup && createPortal(
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Action Required</h3>
            <p>
              Before using this application, it is necessary to validate that KillerCore API is running.
            </p>
            
            <div className="popup-buttons">
              <button 
                className="btn-close" 
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>

              <a
                href="https://dk59-crud-api.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-action"
                onClick={() => setShowPopup(false)}
              >
                Go to API
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
