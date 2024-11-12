import "./modal.scss";
import Cancel from "../../icons/Cancel";

const Modal = ({ setOpenModal, resetForm, children }) => {
  return (
    <div className="modal-window">
      <div className="modal-box">
        <div className="modal-header">
          <div className="title"></div>
          <div
            onClick={() => {
              setOpenModal(false);
              resetForm();
            }}
            className="modal-cancel"
          >
            <Cancel />
          </div>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
