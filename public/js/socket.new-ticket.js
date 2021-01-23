var socket = io();
var newTicketBtn = document.getElementById("new-ticket");
var ticketLabel = document.getElementById("lblNewTicket");
socket.on("connect", function () {
  console.log("connected on server");
});
socket.on("disconnect", function () {
  console.log("connection lost");
});
socket.on("currentState", function (ticket) {
  console.log(ticket);
  ticketLabel.innerText = ticket.current;
});

newTicketBtn.onclick = function () {
  socket.emit("newTicket", function (ticket) {
    ticketLabel.innerText = ticket;
    console.log(ticket);
  });
};
