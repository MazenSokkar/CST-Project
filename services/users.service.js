import { User } from "../shared/models/user.model.js";

const BASE_URL = "https://ecommerce-database-dcfc2-default-rtdb.europe-west1.firebasedatabase.app";

// Helper function to map Firebase data to User instances
export function mapToUser(id, data) {
    return new User(
        id,
        data.Name || "",
        data.Username || "",
        data.Password || "",
        data.Role || "user",
        data.Address || "",
        data.createdAt || new Date().toISOString()
    );
}

export async function getAllUsers() {
    try {
        // Fetch all users from Firebase
        const response = await fetch(`${BASE_URL}/users.json`);
        // Check if the response is successful
        if (!response.ok) {
            console.error("Failed to fetch users:", response.status, response.statusText);
            return [];
        }
        const data = await response.json();
        // If there are no users, return an empty array
        if (!data) return [];
        // Map the data to User instances
        return Object.entries(data).map(([id, value]) => mapToUser(id, value));
    } catch (error) {
        console.error("Error in getAllUsers:", error.message, error);
        return [];
    }
}

export async function AddUser(user) {
    try {
        // 1️get all users 
        const users = await getAllUsers();

        // Make sure the required fields are provided
        if (!user.Name || !user.Username || !user.Password) {
            console.warn("Name, Username, and Password are required!");
            return null;
        }

        // make sure the username is unique
        const usernameExists = users.some(u => u.username === user.Username);
        if (usernameExists) {
            console.warn(`Username "${user.Username}" already exists!`);
            return null;
        }

        // make sure the combination of Name and Role is unique
        const nameRoleExists = users.some(u => u.name === user.Name && u.role === user.Role);
        if (nameRoleExists) {
            console.warn(`A user with Name "${user.Name}" and Role "${user.Role}" already exists!`);
            return null;
        }

        // validate role
        const allowedRoles = ["Admin", "Seller", "Customer"];
        if (!allowedRoles.includes(user.Role)) {
            console.warn(`Role must be one of: ${allowedRoles.join(", ")}`);
            return null;
        }

        // select the last id and increment it for the new user
        let lastId = 1000;
        if (users.length > 0) {
            const ids = users.map(u => Number(u.id));
            lastId = Math.max(...ids);
        }

        const newId = (lastId + 1).toString();

        // prepare the user data to be added to Firebase
        const userToAdd = {
            Id: Number(newId),
            Name: user.Name,
            Username: user.Username,
            Password: user.Password,
            Role: user.Role,
            Address: user.Address || "",
            createdAt: user.createdAt || new Date().toISOString()
        };

        //add the new user to Firebase using PUT to set the id as the key
        const response = await fetch(`${BASE_URL}/users/${newId}.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userToAdd)
        });

        console.log("New user added with Id:", newId);
        return mapToUser(newId, userToAdd);

    } catch (error) {
        console.error("Error in AddUser:", error);
        return null;
    }
}
export async function getUserById(id) {
    try {
        const response = await fetch(`${BASE_URL}/users/${id}.json`);

        if (!response.ok) {
            console.error("Failed to fetch user:", response.status);
            return null;
        }

        const data = await response.json();

        if (!data) {
            console.warn("User not found");
            return null;
        }

        return mapToUser(id, data);

    } catch (error) {
        console.error("Error in getUserById:", error);
        return null;
    }
}

export async function updateUser(id, updatedData) {
    try {
        const existingUser = await getUserById(id);
        if (!existingUser) {
            console.warn("User not found");
            return null;
        }

        if (updatedData.Role) {
            const allowedRoles = ["Admin", "Seller", "Customer"];
            if (!allowedRoles.includes(updatedData.Role)) {
                console.warn(`Role must be one of: ${allowedRoles.join(", ")}`);
                return null;
            }
        }

        const response = await fetch(`${BASE_URL}/users/${id}.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            console.error("Failed to update user");
            return null;
        }

        const data = await response.json();

        console.log("User updated successfully");

        return mapToUser(id, {
            ...existingUser,
            ...updatedData
        });

    } catch (error) {
        console.error("Error in updateUser:", error);
        return null;
    }
}

export async function deleteUser(id) {
    try {
        const response = await fetch(`${BASE_URL}/users/${id}.json`, {
            method: "DELETE"
        });

        if (!response.ok) {
            console.error("Failed to delete user");
            return false;
        }

        console.log("User deleted successfully");
        return true;

    } catch (error) {
        console.error("Error in deleteUser:", error);
        return false;
    }
}


