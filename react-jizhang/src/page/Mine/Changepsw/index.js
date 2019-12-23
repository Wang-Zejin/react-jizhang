import React, { Component } from 'react';
import Axios from 'axios'
import qs from 'qs'
//需要定义baseurl
import {baseurl} from '../../../component/tools'
import rcss from './Changepsw.module.css'
import { Button, Icon } from 'antd'
import {Link} from 'react-router-dom'
import { createHashHistory } from 'history/cjs/history.min';
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
            <div className={rcss.cgpswcontainer}>
            <div className={rcss.title}>修改密码</div>
            <div className={rcss.cgpswform}>
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
            </div>
        </div>
        );
    }
}

export default Changepsw;