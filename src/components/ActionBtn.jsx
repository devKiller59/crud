import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaQuestion } from 'react-icons/fa';

export default function ActionBtn() {
  const [mostrarPopup, setMostrarPopup] = useState(false);

  return (
    <>
      <button 
        className="btn-info" 
        onClick={() => setMostrarPopup(true)}
        title="Información importante"
      >
        <FaQuestion size={18} />
      </button>

      {/* El popup se renderiza directamente en el <body> */}
      {mostrarPopup && createPortal(
        <div className="popup-overlay" onClick={() => setMostrarPopup(false)}>
          <div className="popup-contenido" onClick={(e) => e.stopPropagation()}>
            <h3>Acción requerida</h3>
            <p>
              Antes de usar esta aplicación, es necesario validar que KillerCore API esté en funcionamiento.
            </p>
            
            <div className="popup-botones">
              <button 
                className="btn-cerrar" 
                onClick={() => setMostrarPopup(false)}
              >
                Cerrar
              </button>

              <a
                href="https://dk59-crud-api.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accion"
                onClick={() => setMostrarPopup(false)}
              >
                Completar acción
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
