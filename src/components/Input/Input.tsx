import { Label } from '..';

import * as Styles from './Input.styles';

type Props = {
  label: string;
  inputName: string;
  onChange: (_: number) => void;
  value: number;
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
    onChange(Number(event.target.value));
  };

  return (
    <Styles.Wrapper>
      <Label label={label} inputName={inputName} />
      <input
        type="number"
        id={inputName}
        name={inputName}
        onInput={onInput}
        value={value}
        min={`${minValue}`}
      />
    </Styles.Wrapper>
  );
};
