function Modal({ title, onClose, onConfirm, confirmText, cancelText, children }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{title}</h3>
        {children}
        <button onClick={onConfirm} aria-label={confirmText}>{confirmText || 'Confirm'}</button>
        {cancelText && (
          <button className="cancel" onClick={onClose} aria-label={cancelText}>
            {cancelText}
          </button>
        )}
      </div>
    </div>
  );
}

export default Modal;