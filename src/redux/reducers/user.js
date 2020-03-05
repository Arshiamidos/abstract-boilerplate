export function userHasError(state = false, action) {
    switch (action.type) {
        case 'USER_HAS_ERROR':
            return action.hasError;

        default:
            return state;
    }
}

export function userIsLoading(state = false, action) {
    switch (action.type) {
        case 'USER_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function user(state = {accesses: []}, action) {
    switch (action.type) {
        case 'USER_FETCH_DATA_SUCCESS':
            return action.user;

        default:
            return state;
    }
}


export function registerHasError(state = false, action) {
    switch (action.type) {
        case 'REGISTER_HAS_ERROR':
            return action.hasError;

        default:
            return state;
    }
}

export function registerIsLoading(state = false, action) {
    switch (action.type) {
        case 'REGISTER_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function registerSuccess(state = false, action) {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return action.createSuccess;

        default:
            return state;
    }
}

export function isLoggedIn(state = false, action) {
    switch (action.type) {
        case 'IS_LOGGED_IN':
            return action.bool;

        default:
            return state;
    }
}