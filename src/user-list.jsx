var React = require('react');
var ReactFire = require('reactfire');
module.exports = React.createClass({
    getInitialState:function(){
        var item = this.props.user;
        return {
            name : item.name,
            mobile : item.mobile,
            key: item['.key']
            
        }
    },
    mixins : [ ReactFire ],
    render :function(){
        console.log(this.state.highLightUser)
        return <li onClick={this.startChatWithUser} className={"media "+(this.props.user['.key'] === this.props.loginUser.chatWith?"highlightedUser":"")}    >

    <div className="media-body">

        <div className="media">
            <a className="pull-left" >
                <img className="media-object img-circle img-user" src="imges/user.png" />
            </a>
            <div className="media-body" >
                <h5>{this.state.name} {this.props.unReadMsg?"("+this.props.unReadMsg+")":""}</h5>
                {(this.props.loginUser['.key'] === this.props.user.chatWith)?(this.props.user.istyping?"typing....":""):""}
                
                <small className="text-muted">Active From 3 hours</small>
            </div>
        </div>

    </div>
</li>
    },
    
    startChatWithUser:function(){
        
        this.props.fRef.user.update({
            chatWith : this.state.key,
            chatWithName : this.state.name,
           
            
        })
        
    }
})