import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppState } from '../store';
import Home from './Home';
import About from './About';

class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Switch>
				<Route path='/about' component={About} />
				<Route path='*' render={() => (<Home {...this.props} />)} />
			</Switch>
		);
	}

}

const mapStateToProps = (state: AppState) => ({ ...state });

export default connect(mapStateToProps)(Main);
