import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import Main from './components/Main';
import { store } from './store';
import { getMyProfile } from './actions/user';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	handleLogin() {
		const username = $('#login-username').val();
		const password = $('#login-password').val();
		if (!username || !password) {
			$('#login-error').html('Invalid username/password');
			return;
		}
		axios.post('/login', { username, password })
			.then((response) => {
				window.location.href = '/';
			})
			.catch((error) => {
				$('#login-error').html(error.response.data.error);
			});
	}

	render() {
		return (
			<div className="modal fade" id="modal-login" tabIndex={-1} role="dialog" aria-labelledby="modal-loginLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="modal-loginLabel">Login</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<input type="text"
									className="form-control form-control-alt form-control-lg"
									id="login-username" placeholder="Username" />
							</div>
							<div className="form-group">
								<input type="password"
									className="form-control form-control-alt form-control-lg"
									id="login-password" placeholder="Password" />
							</div>
							<div className="form-group">
								<label className="d-block" id="login-error" style={{ color: 'red' }}></label>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" onClick={this.handleLogin.bind(this)}>Login</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

// class Root extends Component {

// 	constructor(props) {
// 		super(props);
// 		this.state = {};
// 	}

// 	componentDidMount() {

// 	}

// 	render() {
// 		return (

// 		);
// 	}

// }

store.dispatch(getMyProfile())
	.then(() => {
		const rootComponent = (
			<Provider store={store}>
				<BrowserRouter>
					<nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
						<div className="container">
							<Link className="navbar-brand" to="/">Silly thing</Link>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
								aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
								<span className="oi oi-menu"></span> Menu</button>
							<div className="collapse navbar-collapse" id="ftco-nav">
								<ul className="navbar-nav ml-auto">
									<li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
									<li className="nav-item dropdown">
										<Link className="nav-link dropdown-toggle" to="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Our diary</Link>
										<div className="dropdown-menu" aria-labelledby="dropdown04">
											<Link className="dropdown-item" to="post-right-sidebar.html">Silly things</Link>
											<Link className="dropdown-item" to="post-left-sidebar.html">Silly love</Link>
											<Link className="dropdown-item" to="post-no-sidebar.html">Silly trips</Link>
										</div>
									</li>
									<li className="nav-item dropdown">
										<Link className="nav-link dropdown-toggle" to="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Self story</Link>
										<div className="dropdown-menu" aria-labelledby="dropdown04">
											<Link className="dropdown-item" to="destination.html">Silly gf</Link>
											<Link className="dropdown-item" to="tag.html">Silly bf</Link>
										</div>
									</li>
									<li className="nav-item"><Link to="/about" className="nav-link">About Us</Link></li>
									{
										store.getState().user.me &&
										(<li className="nav-item"><a href="/dashboard" className="nav-link">Dashboard</a></li>)
									}
								</ul>
							</div>
							{
								!store.getState().user.me ?
									(<button className="btn btn-primary py-3 px-5" data-toggle="modal" data-target="#modal-login">
										<i className="fas fa-sign-in-alt"></i> Login
									</button>)
									: (<a href='/logout'><button className="btn btn-primary py-3 px-5">
										<i className="fas fa-sign-out-alt"></i> Logout
									</button></a>)
							}
						</div>
					</nav>
					{
						!store.getState().user.me &&
						(<Login />)
					}
					<div className="hero-wrap js-fullheight" style={{ backgroundImage: 'url("/assets/img/cover.JPG")', height: '962px' }} id="cover-wrapper">
						<div className="overlay"></div>
						<div className="container">
							<div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true"
								style={{ height: '962px' }}>
								<div className="col-md-9 ftco-animate text-center" data-scrollax="properties: { translateY: '70%' }">
									<h1 className="mb-4" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Two silly person</h1>
									<p data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Some silly things, many silly moments, with one silly love</p>
								</div>
							</div>
						</div>
					</div>
					<Main />
					<footer className="ftco-footer ftco-bg-dark ftco-section">
						<div className="container">
							<div className="row">
								<div className="col-md-12 text-center">
									<p>Copyright &copy; All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <Link to="https://colorlib.com" target="_blank">Colorlib</Link></p>
								</div>
							</div>
						</div>
					</footer>
				</BrowserRouter>
			</Provider>
		);
		render(rootComponent, document.getElementById('root'));
		const script = document.createElement("script");
		script.src = "/assets/explore/js/main.js";
		script.async = true;
		script.onload = () => {

		};
		document.body.appendChild(script);
	});
