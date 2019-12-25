import React from 'react'

import Axios from 'axios'
import qs from 'qs'
//需要定义baseurl
import {baseurl} from '../../../component/tools'
import Mobilecode from '../../../component/Mobilecode'
import rcss from './Userregister.module.css'
import { Button, message, Spin, Icon} from 'antd'
import {Link} from 'react-router-dom'
import { createHashHistory } from 'history/cjs/history.min';
export default class Userregister extends React.Component{
    constructor(){
        super()
        this.state={
            mobile:'',
            verify:'',
            password:'',
            nickname:'',
            spinstatu:false
        }
    }
    getSon=(data)=>{
        var copyState=this.state;
        copyState.mobile = data.mobile;
        this.setState({...copyState})
    }
    submit=()=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method: 'post',
                url: baseurl+'/api/user/register',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify(this.state)
            }).then((response) => {
                if (response.data.status ===true) {
                    message.success("注册成功")
                    this.setState({
                        spinstatu:false
                    })
                    console.log(response.data)
                    window.localStorage.setItem("token",response.data.data.token)
                    createHashHistory().push("/app/Mine")
                } else {
                    this.setState({
                        spinstatu:false
                    })
                    message.error(response.data.data)
                }
            });
        })
        
    }
    render(){
        return (<div className={rcss.mengban}>
            <div className={rcss.registerContainer}>
            <Spin spinning={this.state.spinstatu}>
            <div className={rcss.title}>手机号注册</div>
            <div className={rcss.registerform}>
            <Mobilecode getSon={this.getSon} mobile='18322562067'></Mobilecode>
            <table style={{width:"100%"}}><tbody>
                <tr>
                    <td>
                        <div className={rcss.logininputbox}>
                            <Icon type="safety-certificate" />
                            <input placeholder="验证码" className={rcss.logininput} type='text' value={this.state.verify} onChange={(e)=>{
                                this.setState({
                                    verify:e.target.value
                                })
                            }}></input>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={rcss.logininputbox}>
                            <Icon type="user" />
                            <input placeholder="请输入昵称" className={rcss.logininput} type='text' value={this.state.nickname} onChange={(e)=>{
                                this.setState({
                                    nickname:e.target.value
                                })
                            }}></input>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={rcss.logininputbox}>
                            <Icon type="key" />
                            <input placeholder="请输入密码" className={rcss.logininput} type='password' value={this.state.password} onChange={(e)=>{
                                this.setState({
                                    password:e.target.value
                                })
                            }}></input>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan='2' className={rcss.submit}>
                        <Button type='primary' onClick={(e)=>{this.submit()}}>提交</Button>
                        <Link to='/app/login'><Button type='link'>已有账号？去登陆--></Button></Link>    
                    </td>
                </tr>
            </tbody></table>
            </div>
            </Spin>
        </div>
        </div>)
    }
}