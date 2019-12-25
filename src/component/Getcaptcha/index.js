import React from 'react'

import Axios from 'axios'
import {Icon, Spin} from 'antd'
//需要定义baseurl
import {baseurl,senddata} from '../tools'
//需要定义baseurl
//该组件应该在prop组件中接收一个父组件传过来的函数用来传自己的数据
export default class Getcaptcha extends React.Component{
    constructor(props){
        super(props)
        this.state={
            res:{
                data:{}
            },
            spinstatu:false
        }

    }
    //将向父组件发送数据的方法封装，如果父组件发来方法请求数据，则发送数据
    senddata=()=>{
        if(this.props.getSon){
            this.props.getSon(this.state.res)
        }
    }

    handleClick=()=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios.get(baseurl+'/api/captcha')
            .then((response) => {
                this.setState({
                    res:response.data,
                    
                },()=>{
                    console.log("接收到了")
                    this.setState({
                        spinstatu:false
                    })
                })
                //向父组件发送
                senddata(this.props,this.state.res)
            }).catch((error) => {
                console.log(error);
            })
        })
        
    }
    componentDidMount(){
        this.handleClick();
    }
    render(){
        return (
            <div style={{display:"inline-block"}}>
                <Spin spinning={this.state.spinstatu}>
                <img src={this.state.res.data.url}></img>
                <Icon type='reload' onClick={this.handleClick}></Icon>
                </Spin>
            </div>
        )
    }
}