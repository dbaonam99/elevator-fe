import React from 'react';
import { styled } from 'styled-components';

import { colors } from '@/constants/theme';

type Props = {
  text: string;
  onClick: () => void;
};

const Container = styled.div`
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: ${colors.base};
  background-color: ${colors.gray};
  border-radius: 10px;
  width: 100%;

  p {
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
    margin: 0;
  }
`;

function Button(props: Props) {
  const { text, onClick } = props;

  return (
    <Container onClick={onClick}>
      <p>{text}</p>
    </Container>
  );
}

export default Button;
