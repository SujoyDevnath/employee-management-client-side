const intialState = {
    data: [],
};

export const tableDataReducer = (state = intialState, { type, payload }) => {
    // console.log('payload', payload);
    switch (type) {
        case 'TABLE_DATA':
            return { ...state, data: payload };
        default:
            return state;
    }
};