import { styled } from 'styled-components';

import Elevators from '@/components/Elevators';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Home() {
  return (
    <Container>
      <Elevators />
    </Container>
  );
}

export default Home;
