var React = require('react');
var ListItem = require('./list-item');


module.exports = React.createClass({

  render : function(){

    return <ul className="list-group">
      {this.renderList()}
    </ul>
  },
  renderList : function(){
    if(this.props.items && this.props.items.length){


      return this.props.items.map(function(item){
        return <ListItem key = {item['.key']} item={item} />
      })


    }else {
      return <h4>Add a todo to get started</h4>
    }
  }
})
