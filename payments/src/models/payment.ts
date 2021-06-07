import mongoose from "mongoose";

interface PaymentAttrs {
    orderId: string;
    stripeId: string;
}

interface PaymentsDoc extends mongoose.Document {
    orderId: string;
    stripeId: string;
}

interface PaymentModel extends mongoose.Model<PaymentsDoc> {
    build(attrs: PaymentAttrs): PaymentsDoc;
}

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    stripeId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
    return new Payment(attrs);
};

const Payment = mongoose.model<PaymentsDoc, PaymentModel>('Payment', paymentSchema);

export {Payment};
