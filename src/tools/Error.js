import {message} from 'antd';
import BaseComponent from "components/BaseComponent";

class Error extends BaseComponent {

    render() {
        message.error('خطا در دریافت اطلاعات');
        return (
            ''
        );
    }
}

export default Error;
