import React from 'react';
import {Spin} from 'antd';
import BaseComponent from "components/BaseComponent";

class Loading extends BaseComponent {

    render() {
        return super.render(
            <Spin className="text-white "/>
        );
    }
}

export default Loading;
