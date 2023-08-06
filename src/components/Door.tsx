import { memo, useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { colors } from '@/constants/theme';
import { Elevator } from '@/constants/types';
import useElevator from '@/hooks/useElevator';

import Button from './Button';

type Props = {
  elevator: Elevator;
  number: number;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  .action {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 80px;
  }
`;

const MovingDoor = styled.div`
  background-color: ${colors.primary};
  height: 120px;
  width: 110px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  p {
    margin: 10px 0;
    color: #fff;
  }

  .door {
    position: relative;
    background-color: ${colors.secondary};
    width: 100px;
    height: 90px;
    display: flex;

    .side {
      position: absolute;
      background-color: ${colors.gray};
      width: 50%;
      height: 100%;
      transition: width 2s;
      top: 0;
    }

    .left {
      left: 0;
      border-right: 1px #ddd solid;
    }

    .right {
      right: 0;
      border-left: 1px #ddd solid;
    }

    .open {
      width: 0;
    }
  }
`;

function Door(props: Props) {
  const { elevator, number } = props;
  const { changeDoorState, callElevator, addDestination } = useElevator();

  const [doorState, setDoorState] = useState('close');
  const [isMoving, setIsMoving] = useState(false);
  const isCurrentFloor = elevator.currentFloor === number;

  useEffect(() => {
    if (isCurrentFloor) {
      setDoorState(elevator?.doorState);
    }
    setIsMoving(elevator?.moving || false);
  }, [elevator, isCurrentFloor]);

  const handleChangeDoor = (state: string) => {
    if (isCurrentFloor && elevator.direction === 'idle') {
      setDoorState(state);
      changeDoorState(elevator.id, state);
    }
  };

  const handleDestinationClick = async () => {
    if (!isMoving) {
      addDestination(elevator.id, number);
    }
  };

  return (
    <Container>
      <div className="action">
        {number !== 10 && (
          <Button text="up" onClick={() => callElevator(number, 'up')} />
        )}
        {number !== 1 && (
          <Button text="down" onClick={() => callElevator(number, 'down')} />
        )}
      </div>
      <MovingDoor onClick={handleDestinationClick}>
        <p>{number}</p>
        <div className="door">
          <div className={`left side ${doorState}`} />
          <div className={`right side ${doorState}`} />
        </div>
      </MovingDoor>
      <div className="action">
        {isCurrentFloor && (
          <>
            <Button text="close" onClick={() => handleChangeDoor('close')} />
            <Button text="open" onClick={() => handleChangeDoor('open')} />
          </>
        )}
      </div>
    </Container>
  );
}

export default memo(Door);
