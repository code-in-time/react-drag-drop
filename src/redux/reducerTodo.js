export const ADD_TODO = 'ADD_TODO';


const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.msg]
        default:
            return state
    }
}

export default todos

export const actionAddTodo = text => ({
    type: ADD_TODO,
    msg: text,
})
