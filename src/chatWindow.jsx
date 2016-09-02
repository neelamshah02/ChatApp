var React = require('react');
var UsersPanel= require('./users')
var ReactFire =require('reactfire');
var fireObj = require('./fire-connect-chat');
var ChatList = require('./chat-list');

module.exports = React.createClass({
    mixins:[ ReactFire ],

    componentWillMount:function(){
        this.fbref = fireObj.database().ref('users');
        
        this.userRef = this.fbref.child(this.props.params.user);
        
        this.fbChatRef =  fireObj.database().ref('chats');
        
        this.bindAsObject(this.userRef, 'user');
        
        this.bindAsArray(this.fbref, 'users');
        this.bindAsObject(this.fbref, 'usersobj');
        
        this.bindAsObject(this.fbChatRef, 'chats');
        this.fbChatRef.on('value', this.updatedChat);
       
    
        
       
      },
    getInitialState:function(){
        return {
            text : "",
            loaded : false
        }
    },
    updatedChat: function(){
        this.setState({
            loaded : true
        })
    },
    render :function(){
        
        var user = this.state.user || {};
        
        return <div className="container">
<div className="row chatApp">
    <h3 className="text-center" >CHAT WINDOW OF  {user.name}</h3>
    <br /><br />
    <div className={"col-md-8 chatWindow "+(this.state.loaded?"loaded":"")} >
        
        {this.renderChatWindow(user)}
       
    </div>
    
    <UsersPanel  users= {this.state.users} chats={this.state.chats} fRef = {this.firebaseRefs} loginUser={user}/>
</div>
  </div>
        
   
    },
    componentDidUpdate :function(){
        var objDiv = document.getElementById("chatWindow");
        objDiv.scrollTop = objDiv.scrollHeight;
    },
    renderChatWindow: function(user){
       
        if(user.chatWith){
            var chatUserDetails = this.state.usersobj?(this.state.usersobj[user.chatWith]?this.state.usersobj[user.chatWith]:{}):{};
            return <div className="panel panel-info">
                    <div className="panel-heading">
                        {user.chatWithName}
                        &nbsp; &nbsp;
                        {chatUserDetails.istyping?"typing...":""}
                    </div>
                <div className="panel-body main-div" id="chatWindow">
                        <ul className="media-list">

                            {this.showMessages() }
                            
                        </ul>
                    </div>
                    <div className="panel-footer">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Enter Message" value={this.state.text} onChange={this.handleChangeText}/>
                            <span className="input-group-btn">
                                <button className="btn btn-info" id="chatWindowbtn" type="button" onClick={this.handleSend}>SEND</button>
                            </span>
                        </div>
                    </div>
                </div>
            
        }
        else{
            return <h2>No User Selected!!</h2>
       } 
       
    },
    handleSend : function(){
        var msgRef = this.firebaseRefs.chats.child(this.getKeyOfMsgInstance())
        msgRef.push({
            msg : this.state.text,
            datetime  : Date().toString(),
            sender: this.state.user['.key'],
            senderName : this.state.user.name,
            isSeen: false
            
        })
        this.setState({
            text : ""
        })
    },
    handleChangeText : function(evt){
        this.setState({
            text : evt.target.value,
           
        })
        this.firebaseRefs.user.update({
            istyping : true
        })
        if(this.checkTyping){
            clearTimeout(this.checkTyping)
        }
        this.checkTyping = setTimeout(function(){
            this.firebaseRefs.user.update({
                istyping : false
            })
        }.bind(this), 2000);
    },
    getKeyOfMsgInstance : function(){
        var chats = this.state.chats;
        if(chats){
            if(chats[this.state.user['.key']+"_"+this.state.user.chatWith]){
                return this.state.user['.key']+"_"+this.state.user.chatWith;
            }else
                {
                   return  this.state.user.chatWith+"_"+this.state.user['.key'];
                }
        }else
            {
                return this.state.user['.key']+"_"+this.state.user.chatWith
            }
            
    },
    getMessages:function(){
        var chats = this.state.chats;
       var  currentChats ="";
        if(chats)
        currentChats = chats[this.state.user['.key']+"_"+this.state.user.chatWith] || chats[this.state.user.chatWith+"_"+this.state.user['.key']];
        return currentChats;
    },
    showMessages : function(){
       var chattingKey = this.getKeyOfMsgInstance();
       
        var msges = this.getMessages();
        if(msges){
            var chatlist =[];
            for(var x in  msges){
                var msg = msges[x];
                chatlist.push( <ChatList key={x} message={msg} /> );
                if(this.state.user['.key'] !== msg.sender)
                    {
                        var msgSeenRef= this.firebaseRefs.chats.child(chattingKey);
                        msgSeenRef.child(x).update({isSeen:true});
                    }
                
            };
              
            return chatlist;
        }else
            {
                return "ready to chat"; 
            }
    }
    
})