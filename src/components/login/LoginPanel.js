import React from 'react';
import BaseComponent from 'components/BaseComponent';
import i18next from '../../tools/i18n';
import {connect} from 'react-redux'
import {login} from 'redux/actions/user'
import {Redirect} from 'react-router'
import Loading from 'tools/Loading';
import key from '../../assets/img/key.jpg';
import password from '../../assets/img/icon/key.svg';
import user from '../../assets/img/icon/user.svg';

class LoginPanel extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            lng: props.lng ? props.lng : 'fa',
            userName: '',
            passWord: '',
            phoneNumber: '+989',
        }
    }


    componentWillReceiveProps = (nxtProps) => {

        if (nxtProps.lng !== this.props.lng) {

            i18next.changeLanguage(nxtProps.lng);

        }
    }


    render() {

        if (this.props.isLoggedIn)
            return <Redirect to='/#/cms/landing'/>

        return super.render(
            <div className="login-panel">

                <div className="tabBtnsWrapper bgGrey">
                    <div className="tabBtn selected">
                        <div className="tabBtnTitle clrWhite my-5 py-5">
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <div className="border-radius-10 my-5" style={{
                                    backgroundImage: `url(${key})`,
                                    backgroundPosition:'center center',
                                    backgroundRepeat:'no-repeat',
                                    backgroundSize:'cover',
                                    width: "28%",
                                    padding: "65px 20px",
                                    boxShadow: " 4px 5px 12px 1px",
                                }}>

                                    <div className="inputContainer d-flex align-items-center justify-content-center mb-3">
                                        <label for="username" className="ml-3">
                                            <img src={user} alt=""  className="img-fluid w-100" style={{maxWidth:'20px'}}/>
                                        </label>
                                        <input
                                            value={this.state.userName}
                                            style={{flex: 10,}}
                                            name="username"
                                            className="inputLoginPanel clrGreyDark inputLogin bg-white border-radius-5"
                                            type="text" minLength="4" maxLength="44"
                                            onChange={(ev) => this.setState({userName: ev.target.value})}
                                        />
                                    </div>

                                    <div className="inputContainer d-flex flex-row align-items-center justify-content-center mb-3" >
                                        <label for="password" className="ml-3">
                                            <img src={password} alt="" className="img-fluid w-100" style={{maxWidth:'20px'}}/>
                                            </label>

                                        <input
                                            value={this.state.passWord}
                                            onChange={(ev) => this.setState({passWord: ev.target.value})}
                                            style={{flex: 10}} name="password"
                                            className="inputLoginPanel clrGreyDark inputLogin bg-white border-radius-5"
                                            type="password"/>
                                    </div>
                                    <div className="inputContainer text-center pt-3 ">


                                            <button
                                                className="inputLoginPanel d-flex "
                                                onClick={() => {
                                                    this.props.dologin({
                                                        user: this.state.userName,
                                                        pass: this.state.passWord
                                                    })
                                                }}
                                                style={{flex: 10, width: "50%", padding: '10px',boxShadow:'inset #14718ce3 0px -18px 4px 2px'
                                               }}
                                                className="inputLoginPanel clrGreyDark bg-light-navy border-radius-5 text-white font-size-11" type="button">
                                               { this.props.isLoading
                                               ?
                                                <Loading/>
                                                   :
                                                ' ورود'
                                                }

                                            </button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>);
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.userIsLoading,
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        lng: state.lng
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dologin: (form) => dispatch(login(form)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel);
