import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Image, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  clickBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { url } = this.props;
    return createPortal(
      <Overlay onClick={this.clickBackdrop}>
        <div>
          <Image src={url} alt={url} />
        </div>
      </Overlay>,
      modalRoot
    );
  }
}
