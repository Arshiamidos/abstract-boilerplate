import _ from 'lodash';
import {REAL_PERSONS_PATH } from 'tools/Constants'
import {Url, Header,Arraify} from 'tools/Utils';
import {success, error} from 'tools/Message';
import { isNationalCodeLoading } from './org_persons';
import { makeTemplate,fetcher } from './common';
import {TYPES} from 'tools/Constants'
let type=TYPES.REAL_PERSONS
let exports=makeTemplate(TYPES.REAL_PERSONS,REAL_PERSONS_PATH)
exports["isNationalCodeLoading"]=function(bool){
    return {
        type: 'IS_NATIONAL_CODE_LOADING',
        isLoading: bool
    };
}
exports["isAddingAddressLoading"]=function(bool){
    return {
        type: 'IS_ADDING_ADDRESS_LOADING',
        isLoading: bool
    };
}
exports["isAddingPhoneLoading"]=function(bool){
    return {
        type: 'IS_ADDING_PHONE_LOADING',
        isLoading: bool
    };
}
exports["checkNationalCode"]=function(body,query = {}) {
    return (dispatch) => {
        dispatch(exports.isNationalCodeLoading(true));
        
        return fetcher(Url(REAL_PERSONS_PATH+"/SabtService", {}), ({
            method:'POST',
            body:JSON.stringify(body)
        })).then((data) => {
            if(!data.isValid){
                throw new Error(JSON.stringify(data.message))
            }
            dispatch(exports.isNationalCodeLoading(false));
            return data;
        })
        .catch((e) => {dispatch(exports.isNationalCodeLoading(false)); });
    };
}
exports['addAddress'+type]=function(nationalNo,body,query = {}) {
    return (dispatch) => {
        dispatch(exports.isNationalCodeLoading(true));
        
        return fetcher(Url(REAL_PERSONS_PATH+"/"+nationalNo+"/address", {}), ({
            method:'POST',
            body:JSON.stringify(body)
        })).then((data) => {
            success();
            dispatch(exports.isNationalCodeLoading(false));
            return data;
        })
        .catch((e) => {error(e.message); dispatch(exports.isNationalCodeLoading(false)); });
    };
}

exports['listAddress'+type]=function(nationalNo,query = {}) {
    return (dispatch) => {
        return fetcher(Url(REAL_PERSONS_PATH+"/"+nationalNo+"/address", {}), {})
        .then((data) => {
            return data;
        })
        .catch((e) => {
            error(e.message);
        });
    };
}
exports['deleteAddress'+type]=function(nationalNo,addressId,query = {}) {
    return (dispatch) => {
        dispatch(exports.isNationalCodeLoading(true));
        
        return fetcher(Url(REAL_PERSONS_PATH+"/"+nationalNo+"/address/"+addressId, {}), {method:'DELETE',})
        .then((data) => {
            success();
            dispatch(exports.isNationalCodeLoading(false));
            return data;
        })
        .catch((e) => {error(e.message); dispatch(exports.isNationalCodeLoading(false)); });
    };
}
exports['activateAddress'+type]=function(nationalNo,addressId,query = {}) {
    return (dispatch) => {
        dispatch(exports.isNationalCodeLoading(true));
        
        return fetcher(Url(REAL_PERSONS_PATH+"/"+nationalNo+"/address/"+addressId+"/Activate", {}), {method:'PUT',})
        .then((data) => {
            success();
            dispatch(exports.isNationalCodeLoading(false));
            return data;
        })
        .catch((e) => {error(e.message); dispatch(exports.isNationalCodeLoading(false)); });
    };
}
//-------------------
exports['addPhone'+type]=function(nationalNo,body,query = {}) {
    return (dispatch) => {
        dispatch(exports.isNationalCodeLoading(true));
        
        return fetcher(Url(REAL_PERSONS_PATH+"/"+nationalNo+"/Phones", undefined),{
            method:'POST',
            body:JSON.stringify(body)
        }).then((data) => {
            success();
            dispatch(exports.isNationalCodeLoading(false));
            return data;
        })
        .catch((e) => {error(e.message); dispatch(exports.isNationalCodeLoading(false)); });
    };
}
exports['listPhone'+type]=function(nationalNo,query = {}) {
    return (dispatch) => {
        return fetcher(Url(REAL_PERSONS_PATH+"/"+nationalNo+"/Phones", {}), ({}))
        .then((data) => {
            return data;
        })
        .catch((e) => {
            error(e.message);
        });
    };
}
exports['deletePhone'+type]=function(nationalNo,phoneId,query = {}) {
    return (dispatch) => {
        dispatch(exports.isNationalCodeLoading(true));
        
        return fetcher(Url(REAL_PERSONS_PATH+"/"+nationalNo+"/Phones/"+phoneId, {}), ({
            method:'DELETE',
        })).then((data) => {
            success();
            dispatch(exports.isNationalCodeLoading(false));
            return data;
        })
        .catch((e) => {error(e.message); dispatch(exports.isNationalCodeLoading(false)); });
    };
}
exports['activatePhone'+type]=function(nationalNo,phoneId,query = {}) {
    return (dispatch) => {
        dispatch(exports.isNationalCodeLoading(true));
        
        return fetcher(Url(REAL_PERSONS_PATH+"/"+nationalNo+"/Phones/"+phoneId+"/Activate", {}),({method:'PUT'}))
        .then((data) => {
            success();
            dispatch(exports.isNationalCodeLoading(false));
            return data;
        })
        .catch((e) => {error(e.message); dispatch(exports.isNationalCodeLoading(false)); });
    };
}
export default {
    ...exports
}