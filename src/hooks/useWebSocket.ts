// src/hooks/useWebSocket.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateData } from '../store/slices/dataSlice';

export const useWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket('wss://ws.postman-echo.com/raw');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(updateData(data));
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);
};
