import React, { Component } from 'react';
import Imgup from '../../../component/Imgup'
import rcss from './Changeinformation.module.css'
import { Button, Icon } from 'antd';
import{Link} from 'react-router-dom';

import { createHashHistory } from 'history/cjs/history.min';
import Axios from 'axios';
import {baseurl} from "../../../component/tools";
import qs from "qs"
class Changeinformation extends Component {
    constructor(props) {
        super(props);
        this.state={
            nickname:"",
            avatar:""
        }
    }
    getSon=(data)=>{
        // console.log(data.file.fileKey)
        this.setState({
            avatar:data.file.fileKey
        })
    }
    submit=()=>{
        Axios({
            method: 'post',
            url: baseurl+'/api/user/profile/update?token='+window.localStorage.token,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify(this.state)
        }).then((response) => {
            if (response.data.status ===true) {
                // console.log(response.data.data);
                createHashHistory().push("/app/Mine")
            } else {
                alert(response.data.data)
            }
        });
    }
    componentDidMount(){
        // console.log(this.props);
        this.setState({
            nickname:this.props.userifm.nickname
        })
    }
    render() {
        return (
            <div className={rcss.cgicontainer}>
                <div className={rcss.title}>修改个人信息</div>
                <div className={rcss.cgiform}>
                    <table>
                        <tbody>
                            <tr><td>点击上传头像：</td></tr>
                            <tr><td><Imgup getSon={this.getSon}></Imgup></td></tr>
                            <tr><td>昵称：</td></tr>
                            <tr><td><input type="text" value={this.state.nickname} onChange={(e)=>{
                                this.setState({
                                    nickname:e.target.value
                                })
                            }}></input></td></tr>
                            <tr><td colSpan='2' className={rcss.submit}>
                                <Button type='primary' onClick={(e)=>{this.submit()}}>确认修改</Button>   
                                <Link to='/app/Mine'><Button type='link'>返回<Icon type='arrow-left'></Icon> </Button></Link>
                            </td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Changeinformation;