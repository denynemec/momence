import * as Styles from './Button.styles';

type Props = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  type: 'button' | 'submit';
};

export const Button = ({
  label,
  disabled = false,
  onClick,
  type = 'button',
}: Props) => {
  return (
    <Styles.Button type={type} disabled={disabled} onClick={onClick}>
      {label}
    </Styles.Button>
  );
};
