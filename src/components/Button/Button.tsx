import * as Styles from './Button.styles';

type Props = { label: string; onClick?: () => void; type: 'button' | 'submit' };

export const Button = ({ label, onClick, type = 'button' }: Props) => {
  return (
    <Styles.Button type={type} onClick={onClick}>
      {label}
    </Styles.Button>
  );
};
