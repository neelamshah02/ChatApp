var React = require('react');
var ReactFire =require('reactfire');
var fireObj = require('./fire-connect-chat');
var ReactRouter =require('react-router');
//var Router=ReactRouter.Router;
//var Route=ReactRouter.Route;
//var IndexRoute = ReactRouter.IndexRoute;
var browserHistory  = ReactRouter.browserHistory;
 
module.exports = React.createClass({  
mixins:[ ReactFire ],

componentWillMount:function(){
     this.fbref = fireObj.database().ref('users');
    this.bindAsArray(this.fbref, 'users')
    // this.fbref.on('value', this.updateTodo);
     

},
    getInitialState:function(){
    
    return {
      name : "",
      mobile : ""
    }
    },
    render :function(){
    return <div className="container">
	<div className="row">
        <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Welcome to my site</h3>
                </div>
                <div className="panel-body">
                    <form id="registerForm" role="form">
                        <fieldset>
                            
                            <div className="form-group">
                                <input className="form-control" 
                                 value={this.state.name} 
                                onChange={this.handleNameChange} 
                                placeholder="Name" name="name" type="text" />
                            </div>
                            <div className="form-group">
                                <input className="form-control" 
                                value={this.state.mobile} 
                                onChange={this.handleMobileChange} 
                                placeholder="mobile number" name="mobile" type="mobile" autofocus/>
                            </div>
                            
                            <button type="button" onClick ={this.registerUser} className="btn btn-success btn-block">Register</button>
                            
                            
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
},
handleMobileChange:function(evt){
this.setState({
                mobile : evt.target.value,
                
            })
},
handleNameChange:function(evt){
this.setState({
                name : evt.target.value,
                
            })
},
registerUser:function(){
//var self=this
if(this.state.name!="" && this.state.mobile!="")
{


var data = {
    name: this.state.name,
    number: this.state.mobile,
    
  }

 var user = this.firebaseRefs.users.push(data);
    
 this.setState({
    name : "",
    mobile:""
 });
    
    browserHistory.push('/chat/'+user.key)
 }
  else{
   alert("Please fill the fields")
   }
   }
})