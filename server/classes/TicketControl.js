const fs = require("fs");
const Ticket = require("./Ticket");

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.displayTickets = [];
    let data = require("../data/data.json");
    if (data.today === this.today) {
      this.last = data.last;
      this.tickets = data.tickets;
      this.displayTickets = data.displayTickets;
    } else {
      this.countReboot();
    }
  }
  next() {
    this.last++;
    let ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);
    this.saveFile();
    return `Ticket ${this.last}`;
  }
  getLastTicket() {
    return `Ticket ${this.last}`;
  }
  getLast4() {
    return this.displayTickets;
  }
  attendTicket(cashier) {
    if (this.tickets.length === 0) {
      return "no tickets";
    }
    let ticketNumber = this.tickets[0].number;
    this.tickets.shift();
    let attendTicket = new Ticket(ticketNumber, cashier);
    this.displayTickets.unshift(attendTicket);
    if(this.displayTickets.length > 4) this.displayTickets.splice(-1, 1) ;
    this.saveFile();
    return attendTicket;
  }
  saveFile() {
    let jsonData = {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      displayTickets: this.displayTickets,
    };
    let jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
  countReboot() {
    this.last = 0;
    this.tickets = [];
    this.displayTickets = [];
    this.saveFile();
  }
}

module.exports = {
  TicketControl,
};
