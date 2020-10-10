import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import Article from './Article';
import { AppState } from '../store';

class Main extends Component {

	constructor(props) {
		super(props);
		console.log(props);
		this.state = {};
	}

	render() {
		return (
			<Switch>
				<Route exact path='/dashboard/articles' render={() => (<Article {...this.props} />)} />
				<Route path='/dashboard' component={Home} />
			</Switch>
		);
	}

}

const mapStateToProps = (state: AppState) => ({ ...state });

export default connect(mapStateToProps)(Main);
