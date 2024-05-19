import actionTypes from "../actions/actionTypes";

const initState = {
    currentData: {},
    users: [],
    loading: false,
    error: null,
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENT:
            return {
                ...state,
                currentData: action.currentData || {}
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentData: {}
            }
        case actionTypes.FETCH_USERS:
            return {
                ...state,
                users: action.users,
                error: null,
            };
        case actionTypes.UPDATE_USER:
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.user.id ? action.user : user
                ),
                error: null,
            };
        case actionTypes.DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.userId),
                error: null,
            };
        case actionTypes.USER_OPERATION_FAILED:
            return {
                ...state,
                error: action.msg,
            };

        default:
            return state;
    }
}

export default userReducer
