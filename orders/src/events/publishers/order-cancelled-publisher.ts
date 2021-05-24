import {OrderCancelledEvent, Publisher, Subjects} from "@ticketing-romanstrazanec/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}
