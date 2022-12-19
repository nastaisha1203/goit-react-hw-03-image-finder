import { ThreeDots } from 'react-loader-spinner';
import { Container } from './Loader.styled';

export const Loader = () => {
  return (
    <Container>
      <ThreeDots
        color="red"
        height="80"
        width="80"
        radius="9"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </Container>
  );
};
