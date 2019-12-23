import React, { Component } from 'react';
import Axios from 'axios'
import { baseurl, senddata } from '../../component/tools';
import Navtop from '../../component/Navtop';
import thestyle from './home.module.css'
import Pleselogin from '../../component/Pleselogin'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            spinstatu:false,
            userstatus:"home",
            homedata:{}
        }
    }
    getHomeData=()=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method:"get",
                url:baseurl+"/api/view/home?token="+window.localStorage.token
            }).then((response)=>{
                console.log(response)
                if(response.data.status){
                    this.setState({
                        homedata:response.data.data,
                        spinstatu:false
                    })
                }else{
                    this.setState({
                        homedata:response.data.data,
                        spinstatu:false
                    })
                }
            }).catch((error)=>{
                console.log(error)
                this.setState=({
                    spinstatu:false
                })
            })
        })
    }
    componentDidMount(){
        this.getHomeData()
        senddata(this.props,this.state.userstatus)
    }
    render() {
        if(window.localStorage.token){
            return (
                <div style={{paddingTop:"40px"}}>
                    <Navtop tittle="首页" lefticon="" righticon=""></Navtop>
                    {this.state.homedata.waitingForPayment?
                    (  <div> 

                        <div className={thestyle.itemtittle}>现金流</div>
                        <div className={thestyle.container}>
                        <div className={thestyle.containeritem}>
                            <span>收入：</span>
                            <span>{this.state.homedata.cash.in}</span>
                        </div>
                        <div className={thestyle.containeritem}>
                            <span>支出：</span>
                            <span>{this.state.homedata.cash.out}</span>
                        </div>
                        </div>

                        
                        <div className={thestyle.itemtittle}>账面收支</div>
                        <div className={thestyle.container}>
                        <div className={thestyle.containeritem}>
                            <span>收入：</span>
                            <span>{this.state.homedata.account.in}</span>
                        </div>
                        <div className={thestyle.containeritem}>
                            <span>支出：</span>
                            <span>{this.state.homedata.account.out}</span>
                        </div>
                        </div>


                        
                        <div className={thestyle.itemtittle}>待收付</div>
                        <div className={thestyle.container}>
                        <div className={thestyle.containeritem}>
                            <span>待收：</span>
                            <span>{this.state.homedata.waitingForCollection}</span>
                        </div>
                        <div className={thestyle.containeritem}>
                            <span>待付款：</span>
                            <span>{this.state.homedata.waitingForPayment}</span>
                        </div>
                    </div></div>):
                    (<div>暂无数据</div>)}
                   
                </div>
            );
        }else{
            return (<Pleselogin></Pleselogin>)
        }
       
    }
}

export default Home;