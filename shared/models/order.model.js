export class Order {
    constructor(id, subtotal, deliveryPrice, vats, saving, totalPrice, userId, items, address, paymentMethod, status, timestamp) {
        this.id = id;
        this.subtotal = subtotal;
        this.deliveryPrice = deliveryPrice;
        this.vats = vats;
        this.saving = saving;
        this.totalPrice = totalPrice;
        this.userId = userId;
        this.items = items;
        this.address = address;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.timestamp = timestamp;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get subtotal() {
        return this._subtotal;
    }
    set subtotal(value) {
        this._subtotal = value;
    }
    get deliveryPrice() {
        return this._deliveryPrice;
    }
    set deliveryPrice(value) {
        this._deliveryPrice = value;
    }
    get vats() {
        return this._vats;
    }
    set vats(value) {
        this._vats = value;
    }
    get saving() {
        return this._saving;
    }
    set saving(value) {
        this._saving = value;
    }   
    get totalPrice() {
        return this._totalPrice;
    }
    set totalPrice(value) {
        this._totalPrice = value;
    }
    get userId() {
        return this._userId;
    }
    set userId(value) {
        this._userId = value;
    }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;  
    }
    get paymentMethod() {
        return this._paymentMethod;
    }
    set paymentMethod(value) {
        this._paymentMethod = value;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
}