export class Product {
    constructor(id, name, description, price, category, color, quantity, discount, rate, sellerName, imageUrl, isBestSeller, isFeatured, createdAt, size) {
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
        this.CreatedAt = createdAt;
        this.Size = size;
    }
}