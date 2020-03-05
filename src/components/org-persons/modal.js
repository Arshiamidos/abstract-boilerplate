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
                values.dateRegister=values.dateRegister?moment(values.dateRegister._d).format('jYYYY/jMM/jDD') :undefined;
                this.props.onOk(values);
            }
        });
    };

    render() {

        if (this.props.isLoading) return <Loading />
        const { selectedModel } = this.props


        return <Modal
            style={{ width: "1000px" }}
            title="افزودن / ویرایش"
            visible={this.props.toggleModal}
            onOk={this.handleSubmit}
            confirmLoading={this.props.isLoading}
            onCancel={this.props.onCancel}
        >
            <Form className="has-background-form login-form register-form bg-light-blue px-2"
                  style={{
                      borderBottomRightRadius:'30px',
                      borderBottomLeftRadius:'30px',
                      borderTopLeftRadius:'30px',
                  }}>
                <Tabs style={{ width: "100%" }} defaultActiveKey="1" onChange={() => { }}>
                    <TabPane tab="مرکز اسناد" key="1">
                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'nameFa', 'نام فارسی')}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'nameEn', 'نام انگلیسی')}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'registerNo', 'شماره ثبت ')}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'registerPlaceCity', "محل ثبت  ")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'dateRegister', " تاریخ ثبت")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'economicalCode', "  کد اقتصادی")}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'registerStatus', " وضعیت ثبت")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'organizationType', "نوع ارگان ")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'email', " ایمیل")}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'webSite', " تارنما")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'nationalNo', "کدملی ")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'statusType', " وضعیت شرکت")}
                            </Col>
                        </Row>

                    </TabPane>
                 </Tabs>
            </Form>
        </Modal>

    }
}
export default Form.create()(UserModal)
