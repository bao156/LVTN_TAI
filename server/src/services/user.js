import db from "../models";


export const getUserByUserId = (userId) => new Promise(async (resolve, reject) => {
    try {
        // Find all comments that belong to the specified postId
        let user = await db.User.findOne({
            where: {
                id: userId,
            },
            raw: true,
            attributes: {
                exclude: ["password"],
            },
        });
        // If the user is found and they are an administrator (isAdmin: true)
        if (user && !user.isAdmin) {
            resolve({
                err: 0,
                msg: "OK",
                response: user,
            });
        } else if (user && user.isAdmin) {
            // If the user is found but is not an administrator
            resolve({
                err: 0,
                msg: "User is an admin.",
                response: user,
            });
        } else {
            // If the user is not found
            resolve({
                err: 1,
                msg: "Failed to get User.",
                response: null,
            });
        }
    } catch (error) {
        console.error("Error getting comments by postId:", error);
        reject("Error getting comments by postId");
    }
});

export const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        // Find the user by ID in the database
        const user = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
                exclude: ['password'],
                include:['isAdmin']
            }
        });
        
        // If the user is found and they are an administrator (isAdmin: true)
        if (user && !user.isAdmin) {
            resolve({
                err: 0,
                msg: 'OK',
                response: user
            });
        } else if (user && user.isAdmin) {
            // If the user is found but is not an administrator
            resolve({
                err: 0,
                msg: 'User is an admin.',
                response: user
            });
        } else {
            // If the user is not found
            resolve({
                err: 1,
                msg: 'Failed to get User.',
                response: null
            });
        }
    } catch (error) {
        // Reject the promise with the caught error
        reject(error);
    }
});

export const updateUser = (payload, userId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.update(payload, {
            where: { id: userId },
        });
        resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? 'updated' : 'Failed to update User.',
            response: response[0] > 0 ? payload : null, 
        });
    } catch (error) {
        reject(error);
    }
});


export const deleteUser = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.destroy({
            where: { id }
        });
        resolve({
            err: response > 0 ? 0 : 1,
            msg: response > 0 ? "User deleted successfully" : "Failed to delete User",
        });
    } catch (error) {
        reject(error);
    }
});

export const getAllUsers = () => new Promise(async (resolve, reject) => {
    try {
        const users = await db.User.findAll({
            raw: true,
            attributes: { exclude: ["password"] }
        });
        resolve({
            err: 0,
            msg: "OK",
            response: users,
        });
    } catch (error) {
        reject(error);
    }
});



