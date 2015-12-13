import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ping } from '../actions';

let React = require('react');
let jade = require('react-jade');

class Root extends React.Component {
  render() {
    return jade.compileFile(__dirname + '/Root.jade').call(this);
  }
}

export default connect(
  (state) => ({
    facebookLoginStatus: state.facebookLoginStatus,
    result: JSON.stringify(state.result),
  }),
  (dispatch) => bindActionCreators({
    ping,
  }, dispatch)
)(Root);
