import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { fetchImage } from '../../services/api';
import { Layout } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    page: 1,
    searchImage: '',
    images: [],
    error: false,
    totalHits: null,
    isLoading: false,
  };
  async componentDidUpdate(_, prevState) {
    const { page, searchImage } = this.state;
    if (prevState.searchImage !== searchImage || prevState.page !== page)
      try {
        this.setState({ isLoading: true, error: null });
        const { totalHits, hits } = await fetchImage(searchImage, page);
        const normalizedImages = hits.map(
          ({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          })
        );
        if (!totalHits) {
          return toast.error(
            'Search result not successful. Enter the correct image name'
          );
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...normalizedImages],
          totalHits,
        }));
      } catch {
        toast.error('Something went wrong. Try again.');
      } finally {
        this.setState({ isLoading: false });
      }
  }
  handleSubmit = searchImage => {
    this.setState({ searchImage, page: 1, images: [] });
  };
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { images, totalHits, page, isLoading } = this.state;
    const totalPages = Math.ceil(totalHits / 12);
    return (
      <Layout>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        <ToastContainer position="top-left" />
        {images.length > 0 && <ImageGallery items={images} />}
        {images.length > 0 && totalPages > page && (
          <Button onClick={this.loadMore} />
        )}
      </Layout>
    );
  }
}
