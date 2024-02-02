import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function Index() {
  const [input, setInput] = useState('');

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socket');
      socket = io();

      socket.on('connect', () => {
        console.log('[CLIENT] Connected to the server');
      });

      socket.on('update-input', (msg) => {
        setInput(msg);
      });

      return null;
    };

    socketInitializer();
  }, []);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit('input-change', e.target.value);
  };

  return (
    <input
      placeholder='Type something'
      value={input}
      onChange={onChangeHandler}
    />
  );
}
