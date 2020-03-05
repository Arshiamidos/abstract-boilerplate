import React from 'react';
import { Form, Button, Upload, Icon, Input } from 'antd';
import _ from 'lodash';
import BaseComponent from "components/BaseComponent";
import { Url, getTokenObject } from 'tools/Utils';
import { UPLOAD_PATH } from 'tools/Constants';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';



const FormItem = Form.Item;

class File extends BaseComponent {
    state = {
        text: '',
    }
    constructor(props){
        super(props);
        this.state={
            text:props.text,
            text_fa:props.text_fa,
            hImage:props.hImage
        }

    }

    normFile = e => Array.isArray(e) ? e : e && e.fileList;

    getFileObject(files) {
        if (!files) return [];
        let result = [];
        files = Array.isArray(files) ? files : [files];
        files.forEach((file, index) => {
            if (!file) return;

            let { _id, path, name } = file;
            let url = Url('/' + path);

            result.push({
                thumbUrl: url,
                response: _id,
                uid: index,
                url,
                name,
            })
        });

        return result;
    }
    componentWillReceiveProps(nxp){
        if(nxp.hImage!==this.state.hImage){
            this.setState({hImage:nxp.hImage});
        }
    }

    render() {


        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { operation, label, className, name, listType, accept, icon, required, required_message, count, multiple } = this.props;

        let default_image = this.getFileObject(this.state.hImage);
        return (


            <FormItem
                style={{ padding:'10px',backgroundColor: 'pink', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                className={className}>

                <div style={{height:'70px',backgroundColor:'white',border:'1px dashed black' ,width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    
                        <Button style={{height:'70px',cursor:'pointer'}} onClick={this.props.onRemove} >
                            <Icon
                                type="minus-circle"
                                theme="twoTone"
                                style={{ color: 'red' }}
                                twotonecolor="#52c41a" />
                        </Button>
                        {getFieldDecorator(`${name}HImage`, {
                            valuePropName: `${name}HImage`,
                            getValueFromEvent: this.normFile,
                            getValueFromLoad: this.normFile,
                            //...((this.state.hImage===-1)?{}:{fileList: default_image}),
                            ...((this.state.hImage===-1)?{}:{initialValue: default_image}),
                            ...((this.state.hImage===-1)?{}:{defaultFileList: default_image}),
                            rules: [{ required: required, message: required_message }],
                        })(
                            <Upload
                                style={{width:'50%',height:'70px'}}
                                accept={accept}
                                listType={listType}
                                multiple={multiple}
                                //onRemove={(file)=>this.setState({hImage:-1})}
                                //{...(this.state.hImage===-1)?{fileList: default_image}:{fileList: default_image}}
                                {...(this.state.hImage===-1)?{}:{defaultFileList: default_image}}
                                action={Url(UPLOAD_PATH)} headers={getTokenObject()}>

                                {
                                    _.size(getFieldValue(`${name}HImage`))
                                     < this.props.count ?
                                        <Button  style={{height:'70px',cursor:'pointer'}} >
                                            <Icon type={icon} /> بارگذاری عکس مورد نظر
                                        </Button>
                                        :
                                        ''
                                }
                            </Upload>
                        )}
                            {getFieldDecorator(`${name}Text`, {
                                initialValue: this.props.text,
                                rules: [{ required: true, message: 'لطفا توضیح محتوا را وارد کنید!' }],
                            })(
                                <Input.TextArea style={{height:'70px'}} placeholder={'توضیحات'} />
                            )}

                            {getFieldDecorator(`${name}Text_fa`, {
                                initialValue: this.props.text_fa,
                                rules: [{ required: true, message: 'لطفا توضیح محتوا را وارد کنید!' }],
                            })(
                                <Input.TextArea style={{height:'70px'}} placeholder={'توضیحات'} />
                            )}
                </div>
            </FormItem>
        );
    }
}

File.defaultProps = {
    operation: "create",
    label: "تصویر",
    className: "image-form-item",
    name: "image",
    listType: "picture",
    accept: "image/*",
    icon: "upload",
    required: true,
    text:'',
    required_message: "تصویر موردنظر را بارگذاری کنید!",
    count: 1,
};

export default File;