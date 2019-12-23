import React, { Component } from 'react';
import rcss from './Changemobile.module.css'
import Mobilecode from '../../../component/Mobilecode'
import {Button, Icon} from 'antd'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import qs from 'qs'
import {baseurl} from '../../../component/tools'
import { createHashHistory } from 'history/cjs/history.min';
class Changemobile extends Component {
    constructor(props) {
        super(props);
        this.state={
            password:"",
            verify:"",
            mobile:""
        }
    }
    getSon=(data)=>{
        var copyState=this.state;
        copyState.mobile = data.mobile;
        this.setState( {...copyState})
    }
    submit=()=>{
        Axios({
            method: 'post',
            url: baseurl+'/api/user/mobile?token='+window.localStorage.token,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify(this.state)
        }).then((response) => {
            if (response.data.status ===true) {
                createHashHistory().push("/app/Mine")
            } else {
                alert(response.data.data)
            }
        });
    }
    render() {
        return (
            <div className={rcss.cgmcontainer}>
                <div className={rcss.title}>修改手机号</div>
                <div className={rcss.cgmform}>
                <Mobilecode getSon={this.getSon} mobile=''></Mobilecode>
                <table><tbody>
                    <tr>
                        <td className={rcss.tdwidth}>验证码：</td></tr><tr>
                        <td><input type='text' value={this.state.verify} onChange={(e)=>{
                            this.setState({
                                verify:e.target.value
                            })
                        }}></input></td>
                    </tr>
                    <tr>
                        <td><p>密码：</p></td></tr><tr>
                        <td>
                            <input type='password' value={this.state.password} onChange={(e)=>{

                                this.setState({
                                    password:e.target.value
                                })
                            }}></input>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' className={rcss.submit}>
                            <Button type='primary' onClick={(e)=>{this.submit()}}>提交</Button>
                            <Link to='/app/Mine'><Button type='link'>返回<Icon type='arrow-left'></Icon> </Button></Link>    
                        </td>
                    </tr>
                </tbody></table>
                </div>
            </div>
        );
    }
}
export default Changemobile;   