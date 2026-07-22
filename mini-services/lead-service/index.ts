import { Server } from "socket.io";

const io = new Server({
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("[LeadService] Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("[LeadService] Client disconnected:", socket.id);
  });
});

// Broadcast function - called from the API routes via fetch
io.on("new-lead", (data: unknown) => {
  io.emit("lead:created", data);
});

// Start server
const PORT = 3003;
io.listen(PORT);
console.log(`[LeadService] Socket.io running on port ${PORT}`);

// Export for external access
export { io, PORT };