const GET_CURRENT_USER = 'GET_CURRENT_USER'

export const getUser = user => ({ type: GET_CURRENT_USER, user })

export default function(user = null, action) {
    switch (action.type) {
        case GET_CURRENT_USER:
            return action.user
        default:
            return user
    }
}
