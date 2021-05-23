import {Publisher, Subjects, TicketCreatedEvent} from "@ticketing-romanstrazanec/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}
