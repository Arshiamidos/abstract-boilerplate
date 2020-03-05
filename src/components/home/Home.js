import React from 'react';
import BaseComponent from 'components/BaseComponent';
import i18n from 'tools/i18n';
import {connect} from 'react-redux'



class Home extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
          lng: props.language?props.language:'fa',
        }
      }

      componentDidMount() {
      }
     
      componentWillUnmount() {
        i18n.off('languageChanged', this.onLanguageChanged)
      }
    
      onLanguageChanged=(lng)=> {
        this.setState({lng})
      }  
      
    render() {

       return (<div>
          Dashboard 
         </div>)
    }
}

function mapStateToProps(state) {
  return {
      isLoggedIn: state.isLoggedIn,
      lng: state.lng
  };
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);