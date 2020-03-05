import _ from 'lodash';
import {ARTICLE_PATH,REAL_PERSONS_PATH } from 'tools/Constants'
import {Url, Header,Arraify} from 'tools/Utils';
import {success, error} from 'tools/Message';
export function setBasicInfo(basicInfo) {

    return {
        type: 'BASIC_INFO',
        basicInfo
    };
}
export function setLocationInfo(locationInfo) {
    
    return {
        type: 'LOCATION_INFO',
        locationInfo
    };
}
export function setCommodityInfo(commodityInfo) {
    
    return {
        type: 'COMMODITY_INFO',
        commodityInfo
    };
}
export function setEquipmentInfo(equipmentInfo) {
    
    return {
        type: 'EQUIPMENT_INFO',
        equipmentInfo
    };
}
export function  fetcher(url=Url("/url-not-filled",{}),header={},extra={}){

    return  fetch(url, Header(header))
    .then((response) => {
        if(response.status===401){
            window.location="/#/login";
            error("نشست شما به پایان رسیده است");
        }
        if (!response.ok) {
            throw Error(response.statusText);
        }
        if(response.headers.get('X-Pagination')){
            if(extra.dispatch && extra.exports && extra.type){
                extra.dispatch(extra.exports['set'+extra.type+'Pagination'](JSON.parse(response.headers.get('X-Pagination'))))
            }
        }
        return response;
    })
    .then((response) => response.json())
    .catch(e=>{
        if(e instanceof TypeError){
            window.location="/#/login";
            error("نشست شما به پایان رسیده است");
            document.querySelector("#logout") && 
            document.querySelector("#logout").click()
        }else{
            error(e.message);
        }
        return Promise.reject(e)
    })
}
export function getBasicInfo(query = {}) {
    return (dispatch) => {
        return fetcher(
            Url("/api/BasicInformation/GetBasicInfo", {}), {})
            .then((data) => {
                dispatch(setBasicInfo(data));
            })
            .catch(() => {
                error(); 
            });
    };
}
export function getLocationInfo(query = {}) {
    return (dispatch) => {
      
        return fetcher(Url("/api/BasicInformation/GetLocationInfo", {}), ({}))
            .then((data) => {
                dispatch(setLocationInfo(data));
            })
            .catch(() => {error();});
    };
}
export function getEquipmentInfo(query = {}) {
    return (dispatch) => {
      
        return fetcher(Url("/api/BasicInformation/GetEquipmentInfo", {}), ({}))
            .then((data) => {
                dispatch(setEquipmentInfo(data));
            })
            .catch(() => {error();});
    };
}
export function getCommodityInfo(query = {}) {
    return (dispatch) => {
      
        return fetcher(Url("/api/BasicInformation/GetCommodityInfo", {}), ({}))
            .then((data) => {
                dispatch(setCommodityInfo(data));
            })
            .catch(() => {error();});
    };
}
export function makeTemplate(type,path){
    let exports={}

    exports['set'+type+'Pagination']=function(pg) {
        return {
            type: 'SET_'+type+'_PAGINATION',
            pg
        };
    }
    exports[type+'IsLoading']=function(bool) {
        return {
            type: type+'_IS_LOADING',
            isLoading: bool
        };
    }
    exports[type]=function(data) {
        return {
            type,
            data
        };
    }
    exports['delete'+type+'IdsLoading']=function(ids) {
        return {
            type: 'DELETE_'+type+'_IDS_LOADING',
            deleteIdsLoading: ids
        };
    }
    exports['get'+type]=function(query = {}) {
        return (dispatch) => {
            dispatch(exports[type+'IsLoading'](true));
            return fetcher(Url(path, query), {},{type,dispatch,exports})
                .then((data) => {
                    dispatch(exports[type+'IsLoading'](false));
                    dispatch(exports['delete'+type+'IdsLoading']([]));
                    dispatch(exports[type](Arraify(data)));
                    return Arraify(data)
                })
                .catch((e) => {dispatch(exports[type+'IsLoading'](false))});
        };
    }
    exports['create'+type]=function(body,query = {}) {
        return (dispatch) => {
            dispatch(exports[type+'IsLoading'](true));
            
            return fetcher(Url(path, query), {method:'POST',body:JSON.stringify(body)})
                .then((data) => {
                    dispatch(exports[type+'IsLoading'](false))
                    return data
                })
                .catch((e) => {
                    error(e.message); 
                    dispatch(exports[type+'IsLoading'](false))
                });
        };
    }
    exports['update'+type]=function(body,params,query = {}) {
        return (dispatch) => {
            dispatch(exports[type+'IsLoading'](true));
            return fetcher(Url(path+"/"+body[params], query), ({method:'PUT',body:JSON.stringify(body)}))
                .then((data) => {
                    dispatch(exports[type+'IsLoading'](false))
                    return data
                })
                .catch((e) => {
                    error(e.message); 
                    dispatch(exports[type+'IsLoading'](false))
                });
        };
    }
    exports['delete'+type]=function(ids,deleteItem,key="nationalNo") {
        return (dispatch, getState) => {
            let loadings = [...ids];
            dispatch(exports['delete'+type+'IdsLoading'](loadings));
            return fetcher(Url(path+"/"+deleteItem), ({method: 'DELETE'}))
                .then((data) => {
                    success();
                    dispatch(exports['delete'+type+'IdsLoading']([]));
                    dispatch(exports[type]((getState()[type] || []).filter(r=>r[key]!=deleteItem)))
                    return data;
                })
                .catch(() => {error();  dispatch(exports['delete'+type+'IdsLoading']([]));});
        };
    }
    return exports;
}