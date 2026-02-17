// import { User } from "../models/user.model.js";

// async function getuserbyid(id){
//     return fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`)
//     .then(response => response.json())
//     .then(data => {
//         //return data;
//         return new User(data.Id, data.Name, data.Username, data.Password, data.Address, data.Role);
//     })
//     .catch(error => {
//         console.error('Error fetching user:', error);
//     });
// }

// getuserbyid(1001).then(user => console.log(user))

// async function getallusers(){
//     return fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
//     .then(response => response.json())
//     .then(data => {
//         let arr = Object.values(data);
//         return arr;
//     })
//     .catch(error => {
//         console.error('Error fetching users:', error);
//     });
// }

// //getallusers().then(users => console.log(users))
// var user = {
//     "Address": "123 Admin St, Cairo",
//     "Id": 50000,
//     "Name": "Admin User1",
//     "Password": "P@ssw0rd",
//     "Role": "Admin1",
//     "Username": "admin1"
// }

// async function addnewuser(user){
//     var arr = await getallusers();
//     var lastid = arr[arr.length - 1].Id;
//     user.Id = lastid + 1;
//     return fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/users/${user.Id}.json`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     })
// }
// //await addnewuser(user).then(() => console.log("User added successfully")).catch(error => console.error('Error adding user:', error));

// var updatedUser = {
//     "Address": "123 Admin St, Cairo",
//     "Id": 1008,
//     "Name": "Admin updated",
//     "Password": "P@ssw0rd",
//     "Role": "Admin1",
//     "Username": "admin1"
// }

// async function updateuser(id, updatedUser){
//     return fetch(`https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedUser)
//     })
// }

// //await updateuser(1008, updatedUser).then(() => console.log("User updated successfully")).catch(error => console.error('Error updating user:', error));