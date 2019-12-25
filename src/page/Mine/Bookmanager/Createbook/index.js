import React, { Component } from 'react';
import Navtop from '../../../../component/Navtop';
import thestyle from './createbook.module.css'
import { Button , message, Spin} from 'antd';
import Axios from 'axios'
import {baseurl} from '../../../../component/tools'
import { createHashHistory } from 'history/cjs/history.min';
class index extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:"",
            spinstatu:false
        }

    }
    submit=()=>{
        this.setState({
            spinstatus:true
        },()=>{
            Axios({
                method:"post",
                url:baseurl+"/api/book/create?token="+window.localStorage.token,
                params:{name:this.state.name}
            }).then((response)=>{
                console.log(response)
                if(response.data.status){
                    message.success("提交成功")
                    createHashHistory().push("/app/Mine/Bookmanager")
                }else{
                    message.error(response.data.data)
                }
            }).catch((error)=>{
                console.log(error)
            })
        })
    }
    render() {
        return (
            <div style={{paddingTop:"10px"}}>
                
                <Navtop tittle="新建账簿" righticon="" leftlink="/app/Mine/Bookmanager"></Navtop>
                <Spin spinning={this.state.spinstatu}>
                <div className={thestyle.container}>
                    <div className={thestyle.inputbox}>
                        <span>账簿名：</span>
                        <input 
                            className={thestyle.nameinput}
                            placeholder="请填写账簿名" 
                            onChange={(e)=>{
                                this.setState({
                                    name:e.target.value
                                })
                            }}
                        />
                    </div>
                    <div style={{textAlign:"center",paddingTop:"5px"}}><Button type="primary" onClick={()=>{
                        this.submit()
                    }}>提交</Button></div>
                </div>
                </Spin>
            </div>
        );
    }
}

export default index;