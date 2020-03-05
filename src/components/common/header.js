import React from 'react';
import {connect} from 'react-redux';
import pmoLogo from 'assets/img/pmologo.png'
import iranFlag from 'assets/img/iranFlag.png'
import BaseComponent from "../BaseComponent";
import 'assets/scss/header.scss'
import {  Icon } from 'antd';
class Header extends BaseComponent {

    render() {

        return super.render(
            <div id="" className="header">
                <div className="container-fluid px-0">
                    <div className="section">
                        <div className="right">
                            <div className="logo-wrapper">
                                <img src={iranFlag} alt="" className="w-100 img-fluid" style={{maxWidth:'100px'}}/>
                                <img src={pmoLogo} alt="" className="w-100 img-fluid" style={{maxWidth:'180px'}}/>
                            </div>
                        </div>
                        <div className="left text-left my-3 px-3 d-flex align-items-end">
                            <a className="text-white" id="logout"  onClick={this.props.logout}>
                                <span>
                                        <Icon type="logout"/>
                                </span>
                                <span  className="mx-1">خروج</span></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};



export default connect(mapStateToProps)(Header);
