import {Publisher, Subjects, TicketUpdatedEvent} from "@ticketing-romanstrazanec/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
