import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Empty } from 'antd';

class Pleselogin extends Component {
    constructor(){
        super()
        this.state={}
    }
    render() {
        return (
            <div>
                <Empty
                    imageStyle={{
                      height: 100,
                    }}
                    description={
                      <span style={{fontSize:"20px"}}>
                        当前您尚未登录，请先<Link to={'/app/Mine'}>登录</Link>
                      </span>
                    }
                >
                </Empty>            
            </div>
        );
    }
}

export default Pleselogin;