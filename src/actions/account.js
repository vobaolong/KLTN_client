export const addAccount = (user) => {
    return {
        type: 'ADD_ACCOUNT',
        payload: user,
    };
};
