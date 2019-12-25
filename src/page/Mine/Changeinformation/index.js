import React, { Component } from 'react';
import Imgup from '../../../component/Imgup'
import rcss from './Changeinformation.module.css'
import { Button, Icon } from 'antd';
import{Link} from 'react-router-dom';

import { createHashHistory } from 'history/cjs/history.min';
import Axios from 'axios';
import {baseurl} from "../../../component/tools";
import qs from "qs"
import Navtop from '../../../component/Navtop';
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
        return (<div style={{paddingTop:"40px"}}>
            <Navtop tittle="修改个人信息" leftlink="/app/Mine" righticon=""></Navtop>
            <div className={rcss.container}>
                <div className={rcss.containeritem}>
                    <span>昵称：</span>
                    <input className={rcss.pswinput} type="text" value={this.state.nickname} onChange={(e)=>{
                                this.setState({
                                    nickname:e.target.value
                                })
                            }}></input>
                </div>
                <div className={rcss.containeritem}>
                    <span>上传头像</span>
                    <Imgup getSon={this.getSon}></Imgup>
                </div>
                <div className={rcss.containeritem} style={{textAlign:"center"}}>
                <Button type='primary' onClick={(e)=>{this.submit()}} style={{width:"50%"}}>确认修改</Button> 
                </div>
                {/* <div className={rcss.cgiform}>
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
                </div> */}
            </div>
            </div>
        );
    }
}

export default Changeinformation;