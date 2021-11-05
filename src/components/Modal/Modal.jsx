import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./Modal.module.css";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = ({ code }) => {
    if (code === "Escape") {
      this.props.onClose();
    }
  };
  handleBackDropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={s.overlay} onClick={this.handleBackDropClick}>
        <div className={s.modal}>
          <img src={this.props.src} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.string,
};
export default Modal;
