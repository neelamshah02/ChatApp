var React = require('react');
var UserList = require('./user-list')
module.exports = React.createClass({

    render :function(){
        return <div className="col-md-4">
    <div className="panel panel-primary">
        <div className="panel-heading">
            ONLINE USERS
        </div>
        <div className="panel-body main-div">
            <ul className="media-list">
                {this.renderList()}

            </ul>
        </div>
    </div>
</div>
    },
    renderList :function(){

        var chats=this.props.chats;



        if(this.props.users && this.props.users.length){
            return this.props.users.map(function(user){
                if(user['.key'] !== this.props.loginUser['.key'])
                    {

                        var chatCombo = chats?(chats[this.props.loginUser['.key']+"_"+user['.key']] ||                         chats[user['.key']+"_"+this.props.loginUser['.key']]):{};

                        return <UserList key= {user['.key']}  user={user} loginUser={this.props.loginUser} fRef={this.props.fRef} unReadMsg={this.unreadCount(chatCombo)} clearText = {this.props.clearText}/>
            }
            }.bind(this))
        }
        else{
            <h4>No User Available</h4>
        }
    },
    unreadCount: function(chatCombo){
    var count=0;
        for(var k in chatCombo){
            var chatObj=chatCombo[k];
    if(!chatObj.isSeen && (chatObj.sender !== this.props.loginUser['.key'] )){
                      count++;
                    }

            }
        return count;
        }
    })