// src/hooks/useWebSocket.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { updateAllPatientVitals } from '../store/slices/dataSlice';

export const useWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('http://localhost:8080');

    socket.on('connect', () => {
      console.log('Socket.IO connection established.');
    });

    socket.on('patientData', (dataArray) => {
      dispatch(updateAllPatientVitals(dataArray));
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO connection disconnected.');
    });

    socket.on('error', (error) => {
      console.error('Socket.IO error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};
