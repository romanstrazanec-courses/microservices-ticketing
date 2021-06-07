import {ExpirationCompleteEvent, Publisher, Subjects} from "@ticketing-romanstrazanec/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}
