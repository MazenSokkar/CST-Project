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

// add new order -> returns true if order was added successfully, false otherwise
export async function addOrder(order) {
  let allOrders = await getAllOrders();
  let newOrderId = allOrders[allOrders.length - 1].Id + 1;
  let orderToAdd = new Order(                   
                    newOrderId,
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
  return await fetch(`${BASE_URL}/orders/${newOrderId}.json`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderToAdd)
    }).then(response =>
        {
          if (response.ok) {
            return true;
          } else{
            return false;
          }
        }
      ).catch(() => {return false;});
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
      `https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/orders/${orderId}.json`,
      {
        method: "DELETE"
      }
    );
    return response.ok;
  } catch {
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
