import { Spinner } from '../../components';
import { Container } from '../../templates';

import * as Styles from './Loading.styles';

export const Loading = () => {
  return (
    <Container>
      <Styles.Wrapper>
        <Spinner />
      </Styles.Wrapper>
    </Container>
  );
};
