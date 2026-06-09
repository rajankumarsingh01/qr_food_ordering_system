const registerOrderSocketEvents = (
  io
) => {
  io.on(
    "connection",
    (socket) => {
      console.log(
        `🔌 User Connected: ${socket.id}`
      );

      socket.on(
        "join_table",
        ({
          tableNumber,
        }) => {
          const room =
            `table_${tableNumber}`;

          socket.join(room);

          console.log(
            `Customer joined ${room}`
          );
        }
      );

      socket.on(
        "join_kitchen",
        () => {
          socket.join(
            "kitchen"
          );

          console.log(
            "Kitchen joined"
          );
        }
      );

      socket.on(
        "join_admin",
        () => {
          socket.join(
            "admin"
          );

          console.log(
            "Admin joined"
          );
        }
      );

      socket.on(
        "disconnect",
        () => {
          console.log(
            `❌ Disconnected: ${socket.id}`
          );
        }
      );
    }
  );
};

export default
  registerOrderSocketEvents;