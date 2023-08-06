import { useState } from 'react';
import axios from 'axios';

import { Elevator } from '@/constants/types';
import { API_URL } from '@/constants/constants';

const useElevator = () => {
  const [elevators, setElevators] = useState<Elevator[]>([]);

  const getElevators = () => {
    axios
      .get(`${API_URL}/elevators`)
      .then((res) => {
        setElevators(res.data);
      })
      .catch((error) => {
        console.error('Error fetching elevators:', error);
      });
  };

  const callElevator = async (floor: number, direction: string) => {
    await axios.post(`${API_URL}/call-elevator`, {
      floor,
      direction,
    });
  };

  const addDestination = async (elevatorId: number, floor: number) => {
    await axios.post(`${API_URL}/add-destination`, {
      elevatorId,
      destinationFloor: floor,
    });
  };

  const changeDoorState = async (elevatorId: number, state: string) => {
    await axios.post(`${API_URL}/door-state`, {
      elevatorId,
      state,
    });
  };

  return {
    elevators,
    callElevator,
    addDestination,
    changeDoorState,
    getElevators,
  };
};

export default useElevator;
