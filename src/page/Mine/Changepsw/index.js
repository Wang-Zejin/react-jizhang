import React, { Component } from 'react';
import Axios from 'axios'
import qs from 'qs'
//需要定义baseurl
import {baseurl} from '../../../component/tools'
import rcss from './Changepsw.module.css'
import { Button, Icon } from 'antd'
import {Link} from 'react-router-dom'
import { createHashHistory } from 'history/cjs/history.min';
import Navtop from '../../../component/Navtop';
class Changepsw extends Component {
    constructor(props) {
        super(props);
        this.state={
            password: "",
            new_password: ""
        }
    }
    submit=()=>{
        Axios({
            method: 'post',
            url: baseurl+'/api/user/password?token='+window.localStorage.token,
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
            <div style={{paddingTop:"40px"}}>
                <Navtop righticon="" leftlink="/app/Mine" tittle="修改密码"></Navtop>
            <div className={rcss.container}>
                <div className={rcss.containeritem}>
                    <span>旧密码：</span>
                    <input className={rcss.pswinput} placeholder="请输入旧密码" type='password' value={this.state.password} onChange={(e)=>{
                        this.setState({
                            password:e.target.value
                        })
                    }}></input>
                </div>
                <div className={rcss.containeritem}>
                    <span>新密码：</span>
                    <input className={rcss.pswinput} placeholder="请输入新密码" type='password' value={this.state.new_password} onChange={(e)=>{
                            this.setState({
                                new_password:e.target.value
                            })
                        }}></input>
                </div>
                <div className={rcss.containeritem} style={{textAlign:"center"}}>
                <Button type='primary' onClick={(e)=>{this.submit()}} style={{width:"50%"}}>提交</Button>
                </div>
            {/* <div className={rcss.cgpswform}>
            <table><tbody>
                <tr>
                    <td className={rcss.tdwidth}>旧密码：</td></tr><tr>
                    <td><input type='password' value={this.state.password} onChange={(e)=>{
                        this.setState({
                            password:e.target.value
                        })
                    }}></input></td>
                </tr>
                <tr>
                    <td><p>新密码：</p></td></tr><tr>
                    <td>
                        <input type='password' value={this.state.new_password} onChange={(e)=>{
                            this.setState({
                                new_password:e.target.value
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
            </div> */}
        </div>
        </div>
        );
    }
}

export default Changepsw;