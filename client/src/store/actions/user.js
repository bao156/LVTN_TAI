import actionTypes from './actionTypes'
import * as apis from '../../services'


export const getCurrent = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCurrent()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CURRENT,
                currentData: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CURRENT,
                msg: response.data.msg,
                currentData: null
            })
            dispatch({ type: actionTypes.LOGOUT })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: null,
            msg: error,
        })
        dispatch({ type: actionTypes.LOGOUT })
    }
}

export const fetchUsers = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAllUsers();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.FETCH_USERS,
                users: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.USER_OPERATION_FAILED,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.USER_OPERATION_FAILED,
            msg: error.message,
        });
    }
};


export const updateUser = (userId, userData) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateUser(userData, userId);
        if (response?.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_USER,
                user: response.response, // Adjust if the response structure is different
            });
        } else {
            dispatch({
                type: actionTypes.USER_OPERATION_FAILED,
                msg: response.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.USER_OPERATION_FAILED,
            msg: error.message,
        });
    }
};


export const deleteUser = (userId) => async (dispatch) => {
    try {
        const response = await apis.apiDeleteUser(userId); 
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.DELETE_USER,
                userId,
            });
        } else {
            dispatch({
                type: actionTypes.USER_OPERATION_FAILED,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.USER_OPERATION_FAILED,
            msg: error.message,
        });
    }
};