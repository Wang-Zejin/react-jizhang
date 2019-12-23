import React, { Component } from 'react';
import Recordnavtop from './Recordnavtop'
import {Route} from 'react-router-dom'
import Pleselogin from '../../component/Pleselogin'
import {senddata} from '../../component/tools'
import Recordlist from './Categorylist';
import Createrecord from './Createrecord'
class Record extends Component {
    constructor(props) {
        super(props);
        this.state={
            userstatus:"record"
        }
    }
    componentDidMount(){
        senddata(this.props,this.state.userstatus)
    }
    render() {
            if(window.localStorage.token){
                return (
                    <div>
                        <Route exact path="/app/Record"><Createrecord></Createrecord></Route>
                        <Route path="/app/Record/categorylist"><Recordlist></Recordlist></Route>
                    </div>
                );
            }else{
                return (<Pleselogin></Pleselogin>)
            }
    }
}

export default Record;