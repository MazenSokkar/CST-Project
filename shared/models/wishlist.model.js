export class Wishlist {
    constructor(userId, items) {
        this.userId = userId;
        this.items = items;
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
}