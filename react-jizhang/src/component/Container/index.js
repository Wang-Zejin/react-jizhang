import React from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom'
// import {Icon} from 'antd'
import rcss from './container.module.css'
// import Userregister from '../../page/Mine/Userregister'
// import Userlogin from'../../page/Mine/Userlogin'
// import Changepsw from '../../page/Mine/Forgetpsw'
import Mine from '../../page/Mine'
import Account from '../../page/Account'
import { senddata } from '../tools';
import Record from '../../page/Record';
import Recorddetail from '../../page/Recorddetail';
import Home from '../../page/Home';
export default class Container extends React.Component{
    constructor(){
        super()
        this.state={
            userstatus:""
        }
    }
    getUserstatus=(data)=>{
        this.setState({
            userstatus:data
        },()=>{
            console.log(this.state.userstatus)
            senddata(this.props,this.state.userstatus)
        })
    }
    render(){
        return (<div className={rcss.container}>
           <HashRouter>
                    <Switch>
                        <Route exact path={'/'}><Home getSon={this.getUserstatus}></Home></Route>
                        <Route path={'/app/Mine'}><Mine getSon={this.getUserstatus}></Mine></Route>
                        <Route path={'/app/Account'}><Account getSon={this.getUserstatus}></Account></Route>
                        <Route path={'/app/Record'}><Record getSon={this.getUserstatus}></Record></Route>
                        <Route path={'/app/Recordlist'}><Recorddetail getSon={this.getUserstatus}></Recorddetail></Route>
                    </Switch>
                </HashRouter>
        </div>)
    }
}