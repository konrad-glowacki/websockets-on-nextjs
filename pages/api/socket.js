import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('[SERVER] Socket is already running');
  } else {
    console.log('[SERVER] Socket is initializing');
    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
      socket.on('input-change', (msg) => {
        socket.broadcast.emit('update-input', msg);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default SocketHandler;
