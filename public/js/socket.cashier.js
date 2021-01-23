var socket = io();
var cashierView = document.getElementById("cashier-title");
var sendButton = document.getElementById("send-cashier");
var currentTicket = document.getElementById("current-ticket");
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("cashier")) {
  window.location = "index.html";
  throw new Error("The cashier is required");
}
var cashier = searchParams.get("cashier");
cashierView.innerText = `Cashier ${cashier}`;

sendButton.onclick = function () {
  socket.emit("attendTicket", { cashier }, function (resp) {
    if (resp === "no tickets") return alert(resp);
    currentTicket.innerText = resp.number;
  });
};
