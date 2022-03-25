let initialState = {

};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_USER':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

