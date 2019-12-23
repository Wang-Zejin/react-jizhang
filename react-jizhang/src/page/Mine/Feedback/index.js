import React, { Component } from 'react';
import thestyle from './feedback.module.css'
import { Button, message } from 'antd';
import Axios from 'axios'
import { createHashHistory } from 'history/cjs/history.min';
import {baseurl} from '../../../component/tools'
import qs from 'qs'
import Navtop from '../../../component/Navtop'
class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state={
            content: "",
            contact: "",
            spinstatu:false
        }
    }
    submit=()=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method:"post",
                url:baseurl+"/api/feedback/add?token="+window.localStorage.token,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({content:this.state.content,contact:this.state.contact})
            }).then((response)=>{
                this.setState({
                    spinstatu:false
                },()=>{
                    if(response.data.status){
                        message.success(response.data.data)
                    }else{
                        message.error(response.data.data)
                    }
                    createHashHistory().push("/app/Mine")
                })
            }).catch((error)=>{
                console.log(error)
                this.setState({
                    spinstatu:false
                })
            })
        })
    }
    render() {
        return (
            <div style={{paddingTop:"40px"}}>
                <Navtop tittle="账簿管理" righticon="" leftlink="/app/Mine" ></Navtop>
                <div className={thestyle.container}>
                <div className={thestyle.containeritem}>
                    <span>联系方式：</span>
                    <input className={thestyle.contactinput} placeholder="请填写您的联系方式" 
                        onChange={(e)=>{
                            this.setState({
                                contact:e.target.value
                            })
                        }}
                    />
                </div>
                <div className={thestyle.containeritem}>
                    <span>您的建议：</span>
                    <textarea placeholder="请写下您的宝贵意见。" 
                        onChange={(e)=>{
                            this.setState({
                                content:e.target.value
                            })
                        }}
                    />
                </div>
                <div className={thestyle.containeritem} style={{textAlign:"center"}}>
                    <Button type="primary" onClick={()=>{
                        this.submit()
                    }}> 
                        提交
                    </Button>
                </div>
                </div>
            </div>
        );
    }
}

export default Feedback;