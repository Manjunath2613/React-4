import { useState } from 'react';

export default function ConfirmationDialog({ message, onConfirm, onCancel }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm();
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.dialog}>
      <div style={styles.content}>
        <p>{message}</p>
        <div style={styles.buttons}>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleConfirm} style={styles.confirmButton}>OK</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dialog: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  content: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px'
  },
  confirmButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none'
  }
};