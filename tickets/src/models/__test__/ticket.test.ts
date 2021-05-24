import {Ticket} from "../ticket";

it('implements optimistic concurrency control', async (done) => {
    // Create an instance of a ticket.
    const ticket = Ticket.build({
        title: 'test',
        price: 20,
        userId: '123'
    });
    await ticket.save();

    // Fetch the ticket twice.
    const ticket1 = await Ticket.findById(ticket.id);
    const ticket2 = await Ticket.findById(ticket.id);

    // Make two separate changes to the tickets we fetched.
    ticket1!.set({price: 10});
    ticket2!.set({price: 15});

    // Save the first fetched ticket.
    await ticket1!.save();

    // Save the second fetched ticket and expect an error.
    try {
        await ticket2!.save();
    } catch (err) {
        return done();
    }
    throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
    const ticket = Ticket.build({
        title: 'test',
        price: 20,
        userId: 'test'
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
});
