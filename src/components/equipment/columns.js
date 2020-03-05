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
                  that.setState({ toggleEditModal: true,selectedModel:record })
                }} className="action mr-0">
                    <Icon type="edit" />
                </button>
                <DeleteIcon onConfirm={() => {}}
                    icon={props.deleteIdsLoading.includes(record.id) ? "loading" : "delete"} />
            </div>
        ),
    },
    {
        title: 'شناسه',
        dataIndex: 'id',
        key: 'id',
        sorter: true,
    },
    {
        title: ' شماره سریال ',
        dataIndex: 'assetNumber',
        key: 'assetNumber',
        sorter: true,
    }, 
    {
        title: 'نام',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        ...filterColumn,
    }, 
    {
        title: "کد بحرانی",
        dataIndex: 'criticalityId',
        key: 'criticalityId',
        sorter: true,
        ...filterColumn,
    }, 
    {
        title: 'نوع',
        dataIndex: 'equipmentTypeId',
        key: 'equipmentTypeId',
        sorter: true,
        ...filterColumn,
    }, 
    {
        title: 'کلاس',
        dataIndex: 'equipmentClassId',
        key: 'equipmentClassId',
        sorter: true,
        ...filterColumn,

    }, 
    {
        title: ' قیمت خرید',
        dataIndex: 'purchasePrice',
        key: 'purchasePrice',
        sorter: true,
        ...filterColumn,

    }, 
    {
        title: 'واحد خرید',
        dataIndex: 'purchaseCurrencyId',
        key: 'purchaseCurrencyId',
        sorter: true,
    }, 
    {
        title: 'تاریخ تولید ',
        dataIndex: 'purchaseDate',
        key: 'purchaseDate',
        sorter: true,
    },
    {
        title: 'تاریخ بهره برداری',
        dataIndex: 'commissionDate',
        key: 'commissionDate',
        sorter: true,
    },
    {
        title: 'مدل',
        dataIndex: 'model',
        key: 'model',
        sorter: true,
    },
    {
        title: 'سازنده',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
        sorter: true,
        ...filterColumn,

    },
    {
        title: ' هزینه از شات دان',
        dataIndex: 'shutdownCost',
        key: 'shutdownCost',
        sorter: true,
        ...filterColumn,

    },
    {
        title: 'واحد هزینه شات دان',
        dataIndex: 'shutdownCurrencyId',
        key: 'shutdownCurrencyId',
        sorter: true,
    },
    {
        title: 'ظرفیت کل ',
        dataIndex: 'totalCapacity',
        key: 'totalCapacity',
        sorter: true,
    },
    {
        title: 'واحد ظرفیت کل ',
        dataIndex: 'totalCapacityUOMId',
        key: 'totalCapacityUOMId',
        sorter: true,
    },
    {
        title: '  خط لوله ',
        dataIndex: 'isPipeLine',
        key: 'isPipeLine',
        sorter: true,
    },
    {
        title: ' نیاز به کالیبره ',
        dataIndex: 'needCalibration',
        key: 'needCalibration',
        sorter: true,
    },
    {
        title: 'توضیحات ',
        dataIndex: 'description',
        key: 'description',
        sorter: true,
    },
    {
        title: ' توضیحات ایمنی ',
        dataIndex: 'safetyDescription',
        key: 'safetyDescription',
        sorter: true,
    },


];
