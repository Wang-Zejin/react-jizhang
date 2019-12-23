import React, { Component } from 'react';
import rcss from './Personlcenter.module.css'
import {Icon ,Avatar, Spin} from 'antd'
import Axios from 'axios';
import {baseurl, senddata} from '../../../component/tools'
import {Link} from 'react-router-dom'
class Personlcenter extends Component {
    constructor(props) {
        super(props);
        this.state={
            token:'',
            id:'',
            userifm:{
                mobile: "",
                nickname: "",
                avatar_url: ""
            },
            spinstatu:true
        }
    }
    getInfomation=()=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios.get(baseurl+'/api/user/profile?token='+this.state.token)
            .then((response) => {
                this.setState({
                    userifm:{...response.data.data}
                },()=>{

                    senddata(this.props,this.state.userifm);
                    this.setState({
                        spinstatu:false
                    })
                })
            }).catch((error) => {
                console.log(error);
            })}
        )
    }
    logout=()=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios.get(baseurl+'/api/user/logout?token='+this.state.token)
            .then((response) => {
                this.setState({
                    token:"",
                    id:"",
                    userifm:{...response.data.data}
                },()=>{

                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("id");
                    this.setState({
                        spinstatu:false
                    })
                    window.location.reload();

                });
                
            }).catch((error) => {
                console.log(error);
            })
        })
    }
    componentDidMount(){
        if(window.localStorage.token){
            this.setState({
                token:window.localStorage.token,
                id:window.localStorage.id
            },()=>{this.getInfomation()});
        }
    }
    render() {
        return (
            <div>
                <Spin spinning={this.state.spinstatu}>
                <div className={rcss.userinformation}>
                    <div className={rcss.useravatar}><Avatar size={100} src={this.state.userifm.avatar_url} /></div>
                    <div className={rcss.usernickname}>{this.state.userifm.nickname}</div>
                    <div className={rcss.usermobile}>手机号：{this.state.userifm.mobile}</div>
                </div>
                <div className={rcss.itemcontainer}>
                    <Link to="/app/Mine/Changeinformation"><div className={rcss.personlitem}><Icon type="home" />修改个人信息</div></Link>
                    <Link to="/app/Mine/Changemobile"><div className={rcss.personlitem}><Icon type="mobile" />修改手机号码</div></Link>
                    <Link to="/app/Mine/Changepsw"><div className={rcss.personlitem}><Icon type="safety-certificate" />修改密码</div></Link>
                    <Link to="/app/Mine/Bookmanager"><div className={rcss.personlitem}><Icon type="book" />账簿管理</div></Link>
                    <Link to="/app/Mine/Feedback"><div className={rcss.personlitem}><Icon type="message" />意见反馈</div></Link>
                    <div className={rcss.personlitem} onClick={()=>{this.logout()}} style={{color:"red"}}><Icon type="export" />退出（注销登录）</div>
                </div>
                </Spin>
            </div>
        );
    }
}

export default Personlcenter;