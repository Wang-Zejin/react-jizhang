import React from 'react';
import Getcaptcha from '../../../component/Getcaptcha';
import Axios from 'axios';
import qs from 'qs';
import {baseurl,senddata} from '../../../component/tools'
import { Button ,Spin, message, Icon} from 'antd';
import rcss from './Userlogin.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { createHashHistory } from 'history/cjs/history.min';
export default class Userlogin extends React.Component{
    constructor(){
        super()
        this.state={
            mobile:'',
            password  :'',
            captcha_code  :'',
            captcha_key :'',
            spinstatu:false
        }
        
    }
    getSon=(data)=>{
        var copydata=this.state
        copydata.captcha_key=data.captcha_key
        this.setState({...copydata})
    }
    handleClick=()=>{
        if(this.state.mobile===""){
            message.error("手机号不能为空")
            return false
        }
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method: 'post',
                url: baseurl+'/api/user/token/mobile',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify(this.state)
            }).then((response) => {
                console.log(response.data)
                if (response.data.status ===true) {
                    localStorage.setItem("token",response.data.data.token)
                    localStorage.setItem("id",response.data.data.id)
                    senddata(this.props,response.data)
                    this.setState({
                        spinstatu:false
                    },()=>{
                        
                        createHashHistory().push("/")
                    })
                } else {
                    this.setState({
                        spinstatu:false
                    },()=>{
                        if(response.data.code==="INVALID_CAPTCHA"){
                            document.getElementById("captchatr").removeAttribute("style")
                        }else{
                            message.error(response.data.data)
                        }
                    })
                }
            });
        })
        
    }
    render(){
        return (<div className={rcss.mengban}>
        <div className={rcss.logincontainer}> 
        <Spin spinning={this.state.spinstatu}>
            <div className={rcss.title}>登录</div>
            <table className={rcss.ctable}>
                <tbody>
                    <tr>
                        <td>
                            <div className={rcss.logininputbox}>
                                <Icon type="user" />
                                <input 
                                    className={rcss.logininput} 
                                    type='text' 
                                    value={this.state.mobile} 
                                    placeholder="请输入手机号"
                                    onChange={(e)=>{
                                        this.setState({
                                            mobile:e.target.value
                                        })
                                    }}></input>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={rcss.logininputbox}>
                                <Icon type="key" />
                                <input 
                                    className={rcss.logininput} 
                                    placeholder="请输入密码"
                                    type='password' 
                                    value={this.state.password} 
                                    onChange={(e)=>{
                                        this.setState({
                                            password:e.target.value
                                        })
                                    }}>
                                </input>
                        </div>
                        </td>
                    </tr>
                    <tr id="captchatr" style={{display:"none"}}>
                        <td>
                        <div className={rcss.logininputbox} style={{display:"inline-block",width:"40%"}}>
                        <input 
                            placeholder="验证码"
                            className={rcss.logininput} 
                            type='text' 
                            value={this.state.captcha_code} 
                            onChange={(e)=>{
                            this.setState({
                                captcha_code:e.target.value
                            })
                        }}></input>
                        </div>
                        <Getcaptcha getSon={this.getSon}></Getcaptcha>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' className={rcss.submit}>
                            <Button type='primary' onClick={this.handleClick} className={rcss.submitbutton}>登录</Button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' className={rcss.submit}>
                            <Link to='/app/Forgetpsw'><Button type='link'>忘记密码</Button></Link>
                            <span>|</span>
                            <Link to='/app/Userregister'><Button type='link'>去注册--></Button></Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Spin>
        </div>
        </div>)
    }
}