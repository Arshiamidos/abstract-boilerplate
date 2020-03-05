import _ from 'lodash';
import {COMMODITY_PATH } from 'tools/Constants'
import {Url, Header,Arraify} from 'tools/Utils';
import {success, error} from 'tools/Message';
import { makeTemplate,fetcher } from './common';
import {TYPES} from 'tools/Constants'
const type=TYPES.COMMODITY
let exports=makeTemplate(TYPES.COMMODITY,COMMODITY_PATH)

exports['getChild'+type]=function(record,query = {}) {
    return (dispatch,getStore) => {
        dispatch(exports[type+'IsLoading'](true));
        return fetcher(Url(COMMODITY_PATH+"/"+record.hsCode+"/children", query), ({}),{exports,dispatch,type})
            .then((data) => {
                dispatch(exports[type+'IsLoading'](false));
                let d=getStore()[type];
                record.childrens=Arraify(data);
                dispatch(exports[type]([...d]));
                return Arraify(data)
            })
            .catch((e) => {error(e.message); dispatch(exports[type+'IsLoading'](false))});
    };
}
exports['get'+type]=function(query = {}) {
    return (dispatch) => {
        dispatch(exports[type+'IsLoading'](true));
        return fetcher(Url(COMMODITY_PATH, query), ({}),{exports,dispatch,type})
            .then((data) => {
                dispatch(exports[type+'IsLoading'](false));
                dispatch(exports['delete'+type+'IdsLoading']([]));
                dispatch(exports[type](Arraify(data).filter(item=>item.isUsed==true)));
                return Arraify(data)
            })
            .catch((e) => { dispatch(exports[type+'IsLoading'](false))});
    };
}
export default {
    ...exports
}