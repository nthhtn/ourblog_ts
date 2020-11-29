import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppState } from '../store';
import Home from './Home';
import About from './About';
import ArticleDetails from './ArticleDetails';

class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Switch>
				<Route exact path='/about' component={About} />
				<Route exact path='/articles/:title' render={(props) => (<ArticleDetails {...this.props} {...props} />)} />
				<Route path='*' render={() => (<Home {...this.props} />)} />
			</Switch>
		);
	}

}

const mapStateToProps = (state: AppState) => ({ ...state });

export default connect(mapStateToProps)(Main);
