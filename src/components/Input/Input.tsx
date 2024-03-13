import { Label } from '..';

import * as Styles from './Input.styles';

type Props = {
  label: string;
  inputName: string;
  onChange: (_: string) => void;
  value: string;
  minValue?: number;
};

export const Input = ({
  label,
  inputName,
  onChange,
  value,
  minValue,
}: Props) => {
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    const parsedNumber = Number(newValue);

    if (isNaN(parsedNumber) || parsedNumber < 0) {
      return;
    }

    onChange(newValue);
  };

  return (
    <Styles.Wrapper>
      <Label label={label} inputName={inputName} />
      <input
        id={inputName}
        name={inputName}
        onInput={onInput}
        value={value}
        min={`${minValue}`}
      />
    </Styles.Wrapper>
  );
};
