import React, { Component } from 'react';
import { InputNumber, Icon , Select, DatePicker, Button, message} from 'antd';
import thestyle from './recordsequel.module.css'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {baseurl} from '../../../component/tools'
import Imgupmore from '../../../component/ImgupMore'
import Navtop from '../../../component/Navtop';
import qs from 'qs'
const {Option} = Select
class Recordsequel extends Component {
    constructor(props) {
        super(props);
        this.state={
            
            record_id   :   "2661",
            money       :   "",
            account_id  :   "",
            date        :   "",
            image_keys  :   "",
            spinstatus:false,
            accountData:[]
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
    getImg=(data)=>{
        this.setState({
            image_keys:data.toString()
        })
    }
    componentDidMount(){
        this.getAccountlist()
    }
    submit=()=>{
        var submitdata ={
            record_id   :   this.state.record_id,
            money       :   this.state.money,
            account_id  :   this.state.account_id,
            date        :   this.state.date,
            image_keys  :  this.state.image_keys,
        }
        this.setState({
            spinstatus:true
        },()=>{
            Axios({
                method:"post",
                url:baseurl+"/api/record/sequel?token="+window.localStorage.token,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data:qs.stringify(submitdata)
            }).then((response)=>{
                this.setState({
                    spinstatus:false
                },()=>{
                    if(response.data.status){
                        message.success(response.data.data)
                    }else{
                        message.error(response.data.data)
                    }
                })
            }).catch((error)=>{
                this.setState({
                    spinstatus:false
                })
                console.log(error)
            })
        })
        
    }
    render() {
        var account=this.state.accountData
        return (
            <div>
                
                <Navtop tittle="后续记账" leftlink='/app/Recorddetail'></Navtop>
                <ul className={thestyle.ulstyle}>
                    <li>
                        <span>实付金额：</span>
                        <InputNumber style={{width:"60%",border:"0px"}} placeholder="请输入金额" onChange={(value)=>{
                                    this.setState({
                                        money:value
                                    })
                                }}/>
                    </li>
                    <li>
                        <span>账户名称：</span>
                        <span>
                            <Select style={{width:"60%"}} 
                                    // defaultValue={(account.length===0)?(null):(account[0].id)} 
                                    placeholder="请选择账户类型"
                                    onChange={(value)=>{
                                this.setState({
                                    account_id:value
                                })
                            }}>
                                { (account.length===0)?(null):(account.map((item)=>(
                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                )))}
                            </Select>
                        </span>
                    </li>
                    <li>
                        <span>交易日期：</span>
                        <span>
                            <DatePicker 
                                placeholder="请选择日期" 
                                onChange={(dataobj,value)=>{
                                this.setState({
                                    date:value
                                })
                            }} />
                        </span>
                    </li>
                    <li>
                        <span>上传图片：</span>
                        <span>
                            <Imgupmore getSon={this.getImg}></Imgupmore>
                        </span>
                    </li>
                    <li><Button type={"primary"} onClick={()=>{
                        this.submit()
                    }}>提交</Button></li>
                </ul>
            </div>
        );
    }
}

export default Recordsequel;