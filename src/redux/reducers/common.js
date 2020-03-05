export function basicInfo(state = {}, action) {
    switch (action.type) {
        case 'BASIC_INFO':
            return action.basicInfo;

        default:
            return state;
    }
}
export function locationInfo(state = {}, action) {
    switch (action.type) {
        case 'LOCATION_INFO':
            return action.locationInfo;

        default:
            return state;
    }
}
export function commodityInfo(state = {}, action) {
    switch (action.type) {
        case 'COMMODITY_INFO':
            return action.commodityInfo;

        default:
            return state;
    }
}
export function equipmentInfo(state = {}, action) {
    switch (action.type) {
        case 'EQUIPMENT_INFO':
            return action.equipmentInfo;

        default:
            return state;
    }
}

export function makeTemplate(type){
    
    let exports={}

    exports[type+"IsLoading"]=function(state = false, action) {
        switch (action.type) {
            case type+'_IS_LOADING':
                return action.isLoading;
            default:
                return state;
        }
    }
    
    
    exports[type+"Pagination"]=function(state = {}, action) {
        switch (action.type) {
            case 'SET_'+type+'_PAGINATION':
                return action.pg;
            default:
                return state;
        }
    }
    
    exports[type]= function(state = [], action) {
        switch (action.type) {
            case type:
                    setTimeout(() => {
                        document.querySelector('.ant-table-body').scroll(100*150,0)
                    }, 1000);
                return action.data;
    
            default:
                return state;
        }
    }
    
    exports['create'+type+'IsLoading']= function(state = false, action) {
        switch (action.type) {
            case 'CREATE_'+type+'_IS_LOADING':
                return action.createIsLoading;
            default:
                return state;
        }
    }
    
    exports['delete'+type+'IdsLoading'] =function(state = [], action) {
        switch (action.type) {
            case 'DELETE_'+type+'_IDS_LOADING':
                return action.deleteIdsLoading;
    
            default:
                return state;
        }
    }
    return exports;
}