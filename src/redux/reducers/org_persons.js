import { makeTemplate } from "./common";
import {TYPES} from 'tools/Constants'
const type=TYPES.ORG_PERSONS;
let exports=makeTemplate(type)

exports["isNationalCodeLoading"]=function(state = false, action) {
    switch (action.type) {
        case 'IS_NATIONAL_CODE_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export default {...exports}