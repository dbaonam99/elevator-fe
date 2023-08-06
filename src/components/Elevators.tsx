import React, { useEffect } from 'react';
import { styled } from 'styled-components';

import { generateFloors } from '@/utils/func';
import { colors } from '@/constants/theme';
import useElevator from '@/hooks/useElevator';
import { MOVEMENT_INTERVAL } from '@/constants/constants';

import Door from './Door';

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 200px;
  padding: 50px;
  justify-content: center;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ElevatorInfo = styled.div`
  width: 110px;
  height: 150px;
  background-color: ${colors.primary};
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  p {
    color: ${colors.white};
    font-size: 30px;
    margin: 0;
    color: ${colors.red}};
  }

`;

function Elevators() {
  const { getElevators, elevators } = useElevator();

  useEffect(() => {
    const interval = setInterval(() => {
      getElevators();
    }, MOVEMENT_INTERVAL);

    return () => clearInterval(interval);
  }, [getElevators]);

  return (
    <Container>
      {elevators?.map((elevator) => (
        <Block key={elevator.id}>
          {generateFloors(elevator.floorAmount).map((floor) => (
            <Door key={floor.id} elevator={elevator} number={floor.id} />
          ))}
          {elevator.moving ? 'true' : 'false'}
          <ElevatorInfo>
            <p>{elevator.direction === 'up' ? '▲' : '-'}</p>
            <p>{elevator.currentFloor}</p>
            <p>{elevator.direction === 'down' ? '▼' : '-'}</p>
          </ElevatorInfo>
        </Block>
      ))}
    </Container>
  );
}

export default Elevators;
