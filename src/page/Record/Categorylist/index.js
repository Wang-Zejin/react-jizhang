import React, { Component } from 'react';
import Axios from 'axios';
import {baseurl} from '../../../component/tools'
import { Table, Button, Icon, Popconfirm, Spin, message } from 'antd';
import {Link} from 'react-router-dom'
import thestyle from './recordlist.module.css'
import qs from 'qs'
import Navtop from '../../../component/Navtop';
class Recordlist extends Component {
    constructor(props) {
        super(props);
        this.state={
            recordlist:[],
            incomeparams:{
                type:1,
                dataType:3
            },
            payparams:{
                type:2,
                dataType:3
            },
            showrecord:true,
            spinstatu:false,
            expandKey:"",
            // sendname:{
            //     name:''
            // },
            columns : [
                {
                  title: '类别名称',
                  key: 'name',
                  render:(text,record)=>(
                      <input className={thestyle.inputstyle} defaultValue={record.name} id={record.id} disabled onChange={(e)=>{
                        record.name=e.target.value
                        console.log(record.name)
                      }}/>
                  )
                },
                {
                    title: '新增/编辑/删除',
                    key: 'Action',
                    width: '35%',
                    render:(text,record,index)=>(
                        <span style={{fontSize:"14px"}}>
                        <Button type="primary" shape="circle" size="small" onClick={()=>{this.createRecord(record.id,record.type)}}>
                            <Icon type="plus" />      
                        </Button>
                        <Button type="primary" id={"x"+record.id} shape="circle" size="small" onClick={(e)=>{
                            this.editrecord(record.id,"x"+record.id,"y"+record.id)
                            }}>
                            <Icon type="edit" />        
                        </Button>
                        <Button style={{display:"none"}} id={"y"+record.id} type="primary" shape="circle" size="small" onClick={()=>{
                            this.submitedit(record.id,"x"+record.id,"y"+record.id,record.name)
                            
                            }}>
                            <Icon type="upload" />
                        </Button>
                            
                        <Popconfirm title="确认删除？" okText="确认" cancelText="取消" onConfirm={()=>{this.deleterecord(record.id,record.type)}}>
                            <Button type="primary" shape="circle" size="small">
                                <Icon type="delete" />  
                            </Button>
                        </Popconfirm>
                    </span>
                    )
                },
              ]
        }
    }
    // subToChildren=(data,newdata)=>{
    //     data.map((item,index)=>{
    //         newdata[index]={
    //             name:"",
    //             key:"",
    //             children:[]
    //         }
    //         newdata[index].name=item.name
    //         newdata[index].key=item.id
    //         newdata[index].children=item.sub
    //         if(item.sub.length!==0){
    //             this.subToChildren(item.sub,newdata[index].children)
    //         }
    //     })
    // }

