import React from 'react';

import * as Styles from './Container.styles';
import { Box, Variant } from '../components';

type Props = { children: React.ReactNode; boxVariant?: Variant };

export const Container = ({ children, boxVariant }: Props) => (
  <Styles.Container>
    <Box variant={boxVariant}>{children}</Box>
  </Styles.Container>
);
