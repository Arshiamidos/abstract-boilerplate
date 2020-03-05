import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Model from "redux/actions/commodity";
import { getCommodityInfo } from "redux/actions/common";
import { Table, Icon, Modal, Button, Tabs, Select, Input, Row, Col,Pagination } from 'antd';
import BaseComponent from 'components/BaseComponent';
import {query } from "tools/Table";
import EditUserModal from './modal';
import NewUserModal from './modal' ;
import columns from './columns'
import plus from "../../assets/img/icon/plus.svg";

import {TYPES} from 'tools/Constants'
const type=TYPES.COMMODITY;
class Commodity extends BaseComponent {

    constructor(props){
        super(props)
        this.state = {
            toggleNewModal: false,
            toggleEditModal: false,
            toggleCheckPeronNationalCode:false,
            selectedModel:{},
            query:{ ...query({}, {hsCodeLevel:[1]}, {}) }
        }
        console.log(this.state.query)
        this.props['get'+type](this.state.query)
        this.props.getCommodityInfo()
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({query:{ ...query(pagination, {...filters}, sorter) }},()=>{
            this.props['get'+type](this.state.query)
        })
    };

    clearForm=(v)=>{
        this.setState({
            toggleCheckPeronNationalCode:false,
            toggleNewModal:false,
            toggleEditModal:false,
            selectedModel:{}
        });
    }
    decoratePagination=(pg)=>{
        return ({
            current: (pg.CurrentPage && parseInt(pg.CurrentPage, 10)) || 1,
            total: pg.TotalPages || 0,
            pageSize: pg.PageSize || 20
    })
    }
    customExpandIcon=(props)=> {
        if (props.expanded) {
            return <a className="font-size-1" style={{ color: 'black' }} onClick={e => {
                props.onExpand(props.record, e);
            }}><Icon type="minus-circle" /></a>
        } else {
            return <a className="font-size-1" style={{ color: 'black' }} onClick={e => {
                props.onExpand(props.record, e);
            }}><Icon type="plus-circle" /></a>
        }
    }
    onExpandRowRender=(record)=>{
        return (<div style={{padding:'20px',backgroundColor:{
            1:"yellow",
            2:"red",
            3:"green",
            4:"blue",
            5:"orang",
            6:"black",
        }[record.hsCode.length/2]}}>
            <Table
                useFixedHeader
                rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
                dataSource={record.childrens}
                columns={columns(this.props,this)}
                rowKey="_id"
                onChange={this.handleTableChange}
                scroll={{ x:columns(this.props).length*170,y:530 }}
                expandIcon={(props) => this.customExpandIcon(props)}
                expandedRowRender={ this.onExpandRowRender}
                onExpand={(toggle,record)=>{
                    if(!toggle)return;
                    this.props["getChild"+type](record)
                }}
            />
        </div>)}

    render() {

        return super.render(
            <div >

                <div className="d-flex justify-content-between align-items-center mt-3 mb-2 " style={{fontFamily:'VazirBold'}}>
                    <h2 className="font-size-2 text-dark-blue">فهرست کالاها </h2>
                    <button className="font-size-09 bg-yellow text-white py-2 px-3 border-radius-10" onClick={()=>{this.setState({toggleNewModal:true})}} >

                        <span className="d-inline-block">افزودن کالا
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
                    scroll={{ x:columns(this.props).length*170,y:530 }}
                    pagination={this.decoratePagination(this.props[type+"Pagination"])}
                    onChange={this.handleTableChange}
                    onExpand={(toggle,record)=>{
                        if(!toggle)return;
                        this.props["getChild"+type](record)

                    }}
                    expandedRowRender={ this.onExpandRowRender}
                    expandIcon={(props) => this.customExpandIcon(props)}
                    onDeleteRow={record=> {
                        this.props.delete([record.hsCode],record.hsCode,'haCode')
                        .then(()=>this.props['get'+type](this.state.query))
                    }}
                    onEditRow={record=>{
                        this.setState({ toggleEditModal: true,selectedModel:record })
                    }}
                />

                {
                this.state.toggleEditModal &&
                <EditUserModal
                    isLoading={this.props.isLoading}
                    toggleModal={this.state.toggleEditModal}
                    onOk={(v) => {
                        this.props['update'+type]({...v,id:this.state.selectedModel.id},"hsCode")
                        .then(v=>{
                            this.props['get'+type](this.state.query)
                            this.clearForm(v)
                         
                        })

                    }}
                    onCancel={(v) => this.clearForm() }
                    basicInfo={this.props.basicInfo}
                    commodityInfo={this.props.commodityInfo}
                    selectedModel={this.state.selectedModel}
                />}

                {
                this.state.toggleNewModal &&
                <NewUserModal
                    isLoading={this.props.isLoading}
                    toggleModal={this.state.toggleNewModal}
                    onOk={(v) => {
                        this.props['create'+type]({...v,id:0})
                        .then(v=>{
                            this.props['get'+type](this.state.query)
                            this.clearForm(v)
                        })
                    }}
                    onCancel={(v) => {this.clearForm(v) }}
                    basicInfo={this.props.basicInfo}
                    commodityInfo={this.props.commodityInfo}
                    selectedModel={this.state.selectedModel}
                />}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        basicInfo:state.basicInfo,
        commodityInfo:state.commodityInfo,
        [type]: state[type],
        isLoading: state[type+'IsLoading'],
        deleteIdsLoading: state['delete'+type+'IdsLoading'],
        [type+'Pagination']:state[type+'Pagination'],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ["get"+type]: (data) => dispatch(Model['get'+type](data)),
        getCommodityInfo: (ids) => dispatch(getCommodityInfo(ids)),
        delete: (ids,nationalNo) => dispatch(Model['delete'+type](ids,nationalNo)),
        ['create'+type]: (ids) => dispatch(Model['create'+type](ids)),
        ['update'+type]: (...args) => dispatch(Model['update'+type](...args)),
        ['getChild'+type]: (...args) => dispatch(Model['getChild'+type](...args)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Commodity);
