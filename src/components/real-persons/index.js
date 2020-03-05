import React from 'react';
import { connect } from 'react-redux';
import Model from "redux/actions/real_persons";
import { getBasicInfo,getLocationInfo } from "redux/actions/common";
import { Table} from 'antd';
import BaseComponent from 'components/BaseComponent';
import { query } from "tools/Table";
import EditUserModal from './modal';
import NewUserModal from './modal' ;
import CheckNationalCode from './checkNationalModal' ;
import columns from './columns'
import plus from "../../assets/img/icon/plus.svg";
import {TYPES} from 'tools/Constants'
const type=TYPES.REAL_PERSONS;
class RealPersons extends BaseComponent {

    constructor(props){
        super(props)
        this.state = {
            toggleNewModal: false,
            toggleEditModal: false,
            toggleCheckPeronNationalCode:false,
            models:[],
            selectedModel:{
                phones:[],
                addresses:[]
            },
        }
        this.props['get'+type]({ ...query({}, {}, {}) })
        this.props.getBasicInfo()
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.props['get'+type]({ ...query(pagination, filters, sorter) });
    };

    clearForm=(v)=>{
        this.setState({
            toggleCheckPeronNationalCode:false,
            toggleNewModal:false,
            toggleEditModal: false,
            selectedModel:{}
        });
        this.props['get'+type]({ ...query({}, {}, {}) })

    }
    decoratePagination=(pg)=>{
        return ({
            current: (pg.CurrentPage && parseInt(pg.CurrentPage, 10)) || 1,
            total: pg.TotalPages || 100,
            pageSize: pg.PageSize || 20
    })
    }
    renderAddress=(r)=>{
        return <div>
            {r.address}
        </div>
    }


