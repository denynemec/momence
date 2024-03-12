import * as Styles from './Label.styles';

type Props = {
  label: string;
  inputName: string;
};

export const Label = ({ label, inputName }: Props) => {
  return <Styles.Label htmlFor={inputName}>{label}</Styles.Label>;
};
