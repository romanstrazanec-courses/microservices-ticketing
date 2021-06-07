import {PaymentCreatedEvent, Publisher, Subjects} from "@ticketing-romanstrazanec/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}
