var React = require('react');
var ReactDOM = require('react-dom');
var Chat = require('./chatWindow');
var Register =require('./register');

var ReactRouter =require('react-router');
var Router=ReactRouter.Router;
var Route=ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory  = ReactRouter.browserHistory;

//history={browserHistory}
var routes =(
    <Router >
        <Route path="/" component={Register} />
        <Route path="/chat/:user" component={Chat} />

    </Router>
);






//var element = React.createElement(Login, {});
ReactDOM.render(routes, document.querySelector('.container'));
