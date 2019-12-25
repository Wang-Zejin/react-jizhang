import React from 'react'

import Axios from 'axios'
import qs from 'qs'
//需要定义baseurl
import {baseurl,senddata} from '../tools'
//引入生成图片验证码子组件
import Getcaptcha from '../Getcaptcha'
import { Button, message,Icon } from 'antd'
import rcss from './mobilecode.module.css'
export default class Mobilecode extends React.Component{
    constructor(props){
        super(props)
        this.state={
            req:{
                mobile:"",
                captcha_code:'',
                captcha_key:''
            }
        }
    }
    //获得子组件数值的函数
    getSon=(data)=>{
        let reqdata = this.state.req
        reqdata.captcha_key=data.data.key
        this.setState({
            req:reqdata
        })

    }

    handleClick=()=>{
        if(this.state.req.mobile===""){
            message.error("手机号不能为空")
            return false
        }
        Axios({
            method: 'post',
            url: baseurl+'/api/sms/verify',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify(this.state.req)
        }).then((response) => {
            if (response.data.status ===true) {
                message.success(response.data.data)
                senddata(this.props,this.state.req)
            } else {
                if(response.data.data==="INVALID_CAPTCHA"){
                    message.error("需要输入验证码")
                    document.getElementById("captchatr").removeAttribute("style")
                }else{
                    message.error(response.data.data)
                }
            }
        });
    }
    render(){
        return (
            <table style={{width:"100%"}}><tbody>
                <tr id="captchatr" style={{display:"none"}}>
                    <td>
                    <div className={rcss.logininputbox} style={{display:"inline-block",width:"40%"}}>
                        <Icon type="bulb" />
                        <input placeholder="验证码" className={rcss.logininput}  type='text' value={this.state.captcha_code} onChange={(e)=>{
                        var reqx = this.state.req
                        reqx.captcha_code=e.target.value
                        this.setState({
                            req:reqx
                        })
                    }}></input>
                    </div>
                    <Getcaptcha getSon={this.getSon}></Getcaptcha>
                    </td>
                </tr>
                <tr>
                        <td>
                            <div className={rcss.logininputbox}>
                                <Icon type="mobile" />  
                                <input 
                                 placeholder="请输入手机号" 
                                 className={rcss.logininput}
                                 type='text' 
                                 value={this.state.mobile} 
                                 onChange={(e)=>{
                                var reqx = this.state.req
                                reqx.mobile=e.target.value
                                    this.setState({
                                        req:reqx
                                    })
                                }}></input>
                            </div>
                        </td>
                    </tr>
                    <tr>
                    <td><Button className={rcss.submitbutton} type='primary' onClick={()=>{
                        this.handleClick()
                    }}>获取验证码</Button></td>
                </tr>
            </tbody></table>)
    }
}