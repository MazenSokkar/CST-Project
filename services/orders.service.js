import { Order } from '../shared/models/order.model.js';

//get all orders -> returns an array of Order objects
export async function getAllOrders() {
    let orders = [];
    await fetch("https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/orders.json")
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
  return await fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/orders/${newOrderId}.json`,
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
  return await fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/orders/${orderToUpdate.Id}.json`,
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