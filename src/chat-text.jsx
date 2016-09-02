var React =require("react");

module.exports = React.createClass({
    render: function (){
       return <div className="panel-footer">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Enter Message" onKeyDown={this.enterMsg} value={this.state.text} onChange={this.handleChangeText}/>
                            <span className="input-group-btn">
                                <button className="btn btn-info" id="chatWindowbtn" type="button" onClick={this.handleSend}>SEND</button>
                            </span>
                        </div>
                    </div>
    },
    enterMsg :function(evt){
        if(evt.keyCode == 13)
        {
            this.handleSend()
        }
    },
    handleSend : function(){
        if(this.state.text == "")
        return ;
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
    }

})
