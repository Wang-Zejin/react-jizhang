import React from 'react'
import {Route} from 'react-router-dom'
import Userlogin from './Userlogin'
import Userregister from './Userregister'
import Forgetpsw from './Forgetpsw'
import Personlcenter from './Personalcenter'
import Changemobile from './Changemobile'
import Changepsw from './Changepsw'
import Changeinformation from './Changeinformation'
import { senddata } from '../../component/tools'
import Bookmanager from './Bookmanager'
import Createbook from './Bookmanager/Createbook'
import Bookmember from './Bookmanager/Bookmember'
import Invitemember from './Bookmanager/Invitemember'
import Feedback from './Feedback'
import { createHashHistory } from 'history/cjs/history.min';
import Pleselogin from '../../component/Pleselogin'
export default class Mine extends React.Component{
    constructor(){
        super()
        this.state={
            userstatus:"Mine",
            userifm:{}
        }
    }
    // componentDidMount(){
    //     if(window.localStorage.token){
    //         console.log(666)
    //     }else{
    //         createHashHistory().push("/app/Mine/Userlogin")
    //     }
    // }
    getUserifm=(data)=>{
        this.setState({
            userifm:data
        })
    }
    componentDidMount(){
        senddata(this.props,this.state.userstatus)
    }
    render(){
        if(window.localStorage.token){
            
            return(<div>
                <Route exact path="/app/Mine"><Personlcenter getSon={this.getUserifm}></Personlcenter></Route>
                <Route path="/app/Mine/Changemobile"><Changemobile></Changemobile></Route>
                <Route path="/app/Mine/Changepsw"><Changepsw></Changepsw></Route>
                <Route path="/app/Mine/Changeinformation"><Changeinformation userifm={this.state.userifm}></Changeinformation></Route> 
                <Route exact path="/app/Mine/Bookmanager"><Bookmanager></Bookmanager></Route>
                <Route path="/app/Mine/Bookmanager/createbook"><Createbook></Createbook></Route>
                <Route path="/app/Mine/Bookmanager/bookmember/:book_id" component={Bookmember}></Route>
                <Route path="/app/Mine/Bookmanager/invitemember/:book_id" component={Invitemember}></Route>
                <Route path="/app/Mine/Feedback"><Feedback></Feedback></Route>
                </div>)
        }else{

            return(<div>
                <Pleselogin></Pleselogin>
                    {createHashHistory().push("/app/login")}
            </div>)
        }
       
    }
}