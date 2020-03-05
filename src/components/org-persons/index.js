import React from 'react';
import { connect } from 'react-redux';
import Model from "redux/actions/org_persons";
import { getBasicInfo } from "redux/actions/common";
import { Table } from 'antd';
import BaseComponent from 'components/BaseComponent';
import {  query } from "tools/Table";
import EditUserModal from './modal';
import NewUserModal from './modal' ;
import CheckNationalCode from './checkLegalService' ;
import columns from './columns'
import plus from '../../assets/img/icon/plus.svg';
import {TYPES} from 'tools/Constants'
const type=TYPES.ORG_PERSONS;

class OrgPersons extends BaseComponent {

    constructor(props){
        super(props)
        this.state = {
            toggleNewModal: false,
            toggleEditModal: false,
            toggleCheckPeronNationalCode:false,
            selectedModel:{},
        }
        this.props["get"+type]({ ...query({}, {}, {}) })
        this.props.getBasicInfo() 
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.props["get"+type]({ ...query(pagination, filters, sorter) });
    };

    clearForm=(v)=>{
        this.setState({
            toggleCheckPeronNationalCode:false,
            toggleNewModal:false,
            toggleEditModal: false,
            selectedModel:{}
        });
    }
    decoratePagination=(pg)=>{
        return ({
            current: (pg.CurrentPage && parseInt(pg.CurrentPage, 10)) || 1,
            total: pg.TotalPages || 100,
            pageSize: pg.PageSize || 20
    })
    }


    render() {

        return super.render(
            <div >
                <div className="d-flex justify-content-between align-items-center mt-3 mb-2" style={{fontFamily:'VazirBold'}}>
                    <h2 className="font-size-2 text-dark-blue">فهرست اشخاص حقوقی</h2>
                    <button className="font-size-09 bg-yellow text-white py-2 px-3 border-radius-10" onClick={()=>{this.setState({toggleCheckPeronNationalCode:true})}} >

                        <span className="d-inline-block"> شخص حقوقی جدید
                        </span>
                        <img src={plus} alt="" className="w-100 img-fluid mr-2 " style={{maxWidth:'18px'}}/>
                    </button>
                </div>


                <Table
                    loading={this.props.isLoading}
                    useFixedHeader
                    rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
                    dataSource={this.props[type]}
                    columns={columns(this.props,this)}
                    rowKey="_id"
                    scroll={{ x:columns(this.props).length*170,y:'530' }}
                    pagination={this.decoratePagination(this.props[type+"Pagination"])}
                    onChange={this.handleTableChange}

                />
                {
                this.state.toggleEditModal &&
                <EditUserModal
                    isLoading={this.props.isLoading}
                    toggleModal={this.state.toggleEditModal}
                    onOk={(v) => {

                        this.props['create'+TYPES.ORG_PERSONS]({...v,id:this.state.selectedModel.id})
                        .then(v=>{
                            this.clearForm(v)
                        })

                    }}
                    onCancel={(v) => this.clearForm() }
                    basicInfo={this.props.basicInfo}
                    locationInfo={this.props.locationInfo}
                    selectedModel={this.state.selectedModel}
                />}

                {
                this.state.toggleNewModal &&
                <NewUserModal
                    isLoading={this.props.isLoading}
                    toggleModal={this.state.toggleNewModal}
                    onOk={(v) => {
                        this.props["create"+TYPES.ORG_PERSONS]({...v,id:0})
                        .then(v=>{
                            this.clearForm(v)
                        })
                    }}
                    onCancel={(v) => {this.clearForm(v) }}
                    basicInfo={this.props.basicInfo}
                    locationInfo={this.props.locationInfo}
                    selectedModel={this.state.selectedModel}
                />}
                {
                this.state.toggleCheckPeronNationalCode &&
                <CheckNationalCode
                    isLoading={this.props.isNationalCodeLoading}
                    toggleModal={this.state.toggleCheckPeronNationalCode}
                    onOk={(v) => {
                        this.props.checkLegalService(v)
                        .then((r={})=>{

                            r.isValid  && this.setState({
                                toggleCheckPeronNationalCode:false,
                                toggleNewModal:true,
                                selectedModel:{
                                    nameFa:r.name,
                                    registerNo:r.registerNumber,
                                    dateRegister:r.dateRegister,
                                    organizationType:r.organizationType,
                                    registerPlaceCityId:r.registerPlaceCityId,
                                    registerPlaceCity:r.registerPlaceCityName,

                                }
                            })
                        })
                    }}
                    onCancel={(v) => {this.clearForm(v) }}
                    basicInfo={this.props.basicInfo}
                    locationInfo={this.props.locationInfo}
                    selectedModel={{}}
                />}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isNationalCodeLoading:state.isNationalCodeLoading,
        basicInfo:state.basicInfo,
        [type]: state[type],
        isLoading: state[type+'IsLoading'],
        deleteIdsLoading: state['delete'+type+'IdsLoading'],
        [type+'Pagination']:state[type+'Pagination'],

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkLegalService:(body)=>dispatch(Model.checkLegalService(body)),
        ["get"+type]: (data) => dispatch(Model['get'+type](data)),
        getBasicInfo: (ids) => dispatch(getBasicInfo(ids)),
        delete: (ids,nationalNo) => dispatch(Model['delete'+type](ids,nationalNo)),
        ['create'+type]: (ids) => dispatch(Model['create'+type](ids)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrgPersons);
