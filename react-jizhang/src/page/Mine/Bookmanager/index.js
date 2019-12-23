import React, { Component } from 'react';
import Navtop from '../../../component/Navtop';
import thestyle from './bookmanager.module.css';
import Axios from 'axios'
import { baseurl } from '../../../component/tools';
import {Icon, Button, message, Spin} from 'antd'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
class Bookmanager extends Component {
    constructor(props) {
        super(props);
        this.state={
            spinstatus:false,
            defaultbook:{},
            booklist:[],
            name:""
        }
    }
    getDefaultBook=()=>{
        this.setState({
            spinstatus:true
        },()=>{
            Axios({
                method:"get",
                url:baseurl+"/api/book/get-default?token="+window.localStorage.token
            }).then((response)=>{
                console.log(response.data.data)
                this.setState({
                    spinstatus:false,
                    defaultbook:{...response.data.data}
                })
            }).catch((error)=>{
                console.log(error)
                this.setState({
                    spinstatus:false
                })
            })
        })
    }
    getBookList=()=>{
        this.setState({
            spinstatus:true
        },()=>{
            Axios({
                method:"get",
                url:baseurl+"/api/book?token="+window.localStorage.token
            }).then((response)=>{
                console.log(response.data.data)
                this.setState({
                    spinstatus:false,
                    booklist:response.data.data
                })
            }).catch((error)=>{
                console.log(error)
                this.setState({
                    spinstatus:false
                })
            })
        })
    }
    setDefaultBook=(params)=>{
        this.setState({
            spinstatus:true
        },()=>{
            Axios({
                method:"post",
                url:baseurl+"/api/book/set-default?token="+window.localStorage.token,
                params:params
            }).then((response)=>{
                if(response.data.status){
                    message.success(response.data.data)
                    this.setState({
                        spinstatus:false
                    },()=>{
                        this.getDefaultBook()
                    })
                }else{
                    message.error(response.data.data)
                    this.setState({
                        spinstatus:false
                    })
                }
            }).catch((error)=>{
                console.log(error)
            })
        })
    }
    deleteBook=(params)=>{
        this.setState({
            spinstatus:true
        },()=>{
            Axios({
                method:"post",
                url:baseurl+"/api/book/delete?token="+window.localStorage.token,
                params:params
            }).then((response)=>{
                console.log(response)
                if(response.data.status){
                    message.success("删除成功")
                    this.setState({
                        spinstatus:false
                    })
                    this.getBookList()
                }else{
                    message.error(response.data.data)
                    this.setState({
                        spinstatus:false
                    })
                    this.getBookList()
                }
            }).catch((error)=>{
                this.setState({
                    spinstatus:false
                })
                console.log(error)
            })
        })
    }
    updateBook=(params)=>{
        this.setState({
            spinstatus:true
        },()=>{
            Axios({
                method:"post",
                url:baseurl+"/api/book/update?token="+window.localStorage.token,
                params:params
            }).then((response)=>{
                if(response.data.status){
                    message.success("修改成功")
                    this.setState({spinstatus:false})
                }else{
                    message.error(response.data.data)
                    this.setState({spinstatus:false})
                    this.getBookList()
                }
            }).catch((error)=>{
                console.log(error)
            })
        })
    }
    componentDidMount(){
        this.getDefaultBook()
        this.getBookList()
    }
    render() {
        var booklist = this.state.booklist
        return (
            <div style={{paddingTop:"40px"}}>
                <Navtop tittle="账簿管理" rightlink="/app/Mine/Bookmanager/createbook" leftlink="/app/Mine" ></Navtop>
                <Spin spinning={this.state.spinstatus}>
                <div className={thestyle.defaultbook}>
                    <div className={thestyle.defaultbookname}>
                        <span>当前账簿：</span>
                        <span>{this.state.defaultbook.name}</span>
                    </div>
                    <div className={thestyle.defaultbooklist}>
                        <span>创建人：</span>
                        <span>{this.state.defaultbook.user_name}</span>
                    </div>
                    <div className={thestyle.defaultbooklist}>
                        <span>创建时间：</span>
                        <span>{this.state.defaultbook.created_at}</span>
                    </div>
                    <div className={thestyle.defaultbooktime}>
                        <span>更新时间：</span>
                        <span>{this.state.defaultbook.updated_at}</span>
                    </div>
                </div>
                <div className={thestyle.booklisttittle}>账簿列表</div>
                <div className={thestyle.booklist}>
                    {booklist.map((item)=>{
                        return (
                            <div className={thestyle.booklistitem} key={"book"+item.id}>
                                <span><input 
                                                value={item.name}
                                                disabled 
                                                style={{backgroundColor:"#fff",border:"0px"}}
                                                id={"bookinput"+item.id} 
                                                onChange={(e)=>{
                                                    this.setState({
                                                        name:e.target.value
                                                    })
                                                    item.name=e.target.value
                                                }}
                                            /></span>
                                <div 
                                    style={{float:"right"}} 
                                    id={"down"+item.id}
                                    onClick={()=>{
                                        var down = document.getElementById("down"+item.id)
                                        var up = document.getElementById("up"+item.id)
                                        var detail = document.getElementById("detail"+item.id)
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
                                    id={"up"+item.id} 
                                    onClick={()=>{
                                        var down = document.getElementById("down"+item.id)
                                        var up = document.getElementById("up"+item.id)
                                        var detail = document.getElementById("detail"+item.id)
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
                                <div 
                                    className={thestyle.bookdetail} 
                                    id={"detail"+item.id}
                                >
                                        <div>
                                            <span>创建人：</span>
                                            <span>{item.user_name}</span>
                                        </div>
                                        <div>
                                            <span>创建时间：</span>
                                            <span>{item.created_at}</span>
                                        </div>
                                        <div>
                                            <span>更新时间：</span>
                                            <span>{item.updated_at}</span>
                                        </div>
                                        <div>
                                            <Button onClick={()=>{
                                                this.setDefaultBook({book_id:item.id})
                                            }}>使用</Button>
                                            <Button id={"bookedit"+item.id} 
                                                onClick={()=>{
                                                    var bookinput = document.getElementById("bookinput"+item.id)
                                                    var bookedit = document.getElementById("bookedit"+item.id)
                                                    var bookupdate = document.getElementById("bookupdate"+item.id)
                                                    bookinput.removeAttribute("disabled")
                                                    bookinput.focus()
                                                    bookedit.setAttribute("style","display:none")
                                                    bookupdate.removeAttribute("style")
                                                }}
                                            >编辑</Button>
                                            <Button 
                                            id={"bookupdate"+item.id} 
                                            style={{display:"none"}}
                                            onClick={()=>{
                                                var bookinput = document.getElementById("bookinput"+item.id)
                                                var bookedit = document.getElementById("bookedit"+item.id)
                                                var bookupdate = document.getElementById("bookupdate"+item.id)
                                                bookinput.setAttribute("disabled",true)
                                                bookedit.removeAttribute("style")
                                                bookupdate.setAttribute("style","display:none")
                                                this.updateBook({book_id:item.id,book_name:item.name})
                                            }}
                                            >提交</Button>
                                            <Link to={"/app/Mine/Bookmanager/bookmember/"+item.id}>
                                                <Button>成员</Button>
                                            </Link>
                                            <Button onClick={()=>{
                                                this.deleteBook({book_id:item.id})
                                            }}>删除</Button>
                                        </div>
                                </div>                               
                            </div>
                        )
                    })}
                </div></Spin>
            </div>
        );
    }
}

export default Bookmanager;