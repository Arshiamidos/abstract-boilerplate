import React, { Component } from 'react'
import { Tooltip , Form, Checkbox, Table, Icon, Modal, Button, Tabs, Select, Input, Row, Col } from 'antd';
import Loading from 'tools/Loading';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali'
import FormCreator from 'components/common/FormCreator'
const { TabPane } = Tabs;


class UserModal extends FormCreator {



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                this.props.onOk(values);
            }
        });
    };

    render() {

        const { selectedModel } = this.props;





        return <Modal
            style={{ width: "1000px" }}
            title="افزودن / ویرایش"
            visible={this.props.toggleModal}
            onOk={this.handleSubmit}
            onCancel={this.props.onCancel}
            confirmLoading={this.props.isLoading}
        >
            <Form className="has-background-form login-form register-form bg-light-blue px-2"
                  style={{
                      borderBottomRightRadius:'30px',
                      borderBottomLeftRadius:'30px',
                      borderTopLeftRadius:'30px',
                  }}>
                <Tabs style={{ width: "100%" }} defaultActiveKey="1" onChange={() => { }}>
                    <TabPane tab="جزییات" key="1">
                        <Row>
                            <Col span={8} className="text-danger">
                                {this.createFormInputItem(this.props.form, selectedModel, 'assetNumber', 'شماره سریال')}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'name', ' نام')}
                            </Col>
                            <Col span={8}>
                                {console.log(this.props.equipmentInfo)}
                                {this.createFormSelectItem(this.props.form, selectedModel, 'criticalityId', 'کد بحرانی',
                                { data: this.props.equipmentInfo, subData: 'equipmentCriticalities', key: 'id', value: 'name'}
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'equipmentTypeId', " نوع",
                                 { data: this.props.equipmentInfo, subData: 'equipmentTypes', key: 'id', value: 'name'}
                                )}
                            </Col>
                            <Col span={8}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'equipmentClassId', "کلاس",
                                 { data: this.props.equipmentInfo, subData: 'equipmentClasses', key: 'id', value: 'name'}
                                )}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'purchasePrice', "قیمت خرید")}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'purchaseCurrencyId', " واحد  پول خرید",
                                { data: this.props.equipmentInfo, subData: 'currencies', key: 'id', value: 'name'}
                                )}
                            </Col>
                            <Col span={8}>
                                {this.createFormDatePickerItem(this.props.form, selectedModel, 'purchaseDate', " تاریخ تولید  ")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'commissionDate', " ملاحظتاریخ بهره برداریات")}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'model', " مدل")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'manufacturer', "سازنده ")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'shutdownCost', " هزینه از شات دان")}
                            </Col>
                            <Col span={8}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'shutdownCurrencyId', " واحد هزینه شات دان",
                                { data: this.props.equipmentInfo, subData: 'currencies', key: 'id', value: 'name'}
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'totalCapacity', " ظرفیت کل")}
                            </Col>
                            <Col span={8}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'totalCapacityUOMId', "واحد ظرفیت کل ",
                                { data: this.props.equipmentInfo, subData: 'equipmentUnits', key: 'id', value: 'name'}
                                )}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'isPipeLine', " خط لوله ")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'needCalibration', " نیاز به کالیبره")}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'description', " توضیحات")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'safetyDescription', "توضیحات ایمنی ")}
                            </Col>
                        </Row>

                    </TabPane>
                 </Tabs>
            </Form>
        </Modal>

    }
}
export default Form.create()(UserModal)
