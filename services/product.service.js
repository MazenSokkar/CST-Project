// get by id
// get all
// add new
// update
// delete
//      

// Get Product By ID
import { Product } from "../shared/models/product.model.js";
export async function GetProductById(id) {
    const response = await fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`);
    if (!response.ok) 
        throw new Error(`Failed to fetch product with id: ${id}`); 
    const ProductData = await response.json();
    if (!ProductData) {
        throw new Error(`Product with id ${id} not found`);
    }
    return new Product(
        ProductData.Id,
        ProductData.Name,
        ProductData.Description,
        ProductData.Price,
        ProductData.Category,
        ProductData.Color,
        ProductData.Quantity,
        ProductData.Discount,
        ProductData.Rate,
        ProductData.SellerName,
        ProductData.ImageUrl,
        ProductData.IsBestSeller,
        ProductData.IsFeatured,
        ProductData.CreatedAt,
        ProductData.Size
    );


}