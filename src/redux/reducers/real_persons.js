import { makeTemplate } from "./common";
import {TYPES} from 'tools/Constants'
const type=TYPES.REAL_PERSONS;
let exports=makeTemplate(type)
exports["isAddingAddressLoading"]=function(state = false, action) {
    switch (action.type) {
        case 'IS_ADDING_ADDRESS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

exports["isAddingPhoneLoading"]=function(state = false, action) {
    switch (action.type) {
        case 'IS_ADDING_PHONE_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export default {...exports}