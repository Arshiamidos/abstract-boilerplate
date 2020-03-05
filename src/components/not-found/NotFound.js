import React, { Component } from "react";
import {  Icon} from 'antd';
class App extends Component {

  render() {
    return (
      <div style={{display:'flex',flexDirection:'column',width:'100%',justifyContent:'center',alignItems:'center'}}>
        <div className=" mt-3 ">         <Icon type="tool"  style={{fontSize:'5rem'}}/></div>
       <p className=" mt-2 font-size-13">

         صفحه مورد نظر پیدا نشد!
       </p>
      </div>
    )
  }
}
export default App;
