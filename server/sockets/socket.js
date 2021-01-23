const io = require("../server").io;
const { TicketControl } = require("../classes/TicketControl");
const ticketControl = new TicketControl();
let currentTicket;
io.on("connection", (client) => {
  console.log("client connected");
  client.emit("currentState", {
    current: ticketControl.getLastTicket(),
    last4: ticketControl.getLast4(),
  });

  client.on("newTicket", (response) => {
    currentTicket = ticketControl.next();
    response(currentTicket);
  });

  client.on("attendTicket", (data, cb) => {
    if (!data.cashier) return cb({ err: true, message: "cashier is required" });
    let attendTicket = ticketControl.attendTicket(data.cashier);
    cb(attendTicket);
    client.broadcast.emit("currentState",{last4:ticketControl.getLast4()});
    // falta llamar algo para notificar cambios en los ultimos 4
  });
});
