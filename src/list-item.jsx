var React = require('react');
var FirebaseRef = require('./fire-connect');
var ReactFire = require('reactfire');

module.exports = React.createClass({
  getInitialState:function(){
    var item = this.props.item;
    return {
      text : item.name,
      isDone : item.isDone,
      textChanged:false

    }
  },
  mixins : [ ReactFire ],
  componentWillMount: function(){
    var dataObj = FirebaseRef.database().ref('items/'+this.props.item['.key']);
    this.bindAsArray(dataObj, "item");
    dataObj.on('child_removed',function(status){
        console.log(status.val());
    })
  },
  render : function(){

    return <div className="input-group">
      <span className="input-group-addon" id="basic-addon1">
        <input type="checkbox"
        defaultChecked = {this.state.isDone}
        onClick = {this.handelWorkDone}
        />
      </span>
      <input type="text" className="form-control" value={this.state.text} onChange={this.handelInputChange} placeholder="todo item..." />
       <span className="input-group-btn">
           {this.changeButton()}
         <button className="btn btn-default" type="button" onClick = {this.handelRemoveTodo}>delete</button>
       </span>
    </div>
  },
 changeButton: function(){
     if(!this.state.textChanged){
         return "";
     }
     else{
          return [
          <button className="btn btn-default" type="button" onClick = {this.handelUpdate}>Update</button>,
          <button className="btn btn-default" type="button" onClick = {this.handelUndo}>Undo</button>
     ]
     }
    
        
    },
 handelUpdate :function(evt){
    this.firebaseRefs.item.update({name:this.state.text})
    this.setState({textChanged:false})
    
 },
 handelUndo :function(){
     this.setState({
         text:this.props.item.name
     })
 },
 handelWorkDone:function(evt){
      //change isDone

      var update = {
        isDone : evt.target.checked
      }
      this.setState(update)
      var updatePramese = this.firebaseRefs.item.update(update);


  },
  handelRemoveTodo:function(evt){
    var updatePramese = this.firebaseRefs.item.remove();
    
  },
  handelInputChange:function(evt){
    //change the state
    this.setState({text : evt.target.value,
                  textChanged:true})
  }
})
