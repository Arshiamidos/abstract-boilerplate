import React, { Component } from 'react'
import { Tooltip , Form, Checkbox, Table, Icon, Modal, Button, Tabs, Select, Input, Row, Col } from 'antd';
import Loading from 'tools/Loading';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali'
import FormCreator from 'components/common/FormCreator'

class UserModal extends FormCreator {



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.BirthDateString=values.BirthDateString?moment(values.BirthDateString._d).format('jYYYY/jMM/jDD').replace(/\//g,'') :undefined;
                this.props.onOk(values);
            }
        });
    };

    render() {

        return <Modal
            style={{ width: "1000px" }}
            title="بررسی کارت ملی "
            visible={this.props.toggleModal}
            confirmLoading={this.props.isLoading}
            onOk={this.handleSubmit}
            onCancel={this.props.onCancel}
        >
            <Form className="has-background-form login-form register-form">
                <Row>
                    <Col span={12}>{this.createFormInputItem(this.props.form, {}, 'NationalNumber', ' کد ملی')}</Col>
                    <Col span={12}>{this.createFormDatePickerItem(this.props.form, {}, 'BirthDateString', 'تاریخ تولد')}</Col>
                </Row>
            </Form>
        </Modal>

    }
}
export default Form.create()(UserModal)
