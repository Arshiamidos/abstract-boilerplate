import React from 'react';
import {Popconfirm, Icon} from 'antd';
import BaseComponent from "components/BaseComponent";

class DeleteIcon extends BaseComponent {

    render() {
        let {title, onConfirm, icon, okText, cancelText} = this.props;
        return super.render(
            <Popconfirm title={title} onConfirm={onConfirm} okText={okText} cancelText={cancelText}>
                <Icon className="action" type={icon}/>
            </Popconfirm>
        );
    }
}

DeleteIcon.defaultProps = {
    title: "آیا از حذف این رکورد مطمئن هستید؟",
    icon: "delete",
    okText: "بله",
    cancelText: "لغو",
};

export default DeleteIcon;