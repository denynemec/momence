import { useEffect } from 'react';
import { Label } from '..';
import { Options } from '../../types';

import * as Styles from './Select.styles';

type Props = {
  label: string;
  inputName: string;
  onChange: (_: string) => void;
  options: Options;
  value: string;
};

export const Select = ({
  label,
  inputName,
  onChange,
  options,
  value,
}: Props) => {
  const onChange_ = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  useEffect(() => {
    if (value === '' && options.length > 0) {
      onChange(options[0].key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styles.Wrapper>
      <Label inputName={inputName} label={label} />
      <select
        id={inputName}
        name={inputName}
        onChange={onChange_}
        value={value}
      >
        {options.map(({ label, key }) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </Styles.Wrapper>
  );
};
