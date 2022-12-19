import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, ItemImage } from './ImageCleryItem.styled';
//  { webformatURL, tags }
export class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  };
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { webformatURL, largeImageURL } = this.props;
    return (
      <>
        <GalleryItem>
          <ItemImage
            src={webformatURL}
            alt={webformatURL}
            onClick={this.toggleModal}
            aria-label="Open image"
          />
        </GalleryItem>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal} url={largeImageURL} />
        )}
      </>
    );
  }
}
