import React, { Component } from 'react';
import {senddata} from '../../component/tools'
import Accnavtop from './Accnavtop'
import Accountlist from './Accountlist'
import Accountdetail from './Accountdetail'
import {Route} from 'react-router-dom'
import Pleselogin from '../../component/Pleselogin'
import Createaccount from './Createaccount';
import Editaccount from './Editaccount';
import Navtop from '../../component/Navtop'
import { createHashHistory } from 'history/cjs/history.min';
class Account extends Component {
    constructor(props) {
        super(props);
        this.state={
            userstatus:"account"
        }
    }
    componentDidMount(){
        senddata(this.props,this.state.userstatus)
    }
    render() {
        if(window.localStorage.token){
            return (
                <div>
                    <Route exact path="/app/Account"><Accountlist></Accountlist></Route>
                    <Route path="/app/Account/createaccount"><Createaccount></Createaccount></Route>
                    <Route path="/app/Account/accountdetail/:id" component={Accountdetail}></Route>
                    <Route path="/app/Account/editaccount/:id" component={Editaccount}></Route>
                </div>
            );
        }else{
            return (<div>
                <Pleselogin></Pleselogin>
                {createHashHistory().push("/app/login")}
            </div>)
        }
    }
}

export default Account;