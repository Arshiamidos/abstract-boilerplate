import store from 'redux/store/store';
export function hasAccess(pageAccessNeeded) {
    const {accesses} = store.getState().user;

    return !pageAccessNeeded ||
        (typeof(pageAccessNeeded)==='string' &&  accesses.includes(pageAccessNeeded)) || 
        (Array.isArray(pageAccessNeeded) && pageAccessNeeded.every(item=>accesses.includes(item)))
}