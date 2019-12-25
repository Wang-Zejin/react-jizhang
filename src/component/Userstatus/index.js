import React from 'react'

export default class Userstatus extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        if(this.props.ustatus){
            return (<div>用户在线</div>)
        }else{
            return(<div>用户不在线</div>)
        }
    }
}