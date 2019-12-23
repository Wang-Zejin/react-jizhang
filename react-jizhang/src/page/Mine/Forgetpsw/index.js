import React from 'react'

import Axios from 'axios'
import qs from 'qs'
//需要定义baseurl
import {baseurl} from '../../../component/tools'
import Mobilecode from '../../../component/Mobilecode'
import rcss from './Forgetpsw.module.css'
import { Button, Icon } from 'antd'
import {Link} from 'react-router-dom'

export default class Userregister extends React.Component{
    constructor(){
        super()
        this.state={
            mobile:'',
            verify:'',
            password:'',
        }
    }
    getSon=(data)=>{
        var copyState=this.state;
        copyState.mobile = data.mobile;
        this.setState({...copyState})
    }
    submit=()=>{
        Axios({
            method: 'post',
            url: baseurl+'/api/user/token/sms',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify(this.state)
        }).then((response) => {
            if (response.data.status ===true) {
                window.localStorage.setItem("token",response.data.data.token);
                window.location.reload();
            } else {
                alert(response.data.data)
            }
        });
    }
    render(){
        return (<div className={rcss.registerContainer}>
            <div className={rcss.title}>重置密码</div>
            <div className={rcss.registerform}>
            <Mobilecode getSon={this.getSon} mobile='18322562067'></Mobilecode>
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
                    <td><p>新密码：</p></td></tr><tr>
                    <td>
                        <input type='password' value={this.state.password} onChange={(e)=>{
                            console.log(2)
                            this.setState({
                                password:e.target.value
                            })
                        }}></input>
                    </td>
                </tr>
                <tr>
                    <td colSpan='2' className={rcss.submit}>
                        <Button type='primary' onClick={(e)=>{this.submit()}}>提交</Button>
                        <Link to='/app/Mine'><Button type='link'>返回登录<Icon type='arrow-left'></Icon> </Button></Link>    
                    </td>
                </tr>
            </tbody></table>
            </div>
        </div>)
    }
}