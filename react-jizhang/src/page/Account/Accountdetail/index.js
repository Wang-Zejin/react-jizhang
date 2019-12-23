import React, { Component } from 'react';
import Axios from 'axios'
import {baseurl} from '../../../component/tools'
import { Spin ,Descriptions} from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Navtop from '../../../component/Navtop';
moment.locale('zh-cn');
const { MonthPicker} = DatePicker;
const monthFormat = 'YYYY-MM';
class Accountdetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            accountdata:{
                balance: "",
                book_id: 0,
                created_at: "",
                id: 0,
                initial_balance: "",
                name: "",
                remark: "",
                sort: 0,
                status: 10,
                type: 0,
                updated_at: ""
            },
            spinstatu:false,
            month:{
                month:'2019-01'
            },
            in:0,
            out:0,
        }
    }
    getAccountdata=()=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios.get(baseurl+'/api/account/detail?id='+this.props.match.params.id+'&token='+window.localStorage.token)
            .then((response) => {
                this.setState({
                    accountdata:{...response.data.data}
                },()=>{
                    console.log(this.state.accountdata)
                    this.setState({
                        spinstatu:false
                    })
                })
            }).catch((error) => {
                console.log(error);
            })
        })
    }
    getMonthBalance=()=>{
        this.setState({
            spinstatu:true
        },()=>{
            Axios({
                method: 'get',
                url: baseurl+'/api/account/change?id='+this.props.match.params.id+'&token='+window.localStorage.token,
                params: this.state.month
            }).then((response) => {
                if (response.data.status ===true) {
                    this.setState({
                        in:response.data.data.in,
                        spinstatu:false,
                        out:response.data.data.out
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
    componentDidMount(){
        this.getAccountdata(); 
    }
    render() {
        return (
            <div style={{backgroundColor:"white",paddingTop:"40px"}}>
                <Navtop tittle="账户详情" righticon="" leftlink="/app/Account"></Navtop>
                <Spin spinning={this.state.spinstatu}>
                    <Descriptions layout="vertical" column={3} bordered>
                        <Descriptions.Item label="账户名">{this.state.accountdata.name}</Descriptions.Item>
                        <Descriptions.Item label="收支">{this.state.accountdata.balance}</Descriptions.Item>
                        <Descriptions.Item label="初始值">{this.state.accountdata.initial_balance}</Descriptions.Item>
                        <Descriptions.Item label="创建时间" span={3}>{this.state.accountdata.created_at}</Descriptions.Item>
                        <Descriptions.Item label="更新时间" span={3}>{this.state.accountdata.updated_at}</Descriptions.Item>
                        <Descriptions.Item label="备注" span={3}>{this.state.accountdata.remark===""?"未添加备注。":this.state.accountdata.remark}</Descriptions.Item>
                        <Descriptions.Item label="月收支金额" span={3}>
                            <MonthPicker defaultValue={moment('2019-01', monthFormat)} format={monthFormat} onChange={(dateobj,value)=>{
                                this.setState({
                                    month:{
                                        month:value
                                    }
                                },()=>{
                                    this.getMonthBalance()
                                })
                            }}/>
                        </Descriptions.Item>
                        <Descriptions.Item label="年月">{this.state.month.month}</Descriptions.Item>
                        <Descriptions.Item label="收入">{this.state.in}</Descriptions.Item>
                        <Descriptions.Item label="支出">{this.state.out}</Descriptions.Item>
                    </Descriptions>
                </Spin>
            </div>
        );
    }
}

export default Accountdetail;