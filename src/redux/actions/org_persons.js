import _ from 'lodash';
import {ORG_PERSONS_PATH } from 'tools/Constants'
import {Url, Header,Arraify} from 'tools/Utils';
import {success, error} from 'tools/Message';
import { makeTemplate,fetcher } from './common';
import {TYPES} from 'tools/Constants'

let exports=makeTemplate(TYPES.ORG_PERSONS,ORG_PERSONS_PATH)

exports["isNationalCodeLoading"]=function(bool){
    return {
        type: 'IS_NATIONAL_CODE_LOADING',
        isLoading: bool
    };
}
exports["checkLegalService"]=function(body,query = {}) {
    return (dispatch) => {
        dispatch(exports.isNationalCodeLoading(true));
        
        return fetcher(Url(ORG_PERSONS_PATH+"/legalService", {}), ({method:'POST',body:JSON.stringify(body)}))
        .then((data) => {
                if(!data.isValid){
                    throw new Error(data.message)
                }
                dispatch(exports.isNationalCodeLoading(false));
                return data;
            })
        .catch((e) => {error(e.message);dispatch(exports.isNationalCodeLoading(false));});
    };
}
export default {
    ...exports
}