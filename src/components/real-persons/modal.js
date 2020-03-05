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
                values.birthDate=values.birthDate?moment(values.birthDate._d).format('jYYYY/jMM/jDD') :undefined;
                values.passIssueDate=values.passIssueDate?moment(values.passIssueDate._d).format('jYYYY/jMM/jDD') :undefined;
                values.passportExpireDate=values.passportExpireDate?moment(values.passportExpireDate._d).format('jYYYY/jMM/jDD') :undefined;
                this.props.onOk(values);
            }else{
                alert('لطفا تمام موارد را صحیح وارد کنید')
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
            confirmLoading={this.props.isLoading}
            onCancel={this.props.onCancel}
        >
            <Form className="has-background-form login-form bg-light-blue px-2 register-form "
                  style={{
                      borderBottomRightRadius:'30px',
                      borderBottomLeftRadius:'30px',
                      borderTopLeftRadius:'30px',
                  }}>
                <Tabs style={{ width: "100%" }} defaultActiveKey="1" onChange={() => { }}>
                    <TabPane tab="ثبت احوال" key="1">


                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'firstName', 'نام')}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'lastName', 'نام خانوادگی')}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'nationalNo', 'کد ملی')}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'fatherName', "نام پدر")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'birthCity', "محل تولد")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'birthCertificateSerial', "شماره سریال شناسنامه")}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'placeOfIssue', "محل صدور")}
                            </Col>
                            <Col span={8}>
                                {this.createFormDatePickerItem(this.props.form, selectedModel, 'birthDate', "تاریخ تولد")}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'birthCertificateNo', "شماره شناسنامه")}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'genderId', 'جنسیت', {
                                    data: this.props.basicInfo, subData: 'genders', key: 'id', value: 'description'})}
                            </Col>
                            <Col span={10}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'statusTypeId', 'وضعیت ثبت', {
                                    data: this.props.basicInfo, subData: 'statusType', key: 'id', value: 'statusTypeDesc'})}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="دیتابیس بنادر" key="2">
                        <Row>
                            <Col span={8}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'nationalityId', 'ملیت ', {
                                        data: this.props.basicInfo, subData: 'nationalities', key: 'id', value: 'nationalityDesc'})}
                            </Col>
                            <Col span={8}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'religionId', 'دین ', {
                                            data: this.props.basicInfo, subData: 'religions', key: 'id', value: 'description'})}
                            </Col>
                            <Col span={8}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'degreeId', 'مدرک تحصیلی ', {
                                                data: this.props.basicInfo, subData: 'degrees', key: 'id', value: 'description'})}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormSelectItem(this.props.form, selectedModel, 'marriageStatusId', 'وضعیت تاهل', {
                                                    data: this.props.basicInfo, subData: 'marriages', key: 'id', value: 'description'})}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'childNumber', 'تعداد فرزندان')}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'email', 'پست الکترونیکی')}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'firstNameEn', 'نام لاتین')}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'lastNameEn', 'نام خانوادگی لاتین')}
                            </Col>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'fatherNameEn', 'نام پدر لاتین')}
                            </Col>

                        </Row>

                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'passportNo', 'شماره پاسپورت')}
                            </Col>



                            <Col span={8}>
                                {this.createFormDatePickerItem(this.props.form, selectedModel, 'passIssueDate', 'صدور پاسپورت')}
                            </Col>



                            <Col span={8}>
                                {this.createFormDatePickerItem(this.props.form, selectedModel, 'passportExpireDate', 'انقضای پاسپورت')}
                            </Col>
                        </Row>


                        <Row>
                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'previousFirstName', 'نام قبلی')}
                            </Col>


                            <Col span={8}>
                                {this.createFormInputItem(this.props.form, selectedModel, 'previousLastName', 'نام خانوادگی قبلی')}
                            </Col>
                        </Row>

                        <Row>
                            {
                                selectedModel.phones &&
                                selectedModel.phones.map((phone,phoneIndex)=>{
                                    return this.createPhoneInputItem(this.props.form,
                                        phone, 'personPhoneNumbers['+phoneIndex+']',phoneIndex,
                                        { data: this.props.basicInfo, subData: 'phoneTypes', key: 'id', value: 'phoneTypeDesc'}
                                        )
                                })
                            }
                        </Row>
                        <Row>
                                <Button span={24} type="primary" onClick={()=>this.props.onAddPhone()}>{"افزودن تلفن جدید"}</Button>
                        </Row>

                        <Row>
                            {
                                selectedModel.addresses &&
                                selectedModel.addresses.map((address,addressIndex)=>{
                                    return this.createAddressInputItem(this.props.form,
                                         address, 'personAddresses['+addressIndex+']',addressIndex,
                                         { data: this.props.basicInfo, subData: 'addressTypes', key: 'id', value: 'addressTypeDesc'}
                                         )
                                })
                            }
                        </Row>
                        <Row>
                                <Button span={24} type="primary" onClick={()=>this.props.onAddAddress()}>{"افزوندن آدرس جدید"}</Button>
                        </Row>


                        <Row>
                        {this.createFormCheckboxGroupItem(this.props.form, selectedModel, 'personPersonType', ' نوع ', {
                                                data: this.props.basicInfo, subData: 'personTypes', key: 'id', value: 'personTypeDesc'})}

                        </Row>

                    </TabPane>
                </Tabs>
            </Form>
        </Modal>

    }
}
export default Form.create()(UserModal)
