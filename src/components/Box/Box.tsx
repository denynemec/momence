import React from 'react';

import * as Styles from './Box.styles';

export type Variant = 'default' | 'error';

type Props = { children: React.ReactNode; variant?: Variant };

export const Box = ({ children, variant = 'default' }: Props) => {
  return (
    <Styles.Wrapper>
      <Styles.Content $variant={variant}>{children}</Styles.Content>
    </Styles.Wrapper>
  );
};
