import React, { Component } from 'react';
import Axios from 'axios'
import {baseurl, senddata} from '../../component/tools'
import Recorditemdetail from './Recorditemdetail'
import {Route} from 'react-router-dom'
import Recordsequel from './Recordsequel'
import Recordlist from './Recordlist';
import Pleselogin from '../../component/Pleselogin';
import { createHashHistory } from 'history/cjs/history.min';
class Recorddetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            spinstatu:false,
            userstatus:"recorddetail"
        }
    }
    getRecordReal=(params)=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method:"get",
                url:baseurl+'/api/record/real?token='+window.localStorage.token,
                params:params
            }).then((response)=>{
                console.log(window.localStorage.token)
                console.log(response.data)
            }).catch((error)=>{
                console.log(error)
            })
        })
    }
    componentDidMount(){
        senddata(this.props,this.state.userstatus)
        this.getRecordReal({begin_date:"2019-10-01",end_date:"2019-12-25"})
    }
    render() {
        if(window.localStorage.token){
            return (
                <div>
                    <Route exact path="/app/Recordlist"><Recordlist></Recordlist></Route>
                    <Route path="/app/Recordlist/Recorddetail" component={Recorditemdetail}></Route>
                    <Route path="/app/Recorddetail/recordsequel"><Recordsequel></Recordsequel></Route>
                </div>
            );
        }else{
            return (<div>
                <Pleselogin></Pleselogin>
                {createHashHistory().push("/app/login")}
                </div>
            )
        }
    }
}

export default Recorddetail;