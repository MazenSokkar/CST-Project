export class Order {
    constructor(id, subtotal, deliveryPrice, vats, saving, totalPrice, userId, items, address, paymentMethod, status, timestamp) {
        this.Id = id;
        this.Subtotal = subtotal;
        this.DeliveryPrice = deliveryPrice;
        this.Vats = vats;
        this.Saving = saving;
        this.TotalPrice = totalPrice;
        this.UserId = userId;
        this.Items = items;
        this.Address = address;
        this.PaymentMethod = paymentMethod;
        this.Status = status;
        this.Timestamp = timestamp;
    }
}