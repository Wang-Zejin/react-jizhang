import React, { Component } from 'react';
import Navtop from '../../../../component/Navtop';
import thestyle from './bookmember.module.css'
import { baseurl } from '../../../../component/tools';
import Axios from 'axios'
import { Button, Icon, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { createHashHistory } from 'history/cjs/history.min';
class Bookmember extends Component {
    constructor(props) {
        super(props);
        this.state={
            spinstatu:false,
            memberdata:[]
        }
    }
    getMembers=()=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method:"get",
                url:baseurl+"/api/member?token="+window.localStorage.token,
                params:this.props.match.params
            }).then((response)=>{
                if(response.data.status){
                    this.setState({
                        spinstatu:false,
                        memberdata:[...response.data.data]
                    })
                }else{
                    message.error(response.data.data)
                    createHashHistory().push("/app/Mine/Bookmanager")
                }
                
            }).catch((error)=>{
                console.log(error)
            })
        })
    }
    componentDidMount(){
        this.getMembers()
    }
    deletemember=(params)=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method:"post",
                url:baseurl+"/api/member/delete?token="+window.localStorage.token,
                params:params
            }).then((response)=>{
                if(response.data.status){
                    message.success(response.data.data)
                }else{
                    message.error(response.data.data)
                }
                this.getMembers()
            }).catch((error)=>{
                console.log(error)
            })
        })
    }
    render() {
        return (
            <div style={{paddingTop:"40px"}}>
                <Navtop tittle="记账成员" leftlink={"/app/Mine/Bookmanager"} righticon=""></Navtop>
                <div className={thestyle.container}>
                    {this.state.memberdata.length===0?
                    (<div className={thestyle.containeritem}>您还未邀请成员，快去邀请吧</div>):
                    (this.state.memberdata.map((item)=>{
                        return (
                            <div className={thestyle.containeritem} key={"member"+item.id}>
                                <div>昵称：{item.nickname}</div>
                                <div style={{float:"left"}}>手机号：{item.mobile}</div>
                                <div className={thestyle.deletemember}>
                                <Popconfirm title="确认删除吗？" okText="确认" cancelText="取消" 
                                    onConfirm={()=>{this.deletemember({
                                        book_id:this.props.match.params.book_id,
                                        user_id:item.id
                                    })}}
                                >
                                    <Button type="danger" shape="circle" size="small">
                                        <Icon type="delete" />
                                    </Button>
                                </Popconfirm>
                                </div>
                            </div>
                        )
                    }))}
                    
                </div>
                <div className={thestyle.addmember}>
                    <Link to={"/app/Mine/Bookmanager/invitemember/"+this.props.match.params.book_id}>
                        <Button type="primary" className={thestyle.addbutton}>邀请新的记账成员</Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Bookmember;