    createRecord=(parentId,recordType)=>{
        let newRecord = {
            name:"新类型",
            type:recordType,
            parent_id:parentId,
            sort:10
        }
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method: 'post',
                url: baseurl+'/api/category/create?token='+window.localStorage.token,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify(newRecord)
            }).then((response) => {
                if (response.data.status ===true) {
                    message.success("创建“新类型”成功，您可以前往编辑名称")
                    this.setState({
                        spinstatu:false,
                    },()=>{
                        if(recordType===1){
                            this.getRecordlist(this.state.incomeparams)
                        }else{
                            this.getRecordlist(this.state.payparams)
                        }
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

    deleterecord=(id,type)=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method: 'post',
                url: baseurl+'/api/category/delete?id='+id+'&token='+window.localStorage.token,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
            }).then((response)=>{
                if(response.data.status){
                    message.success(response.data.data)
                }else{
                    message.error("删除失败")
                }
                this.setState({
                    spinstatu:false
                },()=>{
                    if(type===1){
                        this.getRecordlist(this.state.incomeparams)
                    }else{
                        this.getRecordlist(this.state.payparams)
                    }
                })
            });
        })
    }

    editrecord=(id,xid,yid)=>{
        var theinput = document.getElementById(id)
        var theeditbutton = document.getElementById(xid)
        var theuploadbutton = document.getElementById(yid)
        theeditbutton.setAttribute("style","display:none")
        theuploadbutton.removeAttribute("style")
        theinput.removeAttribute("disabled")
        theinput.focus()
    }
    editpost=(recordId,recordName)=>{
        this.setState({
            spinstatu:true
        },()=>{
            
            Axios({
                method: 'post',
                url: baseurl+'/api/category/update?id='+recordId+'&token='+window.localStorage.token,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({name:recordName})
            }).then((response) => {
                console.log(response.data)
                if(response.data.status){
                    message.success(response.data.data)
                }else{
                    message.error("修改失败")
                }
                this.setState({
                    spinstatu:false
                })
            });
        })
    }
    submitedit=(id,xid,yid,recordName)=>{
        var theinput = document.getElementById(id)
        var theeditbutton = document.getElementById(xid)
        var theuploadbutton = document.getElementById(yid)
        theuploadbutton.setAttribute("style","display:none")
        theeditbutton.removeAttribute("style")
        theinput.setAttribute("disabled",true)
        this.editpost(id,recordName)
    }

    subToChildren=(data)=>{
        console.log(data)
        data.map((item)=>{
            item.key=item.id
            
                
            
            if(item.sub.length!==0){
                item.children=item.sub
                this.subToChildren(item.children)
            }
        })
    }
    getRecordlist=(whichrecord)=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method: 'get',
                url: baseurl+'/api/category?token='+window.localStorage.token,
                params: whichrecord
            }).then((response) => {
                var tmpdata = response.data.data
                var newdata=[]
                this.subToChildren(tmpdata)
                this.setState({
                    recordlist:tmpdata
                },()=>{
                    this.setState({spinstatu:false})
                })
            }).catch((error)=>{
                console.log(error)
            });
        })
    }
    componentDidMount(){
        this.getRecordlist(this.state.incomeparams);
    }
    render() {
        let showtable = null;
        let table = null;
        if(this.state.showrecord){
            showtable=(<div>
                {/* 收入类型
                <Button type="primary" shape="circle" size="small" onClick={()=>{this.createRecord(0,1)}}>
                    <Icon type="plus" />      
                </Button> */}
                <div className={thestyle.navtop}>
                <Link to="/app/Record">
                <div style={{float:"left",color:"black"}}><Icon type={"arrow-left"} /></div>
                </Link>
                收入类型

                <div style={{float:"right"}} onClick={()=>{this.createRecord(0,1)}}><Icon type="plus"/></div>

                </div>
            </div>)
        }else{
            showtable=(<div>
                {/* 支出类型
                <Button type="primary" shape="circle" size="small" onClick={()=>{this.createRecord(0,2)}}>
                    <Icon type="plus" />      
                </Button> */}
                <div className={thestyle.navtop}>
                <Link to="/app/Record">
                <div style={{float:"left",color:"black"}}><Icon type={"arrow-left"} /></div>
                </Link>
                支出类型

                <div style={{float:"right"}} onClick={()=>{this.createRecord(0,2)}}><Icon type="plus"/></div>

                </div>
            </div>)
        }
        if(this.state.recordlist.length!==0){
            table=<Table 
            columns={this.state.columns} 
            indentSize={15} 
            dataSource={this.state.recordlist} 
            pagination={false} 
            defaultExpandAllRows={true}
        />
        }
        return (
            <Spin spinning={this.state.spinstatu}>
                <Navtop tittle="类别管理" leftlink={"/app/Record"} righticon=""></Navtop>
                <div style={{paddingTop:"40px",backgroundColor:"#fff"}}>
                    <div style={{textAlign:"center"}}>
                <Button.Group >
                <Button  onClick={()=>{
                    this.setState({
                        showrecord:true
                    },()=>{
                        this.getRecordlist(this.state.incomeparams);
                    })
                }}>
                    收入类型
                </Button>
                <Button  onClick={()=>{
                    this.setState({
                        showrecord:false
                    },()=>{
                        this.getRecordlist(this.state.payparams);
                    })
                }}>
                    支出类型
                </Button>
                </Button.Group>
                </div>
                {showtable}
                {table}
                </div>
                </Spin>
        );
    }
}

export default Recordlist;