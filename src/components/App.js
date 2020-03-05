import React from 'react';
import {connect} from 'react-redux';
import { Menu, Dropdown, Icon } from 'antd';
import {Switch,Redirect, Route, Router,BrowserRouter,HashRouter, Link} from 'react-router-dom';

import BaseComponent from './BaseComponent';
import { createHashHistory } from 'history';


import Home from 'components/home/Home';
import Login from 'components/login/LoginPanel';
import NotFound from 'components/not-found/NotFound';
import RealPersons from 'components/real-persons';
import OrgPersons from 'components/org-persons';
import Commodity from 'components/commodity';
import Equipment from 'components/equipment';
import {userFetchData, logout} from 'redux/actions/user';
import Header from 'components/common/header'

import '../../node_modules/antd/dist/antd.min.css'
import 'assets/scss/app.scss'

const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link className="text-white linkDropdown font-size-1 pb-2 " to={"/#/real-persons"}>    اشخاص حقیقی </Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link className="text-white linkDropdown font-size-1 pb-2 "  to={"/#/org-persons"}>اشخاص حقوقی</Link>
        </Menu.Item>
    </Menu>
);
class App extends BaseComponent {

    constructor(props){
        super(props)
        this.state={
            isLoggedIn:props.isLoggedIn,
            counter:100,
        }

    }





    render() {
       const isLoggedIn=this.props.isLoggedIn;
        return (
            <div className="App"  >
                <Header logout={this.props.logout}/>



                <div className="bg-dark-navy py-2 text-right px-3" style={{boxShadow:'inset #2656804f 0px -16px 4px 5px'}}>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link text-white px-2 font-size-1" onClick={e => e.preventDefault()}
                        style={{borderLeft:'1px solid #363f46'}}>
                           اشخاص <Icon type="down" />
                        </a>
                    </Dropdown>
                    <Link  className="text-white px-2 font-size-1"  to={"/#/commodity"}>کالا</Link>
                    <Link  className="text-white px-2 font-size-1"  to={"/#/equipment"}>تجهیزات</Link>
                </div>
                <div className="main-container mt-3 mx-3 p-3 mb-2 bg-light-blue" style={{
                    borderBottomRightRadius:'30px',
                    borderBottomLeftRadius:'30px',
                    borderTopLeftRadius:'30px',
                }}>
                <HashRouter>
                    <Router history={createHashHistory()}>
                        <div>
                            <Switch>
                                {/* <Route  path={"/cms"} component={CMS}/>  */}
                                <Route exact path={"/login"} render={(props) =>
                                    {return isLoggedIn ? <Redirect to={'/'}  {...props} /> : <Login language={'en'} {...props} />}}
                                    />
                                <Route exact path={"/real-persons"} render={(props) =>
                                    {return isLoggedIn ?<RealPersons/>: <Redirect to={'/login'}  {...props} />}}
                                    />
                                <Route exact path={"/org-persons"} render={(props) =>
                                    {return isLoggedIn ?<OrgPersons/>: <Redirect to={'/login'}  {...props} />}}
                                    />
                                <Route exact path={"/commodity"} render={(props) =>
                                    {return isLoggedIn ?<Commodity/>: <Redirect to={'/login'}  {...props} />}}
                                    />
                                <Route exact path={"/equipment"} render={(props) =>
                                    {return isLoggedIn ?<Equipment/>: <Redirect to={'/login'}  {...props} />}}
                                    />
                                <Route exact path={"/"} render={(props) =>
                                    {return isLoggedIn ?<Home/>: <Redirect to={'/login'}  {...props} />}}
                                    />
                                <Route path={"*"} render={() => (<NotFound/>)}/>
                            </Switch>
                        </div>
                    </Router>
                </HashRouter>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.userIsLoading,
        isLoggedIn: state.isLoggedIn,
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: (data) => dispatch(userFetchData(data)),
        logout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
