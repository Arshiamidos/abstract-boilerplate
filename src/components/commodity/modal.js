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

        if (this.props.isLoading) return <Loading />
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
                                {this.createFormInputItem(this.props.form, selectedModel, 'hsCode', 'کد تعرفه')}
                            </Col>
                            <Col span={8}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'hsCodeSectionId', ' بخش',
                                 { data: this.props.commodityInfo, subData: 'hsCodeSections', key: 'id', value: 'sectionDesc'}
                                )}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'hsCodeParentId', 'شناسه پدر کد تعرفه')}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'hsCodeLevel', " سطح کد تعرفه")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'name', "نام کالا")}
                            </Col>
                            <Col span={8}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'commodityTypeId', "شناسه نوع کالا",
                                { data: this.props.commodityInfo, subData: 'commodityTypes', key: 'id', value: 'commodityTypeFa'}
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'suqId', " شناسه واحد اندازه گیری",
                                { data: this.props.commodityInfo, subData: 'suQs', key: 'id', value: 'suqMeasurementType'}
                                )}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'importDuty', " تعرفه ورودی گمرک ")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'remark', " ملاحظات")}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'hsCodeDescriptionFa', " توضیحات فارسی")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'hsCodeDescriptionEn', "توضیحات انگلیسی")}
                            </Col>
                           
                        </Row>

                    </TabPane>
                 </Tabs>
            </Form>
        </Modal>

    }
}
export default Form.create()(UserModal)
