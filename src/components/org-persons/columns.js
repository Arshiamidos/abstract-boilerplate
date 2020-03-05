import React from 'react';
import DeleteIcon from "tools/DeleteIcon";
import {Icon} from 'antd'
import findIcon from '../../assets/img/icon/find.svg';
import { filterColumn,  } from "tools/Table";
export default  (props,that)=>[
    {
        title: ' ',
        key: 'action',
        render: (text, record) => (
            <div className="actions text-center">
                <button onClick={() => {
                    that.setState({ toggleEditModal: true,selectedModel:record })
                }} className="action">
                    <Icon type="edit" />
                </button>
                <DeleteIcon onConfirm={() => props.delete([record.id],record.nationalNo)}
                    icon={props.deleteIdsLoading.includes(record.id) ? "loading" : "delete"} />
            </div>
        ),
    },
    {
        title: 'شناسه',
        dataIndex: 'rowId',
        key: 'rowId',
        sorter: true,
        render: (_, r) => r.id,

    }, 
    {
        title: 'شماره ملی',
        dataIndex: 'nationalNo',
        key: 'nationalNo',
        sorter: true,
        ...filterColumn,
    },
    {
        title: 'نام فارسی',
        dataIndex: 'nameFa',
        key: 'nameFa',
        sorter: true,
        ...filterColumn,
    }, {
        title: "نام انگلیسی",
        dataIndex: 'nameEn',
        key: 'nameEn',
        sorter: true,
        ...filterColumn,
    }, {
        title: 'شماره ثبت',
        dataIndex: 'registerNo',
        key: 'registerNo',
        sorter: true,
        ...filterColumn,

    },{
        title: 'محل ثبت',
        dataIndex: 'registerPlaceCity',
        key: 'registerPlaceCity',
        sorter: true,

    }, {
        title: 'تاریخ ثبت',
        dataIndex: 'dateRegister',
        key: 'dateRegister',
        sorter: true,

    },  {
        title: 'وضعیت ثبت',
        dataIndex: 'registerStatus',
        key: 'registerStatus',
        sorter: true,

    },{
        title: 'نوع شرکت',
        dataIndex: 'organizationType',
        key: 'organizationType',
        sorter: true,

    },
    {
        title: 'پست الکترونیکی',
        dataIndex: 'email',
        key: 'email',
        sorter: true,

    },
    {
        title: 'تارنما',
        dataIndex: 'webSite',
        key: 'webSite',
        sorter: true,

    },
    {
        title: 'وضعیت شرکت ',
        dataIndex: 'statusType',
        key: 'statusType',
        sorter: true,

    }

];
