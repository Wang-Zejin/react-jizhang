import React, { Component } from 'react';
import { Input, Select, InputNumber, Button, Alert, Spin, message} from 'antd';
import rcss from "./createaccount.module.css";
import Axios from 'axios';
import {baseurl} from '../../../component/tools';
import qs from 'qs';
import { createHashHistory } from 'history/cjs/history.min';
import Navtop from '../../../component/Navtop';
const { Option } = Select;
const { TextArea } = Input;
class Createaccount extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:"",
            type:1,
            initial_balance:0,
            remark:"",
            sort:10,
            spinstatu:false
        }
    }
    submit=()=>{
        if(this.state.name){
            document.getElementById("errorbox").setAttribute("class",rcss.errorhidden)
            this.setState({
                spinstatu:true
            },()=>{
                Axios({
                    method: 'post',
                    url: baseurl+'/api/account/create?token='+window.localStorage.token,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: qs.stringify(this.state)
                }).then((response) => {
                    if (response.data.status ===true) {
                        message.success("创建成功")
                        this.setState({
                            spinstatu:false
                        },()=>{
                            createHashHistory().push("/app/Account")
                        })
                    } else {
                        console.log(response)
                        message.error("操作失败")
                        this.setState({
                            spinstatu:false
                        })
                    }
                });
            })
        }else{
            document.getElementById("errorbox").setAttribute("class",rcss.errorshow)
        }
    }
    render() {
        return (
            <div className={rcss.createcontainer} style={{paddingTop:"40px"}}>
                <Navtop tittle="新增账户" leftlink="/app/Account" righticon=""></Navtop>
                <Spin spinning={this.state.spinstatu}>
                    
                <div className={rcss.errorhidden} id="errorbox">
                    <Alert message="Error 账户名称不能为空" type="error" showIcon/>
                </div>
                <table style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <td colSpan="2" className={rcss.center}>
                                新建账户
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>账户名称：</td>
                            <td><Input style={{width:"90%"}} onChange={(e)=>{
                                this.setState({
                                    name:e.target.value
                                })
                            }}/></td>
                        </tr>
                        <tr>
                            <td>账户类型：</td>
                            <td>
                                <Select style={{width:"90%"}} defaultValue="1" onChange={(value)=>{
                                    this.setState({
                                        type:value
                                    })
                                }}>
                                    <Option value="1">现金</Option>
                                    <Option value="2">银行</Option>
                                    <Option value="3">支付平台</Option>
                                    <Option value="4">其他</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td>初期余额：</td>
                            <td>
                                <InputNumber style={{width:"90%"}} defaultValue={0} onChange={(value)=>{
                                    this.setState({
                                        initial_balance:value
                                    })
                                }}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">备注：</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                            <TextArea rows={4} allowClear placeholder="备注..." onChange={(e)=>{
                                this.setState({
                                    remark:e.target.value
                                })
                            }}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className={rcss.center}>
                                <Button type='primary' onClick={(e)=>{this.submit()}}>提交</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </Spin>
            </div>
        );
    }
}

export default Createaccount;