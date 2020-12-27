const initialState = {
    loading: null,
    id: null
}

const Reducer = (state=initialState, action) => {
    switch(action.type) {
       case 'ANALYZE_START':
            return {
                ...state,
                loading: true
            }
        case 'ANALYZE_FINISHED':
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default Reducer;