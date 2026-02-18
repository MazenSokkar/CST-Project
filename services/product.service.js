// get by id
// get all
// add new
// update
// delete

import { Product } from '../shared/models/product.model.js';

// get all products 
export async function getAllProducts() {

    let products = [];  
    try {
        const response = await fetch("https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/products.json");
        const data = await response.json();

        if (data) {

            const values = Object.values(data);

            values.forEach(product => {

                const newProduct = new Product(
                    product.Id,
                    product.Name,
                    product.Description,
                    product.Price,
                    product.Category,
                    product.Color,
                    product.Quantity,
                    product.Discount,
                    product.Rate,
                    product.SellerName,
                    product.imageUrl,
                    product.isBestSeller,
                    product.isFeatured,
                    product.CreatedAt ?? null,
                    product.Size ?? null
                );

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

        return fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/products/${product.Id}.json`, {
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
    return fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`, {
        method: 'DELETE'
    })
    .then(() => console.log("Product deleted successfully"))
    .catch(error => console.error('Error deleting product:', error));
}




