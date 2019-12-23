import React, { Component } from 'react';
import rcss from './editaccount.module.css';
import Axios from 'axios';
import {baseurl} from '../../../component/tools';
import qs from 'qs';
import { createHashHistory } from 'history/cjs/history.min';
import { Input, Select, Button, Alert, Spin} from 'antd';
import Navtop from '../../../component/Navtop';
const { Option } = Select;
const { TextArea } = Input;
class Editaccount extends Component {
    constructor(props) {
        super(props);
        this.state={
            accountdata:{
                name:"",
                type:"",
                remark:""
            },
            spinstatu:false
        }
    }
    setdefaultdata=()=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios.get(baseurl+'/api/account/detail?id='+this.props.match.params.id+'&token='+window.localStorage.token)
            .then((response) => {
                var tmpdata = this.state.accountdata
                tmpdata.name=response.data.data.name
                tmpdata.type=response.data.data.type
                tmpdata.remark=response.data.data.remark
                this.setState({
                    accountdata:{...tmpdata}
                },()=>{
                    console.log(this.state.accountdata)
                    this.setState({
                        spinstatu:false
                    })
                })
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    submit=()=>{
        if(this.state.accountdata.name){
            document.getElementById("errorbox").setAttribute("class",rcss.errorhidden)
            this.setState({
                spinstatu:true
            },()=>{
                Axios({
                    method: 'post',
                    url: baseurl+'/api/account/update?id='+this.props.match.params.id+'&token='+window.localStorage.token,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: qs.stringify(this.state.accountdata)
                }).then((response) => {
                    if (response.data.status ===true) {
                        console.log(response.data)
                        this.setState({
                            spinstatu:false
                        },()=>{
                            createHashHistory().push("/app/Account")
                        })
                    } else {
                        alert(response.data.data)
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

    componentDidMount(){
        this.setdefaultdata();
    }
    render() {
        console.log(this.state.accountdata.name)
        console.log(this.state.accountdata.type)
        console.log(this.state.accountdata.remark)
        return (
                <div className={rcss.createcontainer} style={{paddingTop:"40px"}}>
                    <Navtop tittle="修改账户" leftlink="/app/Account" righticon=""></Navtop>
                <Spin spinning={this.state.spinstatu}>
                <div className={rcss.errorhidden} id="errorbox">
                    <Alert message="Error 账户名称不能为空" type="error" showIcon/>
                </div>
                <table style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <td colSpan="2" className={rcss.center}>
                                更改账户
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>账户名称：</td>
                            <td><Input style={{width:"90%"}} value={this.state.accountdata.name} onChange={(e)=>{
                                var tmpdata = this.state.accountdata
                                tmpdata.name=e.target.value
                                this.setState({
                                    accountdata:{...tmpdata}
                                })
                            }}/></td>
                        </tr>
                        <tr>
                            <td>账户类型：</td>
                            <td>
                                <Select style={{width:"90%"}} value={this.state.accountdata.type} onChange={(value)=>{
                                    var tmpdata = this.state.accountdata
                                    tmpdata.type=value
                                    this.setState({
                                        accountdata:{...tmpdata}
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
                            <td colSpan="2">备注：</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                            <TextArea rows={4} allowClear value={this.state.accountdata.remark} onChange={(e)=>{
                                var tmpdata = this.state.accountdata
                                tmpdata.remark=e.target.value
                                this.setState({
                                    accountdata:{...tmpdata}
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

export default Editaccount;