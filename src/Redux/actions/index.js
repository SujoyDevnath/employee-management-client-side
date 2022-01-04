export const firebase = (payload) => {
    return {
        type: 'FIREBASE',
        payload: payload,
    };
};
export const setTableData = (payload) => {
    return {
        type: 'TABLE_DATA',
        payload: payload,
    };
};
export const setPosts = (payload) => {
    return {
        type: 'SET_POSTS',
        payload: payload,
    };
};