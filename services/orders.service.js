import { Order } from '../shared/models/order.model.js';
const BASE_URL = "https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app";

// Helper function to map Firebase data to Order instances
export function mapToOrder(id, data) {
    return new Order(
        id,
        data.Subtotal,
        data.DeliveryPrice,
        data.Vats,
        data.Saving,
        data.TotalPrice,
        data.UserId,
        data.Items,
        data.Address,
        data.PaymentMethod,
        data.Status,
        data.Timestamp
    );
}

//get all orders -> returns an array of Order objects
export async function getAllOrders() {
    let orders = [];
    await fetch(`${BASE_URL}/orders.json`)
        .then(response => response.json())
        .then(data => {
            orders = Object.values(data).map(order => 
                new Order(
                    order.Id,
                    order.Subtotal,
                    order.DeliveryPrice,
                    order.Vats,
                    order.Saving,
                    order.TotalPrice,
                    order.UserId,
                    order.Items,
                    order.Address,
                    order.PaymentMethod,
                    order.Status,
                    order.Timestamp
                )
            );
        });
    return orders;
}

// add new order -> splits items by seller and creates a separate order for each seller
export async function addOrder(order) {
  let itemsBySeller = {};
  for (let item of order.Items) {
    let seller = item.SellerName ?? 'Unknown';
    if (!itemsBySeller[seller]) {
      itemsBySeller[seller] = [];
    }
    itemsBySeller[seller].push(item);
  }
  let sellers = Object.keys(itemsBySeller);
  let sellerSubtotals = {};
  for (let seller of sellers) {
    sellerSubtotals[seller] = itemsBySeller[seller].reduce(
      (sum, item) => sum + (item.Price) * (item.Quantity),
      0
    );
  }
  let grandSubtotal = Object.values(sellerSubtotals).reduce((a, b) => a + b, 0) || 1;
  let allOrders = await getAllOrders();
  let nextId = allOrders.length > 0 ? allOrders[allOrders.length - 1].Id + 1 : 5001;
  for (let seller of sellers) {
    let ratio = sellerSubtotals[seller] / grandSubtotal;
    let sellerOrder = new Order(
      nextId,
      sellerSubtotals[seller],
      order.DeliveryPrice * ratio,
      order.Vats * ratio,
      order.Saving * ratio,
      sellerSubtotals[seller] + order.DeliveryPrice * ratio + order.Vats * ratio - order.Saving * ratio,
      order.UserId,
      itemsBySeller[seller],
      order.Address,
      order.PaymentMethod,
      order.Status,
      order.Timestamp
    );
    await fetch(`${BASE_URL}/orders/${nextId}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sellerOrder)
    })
    nextId++;
  }
  return true;
}

// update order -> returns true if order was updated successfully, false otherwise
export async function updateOrder(order) {
  let orderToUpdate = new Order(                   
                    order.Id,
                    order.Subtotal,
                    order.DeliveryPrice,
                    order.Vats,
                    order.Saving,
                    order.TotalPrice,
                    order.UserId,
                    order.Items,
                    order.Address,
                    order.PaymentMethod,
                    order.Status,
                    order.Timestamp
                  );
  return await fetch(`${BASE_URL}/orders/${orderToUpdate.Id}.json`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderToUpdate)
    }).then(response => {
        if (response.ok) {
          return true;
        } else{
          return false;
        }
      }).catch(() => {return false;});
}

// Delete Order -> returns true if order was deleted successfully, false otherwise
export async function deleteOrder(orderId) {
  try {
    const response = await fetch(
      `${BASE_URL}/orders/${orderId}.json`,
      {
        method: "DELETE"
      }
    );
    if (!response.ok) {
      console.error(`Failed to delete order with id: ${orderId}`);
      return false;
    }
    return true;
  } catch{
    console.error("Error deleting order");
    return false;
  }
}

// Get order by id
export async function getOrderById(id) {
    try {
        const response = await fetch(`${BASE_URL}/orders/${id}.json`);
        if (!response.ok) return null;

        const data = await response.json();
        if (!data) return null;

        return mapToOrder(id, data);

    } catch (error) {
        console.error("Error in getOrderById:", error);
        return null;
    }
}

// Get orders by user id -> returns an array of Order objects for the specified user
export async function getOrdersByUserId(userId) {
  const response = await fetch(`${BASE_URL}/orders.json`);
  const data = await response.json();
  if (!data) return [];

  return Object.values(data).filter(
    order => String(order.UserId) === String(userId)
  );
}