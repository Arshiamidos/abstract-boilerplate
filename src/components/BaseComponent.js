import React,{Component} from 'react';
import {hasAccess} from 'tools/ACL';
import {Redirect } from 'react-router-dom';

class BaseComponent extends Component {

   
    componentDidCatch(err,info){
        console.log(err)
    }
      
    render(template, redirect='') {
        return  hasAccess(this.props.access)  ? template : (redirect===''? <Redirect to="/login" />:redirect);
    }

    
}

export default BaseComponent;