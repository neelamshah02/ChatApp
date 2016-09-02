var React = require('react');


module.exports = React.createClass({
    render:function(){
        var message = this.props.message;
        return <li className="media">

            <div className="media-body">

                <div className="media">
                    <a className="pull-left">
                        <img className="media-object img-user img-circle " src="imges/user.png"  />
                    </a>
                    <div className="media-body" >
                        {message.msg}
                        <br />
                        <small className="text-muted">{message.senderName} | {message.datetime}</small>
                        <hr />
                    </div>
                </div>

            </div>
        </li>
    }
});