import React from 'react';
import './Modal.css';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children, title }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <div className="modal-close" onClick={onClose}>
            ×
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
