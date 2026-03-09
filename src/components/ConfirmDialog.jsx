function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h3>Confirm Delete</h3>

        <p>{message}</p>

        <div className="modal-buttons">

          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="confirm-btn" onClick={onConfirm}>
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmDialog;