import React, { Component } from 'react';
import Axios from 'axios'
import thestyle from './recorditemdetail.module.css'
import { baseurl } from '../../../component/tools';
import {Icon, DatePicker, Select, InputNumber} from 'antd'
import moment from 'moment';
import Imgupmore from '../../../component/ImgupMore';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Navtop from '../../../component/Navtop';
const {Option} = Select
class Recorditemdetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:{
                type:null,
                user_id:null,
                user_nickname:"",
                total_money:null,
                paid_money:null,
                category_name:"",
                company_name:"",
                remark:"",
                created_at:"",
                updated_at:"",
                items:[]
            },
            spinstatus:false,
            accountData:[]
        }
    }
    getRecordItemDetail=()=>{
        console.log(this.props.location.id)
        Axios({
            methos:"get",
            url:baseurl+"/api/record/detail?id="+this.props.location.id+"&token="+window.localStorage.token
        }).then((response)=>{
            this.setState({
                data:response.data.data
            },()=>{
                console.log(this.state.data)
            })
        })
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
    componentDidMount(){
        this.getRecordItemDetail()
        this.getAccountlist()
    }
    itemShow=(data)=>{
        var boxhidden = document.getElementsByClassName(thestyle.boxhidden)
        
        for(var i = 0;i<boxhidden.length;i++){
            console.log(boxhidden[i].style.height)
            if(boxhidden[i].style.height===boxhidden[i].scrollHeight+"px"){
                boxhidden[i].style.height="0px"
            }else{
                boxhidden[i].style.height=boxhidden[i].scrollHeight+"px"
                
            }
        }
        
    }
    editrecord=(inputid,editid,uploadid)=>{
        var theinput = document.getElementById(inputid)
        var theedit = document.getElementById(editid)
        var theupload = document.getElementById(uploadid)
        console.log(theinput)
        theinput.removeAttribute("disabled")
        theinput.focus()
        theedit.setAttribute("style","display:none")
        theupload.removeAttribute("style")
    }
    uploadrecord=(inputid,editid,uploadid,params)=>{
        var theinput = document.getElementById(inputid)
        var theedit = document.getElementById(editid)
        var theupload = document.getElementById(uploadid)
        theinput.setAttribute("disabled",true)
        theupload.setAttribute("style","display:none")
        theedit.removeAttribute("style")
        this.setState({
            spinstatus:true
        },()=>{
            Axios({
                method:"post",
                url:baseurl+"/api/record/update?id="+this.props.location.id+"&token="+window.localStorage.token,
                params:params
            }).then((response)=>{
                console.log(response)
                this.setState({
                    spinstatus:false
                })
            }).catch((error)=>{
                console.log(error)
            })
        })
    }
    edititem=(element,inputid,editid,uploadid)=>{
        var theaname = document.getElementById(element)
        var theinput = document.getElementById(inputid)
        var theedit = document.getElementById(editid)
        var theupload = document.getElementById(uploadid)
        console.log(theinput)
        theaname.setAttribute("style","display:none")
        theinput.removeAttribute("style")
        theinput.focus()
        theedit.setAttribute("style","display:none")
        theupload.removeAttribute("style")
    }
    uploaditem=(element,inputid,editid,uploadid,itemid,params)=>{
        var theaname = document.getElementById(element)
        var theinput = document.getElementById(inputid)
        var theedit = document.getElementById(editid)
        var theupload = document.getElementById(uploadid)
        theaname.removeAttribute("style")
        theinput.setAttribute("style","display:none")
        theedit.removeAttribute("style")
        theupload.setAttribute("style","display:none")
        this.setState({
            spinstatus:true
        },()=>{
            Axios({
                method:"post",
                url:baseurl+"/api/record/item/update?itemId="+itemid+"&token="+window.localStorage.token,
                params:params
            }).then((response)=>{
                console.log(response)
                this.setState({
                    spinstatus:false
                })
            }).catch((error)=>{
                console.log(error)
            })
        })
    }

    render() {
        let account = this.state.accountData
        var type = null;
        if(this.state.data.type===1){
            type="收入"
        }else if(this.state.data.type===2){
            type="支出"
        }else{
            type="未定义"
        }
        return (
            <div>
                <Navtop tittle="账面详情" rightlink="/app/Recorddetail/recordsequel" leftlink="/app/Recordlist"></Navtop>

                
                <ul className={thestyle.ulstyle}>
                    <li><span>记账人：</span>{this.state.data.user_nickname}</li>
                    <li>
                        <span>交易对象：</span>
                        <input 
                            value={this.state.data.company_name===null?"空":this.state.data.company_name} 
                            disabled 
                            style={{backgroundColor:"#fff",border:"0px"}} 
                            id="cnameinput" 
                            onChange={(e)=>{
                                var tmpdata = this.state.data
                                tmpdata.company_name=e.target.value
                                this.setState({
                                    data:{...tmpdata}
                                })
                            }}
                        />
                        <span id="cnameedit" onClick={()=>{
                            this.editrecord("cnameinput","cnameedit","cnameupload")
                        }}>
                            <Icon type="edit" />
                        </span>
                        <span id="cnameupload" style={{display:"none"}} onClick={()=>{
                            this.uploadrecord("cnameinput","cnameedit","cnameupload",{company_name:this.state.data.company_name})
                        }}><Icon type="upload" /></span>
                    </li>
                    <li><span>收入/支出：</span>{type}</li>
                    <li><span>收支类别：</span>{this.state.data.category_name}</li>
                    <li>
                        <span>账面金额：</span>
                        <input 
                            value={(this.state.data.total_money===null)?(0):(this.state.data.total_money)} 
                            disabled 
                            style={{backgroundColor:"#fff",border:"0px"}}
                            id="tmoneyinput" 
                            onChange={(e)=>{
                                var tmpdata = this.state.data
                                tmpdata.total_money=e.target.value
                                this.setState({
                                    data:{...tmpdata}
                                })
                            }}
                        />
                        <span id="tmoneyedit" onClick={()=>{
                            this.editrecord("tmoneyinput","tmoneyedit","tmoneyupload")
                        }}>
                            <Icon type="edit" />
                        </span>
                        <span id="tmoneyupload" style={{display:"none"}} onClick={()=>{
                            this.uploadrecord("tmoneyinput","tmoneyedit","tmoneyupload",{total_money:this.state.data.total_money})
                        }}>
                            <Icon type="upload" />
                        </span>
                    </li>
                    <li><span>实际金额：</span>{this.state.data.paid_money}</li>
                    <li><span>创建时间：</span>{this.state.data.created_at}</li>
                    <li><span>更新时间：</span>{this.state.data.updated_at}</li>
                    <li>
                        <span>备注：</span>
                        <textarea 
                            value={this.state.data.remark===null?"空":this.state.data.remark} 
                            disabled 
                            style={{backgroundColor:"#fff"}} 
                            id="remarkinput" 
                            onChange={(e)=>{
                                var tmpdata = this.state.data
                                tmpdata.remark=e.target.value
                                this.setState({
                                    data:{...tmpdata}
                                })
                            }}
                        />
                        <span id="remarkedit"
                            onClick={()=>{
                                this.editrecord("remarkinput","remarkedit","remarkupload")
                            }}
                        >
                            <Icon type="edit" />
                        </span>
                        <span 
                            style={{display:"none"}} 
                            id="remarkupload" 
                            onClick={()=>{
                                this.uploadrecord("remarkinput","remarkedit","remarkupload",{remark:this.state.data.remark})
                            }}
                        ><Icon type="upload" /></span>
                    </li>
                    <li onClick={()=>{this.itemShow(this.state.data)}}><span>交易明细<Icon type="down" /></span></li>
                </ul>
                {this.state.data.items.map((item)=>{
                    return (<div key = {item.id} className={thestyle.boxhidden}>
                        <ul className={thestyle.ulstyle}>
                            <li><span>记录日期：</span>{item.created_at}
                            </li>
                            <li><span>交易日期：</span><span id={item.id+"date"}>{item.date}</span>
                                <DatePicker 
                                    defaultValue={moment(item.date,'YYYY-MM-DD')} 
                                    style={{display:"none"}}
                                    id={item.id+"dateinput"} 
                                    onChange={(date,dateString)=>{
                                        item.date=dateString
                                    }}
                                />
                                <span id={item.id+"dateedit"} onClick={()=>{
                                    this.edititem(
                                        item.id+"date",
                                        item.id+"dateinput",
                                        item.id+"dateedit",
                                        item.id+"dateupload"
                                    )
                                }}>
                                    <Icon type="edit" />
                                </span>
                                <span id={item.id+"dateupload"} style={{display:"none"}} onClick={()=>{
                                    this.uploaditem(
                                        item.id+"date",
                                        item.id+"dateinput",
                                        item.id+"dateedit",
                                        item.id+"dateupload",
                                        item.id,
                                        {date:item.date}
                                    )
                                }}>
                                    <Icon type="upload" />
                                </span>
                            </li>
                            <li><span>账户名称：</span><span id={item.id+"aname"}>{item.account_name}</span>
                                <Select style={{display:"none"}} 
                                     className={thestyle.accselect}
                                     id={item.id+"anameinput"} 
                                     defaultValue={item.account_id} 
                                     onChange={(value,option)=>{
                                         item.account_name=option.props.children
                                         item.account_id=value
                                }}>
                                   { (account.length===0)?(null):(account.map((accitem)=>(
                                        <Option value={accitem.id} key={accitem.id}>{accitem.name}</Option>
                                   )))}
                                </Select>
                                <span id={item.id+"anameedit"} onClick={()=>{
                                    this.edititem(
                                        item.id+"aname",
                                        item.id+"anameinput",
                                        item.id+"anameedit",
                                        item.id+"anameupload"
                                    )
                                }}>
                                    <Icon type="edit" />
                                </span>
                                <span id={item.id+"anameupload"} style={{display:"none"}} onClick={()=>{
                                    this.uploaditem(
                                        item.id+"aname",
                                        item.id+"anameinput",
                                        item.id+"anameedit",
                                        item.id+"anameupload",
                                        item.id,
                                        {account_id:item.account_id}
                                    )
                                }}><Icon type="upload" /></span>
                            </li>
                            <li><span>金额：</span><span id={item.id+"money"}>{item.money}</span>
                                <InputNumber 
                                    className={thestyle.accselect} 
                                    style={{display:"none"}} 
                                    defaultValue={item.money} 
                                    id={item.id+"moneyinput"}
                                    onChange={(value)=>{
                                        item.money=value
                                }}/>
                                <span id={item.id+"moneyedit"} onClick={()=>{
                                    var theaname = document.getElementById(item.id+"money")
                                    var theinput = document.getElementById(item.id+"moneyinput")
                                    var theedit = document.getElementById(item.id+"moneyedit")
                                    var theupload = document.getElementById(item.id+"moneyupload")
                                    console.log(theinput)
                                    theaname.setAttribute("style","display:none")
                                    theinput.parentElement.parentElement.removeAttribute("style")
                                    theinput.focus()
                                    theedit.setAttribute("style","display:none")
                                    theupload.removeAttribute("style")
                                }}>
                                    <Icon type="edit" />
                                </span>
                                <span id={item.id+"moneyupload"} style={{display:"none"}} onClick={()=>{
                                    var theaname = document.getElementById(item.id+"money")
                                    var theinput = document.getElementById(item.id+"moneyinput")
                                    var theedit = document.getElementById(item.id+"moneyedit")
                                    var theupload = document.getElementById(item.id+"moneyupload")
                                    theaname.removeAttribute("style")
                                    theinput.parentElement.parentElement.setAttribute("style","display:none")
                                    theedit.removeAttribute("style")
                                    theupload.setAttribute("style","display:none")
                                    this.setState({
                                        spinstatus:true
                                    },()=>{
                                        Axios({
                                            method:"post",
                                            url:baseurl+"/api/record/item/update?itemId="+item.id+"&token="+window.localStorage.token,
                                            params:{money:item.money}
                                        }).then((response)=>{
                                            console.log(response)
                                            this.setState({
                                                spinstatus:false
                                            })
                                        }).catch((error)=>{
                                            console.log(error)
                                        })
                                    })
                                }}><Icon type="upload" /></span>
                            </li>
                            <li><span>图片</span> {item.images.map((img)=>(<img src={img.thumbnail} width={"102px"} key={img.id}/>))}
                            <Imgupmore getSon={(data)=>{
                                item.image_keys=data.toString()
                                this.setState({
                                    spinstatus:true
                                },()=>{
                                    Axios({
                                        method:"post",
                                        url:baseurl+"/api/record/item/update?itemId="+item.id+"&token="+window.localStorage.token,
                                        params:{image_keys:item.image_keys}
                                    }).then((response)=>{
                                        console.log(response)
                                        this.setState({
                                            spinstatus:false
                                        })
                                    }).catch((error)=>{
                                        console.log(error)
                                    })
                                })
                            }}></Imgupmore>
                            </li>
                        </ul>
                    </div>)
                })}
            </div>
        );
    }
}

export default Recorditemdetail;