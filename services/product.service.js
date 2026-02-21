import {Product} from "../shared/models/product.model.js";
const BASE_URL = "https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app";

// Helper function to map Firebase data to Product instances
export function mapToProduct(data) {
    return new Product(
        data.Id,
        data.Name,
        data.Description,
        data.Price,
        data.Category,
        data.Color,
        data.Quantity,
        data.Discount,
        data.Rate,
        data.SellerName,
        data.ImageUrl,
        data.IsBestSeller,
        data.IsFeatured,
        data.CreatedAt ?? null,
        data.Size ?? null
    );
}

// Get Product By ID
export async function GetProductById(id) {
    const response = await fetch(`${BASE_URL}/products/${id}.json`);
    if (!response.ok) 
        throw new Error(`Failed to fetch product with id: ${id}`); 
    const ProductData = await response.json();
    if (!ProductData) {
        throw new Error(`Product with id ${id} not found`);
    }
    return mapToProduct(ProductData);
}

// Update Product
export async function UpdateProduct(product) {
    const existingProduct = await GetProductById(product.Id);
    if (!existingProduct) {
        throw new Error(`Product with id ${product.Id} not found`);
    }
    else{
        try{
            const response = await fetch(
                `${BASE_URL}/products/${existingProduct.Id}.json`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(product)
                }
            );
            return response.ok;
        }
        catch{
            return false;
        }
    }
}

// get all products 
export async function getAllProducts() {

    let products = [];  
    try {
        const response = await fetch(`${BASE_URL}/products.json`);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        if (data) {

            const values = Object.values(data);

            values.forEach(product => {

                const newProduct = mapToProduct(product);

                products.push(newProduct);   // بضيف العناصر فى ال array
            });
        }

    } catch (error) {
        console.error("Error fetching products:", error);
    }

    return products;   
}

// Add New Product
export async function addProduct(product) {
    try {
        const products = await getAllProducts();

        let lastId = 0;
        if (products.length > 0) {
            lastId = products[products.length - 1].Id;
        }

        product.Id = lastId + 1;

        return fetch(`${BASE_URL}/products/${product.Id}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

    } catch (error) {
        console.error('Error adding product:', error);
    }
}

//Delete Product
export async function deleteProduct(id) {
    return fetch(`${BASE_URL}/products/${id}.json`, {
        method: 'DELETE'
    })
    .then(response =>{
        if (!response.ok) {
            throw new Error(`Failed to delete product with id: ${id}`);
        }
        console.log("Product deleted successfully");
    })
    .catch(error => console.error('Error deleting product:', error));
}