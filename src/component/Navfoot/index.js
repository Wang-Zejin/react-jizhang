import React from 'react';
import { Icon} from 'antd'

import rcss from './navfoot.module.css'
import { HashRouter, Link } from 'react-router-dom/cjs/react-router-dom.min';


export default class Navfoot extends React.Component{
    constructor(){
        super()
        this.state={
            autobox:rcss.box,
            lightbox:rcss.boxg,
            userstatus:"home",
        }
    }

    // componentDidMount(){
    //     console.log("Didmount在渲染")
    // }
    // componentWillUpdate(){
    //     console.log("willupdata在渲染"+this.props.userstatus)
    // }
    // componentWillReceiveProps(){
    //     console.log("willReceiveProps在渲染"+this.props.userstatus)
    // }
    // // shouldComponentUpdate(){
    // //     console.log("shouldComponentUpdata在渲染")
    // //     return true
    // // }
    // componentDidUpdate(){
    //     console.log("didupdata在渲染")}

    render(){
        console.log("render在渲染"+this.props.userstatus)
        return (<div className={rcss.footer} id="footerCon"><HashRouter>
            <Link to='/'>
            <div className={this.props.userstatus==="home"?rcss.boxg:rcss.box} style={this.state.fontColor}  id="home">
            <div><Icon type="bar-chart" /></div>
                <div className={rcss.boxp}>首页</div>
            </div>
            </Link>
            <Link to='/app/Recordlist'>
            <div className={this.props.userstatus==="recorddetail"?rcss.boxg:rcss.box}  style={this.state.fontColor} id="recorddetail">
                <div><Icon type="pay-circle" /></div>
                <div className={rcss.boxp}>明细</div>
            </div>
            </Link>
            <Link to='/app/Record'>
            <div className={this.props.userstatus==="record"?rcss.boxg:rcss.box} style={this.state.fontColor} id="record" >
                <div><Icon type="plus-circle" theme="filled" style={{color:'#1fa23f'}}/></div>
                <div className={rcss.boxp}>记账</div>
            </div>
            </Link>
            <Link to='/app/Account'>
            <div className={this.props.userstatus==="account"?rcss.boxg:rcss.box} style={this.state.fontColor} id="account">
                <div><Icon type="trophy" /></div>
                <div className={rcss.boxp}>账户</div>
            </div>
            </Link>
            <Link to='/app/Mine'>
            <div className={this.props.userstatus==="Mine"?rcss.boxg:rcss.box} style={this.state.fontColor} id="Mine">
                <div><Icon type="user" /></div>
                <div className={rcss.boxp}>我的</div>
            </div>
            </Link>
            </HashRouter></div>)
    }
}