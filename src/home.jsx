var React = require('react');
var Header = require('./header');
var List= require('./list');

var ReactFire =require('reactfire');
var fireObj = require('./fire-connect');


module.exports = React.createClass({
 mixins:[ ReactFire ],

componentWillMount:function(){
     this.fbref = fireObj.database().ref('items');
    this.bindAsArray(this.fbref, 'items')
    this.fbref.on('value', this.updateTodo);
     

},
updateTodo:function(argument){
  this.setState({
       loaded : true
     })
},
 render: function() {
      return <div>
          <div className="row panel panle-default">
             <div className="col-md-8 col-md-offset-2">
               <h1 className="text-center">To-Do List</h1>
               <Header itemResorce = {this.firebaseRefs.items}/>
               <div >
                <List items = {this.state.items} />
                {this.deleteAll()}
               </div>
               {this.props.children}
                
             </div>
             
         </div>
             <div className="text-center">
                    <a className=""><h1>Start Messaging</h1></a>
                </div>
                    </div>
},
deleteAll :function(){
    return <div className="text-center">
        <button 
    onClick={this.handelClickDeleteAll} className="btn btn-default" type="button">  Delete All </button>
    </div>
},
handelClickDeleteAll :function(){
    var temp=Object.assign({},this.state.items);
   // var temp=Object.clone(this.state.items);
    for(var i in temp){
        if(temp[i].isDone === true){
            this.fbref.child(temp[i]['.key']).remove();
            
        }
    }
}
});