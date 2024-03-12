import { Container } from '../../templates';

type Props = { error: Error };

export const Error = ({ error }: Props) => {
  return (
    <Container boxVariant="error">
      <h2>{error.name}</h2>
      <p>{error.message}</p>
    </Container>
  );
};
