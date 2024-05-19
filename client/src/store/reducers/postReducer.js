import actionTypes from "../actions/actionTypes";
const initState = {
    posts: [],
    msg: '',
    count: 0,
    newPosts: [],
    postOfCurrent: [],
    dataEdit: {},
    outStandingPost: {},
    showFavorites: false,
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
        case actionTypes.GET_POSTS_LIMIT:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        case actionTypes.GET_NEW_POST:
            return {
                ...state,
                msg: action.msg || '',
                newPosts: action.newPosts || []
            }
        case actionTypes.GET_OUTSTANDING:
            return {
                ...state,
                msg: action.msg || '',
                outStandingPost: action.outStandingPost || []
            }
        case actionTypes.GET_POSTS_ADMIN:
            return {
                ...state,
                msg: action.msg || '',
                postOfCurrent: action.posts || []
            }
        case actionTypes.EDIT_DATA:
            return {
                ...state,
                dataEdit: action.dataEdit || null
            }
        case actionTypes.RESET_DATAEDIT:
            return {
                ...state,
                dataEdit: null
            }
        case actionTypes.SET_SHOW_FAVORITES:
            return {
                ...state,
                showFavorites: action.payload,
            };
        case actionTypes.UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => 
                    post.id === action.post.id ? action.post : post),
                    error: null,
            };
        case actionTypes.UPDATE_POST_FAILURE:
            return {
                ...state,
                msg: action.msg || 'Failed to update post',
            };
        case actionTypes.DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId),
                error: null
            };
        case actionTypes.DELETE_POST_FAILURE:
            return {
                ...state,
                msg: action.msg || 'Failed to delete post'
            };
        default:
            return state;
    }

}

export default postReducer