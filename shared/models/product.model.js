export class Product {
    constructor(id, name, description, price, category, color, quantity, discount, rate, sellerName, imageUrl, isBestSeller, isFeatured) {
        this.Id = id;
        this.Name = name;
        this.Description = description;
        this.Price = price;
        this.Category = category;   
        this.Color = color;
        this.Quantity = quantity;
        this.Discount = discount;
        this.Rate = rate;
        this.SellerName = sellerName;
        this.ImageUrl = imageUrl;
        this.IsBestSeller = isBestSeller;
        this.IsFeatured = isFeatured;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }   
    set name(value) {
        this._name = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }   
    get price() {   
        return this._price;
    }
    set price(value) {
        this._price = value;
    }   
    get category() {
        return this._category;
    }   
    set category(value) {
        this._category = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }   
    get quantity() {
        return this._quantity;
    }   
    set quantity(value) {
        this._quantity = value;
    }
    get discount() {
        return this._discount;
    }
    set discount(value) {
        this._discount = value;
    }
    get rate() {
        return this._rate;
    }   
    set rate(value) {
        this._rate = value;
    }   
    get sellerName() {
        return this._sellerName;
    }   
    set sellerName(value) {
        this._sellerName = value;
    }
    get imageUrl() {
        return this._imageUrl;
    }   
    set imageUrl(value) {
        this._imageUrl = value;
    }
    get isBestSeller() {
        return this._isBestSeller;
    }   
    set isBestSeller(value) {   
        this._isBestSeller = value;
    }                   
    get isFeatured() {
        return this._isFeatured;
    }
    set isFeatured(value) {
        this._isFeatured = value;
    }
}