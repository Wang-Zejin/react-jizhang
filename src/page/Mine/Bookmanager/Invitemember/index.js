import React, { Component } from 'react';
import thestyle from './invitemember.module.css'
import Navtop from '../../../../component/Navtop';
import { Button, message } from 'antd';
import Axios from 'axios'
import qs from 'qs'
import {baseurl} from '../../../../component/tools'
import { createHashHistory } from 'history/cjs/history.min';
class Invitemember extends Component {
    constructor(props) {
        super(props);
        this.state={
            spinstatu:false,
            mobile:""
        }
    }
    submit=()=>{
        this.setState({

            spinstatu:true
        },()=>{
            Axios({
                method:"post",
                url:baseurl+"/api/member/add?token="+window.localStorage.token,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    
                },
                data: qs.stringify({book_id:this.props.match.params.book_id,mobile:this.state.mobile})
            }).then((response)=>{
                console.log(response.data)
                this.setState({
                    spinstatu:false
                },()=>{
                    if(response.data.status){
                        message.success(response.data.data)
                    }else{
                        message.error(response.data.data)
                    }
                    createHashHistory().push("/app/Mine/Bookmanager/bookmember/"+this.props.match.params.book_id)
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
                <Navtop tittle="邀请成员" righticon="" leftlink={"/app/Mine/Bookmanager/bookmember/"+this.props.match.params.book_id}></Navtop>
                <div className={thestyle.container}>
                    <div className={thestyle.containeritem}>
                        <span>手机号码：</span>
                        <span>
                            <input 
                                className={thestyle.mobileinput} 
                                placeholder="请输入被邀请人手机号" 
                                onChange={(e)=>{
                                    this.setState({
                                        mobile:e.target.value
                                    })
                                }}
                            />
                        </span>
                        <div className={thestyle.buttonstyle}>
                            <Button type="primary" onClick={()=>{
                                this.submit()
                            }}>
                                确认邀请
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Invitemember;