export type DoorProps = {
  id: number;
  state: string;
};

export type Elevator = {
  id: number;
  data: DoorProps[];
  doorState: string;
  floorAmount: number;
  currentFloor: number;
  direction: string;
  moving: boolean;
};
