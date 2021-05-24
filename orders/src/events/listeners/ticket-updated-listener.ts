import {Message} from "node-nats-streaming";
import {Listener, Subjects, TicketUpdatedEvent} from "@ticketing-romanstrazanec/common";
import {Ticket} from "../../models/ticket";
import {queueGroupName} from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    readonly queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
        const ticket = await Ticket.findByEvent(data);
        if (!ticket) throw new Error('Ticket not found');

        const {title, price, version} = data;

        ticket.set({title, price, version});
        await ticket.save();
        msg.ack();
    }
}
