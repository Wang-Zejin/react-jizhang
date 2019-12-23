import React from 'react';
import Getcaptcha from '../../../component/Getcaptcha';
import Axios from 'axios';
import qs from 'qs';
import {baseurl,senddata} from '../../../component/tools'
import { Button ,Spin} from 'antd';
import rcss from './Userlogin.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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
                if (response.data.status ===true) {
                    localStorage.setItem("token",response.data.data.token)
                    localStorage.setItem("id",response.data.data.id)
                    senddata(this.props,response.data)
                    this.setState({
                        spinstatu:false
                    },()=>{
                        window.location.reload()
                    })
                } else {
                    this.setState({
                        spinstatu:false
                    },()=>{
                        alert(response.data.data)
                    })
                }
            });
        })
        
    }
    render(){
        return (<div className={rcss.container}> 
        <Spin spinning={this.state.spinstatu}>
            <div className={rcss.title}>登录</div>
            <table className={rcss.ctable}>
                <tbody>
                    <tr>
                        <td>手机号：</td></tr><tr>
                        <td><input type='text' value={this.state.mobile} onChange={(e)=>{
                            this.setState({
                                mobile:e.target.value
                            })
                        }}></input></td>
                    </tr>
                    <tr>
                        <td>密码：</td></tr><tr>
                        <td><input type='password' value={this.state.password} onChange={(e)=>{
                            this.setState({
                                password:e.target.value
                            })
                        }}></input></td>
                    </tr>
                    <tr>
                        <td><Getcaptcha getSon={this.getSon}></Getcaptcha></td></tr><tr>
                        <td><input type='text' value={this.state.captcha_code} onChange={(e)=>{
                            this.setState({
                                captcha_code:e.target.value
                            })
                        }}></input></td>
                    </tr>
                    <tr>
                        <td colSpan='2' className={rcss.submit}>
                            <Button type='primary' onClick={this.handleClick}>登录</Button>
                            <Link to='/app/Mine/Forgetpsw'><Button type='link'>忘记密码</Button></Link>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' className={rcss.submit}>
                            <Link to='/app/Mine/Userregister'><Button type='link'>还没注册？去注册--></Button></Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Spin>
        </div>)
    }
}