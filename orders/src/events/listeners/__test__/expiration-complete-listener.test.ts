import mongoose from "mongoose";
import {ExpirationCompleteEvent, OrderStatus} from "@ticketing-romanstrazanec/common";
import {natsWrapper} from "../../../nats-wrapper";
import {Message} from "node-nats-streaming";
import {Ticket} from "../../../models/ticket";
import {ExpirationCompleteListener} from "../expiration-complete-listener";
import {Order} from "../../../models/order";

const setup = async () => {
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'test',
        price: 20
    });
    await ticket.save();

    const order = Order.build({
        status: OrderStatus.Created,
        userId: 'random',
        expiresAt: new Date(),
        ticket
    });
    await order.save();

    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {listener, order, data, msg};
};

it('updates the order status to cancelled', async () => {
    const {listener, order, data, msg} = await setup();
    await listener.onMessage(data, msg);
    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits an OrderCancelled event', async () => {
    const {listener, order, data, msg} = await setup();
    await listener.onMessage(data, msg);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
    expect(eventData.id).toEqual(order.id);
});

it('acks the message', async () => {
    const {listener, data, msg} = await setup();
    await listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
});
