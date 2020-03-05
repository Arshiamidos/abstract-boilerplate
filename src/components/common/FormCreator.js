import React, { Component } from 'react'
import { Tooltip , Form, Checkbox, Table, Icon, Modal, Button, Tabs, Select, Input, Row, Col } from 'antd';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2';

const { TabPane } = Tabs;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};
const Option = Select.Option;
const FormItem = Form.Item;
export default class App extends Component{
    

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onOk(values);
            }
        });
    };
    createPhoneInputItem= ({getFieldDecorator,getFieldValue}, initialValue, name,dyanmicIndex,{ data, subData, key: k, value: v ,defaultValue:df=1}) => {
        return (
            <FormItem
                hasFeedback
                className="mx-3">
                <Row >
                    <Col span={2}>
                       {!initialValue.is_Active?
                            <Icon type="edit" color={"#f00"}/>
                        :
                            <Icon type="tool" color={"#f00"}/>
                       }
                    </Col>
                    
                    <Col span={8}>
                        {getFieldDecorator(`${name}.phoneNumber`, {
                            initialValue:initialValue.adderssEn,
                        })(
                            <Input className="text-right" />
                        )}
                    </Col>
                    <Col span={8}>

                        {getFieldDecorator(`${name}.phoneTypeId`, {
                        initialValue:initialValue.addressTypeId,
                        rules: [
                            {required: true, message: '  !لطفا مورد را انتخاب کنید'}
                        ],
                        })(
                            <Select style={{ width: "100%" }} defaultValue={df}>
                                {data[subData].map(
                                    item => <Option value={item[k]}>{item[v]}</Option>
                                )}
                            </Select>

                        )}
                    </Col>
                   
                    <Col span={2}>
                        <Button type="danger"  loading={this.props.isDeletePhoneLoading} onClick={()=>this.props["onDeletePhone"](initialValue.id)}>{"-"}</Button>    
                    </Col>
                    <Col span={2}>
                        <Button type="info" onClick={()=>this.props["onActivePhone"](initialValue.id)}><Icon type="select"/></Button>    
                    </Col>
                    {
                    initialValue.isNew &&    
                    <Col span={4}>
                        <Button 
                            type="info" 
                            loading={this.props.isAddingPhoneLoading} 
                            onClick={()=>this.props.onPostNewPhone(getFieldValue(name),dyanmicIndex)}>
                            
                            <Icon type="plus"/>{"ثبت"}
                        </Button>    
                    </Col>
                    }
                </Row>

              
            </FormItem>
        )
    }
    createAddressInputItem= ({getFieldDecorator,getFieldValue}, initialValue, name,dyanmicIndex,{ data, subData, key: k, value: v ,defaultValue:df=1}) => {
        return (
            <FormItem
                hasFeedback
                className="mx-3">
                <Row >
                    <Col span={2}>
                       {!initialValue.is_Active?
                            <Icon type="edit" color={"#f00"}/>
                        :
                            <Icon type="tool" color={"#f00"}/>
                       }
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator(`${name}.Adderss`, {
                            initialValue:initialValue.adderss ,
                        })(
                            <Input className="text-right"/>
                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator(`${name}.AdderssEn`, {
                            initialValue:initialValue.adderssEn,
                        })(
                            <Input className="text-right" />
                        )}
                    </Col>
                    <Col span={8}>

                        {getFieldDecorator(`${name}.AddressTypeId`, {
                        initialValue:initialValue.addressTypeId,
                        rules: [
                            {required: true, message: '  !لطفا مورد را انتخاب کنید'}
                        ],
                        })(
                            <Select style={{ width: "100%" }} defaultValue={df}>
                                {data[subData].map(
                                    item => <Option value={item[k]}>{item[v]}</Option>
                                )}
                            </Select>

                        )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator(`${name}.PostalCode`, {
                            initialValue:initialValue.postalCode,
                        })(
                            <Input className="text-right" />
                        )}
                    </Col>
                    <Col span={2}>
                        <Button type="danger"  loading={this.props.isDeleteAddressLoading} onClick={()=>this.props["onDeleteAddress"](initialValue.id)}>{"-"}</Button>    
                    </Col>
                    <Col span={2}>
                        <Button type="info" onClick={()=>this.props["onActiveAddress"](initialValue.id)}><Icon type="select"/></Button>    
                    </Col>
                    {
                    initialValue.isNew &&    
                    <Col span={4}>
                        <Button 
                            type="info" 
                            loading={this.props.isAddingAddressLoading} 
                            onClick={()=>this.props.onPostNewAddress(getFieldValue(name),dyanmicIndex)}>
                            
                            <Icon type="plus"/>{"ثبت"}
                        </Button>    
                    </Col>
                    }
                </Row>

              
            </FormItem>
        )
    }
    createFormDatePickerItem= ({getFieldDecorator}, selectedModel, name, persianName, ) => {

        return (
            <FormItem
                label={persianName}
                hasFeedback>
                {getFieldDecorator(name, {
                    initialValue:selectedModel[name]?
                        moment(selectedModel[name],'jYYYY/jM/jD')
                    :
                        undefined,
                })(
                    <DatePicker
                        isGregorian={false}
                        timePicker={null}
                        value={
                            selectedModel[name]?
                                moment(selectedModel[name],'jYYYY/jM/jD')
                            :
                                undefined
                        }
                    />

                )}
            </FormItem>
        )
    }
    createFormInputItem = ({getFieldDecorator}, selectedModel, name, persianName, ) => {
        return (
            <FormItem
                //{...formItemLayout}
                label={persianName}
                hasFeedback
            className="text-right">
                {getFieldDecorator(name, {
                    initialValue: selectedModel[name],
                    rules: [{
                        // type: 'email', message: 'ورودی معتبر نمی باشد!',
                    }, {
                        //required: true, message:` لطفا {}$ را وارد کنید!`,
                    }],
                })(
                    <Input  className="text-right"/>
                )}
            </FormItem>
        )
    }
    createFormCheckboxGroupItem=({getFieldDecorator}, selectedModel, name, persianName, { data, subData, key: k, value: v })=>{
        return (
            <FormItem
                label={persianName}>
                {getFieldDecorator(name, {
                    initialValue: selectedModel[name],
                    rules: [
                        //    {required: true, message: 'دسته‌بندی مورد نظر را انتخاب کنید!'}
                    ],
                })(
                    <Checkbox.Group options={data[subData].map(
                        pt => ({ value: pt[k], label: pt[v] })
                    )} defaultValue={['Apple']} onChange={() => { }} />
                )}
            </FormItem>
        )

    }
    createFormSelectItem = ({getFieldDecorator}, selectedModel, name, persianName, { data, subData, key: k, value: v ,defaultValue:df}) => {

        return (
            <FormItem
                label={persianName}>
                {getFieldDecorator(name, {
                    initialValue:
                        (selectedModel[name]?
                            selectedModel[name]:
                        ((df+1)?df:undefined)),
                    rules: [
                        {required: true, message: '  !لطفا مورد را انتخاب کنید'}
                    ],
                })(
                    <Select style={{ width: "100%" }} defaultValue={1}>
                        {data[subData].map(
                            item => <Option value={item[k]}>{item[v]}</Option>
                        )}
                    </Select>

                )}
            </FormItem>
        )
    }
}