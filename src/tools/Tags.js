import React from 'react';
import {Form, Select, Spin} from 'antd';
import BaseComponent from "components/BaseComponent";
import {Url, Header} from 'tools/Utils';
import {TAG_PATH} from 'tools/Constants';
import {error} from "tools/Message";

const FormItem = Form.Item;
const Option = Select.Option;

class Tags extends BaseComponent {

    constructor(props) {
        super(props);

        this.handleSearchTags = this.handleSearchTags.bind(this);
        this.handleChangeTags = this.handleChangeTags.bind(this);

        this.state = {
            tags: [],
            value: [],
            fetching: false,
            defaultTags: [],
            setTags: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.operation === 'edit' && !this.state.setTags) {
            this.setState({
                tags: nextProps.tags,
                defaultTags: nextProps.tags,
                setTags: true,
            });
        }
    }

    handleSearchTags = (q) => {
        if (q === '') return;

        fetch(Url(TAG_PATH, {filters: {title: q}}), Header())
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((tags) => {
                this.setState({
                    tags: tags.docs,
                    fetching: true,
                })
            })
            .catch(() => {
                error('خظا در دریافت اطلاعات')
            });
    };

    handleChangeTags = (value) => {
        this.setState({
            value,
            fetching: false,
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {fetching, value, tags, defaultTags} = this.state;
        const {mode, label, className, name, required, required_message} = this.props;

        return (
            <FormItem
                label={label}
                key={name}
                className={className}>
                {getFieldDecorator(name, {
                    initialValue: defaultTags.map(el => el.title),
                    rules: [{required, message: required_message}],
                })(
                    <Select
                        value={value}
                        notFoundContent={fetching ? <Spin size="small"/> : null}
                        mode={mode}
                        onSearch={this.handleSearchTags}
                        onChange={this.handleChangeTags}
                        filterOption={false}>
                        {
                            tags.map(function (el, i) {
                                return <Option value={el.title} key={i}>{el.title}</Option>
                            })
                        }
                    </Select>
                )}
            </FormItem>
        );
    }
}

Tags.defaultProps = {
    operation: "create",
    tags: false,
    label: "برچسب‌ها",
    className: "tags-form-item",
    name: "tags",
    mode: "tags",
    required: false,
    required_message: "برچسب‌ها را وارد کنید!",
};

export default Tags;