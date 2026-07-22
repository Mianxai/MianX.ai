import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT = 3003;

const httpServer = createServer((req, res) => {
  // Handle broadcast triggers from Next.js API routes
  if (req.method === 'POST' && req.url === '/broadcast') {
    let body = '';
    req.on('data', (chunk: string) => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const event: string = data.event || 'update';
        const payload = data.payload || {};
        console.log(`[Broadcast] '${event}' to ${io.sockets.adapter.rooms.get('dashboard')?.size || 0} clients`);
        io.to('dashboard').emit(event, payload);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
  path: '/socket.io/',
});

io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);

  socket.on('join-dashboard', () => {
    socket.join('dashboard');
    console.log(`[Socket] ${socket.id} joined dashboard room`);
    socket.emit('connected', { message: 'Real-time connection established' });
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`[RealtimeService] Running on port ${PORT} (Socket.io + HTTP triggers)`);
});