import React from 'react';
import DeleteIcon from "tools/DeleteIcon";
import {Icon} from 'antd'
import { filterColumn,  } from "tools/Table";
export default  (props,that)=>[
    {
        title: ' ',
        key: 'action',
        render: (text, record) => (
            <div className="actions text-center">
                <button onClick={() => {
                    that.table.props.onEditRow(record)
                }} className="action mr-0">
                    <Icon type="edit" />
                </button>
                <DeleteIcon onConfirm={() => {that.table.props.onDeleteRow(record)}}
                    icon={props.deleteIdsLoading.includes(record.id) ? "loading" : "delete"} />
            </div>
        ),
    },
    {
        title: 'شناسه',
        dataIndex: 'id',
        key: 'id',
        sorter: true,
        render: (_, r) => r.id,

    }, {
        title: 'کد تعرفه',
        dataIndex: 'hsCode',
        key: 'hsCode',
        sorter: true,
        ...filterColumn,
    }, {
        title: "بخش",
        dataIndex: 'hsCode_Section',
        key: 'hsCode_Section',
        sorter: true,
        ...filterColumn,
    }, {
        title: 'شناسه پدر کد تعرفه',
        dataIndex: 'hsCode_Parent_ID',
        key: 'hsCode_Parent_ID',
        sorter: true,
        ...filterColumn,
    },{
        title: 'سطح کد تعرفه',
        dataIndex: 'hsCode_Level',
        key: 'hsCode_Level',
        sorter: true,
        ...filterColumn,

    }, {
        title: 'نام کالا',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        ...filterColumn,

    },  {
        title: 'شناسه نوع کالا',
        dataIndex: 'commodityType_ID',
        key: 'commodityType_ID',
        sorter: true,
    },{
        title: 'شناسه واحد اندازه گیری',
        dataIndex: 'suQ_ID',
        key: 'suQ_ID',
        sorter: true,
    },
    {
        title: 'تعرفه ورودی گمرک',
        dataIndex: 'importDuty',
        key: 'importDuty',
        sorter: true,
    },
    {
        title: 'ملاحظات',
        dataIndex: 'remark',
        key: 'remark',
        sorter: true,
    },
    {
        title: 'توضیحات فارسی',
        dataIndex: 'hsCode_Description_FA',
        key: 'hsCode_Description_FA',
        sorter: true,
        ...filterColumn,

    },
    {
        title: 'توضیحات انگلیسی',
        dataIndex: 'hsCode_Description_EN',
        key: 'HSCode_Description_EN',
        sorter: true,
        ...filterColumn,

    },
    {
        title: 'نوع کالا',
        dataIndex: 'commodityType',
        key: 'commodityType',
        sorter: true,
    },
    {
        title: 'واحد اندازه گیری',
        dataIndex: 'suq',
        key: 'suq',
        sorter: true,
    }


];
