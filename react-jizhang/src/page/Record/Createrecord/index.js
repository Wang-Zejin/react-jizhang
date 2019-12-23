import React, { Component } from 'react';
import { InputNumber ,Select, DatePicker, Alert ,Spin, Button,Input, Radio} from 'antd';
import Axios from 'axios'
import {baseurl} from '../../../component/tools'
import rcss from './createrecord.module.css'
import Imgupmore from '../../../component/ImgupMore'
import qs from 'qs'
import Navtop from '../../../component/Navtop'
const { Option } = Select;
const { TextArea } = Input;
class Createreacord extends Component {
    constructor(props) {
        super(props);
        this.state={
            total_money:    "",
            money  :        "",
            account_id :    "",
            category_id   : "",
            date      :     "",
            company_name :  "", 
            remark :"",
            image_keys  :   "",
            spinstatu:false,
            accountData:[],
            categorystatu:1,
            category:[
                {
                    value:"收入",
                    label:"shouru",
                    children:[]
                },
                {
                    value:"支出",
                    label:"zhichu",
                    children:[]
                }
            ],
            category1list:[],
            category2list:[],
        }
    }
    
    getAccountlist=()=>{
        this.setState({
            spinstatu:true
        })
        Axios.get(baseurl+'/api/account?token='+window.localStorage.token)
        .then((response) => {
            this.setState({
                accountData:response.data.data
            },()=>{
                console.log(this.state.accountData)
                this.setState({
                    spinstatu:false
                })
            })
        }).catch((error) => {
            console.log(error);
        })
    }
    getCategorylist=(whichrecord,callback)=>{
        
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method: 'get',
                url: baseurl+'/api/category?token='+window.localStorage.token,
                params: whichrecord
            }).then((response) => {
                this.setState({spinstatu:false})
                callback(response)
            }).catch((error)=>{
                this.setState({spinstatu:false})
                console.log(error)
            });
        })
    
    }
    getImg=(data)=>{
        this.setState({
            image_keys:data.toString()
        },()=>{
            // console.log(data)
            // console.log(this.state.image_keys)
        })
    }
    subToChildren=(data)=>{
        data.map((item)=>{
            item.value=item.name
            item.key=item.id
            item.children=item.sub
            if(item.children.length!==0){
                this.subToChildren(item.children)
            }
        })
    }
    submit=()=>{
        var totalerrorbox = document.getElementById("totalerrorbox")
        var moneyerrorbox=document.getElementById("moneyerrorbox")
        var accounterrorbox=document.getElementById("accounterrorbox")
        var categoryerrorbox=document.getElementById("categoryerrorbox")
        var dateerrorbox = document.getElementById("dateerrorbox")
        if(this.state.total_money===null){
            totalerrorbox.setAttribute("class",rcss.errorshow)
            moneyerrorbox.setAttribute("class",rcss.errorhidden)
            accounterrorbox.setAttribute("class",rcss.errorhidden)
            categoryerrorbox.setAttribute("class",rcss.errorhidden)
            dateerrorbox.setAttribute("class",rcss.errorhidden)
        }else if(this.state.money===null){
            totalerrorbox.setAttribute("class",rcss.errorhidden)
            moneyerrorbox.setAttribute("class",rcss.errorshow)
            accounterrorbox.setAttribute("class",rcss.errorhidden)
            categoryerrorbox.setAttribute("class",rcss.errorhidden)
            dateerrorbox.setAttribute("class",rcss.errorhidden)
        }else if(this.state.account_id===""){
            totalerrorbox.setAttribute("class",rcss.errorhidden)
            moneyerrorbox.setAttribute("class",rcss.errorhidden)
            accounterrorbox.setAttribute("class",rcss.errorshow)
            categoryerrorbox.setAttribute("class",rcss.errorhidden)
            dateerrorbox.setAttribute("class",rcss.errorhidden)
        }else if(this.state.category_id===""){
            totalerrorbox.setAttribute("class",rcss.errorhidden)
            moneyerrorbox.setAttribute("class",rcss.errorhidden)
            accounterrorbox.setAttribute("class",rcss.errorhidden)
            categoryerrorbox.setAttribute("class",rcss.errorshow)
            dateerrorbox.setAttribute("class",rcss.errorhidden)
        }else if(this.state.date===""){
            totalerrorbox.setAttribute("class",rcss.errorhidden)
            moneyerrorbox.setAttribute("class",rcss.errorhidden)
            accounterrorbox.setAttribute("class",rcss.errorhidden)
            categoryerrorbox.setAttribute("class",rcss.errorhidden)
            dateerrorbox.setAttribute("class",rcss.errorshow)
        }else{
            totalerrorbox.setAttribute("class",rcss.errorhidden)
            moneyerrorbox.setAttribute("class",rcss.errorhidden)
            accounterrorbox.setAttribute("class",rcss.errorhidden)
            categoryerrorbox.setAttribute("class",rcss.errorhidden)
            dateerrorbox.setAttribute("class",rcss.errorhidden)
            var thedata = {
                total_money:    this.state.total_money,
                money  :        this.state.money,
                account_id :    this.state.account_id,
                category_id   :this.state.category_id,
                date      :     this.state.date,
                company_name :  this.state.company_name, 
                remark :this.state.remark,
                image_keys  :   this.state.image_keys,
            }
            this.setState({
                spinstatu:true
            },()=>{
                Axios({
                    method: 'post',
                    url: baseurl+'/api/record/create?token='+window.localStorage.token,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: qs.stringify(thedata)
                }).then((response) => {
                    if (response.data.status ===true) {
                        console.log(response.data)
                        this.setState({
                            spinstatu:false
                        },()=>{
                           
                        })
                    } else {
                        alert(response.data.data)
                        this.setState({
                            spinstatu:false
                        })
                    }
                });
            })
        }
        
    }
    componentDidMount(){
        this.getAccountlist()
        this.getCategorylist({type:1,dataType:1},(response)=>{
            this.setState({
                category1list:response.data.data
            },()=>{
                this.setState({spinstatu:false})
            })
        })
        this.getCategorylist({type:2,dataType:1},(response)=>{
            this.setState({
                category2list:response.data.data
            },()=>{
                this.setState({spinstatu:false})
            })
        })
    }
    render() {
        let account = this.state.accountData
        let category=this.state.category2list.concat(this.state.category1list)
        
        return (
            <div className={rcss.createcontainer} style={{paddingTop:"40px"}}>
                <Navtop tittle="记一笔" lefticon="" rightlink="/app/Record/categorylist" righticon="appstore"></Navtop>
                <Spin spinning={this.state.spinstatu}>
                <div className={rcss.errorhidden} id="totalerrorbox">
                    <Alert message="Error 记账金额不能为空" type="error" showIcon/>
                </div>
                <div className={rcss.errorhidden} id="moneyerrorbox">
                    <Alert message="Error 实付金额不能为空" type="error" showIcon/>
                </div>
                <div className={rcss.errorhidden} id="accounterrorbox">
                    <Alert message="Error 账户名称不能为空" type="error" showIcon/>
                </div>
                <div className={rcss.errorhidden} id="categoryerrorbox">
                    <Alert message="Error 收支类型不能为空" type="error" showIcon/>
                </div>
                <div className={rcss.errorhidden} id="dateerrorbox">
                    <Alert message="Error 日期不能为空" type="error" showIcon/>
                </div>
                <table style={{width:"100%"}}>
                    <tbody>
                        <tr>
                            <td>记账金额：</td>
                            <td><InputNumber style={{width:"90%"}} defaultValue={0} onChange={(value)=>{
                                    this.setState({
                                        total_money:value
                                    })
                                }}/></td>
                        </tr>
                        <tr>
                            <td>实付金额：</td>
                            <td><InputNumber style={{width:"90%"}} defaultValue={0} onChange={(value)=>{
                                    this.setState({
                                        money:value
                                    })
                                }}/></td>
                        </tr>
                        <tr>
                            <td>账户类型：</td>
                            <td>
                                <Select style={{width:"90%"}} 
                                     defaultValue={(account.length===0)?(null):(account[0].id)} 
                                     onChange={(value)=>{
                                    this.setState({
                                        account_id:value
                                    })
                                }}>
                                   { (account.length===0)?(null):(account.map((item)=>(
                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                   )))}
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td>收支类别：</td>
                            <td>
                                <Radio.Group onChange={(e)=>{
                                    this.setState({
                                        categorystatu:e.target.value
                                    })
                                }} value={this.state.categorystatu}>
                                    <Radio value={1}>收入</Radio>
                                    <Radio value={2}>支出</Radio>
                                </Radio.Group>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">                 
                            {(this.state.categorystatu===1)?
                                (<Select style={{width:"90%"}} 
                                     defaultValue={(this.state.category1list.length===0)?(null):(this.state.category1list[0].id)} 
                                     onChange={(value)=>{
                                        this.setState({
                                            category_id:value
                                        })
                                }}>
                                    {this.state.category1list.map((item)=>{
                                        return <Option value={item.id} key={item.id}>{item.name}</Option>
                                    })}
                                </Select>):
                                (<Select style={{width:"90%"}} 
                                     defaultValue={(this.state.category1list.length===0)?(null):(this.state.category2list[0].id)} 
                                     onChange={(value)=>{
                                        this.setState({
                                            category_id:value
                                        })
                                }}>
                                    {this.state.category2list.map((item)=>{
                                        return <Option value={item.id} key={item.id}>{item.name}</Option>
                                    })}
                                </Select>)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>日期：</td>
                            <td>
                            <DatePicker onChange={(dataobj,value)=>{
                                this.setState({
                                    date:value
                                })
                            }} />
                            </td>
                        </tr>
                        <tr>
                            <td>交易对象：</td>
                            <td><Input style={{width:"90%"}} onChange={(e)=>{
                                this.setState({
                                    company_name:e.target.value
                                })
                            }}/></td>
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
                            <td>上传图片：</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><Imgupmore getSon={this.getImg}></Imgupmore></td>
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

export default Createreacord;