import React from "react";
import ReactModal from "react-modal";
import "./style.scss";

const style = {
  content: {
    padding: 50,
    height: "100%"
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.9)"
  }
};

const Modal = ({ children, ...props }) => (
  <ReactModal className="Modal" style={style} {...props}>
    <div className="Modal__close" onClick={props.handleClose} />
    {children}
  </ReactModal>
);

export default Modal;
