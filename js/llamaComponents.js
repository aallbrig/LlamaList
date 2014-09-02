/** @jsx React.DOM */
var LoginForm = React.createClass({displayName: 'LoginForm',
  render: function() {
    return (
      <form>
        Username
        <input type="text" className="form-control"/>
        Password
        <input type="password" className="form-control"/>
        <a className="btn btn-primary" href="/home">Submit</a>
      </form>
      );
  }
});
var LoginPanel = React.createClass({displayName: 'LoginPanel',
  render: function() {
    console.log(this);
    return (
      <div className="panel panel-default col-xs-6 col-xs-offset-3">
        <div className="panel-heading">{this.props.displayName}</div>
          <div className="panel-body">
          <LoginForm />
        </div>
      </div>
      );
  }
});
var HamburgerBtn = React.createClass({
  render: function () {
    return (
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      );
  }
});
var LlamaJumbotron = React.createClass({
  render: function () {
    return (
      <div className="jumbotron">
        <div className="container">
          <h2 className="text-center">Search For Some Llamas!</h2>
          <SearchInput className="col-xs-12" action='/search/llamas'/>
        </div>
      </div>
    );
  }
});
var AccountDropdown = React.createClass({
  render: function () {
    return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">{this.props.username}<span className="caret"></span></a>
        <ul className="dropdown-menu" role="menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li className="divider"></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </li>
    );
  }
});
// var SearchBar = React.createClass({displayName: 'SearchBar',
//   handleChange: function(event) {
//     var action = this.props.action || 'home';
//     this.setState({action: action  + '?' + event.target.value});
//     console.log(this.state.action);
//   },
//   handleSubmit: function(event) {
//     event.preventDefault();
//     window.location.href = this.state.action;
//   },
//   render: function(){
//     return (
//       <form className={this.props.className} role="search" onSubmit={this.handleSubmit}>
//         <div className="form-group">
//           <input type="text" className="form-control" defaultValue={this.props.defaultValue} onChange={this.handleChange}/>
//         </div>
//         <button type="submit" className="btn btn-success">Submit</button>
//       </form>
//     );
//   }
// });
var SearchInput = React.createClass({
  displayName: 'Search Input',
  getInitialState: function () {
    return {action:this.props.action || 'home'};
  },
  handleChange: function(event) {
    var that = this;
    $.get(this.state.action,
      {searchTerm: String(event.target.value)},
      function (data){
        console.log(data);
        that.setState({results:data});
      }
    );
    console.log(this.state.action);
  },
  handleSubmit: function(event) {
    event.preventDefault();
    window.location.href = this.state.action;
  },
  render: function () {
    return (
      <form className={this.props.className} role="search" onSubmit={this.handleSubmit}>
        <div className="input-group add-on">
          <input type="text" className="form-control" defaultValue={this.props.defaultValue} onChange={this.handleChange}/>
          <div className="input-group-btn">
            <button className="btn btn-success" type="submit"><i className="fa fa-search"></i></button>
          </div>
        </div>
        <SearchResults results={this.state.results} />
      </form>
    );
  }
});
var SearchResults = React.createClass({
  displayName: 'Search Results',
  render: function () {
    var suggestions = this.props.results || [];
    if(suggestions.length > 0){
      var suggestionsOutput = suggestions.map(function(result, index){
        return (
          <li className="list-group-item">
            {result.name}<span className="pullRight">{result.type}</span>
          </li>
        )
      });
      return (
        <ul className="list-group">
          {suggestionsOutput}
        </ul>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
});
var NavBar = React.createClass({displayName: 'NavBar',
  render: function() {
    return (
      <div className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <HamburgerBtn />
            <a className="navbar-brand" href="/home">{this.props.displayName}</a>
          </div>
          <div className="navbar-collapse collapse">
            <SearchInput defaultValue="Search the Llama List" className="navbar-form navbar-left" action='/search/llamas'/>
            <ul className="nav navbar-nav navbar-right">
              <AccountDropdown username="Default User"/>
            </ul>
          </div>
        </div>
      </div>
      );
  }
});
var LlamaPanel = React.createClass({
  render: function () {
    return (
      <div className="panel panel-success col-xs-4">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.llama.name}</h3>
        </div>
        <div className="panel-body">
          <img src="img/llama.jpg" className="img-responsive" />
          <h4>Species: {this.props.llama.type}</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem ipsum, interdum quis tincidunt in, ultrices et risus. Nunc semper nibh id lorem imperdiet porttitor. Nam vitae viverra dui, nec scelerisque velit. Curabitur non turpis ut ligula commodo lobortis in id augue. In nisi urna, interdum vitae tincidunt sed, auctor ac nibh. Mauris iaculis iaculis elit eu volutpat. Fusce feugiat mattis rutrum. Vivamus fermentum mi non diam imperdiet adipiscing.</p>
          <div className="btn btn-info btn-lg form-control"> Cool! </div>
        </div>
      </div>
    );
  }
});
var LlamaResult = React.createClass({
  render: function () {
    var llamaNodes = this.props.llamas.map(function(llama, index){
      return (
        <LlamaPanel llama={llama}/>
      );
    });
    return (
      <div className="llamaList">
        {llamaNodes}
      </div>
    );
  }
});