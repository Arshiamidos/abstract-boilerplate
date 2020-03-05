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
                <button onClick={() => {that.table.props.onEditRow(record)}} className="action"><Icon type="edit" /></button>
                <DeleteIcon onConfirm={() => {that.table.props.onDeleteRow(record)}}
                    icon={props.deleteIdsLoading.includes(record.id) ? "loading" : "delete"} />
            </div>
        ),
    },
    {
        title: 'ردیف',
        dataIndex: 'rowId',
        key: 'rowId',
        sorter: true,
        render: (_, r) => r.id,

    }, {
        title: 'کدملی',
        dataIndex: 'nationalNo',
        key: 'nationalNo',
        sorter: true,
        ...filterColumn,
    }, {
        title: 'نام خانوادگی',
        dataIndex: 'lastName',
        key: 'lastName',
        sorter: true,
        ...filterColumn,
    }, {
        title: 'نام ',
        dataIndex: 'firstName',
        key: 'firstName',
        sorter: true,
        ...filterColumn,

    }, {
        title: 'نام پدر',
        dataIndex: 'fatherName',
        key: 'fatherName',
        sorter: true,

    }, {
        title: 'شماره سریال شناسنامه',
        dataIndex: 'birthCertificateSerial',
        key: 'birthCertificateSerial',
        sorter: true,

    }, {
        title: 'شماره شناسنامه',
        dataIndex: 'birthCertificateNo',
        key: 'birthCertificateNo',
        sorter: true,

    }, {
        title: 'محل تولد',
        dataIndex: 'birthCity',
        key: 'birthCity',
        sorter: true,

    }, {
        title: 'نام لاتین',
        dataIndex: 'firstNameEn',
        key: 'firstNameEn',
        sorter: true,

    }, {
        title: 'نام خانوادگی انگلیسی',
        dataIndex: 'lastNameEn',
        key: 'lastNameEn',
        sorter: true,

    }, {
        title: 'محل صدور',
        dataIndex: 'placeOfIssue',
        key: 'placeOfIssue',
        sorter: true,

    }, {
        title: 'تاریخ تولد',
        dataIndex: 'birthDate',
        key: 'birthDate',
        sorter: true,

    }, {
        title: 'مدرک تحصیلی',
        dataIndex: 'degree',
        key: 'degree',
        render: (txt) => txt.description,
        sorter: true,

    }, {
        title: 'جنسیت',
        dataIndex: 'gender',
        key: 'gender',
        render: (txt) => txt.description,
        sorter: true,

    }, {
        title: 'تاهل',
        dataIndex: 'marriage',
        key: 'marriage',
        sorter: true,
        render: (txt) => txt.description,

    }, {
        title: 'ملیت',
        dataIndex: 'nationality',
        key: 'nationality',
        sorter: true,
        render: (txt) => txt.nationalityDesc,

    }, {
        title: 'مذهب',
        dataIndex: 'religion',
        key: 'religion',
        sorter: true,
        render: (txt) => txt.description,

    },
    {
        title: 'نام قبلی',
        dataIndex: 'previousFirstName',
        key: 'previousFirstName',
        sorter: true,

    },
    {
        title: 'نام خانوادگی',
        dataIndex: 'previousLastName',
        key: 'previousLastName',
        sorter: true,

    },
    {
        title: 'شماره گذرنامه',
        dataIndex: 'passportNo',
        key: 'passportNo',
        sorter: true,

    },
    {
        title: 'تاریخ صدور گذرنامه',
        dataIndex: 'passIssueDate',
        key: 'passIssueDate',
        sorter: true,

    }, {
        title: 'تاریخ ابطال گذرنامه',
        dataIndex: 'passportExpireDate',
        key: 'passportExpireDate',
        sorter: true,

    }, {
        title: 'تعداد فرزندان',
        dataIndex: 'childNumber',
        key: 'childNumber',
        sorter: true,

    },
];
