import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Recordnavtop extends Component {
    render() {
        return (
            <div>
                <Link to="/app/Record/categorylist">类别管理</Link>/新增记账
            </div>
        );
    }
}

export default Recordnavtop;