import React from 'react';
// import {Button, Switch} from 'antd'
// import './app.module.css'
import './App.css'
//antd
// import { Layout, Menu, Breadcrumb, Icon ,Button} from 'antd';
// //所有页面组件
// import Userregister from '../../page/Mine/Userregister'
// import Userlogin from'../../page/Mine/Userlogin'
// import Changepsw from '../../page/Mine/Forgetpsw'
import Navfoot from '../Navfoot'
import Container from '../Container'
import Userlogin from '../../page/Mine/Userlogin';



// import {Link,Switch ,Route ,Router} from "react-router-dom"
// import axios from "axios"
// import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';

// const { SubMenu } = Menu;
// const { Header, Content, Sider } = Layout;

export default class App extends React.Component{
    constructor(){
        super()
        this.state={
            tokendata:{
                id:'',
                token:''
            },
            userinfomation:{
                mobile: '',
                nickname: '',
                avatar_url: ''
            },
            userstatus:""
        }
    }

    getUserToken=(data)=>{
        this.setState({
            tokendata:data
        })
    }
    getUserstatus=(data)=>{
        console.log(data)
        console.log(this.state.userstatus)
        
        this.setState({
            userstatus:data
        },()=>{
            console.log(this.state.userstatus)
            console.log(666);
        })

    }

    render(){
        console.log(this.state.userstatus)

            return ( <div>
            <Container getSon={this.getUserstatus}></Container>
            <Navfoot userstatus={this.state.userstatus}></Navfoot>
            </div> )

    }
}