    render() {

        return super.render(
            <div >
                <div className="d-flex justify-content-between align-items-center mt-3 mb-2 " style={{fontFamily:'VazirBold'}}>
                    <h2 className="font-size-2 text-dark-blue">فهرست اشخاص حقیقی</h2>
                    <button className="font-size-09 bg-yellow text-white py-2 px-3 border-radius-10" onClick={()=>{this.setState({toggleCheckPeronNationalCode:true})}}  >

                        <span className="d-inline-block">شخص حقیقی جدید
                        </span>
                        <img src={plus} alt="" className="w-100 img-fluid mr-2 " style={{maxWidth:'18px'}}/>
                    </button>
                </div>


                <Table
                    loading={this.props.isLoading}
                    useFixedHeader
                    ref={r=>this.table=r}
                    rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
                    dataSource={this.props[type]}
                    columns={columns(this.props,this)}
                    rowKey="_id"
                    scroll={{ x:columns(this.props).length*170,y:530 }}
                    pagination={this.decoratePagination(this.props[type+'Pagination'])}
                    onChange={this.handleTableChange}
                    expandedRowRender={r=>this.renderAddress(r)}
                    onDeleteRow={record=> this.props.delete([record.id],record.nationalNo,'nationalNo')}
                    onEditRow={record=>{

                        this.props['listAddress'+type](record.nationalNo)
                        .then(r=>{
                            this.setState({ toggleEditModal: true,selectedModel:{...record,addresses:[...r]} })
                        }).catch(
                            e=>{this.setState({ toggleEditModal: true,selectedModel:record })})

                        this.props['listPhone'+type](record.nationalNo)
                        .then(r=>{
                            this.setState({ toggleEditModal: true,selectedModel:{...record,phones:[...r]} })
                        }).catch(
                            e=>{this.setState({ toggleEditModal: true,selectedModel:record })})    
                    }}

                />
                {
                this.state.toggleEditModal &&
                <EditUserModal
                    isLoading={this.props.isLoading}
                    toggleModal={this.state.toggleEditModal}
                    onOk={(v) => {
                        this.props['update'+type]({...v,id:this.state.selectedModel.id},'nationalNo')
                        .then(v=>{
                            this.clearForm(v)
                        })
                    }}



                    isAddingAddressLoading={this.props.isAddingAddressLoading}
                    isDeleteAddressLoading={this.props.isDeleteAddressLoading}
                    onDeleteAddress={(addressId)=>{
                        this.props['deleteAddress'+type](this.state.selectedModel.nationalNo,addressId)
                        .then(r=>{
                            if(!r)return;
                            this.setState({selectedModel:{...this.state.selectedModel,
                                addresses:[...(this.state.selectedModel.addresses || [])].filter((ad)=>ad.id!==addressId)}})
                        })
                    }}
                    onPostNewAddress={(body,addressIndex)=>{
                        this.props['addAddress'+type](this.state.selectedModel.nationalNo,body)
                        .then(r=>{
                            if(!r)return;
                            this.setState({selectedModel:{...this.state.selectedModel,
                                addresses:[
                                    ...[
                                        ...(this.state.selectedModel.addresses || [])]
                                        .filter((_,ad)=>ad!==addressIndex),
                                        {...r}
                                    ]}})
                        })
                    }}
                    onActiveAddress={(addressId)=>{
                        this.props["activateAddress"+type](this.state.selectedModel.nationalNo,addressId).then(
                            r=>{
                                if(!r)return;
                            }
                        )
                    }}
                    onAddAddress={()=>{
                        this.setState({selectedModel:{...this.state.selectedModel,addresses:[...(this.state.selectedModel.addresses || []),{isNew:true}]}})
                    }}

                    onActivePhone={()=>{alert()}}
                    onDeletePhone={(i)=>{this.setState({selectedModel:{...this.state.selectedModel,
                        phones:[...(this.state.selectedModel.phones || [])].filter((_,ii)=>ii!==i)}})}}
                    onAddPhone={()=>{this.setState({selectedModel:{...this.state.selectedModel,phones:[...(this.state.selectedModel.phones || []),{isNew:true}]}})}}
                    
                    isAddingPhoneLoading={this.props.isAddingPhoneLoading}
                   


                    onCancel={(v) => this.clearForm() }
                    basicInfo={this.props.basicInfo}
                    selectedModel={this.state.selectedModel}
                />}

                {
                this.state.toggleNewModal &&
                <NewUserModal
                    isLoading={this.props.isLoading}
                    toggleModal={this.state.toggleNewModal}
                    onOk={(v) => {
                        console.log(this.props)
                        this.props['create'+type]({...v,id:0})
                        .then(v=>{
                            this.clearForm(v)
                        })
                    }}
                    onCancel={(v) => {this.clearForm(v) }}
                    basicInfo={this.props.basicInfo}
                    
                    onDeletePhone={(i)=>{this.setState({selectedModel:{...this.state.selectedModel,
                        phones:[...(this.state.selectedModel.phones || [])].filter((_,ii)=>ii!==i)}})}}
                    onDeleteAddress={(i)=>{this.setState({selectedModel:{...this.state.selectedModel,
                        addresses:[...(this.state.selectedModel.addresses || [])].filter((_,ii)=>ii!==i)}})}}

                    onActivePhone={()=>{alert()}}
                    onActiveAddress={()=>{alert()}}

                    onAddPhone={()=>{this.setState({selectedModel:{...this.state.selectedModel,phones:[...(this.state.selectedModel.phones || []),'']}})}}
                    onAddAddress={()=>{this.setState({selectedModel:{...this.state.selectedModel,addresses:[...(this.state.selectedModel.addresses || []),'']}})}}

                    selectedModel={{
                        ...this.state.selectedModel
                    }}
                />
                }

                {
                this.state.toggleCheckPeronNationalCode &&
                <CheckNationalCode
                    isLoading={this.props.isNationalCodeLoading}
                    toggleModal={this.state.toggleCheckPeronNationalCode}
                    onOk={(v) => {
                        this.props.checkNationalCode(v)
                        .then((r={})=>{

                            r.isValid  && this.setState({
                                toggleCheckPeronNationalCode:false,
                                toggleNewModal:true,
                                selectedModel:{
                                    fatherName:r.fatherName,
                                    firstName:r.name,
                                    lastName:r.family,
                                    birthDate:r.birthDate,
                                    birthCity: r.officeName,
                                    nationalNo:r.nin,
                                    birthCertificateNo:r.shenasnameNo,
                                    birthCertificateSerial: r.shenasnameSeri+r.shenasnameSerial,
                                    phones:[],
                                    addresses:[]
                                }
                            })
                        })
                    }}
                    onCancel={(v) => {this.clearForm(v) }}
                    basicInfo={this.props.basicInfo}
                    locationInfo={this.props.locationInfo}
                />}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        basicInfo:state.basicInfo,
        isNationalCodeLoading:state.isNationalCodeLoading,
        isAddingAddressLoading:state.isAddingAddressLoading,
        isAddingPhoneLoading:state.isAddingPhoneLoading,
        isDeleteAddressLoading:state.isNationalCodeLoading,
        [type]: state[type],
        isLoading: state[type+'IsLoading'],
        deleteIdsLoading: state['delete'+type+'IdsLoading'],
        [type+'Pagination']:state[type+'Pagination'],

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkNationalCode:(body)=>dispatch(Model.checkNationalCode(body)),
        ["get"+type]: (data) => dispatch(Model['get'+type](data)),
        getBasicInfo: (ids) => dispatch(getBasicInfo(ids)),
        delete: (ids,nationalNo) => dispatch(Model['delete'+type](ids,nationalNo)),
        ['create'+type]: (ids) => dispatch(Model['create'+type](ids)),
        ['update'+type]: (ids,params) => dispatch(Model['update'+type](ids,params)),
        
        

        ['addPhone'+type]: (ids,params) => dispatch(Model['addPhone'+type](ids,params)),
        ['listPhone'+type]: (ids,params) => dispatch(Model['listPhone'+type](ids,params)),
        //['updatePhone'+type]: (ids,params) => dispatch(Model['updatePhone'+type](ids,params)),
        //['getPhone'+type]: (ids,params) => dispatch(Model['getPhone'+type](ids,params)),
        ['deletePhone'+type]: (ids,params) => dispatch(Model['deletePhone'+type](ids,params)),
        ['activatePhone'+type]: (ids,params) => dispatch(Model['activatePhone'+type](ids,params)),



        ['addAddress'+type]: (ids,params) => dispatch(Model['addAddress'+type](ids,params)),
        ['listAddress'+type]: (ids,params) => dispatch(Model['listAddress'+type](ids,params)),
        //['updateAddress'+type]: (ids,params) => dispatch(Model['updateAddress'+type](ids,params)),
        //['getAddress'+type]: (ids,params) => dispatch(Model['getAddress'+type](ids,params)),
        ['deleteAddress'+type]: (ids,params) => dispatch(Model['deleteAddress'+type](ids,params)),
        ['activateAddress'+type]: (ids,params) => dispatch(Model['activateAddress'+type](ids,params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RealPersons);
