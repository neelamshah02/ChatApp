var React = require('react');

module.exports = React.createClass({
    
  getInitialState:function(){
    return {
      text : ""
    }
  },
  render:function(){
    return <div className="input-group">
        <input value={this.state.text} type="text" className="form-control" onChange={this.handelInputChange}/>
        <span className="input-group-btn">
          <button onClick={this.handelClick} className="btn btn-default" type="button">  Add </button>
        </span>
    </div>
  },
  handelClick:function(){
    //add data to the firebase
    this.props.itemResorce.push({
        name:   this.state.text,
        isDone : false
      });
    this.setState({text : ""});

  },
  handelInputChange:function(evt){
    //change the state
    this.setState({text : evt.target.value})
  }
});
