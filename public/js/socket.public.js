var socket = io();
var labelTicket1 = document.getElementById("lblTicket1");
var labelCashier1 = document.getElementById("lblCashier1");
var labelTicket2 = document.getElementById("lblTicket2");
var labelCashier2 = document.getElementById("lblCashier2");
var labelTicket3 = document.getElementById("lblTicket3");
var labelCashier3 = document.getElementById("lblCashier3");
var labelTicket4 = document.getElementById("lblTicket4");
var labelCashier4 = document.getElementById("lblCashier4");

var lblTickets = [labelTicket1, labelTicket2, labelTicket3, labelTicket4];
var lblCashiers = [labelCashier1, labelCashier2, labelCashier3, labelCashier4];
socket.on("currentState", function (data) {
  updateHtml(data.last4);
});

function updateHtml(last4) {
  console.log(last4)
  for (var i = 0; i <= last4.length - 1; i++) {
    console.log("in")
    lblTickets[i].innerText = "Ticket " + last4[i].number;
    lblCashiers[i].innerText = "Cashier " + last4[i].cashierId;
  }
}
