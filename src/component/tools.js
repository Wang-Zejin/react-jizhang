//基础地址
const baseurl = 'http://jizhang-api-dev.it266.com'
//只要在使用组件的时候赋予getSon={this.xxx}(xxx为接收数据的方法)属性，使用senddata向父组件发送数据
//发送数据的时候需要传入this.props和想要发送的数据
const senddata = (props,sonData)=>{
    if(props.getSon){
        props.getSon(sonData)
        console.log(props+'向父组件发送数据成功')
        console.log(props)
    }else{
        console.log('无接收数据的函数')
    }
}
export {senddata,baseurl}
//#39b54a  #1fa23f #6dc779