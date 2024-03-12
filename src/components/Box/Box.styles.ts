import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
`;

export const Content = styled.div<{ $variant: string }>`
  width: 500px;
  background-color: ${(props) =>
    props.$variant === 'error' ? '#F16B61' : '#ffffff'};
  border-color: ${(props) =>
    props.$variant === 'error' ? '#FF0000' : '#000000'};
  border-width: 2px;
  border-radius: 8px;
  border-style: solid;
  padding: 16px;
`;
