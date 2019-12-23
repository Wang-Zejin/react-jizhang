import React from 'react'

import Axios from 'axios'
import qs from 'qs'
//需要定义baseurl
import {baseurl,senddata} from '../tools'
//引入生成图片验证码子组件
import Getcaptcha from '../Getcaptcha'
import { Button } from 'antd'
export default class Mobilecode extends React.Component{
    constructor(props){
        super(props)
        this.state={
            req:{
                mobile:props.mobile,
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
        Axios({
            method: 'post',
            url: baseurl+'/api/sms/verify',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify(this.state.req)
        }).then((response) => {
            if (response.data.status ===true) {
                alert(response.data.data)
                senddata(this.props,this.state.req)
            } else {
                alert(response.data.data)
            }
        });
    }
    render(){
        return (
            <table><tbody>
                <tr>
                    <td><Getcaptcha getSon={this.getSon}></Getcaptcha></td></tr><tr>
                    <td><input type='text' value={this.state.captcha_code} onChange={(e)=>{
                        var reqx = this.state.req
                        reqx.captcha_code=e.target.value
                        this.setState({
                            req:reqx
                        })
                    }}></input></td>
                </tr>
                <tr>
                    <td>手机号：</td></tr><tr>
                    <td><input type='text' value={this.state.mobile}onChange={(e)=>{
                        var reqx = this.state.req
                        reqx.mobile=e.target.value
                        this.setState({
                            req:reqx
                        })
                    }}></input></td></tr><tr>
                    <td><Button type='primary' onClick={()=>{
                        this.handleClick()
                    }}>获取验证码</Button></td>
                </tr>
            </tbody></table>)
    }
}