export const apiURL = () => {
    // development // production // test

    // if (window.location.hostname === 'localhost') {
    // } 
    if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
    ) {
        return 'https://budgetting-damien.herokuapp.com'
    }  
    return `https://budgetting-damien.herokuapp.com`;
}