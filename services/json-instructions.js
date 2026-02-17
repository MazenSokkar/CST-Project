export let  usersLink = "https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/users.json"
// to get specific user: https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/users/{userId}.json
export let  productsLink = "https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/products.json"
// to get specific product: https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/products/{productId}.json
export let  ordersLink = "https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
// to get specific order: https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/orders/{orderId}.json
// replace {userId}, {productId} and {orderId} with the actual id of the user, product or order you want to get.

// let arr = Object.value(data) -> [{"Address":"123 Admin St, Cairo","Id":1001,"Name":"Admin User","Password":"P@ssw0rd","Role":"Admin","Username":"admin"} {"Address":"123 Admin St, Cairo","Id":1001,"Name":"Admin User","Password":"P@ssw0rd","Role":"Admin","Username":"admin"}]

// sample of all users return:
/*
{
  "1001": {
    "Address": "123 Admin St, Cairo",
    "Id": 1001,
    "Name": "Admin User",
    "Password": "P@ssw0rd",
    "Role": "Admin",
    "Username": "admin"
  },
  "1002": {
    "Address": "Technology Park, Maadi",
    "Id": 1002,
    "Name": "Tech World",
    "Password": "P@ssw0rd",
    "Role": "Seller",
    "Username": "techseller"
  }
}
*/

// sample of specific user return:
/*
{
  "Address": "123 Admin St, Cairo",
  "Id": 1001,
  "Name": "Admin User",
  "Password": "P@ssw0rd",
  "Role": "Admin",
  "Username": "admin"
}
*/

// sample of all products return:
/*
{
  "101": {
    "Category": "Electronics",
    "Color": [
      "Titanium",
      "Black",
      "Blue"
    ],
    "Description": "Latest Apple smartphone with titanium finish.",
    "Discount": 10,
    "Id": 101,
    "Name": "iPhone 15 Pro",
    "Price": 50000,
    "Quantity": 20,
    "Rate": 4.8,
    "SellerName": "Tech World",
    "imageUrl": [
      "images/iphone15.jpg",
      "images/iphone15_back.jpg"
    ],
    "isBestSeller": true,
    "isFeatured": true
  },
  "102": {
    "Category": "Electronics",
    "Color": [
      "Black",
      "Silver"
    ],
    "Description": "Noise cancelling wireless headphones.",
    "Discount": 15,
    "Id": 102,
    "Name": "Sony WH-1000XM5",
    "Price": 12000,
    "Quantity": 50,
    "Rate": 4.9,
    "SellerName": "Tech World",
    "imageUrl": [
      "images/sony_headphones.jpg"
    ],
    "isBestSeller": false,
    "isFeatured": true
  }
}
*/

// sample of specific product return:
/*
{
  "Category": "Electronics",
  "Color": [
    "Titanium",
    "Black",
    "Blue"
  ],
  "Description": "Latest Apple smartphone with titanium finish.",
  "Discount": 10,
  "Id": 101,
  "Name": "iPhone 15 Pro",
  "Price": 50000,
  "Quantity": 20,
  "Rate": 4.8,
  "SellerName": "Tech World",
  "imageUrl": [
    "images/iphone15.jpg",
    "images/iphone15_back.jpg"
  ],
  "isBestSeller": true,
  "isFeatured": true
}
*/

// sample of all orders return:
/*
{
  "5001": {
    "Address": "10 Tahrir St, Cairo",
    "DeliveryPrice": 50,
    "Id": 5001,
    "Items": [
      {
        "color": "Titanium",
        "price": 45000,
        "productId": 101,
        "productName": "iPhone 15 Pro",
        "quantity": 1,
        "total": 45000
      },
      {
        "color": "Graphite",
        "price": 4500,
        "productId": 104,
        "productName": "Logitech MX Master 3S",
        "quantity": 1,
        "total": 4500
      }
    ],
    "PaymentMethod": "Credit Card",
    "Saving": 5000,
    "Status": "Delivered",
    "Subtotal": 49500,
    "Timestamp": "2026-02-10T14:30:00",
    "TotalPrice": 56480,
    "UserId": 5,
    "Vats": 6930
  },
  "5002": {
    "Address": "15 Sea St, Alexandria",
    "DeliveryPrice": 50,
    "Id": 5002,
    "Items": [
      {
        "color": "Blue",
        "price": 1200,
        "productId": 201,
        "productName": "Denim Jacket",
        "quantity": 1,
        "total": 1200
      },
      {
        "color": "White",
        "price": 1980,
        "productId": 202,
        "productName": "Running Sneakers",
        "quantity": 1,
        "total": 1980
      }
    ],
    "PaymentMethod": "Credit Card",
    "Saving": 520,
    "Status": "Shipped",
    "Subtotal": 3180,
    "Timestamp": "2026-02-14T09:15:00",
    "TotalPrice": 3675.2,
    "UserId": 6,
    "Vats": 445.2
  }
}
 */

// sample of specific order return:
/*
{
  "Address": "10 Tahrir St, Cairo",
  "DeliveryPrice": 50,
  "Id": 5001,
  "Items": [
    {
      "color": "Titanium",
      "price": 45000,
      "productId": 101,
      "productName": "iPhone 15 Pro",
      "quantity": 1,
      "total": 45000
    },
    {
      "color": "Graphite",
      "price": 4500,
      "productId": 104,
      "productName": "Logitech MX Master 3S",
      "quantity": 1,
      "total": 4500
    }
  ],
  "PaymentMethod": "Credit Card",
  "Saving": 5000,
  "Status": "Delivered",
  "Subtotal": 49500,
  "Timestamp": "2026-02-10T14:30:00",
  "TotalPrice": 56480,
  "UserId": 5,
  "Vats": 6930
}
*/


/*
async function getuserbyid(id){
    return fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`)
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error fetching user:', error);
    });
}

getuserbyid(1001).then(user => console.log(user))

async function getallusers(){
    return fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
    .then(response => response.json())
    .then(data => {
        let arr = Object.values(data);
        return arr;
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
}

//getallusers().then(users => console.log(users))
var user = {
    "Address": "123 Admin St, Cairo",
    "Id": 50000,
    "Name": "Admin User1",
    "Password": "P@ssw0rd",
    "Role": "Admin1",
    "Username": "admin1"
}

async function addnewuser(user){
    var arr = await getallusers();
    var lastid = arr[arr.length - 1].Id;
    user.Id = lastid + 1;
    return fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/users/${user.Id}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
}
await addnewuser(user).then(() => console.log("User added successfully")).catch(error => console.error('Error adding user:', error));

var updatedUser = {
    "Address": "123 Admin St, Cairo",
    "Id": 1008,
    "Name": "Admin updated",
    "Password": "P@ssw0rd",
    "Role": "Admin1",
    "Username": "admin1"
}

async function updateuser(id, updatedUser){
    return fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
    })
}

await updateuser(1008, updatedUser).then(() => console.log("User updated successfully")).catch(error => console.error('Error updating user:', error));


*/