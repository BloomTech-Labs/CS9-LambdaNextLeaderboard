import { LOGIN_ACTION, CREATE_USER}  from '../actions/actions'
const initialStater = {
    user: [],
    error: '',
    expiration: '',
    updateCheck: false,
}

export const studentReducer = (state = initialStater, action) => {
    switch (action.type) {
        case CREATE_USER:
            return (Object.assign({}, state, {
                user: { username: action.payload.data.username, ID: action.payload.data._id },
                updateCheck: true
            }));
        case LOGIN_ACTION:
            return (Object.assign({}, state, {
                user: { ...state.user, token: action.payload, username: action.username, ID: action.Id },
                expiration: action.expiration
            }));
        //When we fetch data, we need to set updateCheck to False
        //It should be set on the first get request, after the login.
        default:
            return state;
    }
}

// export default studentReducer;

