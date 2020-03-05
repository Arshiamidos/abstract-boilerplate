import React from 'react';
import {Button, Icon, Input} from 'antd';
import searchIcon from "../assets/img/icon/search.svg";

const filterDropdown = ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
    <div className="custom-filter-dropdown">
        <Input
            ref={ele => this.searchInput = ele}
            placeholder="متن جستجو"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={confirm}
            className="mb-3 text-right px-3"
            style={{minWidth:'300px'}}
        />

<div className="d-flex justify-content-between">
    <button onClick={clearFilters} className="bg-yellow text-white border-radius-5 px-2 py-1">پاکسازی</button>
    <button  onClick={confirm} className="bg-light-navy text-white border-radius-5 px-2 py-1">جستجو</button>
</div>






    </div>
);


/*const filterIcon = filtered =><Icon type="search" style={{color: filtered ? 'blue' : '#aaa'}}/>;*/
const filterIcon = filtered => <img src={searchIcon} alt="" className="w-100 img-fluid px-2" style={{maxWidth:'30px'}}/>;

const onFilterDropdownVisibleChange = (visible) => {
    if (visible) {
        setTimeout(() => {
            this.searchInput.focus();
        });
    }
};

export const filterColumn = {
    filterDropdown, filterIcon, onFilterDropdownVisibleChange
};

export function query(pagination, filters, sorter) {

    console.log(filters)
    let data_filters = {};
    filters && Object.entries(filters).forEach(([k, v]) =>{ if(v[0]!=undefined) data_filters[k] = v[0]});

    return {
        pageNumber: pagination.current || 1,
        pageSize: pagination.pageSize || 20,
        sortBy: sorter.field,
        order: sorter.order,
        ...data_filters,
    }
}

export function getPaginationData(data) {
    return {
        current: parseInt(data.page, 10) || 1,
        total: data.length || 100,
        pageSize: data.limit || 20
    }
}
