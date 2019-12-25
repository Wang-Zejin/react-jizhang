import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import thestyle from './Navtop.module.css'
import {Icon} from 'antd'
//给组件设置默认props

class Navtop extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <div className={thestyle.navtop}>
                <Link to={this.props.leftlink} style={{color:"rgba(0, 0, 0, 0.65)"}}>
                    <div style={{float:"left"}}><Icon type={this.props.lefticon} /></div>
                </Link>
                {this.props.tittle}
                <Link to={this.props.rightlink} style={{color:"rgba(0, 0, 0, 0.65)"}}>
                    <div style={{float:"right"}}><Icon type={this.props.righticon}/></div>
                </Link>
            </div>
        );
    }
}
Navtop.defaultProps = {
    leftlink:"",
    lefticon:"arrow-left",
    tittle:"顶部栏",
    righticon:"plus-circle",
    rightlink:"",
};
export default Navtop;