import React, { Component } from 'react';
import { Table,  Icon, Button, Spin, Popconfirm, message} from 'antd';
import Navtop from '../../../component/Navtop'
import Axios from 'axios'
import {baseurl} from "../../../component/tools"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import rcss from "./accountlist.module.css"
import { createHashHistory } from 'history/cjs/history.min';
class Accountlist extends Component {
    constructor(props) {
        super(props);
        this.state={
            accdata:[],
            spinstatu:true,
            columns : [
                {
                  title: '账户名',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: '收支',
                  dataIndex: 'balance',
                  key: 'balance',
                  width: '30%'
                },
                {
                  title: '查看/编辑/删除',
                  key: 'Action',
                  width: '35%',
                  render:(record)=>(
                    <span style={{fontSize:"14px"}}>
                        <Link to={"/app/Account/accountdetail/"+record.id}>
                            <Button type="primary" shape="circle">
                                <Icon type="ellipsis" />        
                            </Button>
                        </Link>
                        <Link to={"/app/Account/editaccount/"+record.id}>
                            <Button type="primary" shape="circle">
                                <Icon type="edit" />        
                            </Button>
                        </Link>
                        <Popconfirm title="确认删除？" okText="确认" cancelText="取消" onConfirm={()=>{this.deleteacc(record.id)}}>
                            <Button type="primary" shape="circle">
                                <Icon type="delete" />  
                            </Button>
                        </Popconfirm>
                    </span>
                  )
                },
              ]
        }
    }
    deleteacc=(id)=>{
        Axios({
            method: 'post',
            url: baseurl+'/api/account/delete?id='+id+'&token='+window.localStorage.token,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }).then((response)=>{
            console.log(response)
            if(response.data.status){
                message.success("删除成功")
            }else{
                message.error("删除失败")
            }
            this.getAccdata()
        });
    }
    getAccdata=()=>{
        Axios.get(baseurl+'/api/account?token='+window.localStorage.token)
        .then((response) => {
            if(response.data.status){
                var temparr=[];
                for(let item in response.data.data){
                    temparr.push(response.data.data[item])
                }
                var accarr=[]
                for (var i =0;i<temparr.length;i++){
                    accarr[i]={
                        id:"",
                        key:i,
                        name:"",
                        balance:""
                    }
                    accarr[i].name=temparr[i].name
                    accarr[i].balance=temparr[i].balance
                    accarr[i].id=temparr[i].id
                }
                this.setState({
                    accdata:accarr,
                    spinstatu:false
                },()=>{
                    
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
        }).catch((error) => {
            console.log(error);
        })
    }
    componentDidMount(){
        this.getAccdata();
    }
    render() {
        return (
            <div style={{backgroundColor:"#fff"}}>
                <Navtop tittle="账户列表" lefticon="" rightlink="/app/Account/createaccount"></Navtop>
                <Spin spinning={this.state.spinstatu}>
                    <div style={{marginTop:"40px"}}>
                    <Table dataSource={this.state.accdata} columns={this.state.columns}  className={rcss.acclist} pagination={false}/>
                    </div>
                </Spin>
            </div>
        );
    }
}

export default Accountlist;