import React, { Component } from 'react';
import Axios from 'axios'
import { baseurl } from '../../../component/tools';
import { message, Select, Radio, Button } from 'antd';
import Navtop from '../../../component/Navtop';
import Pleselogin from '../../../component/Pleselogin';
import thestyle from './recordlist.module.css'
import {Icon, DatePicker} from 'antd'
import {Link} from 'react-router-dom'
import { createHashHistory } from 'history/cjs/history.min';
const {RangePicker} = DatePicker;
const{Option} = Select
class Recordlist extends Component {
    constructor(props) {
        super(props);
        this.state={
            spinstatu:false,
            realdata:{
                begin_date  :null,
                end_date    :null,
                type        :3,
                category_id :null,
                account_id : null,
                company_name:null,
                page        :""
            },
            accountdata:{
                begin_date :null,
                end_date:null,
                type       :1,
                category_id:null,
                company_name :null,
                excel :0,
                page:1
            },
            accountres:{
                list:[]
            },
            waitingdata:{
                type        :3,
                begin_date  :null,
                end_date    :null,
                category_id :null,
                company_name:null
            },
            thestatu:1,
            categorystatu:1,
            category1list:[],
            category2list:[],
        }
    }
    getRecordReal=(params,page)=>{
        console.log(params)
        this.setState({
            spinstatu:true,
        },()=>{
            Axios({
                method:'get',
                url:baseurl+"/api/record/real?token="+window.localStorage.token,
                params:params
            }).then((response)=>{
                this.setState({
                    spinstatu:false
                })
                if(response.data.status){
                    console.log(response.data.data)
                    this.setState({
                        accountres:response.data.data
                    })
                }else{
                    message.error(response.data.data)
                }
            }).catch((error)=>{
                this.setState({
                    spinstatu:false
                })
                console.log(error)
                message.error("发生错误获取失败")
            })
        })
        
    }
    getRecordAccount=(params)=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method:'get',
                url:baseurl+"/api/record/account?token="+window.localStorage.token,
                params:params
            }).then((response)=>{
                this.setState({
                    spinstatu:false
                })
                if(response.data.status){
                    console.log(response.data.data)
                    this.setState({
                        accountres:{...response.data.data}
                    })
                }else{
                    if(response.data.data==="INVALID_TOKEN"){
                        window.localStorage.removeItem("token")
                        createHashHistory().push("/app/login")
                        message.error("登陆过期，请重新登录")
                    }else{
                        message.error(response.data.data)
                    }
                }
            }).catch((error)=>{
                this.setState({
                    spinstatu:false
                })
                console.log(error)
                message.error("发生错误获取失败")
            })
        })
    }
    getRecordWaiting=(params)=>{
        if(this.state.accountdata.type===3){
            message.error("待收待付类别选择不能为全部")
            return false
        }
        this.setState({
            spinstatu:true,

        },()=>{
            Axios({
                method:'get',
                url:baseurl+"/api/record/account/waiting?token="+window.localStorage.token,
                params:params
            }).then((response)=>{
                this.setState({
                    spinstatu:false
                })
                if(response.data.status){
                    console.log(response.data.data)
                    this.setState({
                        accountres:response.data.data
                    })
                }else{
                    message.error(response.data.data)
                }
            }).catch((error)=>{
                this.setState({
                    spinstatu:false
                })
                console.log(error)
                message.error("待收待付必须选择收支类别！")
            })
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
    componentDidMount(){
        this.getRecordAccount(this.state.accountdata)
        // this.getRecordReal({})
        // this.getRecordWaiting({type:2})
        
        this.getCategorylist({type:1,dataType:1},(response)=>{
            this.setState({
                category1list:[...response.data.data]
            },()=>{
                this.setState({spinstatu:false})
            })
        })
        this.getCategorylist({type:2,dataType:1},(response)=>{
            this.setState({
                category2list:[...response.data.data]
            },()=>{
                this.setState({spinstatu:false})
            })
        })
    }
    render() {
        if(window.localStorage.token){
            var linkbutton = null
            var accres = this.state.accountres
            var showdata = accres
            var real = this.state.realdata
            var waiting = this.state.waitingdata
            if(this.state.thestatu===1){
                linkbutton=(item)=>(
                    <Link to={{
                        pathname:"/app/Recordlist/Recorddetail",
                        id:item.id
                        }}>
                        <Button >详情</Button>
                    </Link>
                )
            }else if(this.state.thestatu===2){
                linkbutton=(item)=>(
                    <Link to={{
                        pathname:"/app/Recordlist/Recorddetail",
                        id:item.record_id
                        }}>
                        <Button >详情</Button>
                    </Link>
                )
            }else if(this.state.thestatu===3){
                linkbutton=(item)=>(
                    <Link to={{
                        pathname:"/app/Recordlist/Recorddetail",
                        id:item.id
                        }}>
                        <Button >详情</Button>
                    </Link>
                )
            }else{
                showdata=accres
            }
            var categoryitem;
            if(this.state.accountdata.type===1){
                categoryitem=( <Select style={{width:"90%"}} 
                                            defaultValue={null} 
                                            onChange={(value)=>{
                                                var tmpdata=this.state.accountdata
                                                tmpdata.category_id=value
                                                this.setState({
                                                    accountdata:tmpdata
                                                },()=>{this.getRecordAccount(this.state.accountdata)})
                                        }}>
                                            <Option value={null}>全部</Option>
                                            {this.state.category1list.map((item)=>{
                                                return <Option value={item.id} key={"cg"+item.id}>{item.name}</Option>
                                            })}
                                        </Select>)
            }else if (this.state.accountdata.type===2){
                categoryitem = (
                <Select style={{width:"90%"}} 
                    value={this.state.accountdata.category_id}
                    onChange={(value)=>{
                        var tmpdata=this.state.accountdata
                        tmpdata.category_id=value
                        this.setState({
                            accountdata:tmpdata
                        },()=>{this.getRecordAccount(this.state.accountdata)})
                }}>
                    <Option value={null}>全部</Option>
                    {this.state.category2list.map((item)=>{
                        return <Option value={item.id} key={item.id}>{item.name}</Option>
                    })}
                </Select>
                )
            }else{
                    categoryitem = (<Select style={{width:"90%"}} 
                    disabled 
                    value={this.state.accountdata.category_id} 
                    onChange={(value)=>{
                        var tmpdata=this.state.accountdata
                        tmpdata.category_id=value
                        this.setState({
                            accountdata:tmpdata
                        },()=>{this.getRecordAccount(this.state.accountdata)})
                }}>
                    <Option value={null}>全部</Option>
                    {this.state.category2list.map((item)=>{
                        return <Option value={item.id} key={item.id}>{item.name}</Option>
                    })}
                </Select>)
                
            }

            var detailtitle=null
            if(this.state.thestatu===1){
                detailtitle=(
                <div className={thestyle.container}>
                    <div className={thestyle.containeritem}>
                        总收入：{showdata.in}
                    </div>
                    <div className={thestyle.containeritem}>
                        总支出：{showdata.out}
                    </div>
                </div>)
            }else if(this.state.thestatu===2){
                detailtitle=(
                    <div className={thestyle.container}>
                        <div className={thestyle.containeritem}>
                            总收入：{showdata.in}
                        </div>
                        <div className={thestyle.containeritem}>
                            总支出：{showdata.out}
                        </div>
                    </div>)
            }else if(this.state.thestatu===3){
                detailtitle=(
                    <div className={thestyle.container}>
                        <div className={thestyle.containeritem}>
                            总计：{showdata.total}
                        </div>
                    </div>)
            }else{
                detailtitle=(
                    <div className={thestyle.container}>
                        <div className={thestyle.containeritem}>
                            总收入：{showdata.in}
                        </div>
                        <div className={thestyle.containeritem}>
                            总支出：{showdata.out}
                        </div>
                    </div>)
            }
            
            var detailshow=null
            if(this.state.thestatu===1){
                detailshow=(item)=>(
                    <div className={thestyle.container}>
                        <div className={thestyle.containeritem}>
                            日期：{item.date}
                            账面金额：{item.total_money}
                            <Link to={{
                                pathname:"/app/Recordlist/Recorddetail",
                                id:item.id
                                }}>
                                <Button >详情</Button>
                            </Link>
                        </div>
                    </div>
                )
            }else if(this.state.thestatu===2){
                detailshow=(item)=>(
                    <div className={thestyle.container}>
                        <div className={thestyle.containeritem}>
                            日期：{item.date}
                            金额：{item.money}
                            <Link to={{
                                pathname:"/app/Recordlist/Recorddetail",
                                id:item.record_id
                                }}>
                                <Button >详情</Button>
                            </Link>
                        </div>
                    </div>
                )
            }else if(this.state.thestatu===3){
                detailshow=(item)=>(
                    <div className={thestyle.container}>
                        <div className={thestyle.containeritem}>
                            日期：{item.date}
                            金额：{item.total_money-item.paid_money}
                            <Link to={{
                                pathname:"/app/Recordlist/Recorddetail",
                                id:item.id
                                }}>
                                <Button >详情</Button>
                            </Link>
                        </div>
                    </div>
                )
            }else{
                detailshow=(item)=>(
                    <div className={thestyle.container}>
                        <div className={thestyle.containeritem}>
                            日期：{item.date}
                            金额：{item.total_money}
                        </div>
                    </div>
                )
            }

            return (
                <div style={{paddingTop:"40px"}}>
                    <Navtop tittle={"账面明细"} righticon="" lefticon=""></Navtop>
                    <div className={thestyle.container}>
                        <div className={thestyle.containeritem}>
                            <span>筛选</span>
                            <div 
                                    style={{float:"right"}} 
                                    id={"down"}
                                    onClick={()=>{
                                        var down = document.getElementById("down")
                                        var up = document.getElementById("up")
                                        var detail = document.getElementById("shaixuan")
                                        if(detail.style.height===detail.scrollHeight+"px"){
                                            detail.style.height="0px"
                                        }else{
                                            detail.style.height=detail.scrollHeight+"px"
                                        }
                                        down.setAttribute("style","float:right;display:none")
                                        up.setAttribute("style","float:right")
                                    }}
                                >
                                    <Icon type="down" />
                                </div>
                                <div 
                                    style={{float:"right",display:"none"}} 
                                    id={"up"} 
                                    onClick={()=>{
                                        var down = document.getElementById("down")
                                        var up = document.getElementById("up")
                                        var detail = document.getElementById("shaixuan")
                                        if(detail.style.height===detail.scrollHeight+"px"){
                                            detail.style.height="0px"
                                        }else{
                                            detail.style.height=detail.scrollHeight+"px"
                                        }
                                        up.setAttribute("style","float:right;display:none")
                                        down.setAttribute("style","float:right")
                                    }}
                                >
                                    <Icon type="up" />
                                </div>
                            <div className={thestyle.shaixuan} id={"shaixuan"}>
                                <div className={thestyle.shaixuanitem}>
                                    记账类别
                                    <Radio.Group onChange={(e)=>{
                                            this.setState({
                                                thestatu:e.target.value
                                            },()=>{
                                                if(this.state.thestatu===1){
                                                    this.getRecordAccount(this.state.accountdata)
                                                }else if(this.state.thestatu===2){
                                                    this.getRecordReal(this.state.accountdata)
                                                }else if(this.state.thestatu===3){
                                                    this.getRecordWaiting(this.state.accountdata)
                                                }else{
                                                    this.getRecordAccount(this.state.accountdata)
                                                }
                                            })
                                        }} value={this.state.thestatu}>
                                            <Radio value={1}>账面记录</Radio>
                                            <Radio value={2}>已收已付</Radio>
                                            <Radio value={3}>待收待付</Radio>
                                        </Radio.Group>
                                </div>
                                <div className={thestyle.shaixuanitem}>
                                    <span>开始日期：</span>
                                    <DatePicker onChange={(dateobj,date)=>{
                                        var tmpdata = this.state.accountdata
                                        tmpdata.begin_date=date
                                        this.setState({
                                            accountdata:tmpdata
                                        },()=>{
                                            if(this.state.thestatu===1){
                                                this.getRecordAccount(this.state.accountdata)
                                            }else if(this.state.thestatu===2){
                                                this.getRecordReal(this.state.accountdata)
                                            }else if(this.state.thestatu===3){
                                                this.getRecordWaiting(this.state.accountdata)
                                            }else{
                                                this.getRecordAccount(this.state.accountdata)
                                            }
                                        })
                                    }} />
                                </div>
                                <div className={thestyle.shaixuanitem}>
                                    <span>结束日期：</span>
                                    <DatePicker onChange={(dateobj,date)=>{
                                        var tmpdata = this.state.accountdata
                                        tmpdata.begin_date=date
                                        this.setState({
                                            accountdata:tmpdata
                                        },()=>{
                                            if(this.state.thestatu===1){
                                                this.getRecordAccount(this.state.accountdata)
                                            }else if(this.state.thestatu===2){
                                                this.getRecordReal(this.state.accountdata)
                                            }else if(this.state.thestatu===3){
                                                this.getRecordWaiting(this.state.accountdata)
                                            }else{
                                                this.getRecordAccount(this.state.accountdata)
                                            }
                                        })
                                    }} />
                                </div>
                                
                                <div className={thestyle.shaixuanitem}>
                                    <span>收支类别：</span>
                                    <span>
                                        <Radio.Group size="large" onChange={(e)=>{
                                            var detail = document.getElementById("shaixuan")
                                            detail.style.height=detail.scrollHeight+"px"
                                            console.log(detail.scrollHeight+"px")
                                            if(e.target.value===3){
                                                var tmpdata=this.state.accountdata
                                                tmpdata.category_id=null
                                                tmpdata.type=e.target.value
                                                this.setState({
                                                    accountdata:tmpdata
                                                },()=>{
                                                    if(this.state.thestatu===1){
                                                        this.getRecordAccount(this.state.accountdata)
                                                    }else if(this.state.thestatu===2){
                                                        this.getRecordReal(this.state.accountdata)
                                                    }else if(this.state.thestatu===3){
                                                        this.getRecordWaiting(this.state.accountdata)
                                                    }else{
                                                        this.getRecordAccount(this.state.accountdata)
                                                    }
                                                })
                                            }else{
                                                var tmpdata=this.state.accountdata
                                                tmpdata.type=e.target.value
                                                this.setState({
                                                    accountdata:tmpdata
                                                },()=>{
                                                    if(this.state.thestatu===1){
                                                        this.getRecordAccount(this.state.accountdata)
                                                    }else if(this.state.thestatu===2){
                                                        this.getRecordReal(this.state.accountdata)
                                                    }else if(this.state.thestatu===3){
                                                        this.getRecordWaiting(this.state.accountdata)
                                                    }else{
                                                        this.getRecordAccount(this.state.accountdata)
                                                    }
                                                })
                                            }
                                            
                                        }} value={this.state.accountdata.type}>
                                            <Radio value={1}>收入</Radio>
                                            <Radio value={2}>支出</Radio>
                                            <Radio value={3}>全部</Radio>
                                        </Radio.Group>
                                    </span>
                                </div>
                                <div>
                                    <span>                 
                                    {categoryitem}
                                    </span>
                                </div>
                                <div className={thestyle.shaixuanitem}>
                                    <span>交易对象：</span>
                                    <input 
                                        placeholder={"请输入交易对象"} 
                                        style={{border:"1px solid #cfcfcf",backgroundColor:"#fff"}}
                                        onChange={(e)=>{
                                            var tmpdata = this.state.accountdata
                                            tmpdata.company_name=e.target.value
                                            this.setState({
                                                accountdata:tmpdata
                                            },()=>{
                                                if(this.state.thestatu===1){
                                                    this.getRecordAccount(this.state.accountdata)
                                                }else if(this.state.thestatu===2){
                                                    this.getRecordReal(this.state.accountdata)
                                                }else if(this.state.thestatu===3){
                                                    this.getRecordWaiting(this.state.accountdata)
                                                }else{
                                                    this.getRecordAccount(this.state.accountdata)
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={thestyle.containertittle}>
                        <span>总收支：</span>
                    </div>
                    {/* <div className={thestyle.container}>
                        <div className={thestyle.containeritem}>
                            总收入：{showdata.in}
                        </div>
                        <div className={thestyle.containeritem}>
                            总支出：{showdata.out}
                        </div>
                    </div> */}
                    {detailtitle}
                    <div className={thestyle.containertittle}>
                        <span>明细：</span>
                    </div>
                    {(showdata.list.length===0)?
                        (<div className={thestyle.containertittle}>
                            <span>无明细</span>
                        </div>):
                        (showdata.list.map((item,index)=>(
                            <div key={index}>
                            {/* <div className={thestyle.container}>
                                <div className={thestyle.containeritem}>
                                    账面金额：{item.total_money}
                                </div>
                                <div className={thestyle.containeritem}>
                                    实际金额：{item.paid_money}
                                </div>
                                <div className={thestyle.containeritem}>
                                    交易人：{item.company_name}
                                </div>
                                <div className={thestyle.containeritem}>
                                    日期：{item.date}
                                </div>
                                <div className={thestyle.containeritem}>
                                    {linkbutton(item)}
                                </div>
                            </div> */}
                            {detailshow(item)}
                            </div>
                        )))
                    }
                </div>
            );
        }else{
            return <Pleselogin></Pleselogin>
        }
    }
}

export default Recordlist;