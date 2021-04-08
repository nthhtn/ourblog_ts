import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, $CombinedState } from 'redux';

import './style/Sidebar.css';
import Category from '../types/Category';
import { listCategories } from '../actions/category';

interface SidebarProps {
	dispatch?: ThunkDispatch<any, any, AnyAction>;
	category?: { list: Category[], selected: Category[] }
}

export default class Sidebar extends Component<SidebarProps, {}> {

	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		await this.props.dispatch(listCategories());
		var checkList = document.getElementById('category-checklist');
		checkList.getElementsByClassName('anchor')[0].addEventListener('click', () => {
			if (checkList.classList.contains('visible'))
				checkList.classList.remove('visible');
			else
				checkList.classList.add('visible');
		});
		$('#category-checklist .items li').on('click', (e) => {
			var element = e.target;
			if (element.classList.contains('checked')) {
				element.classList.remove('checked');
			}
			else {
				element.classList.add('checked');
			}
		});
	}

	render() {
		const categories = this.props.category.list;
		console.log(categories);
		return (
			<div className="col-lg-4 sidebar ftco-animate fadeInUp ftco-animated">
				<div className="sidebar-box">
					<form action="#" className="search-form">
						<div className="form-group">
							<span className="icon icon-search"></span>
							<input type="text" className="form-control" placeholder="Type a keyword and hit enter" />
						</div>
						<div className="form-group" style={{ marginTop: '10px' }}>
							<div id="category-checklist" className="dropdown-check-list">
								<label className="anchor">Select category</label>
								<ul className="items">
									{categories.map((item) => (
										<li key={item._id} className="category-check">{item.displayName} <i className="fas fa-check category-checkicon" aria-hidden="true"></i></li>
									))}
								</ul>
							</div>
						</div>
					</form>
				</div>
				<div className="sidebar-box ftco-animate fadeInUp ftco-animated">
					<h3>Categories</h3>
					<ul className="categories">
						<li><Link to="#">Africa <span>(6)</span></Link></li>
						<li><Link to="#">Asia <span>(8)</span></Link></li>
					</ul>
				</div>
				{/* <div className="sidebar-box ftco-animate fadeInUp ftco-animated">
					<h3>Popular Articles</h3>
					<div className="block-21 mb-4 d-flex">
						<Link to="#" className="blog-img mr-4" style={{ backgroundImage: 'url("/assets/explore/images/image_1.jpg")' }}></Link>
						<div className="text">
							<h3 className="heading"><Link to="#">Even the all-powerful Pointing has no control about the blind texts</Link></h3>
							<div className="meta">
								<div><Link to="#"><span className="icon-calendar"></span> Oct. 04, 2018</Link></div>
								<div><Link to="#"><span className="icon-person"></span> Dave Lewis</Link></div>
								<div><Link to="#"><span className="icon-chat"></span> 19</Link></div>
							</div>
						</div>
					</div>
				</div> */}
				<div className="sidebar-box ftco-animate fadeInUp ftco-animated">
					<h3>Tag Cloud</h3>
					<ul className="tagcloud">
						<Link to="#" className="tag-cloud-link">dish</Link>
						<Link to="#" className="tag-cloud-link">menu</Link>
						<Link to="#" className="tag-cloud-link">food</Link>
						<Link to="#" className="tag-cloud-link">sweet</Link>
						<Link to="#" className="tag-cloud-link">tasty</Link>
						<Link to="#" className="tag-cloud-link">delicious</Link>
						<Link to="#" className="tag-cloud-link">desserts</Link>
						<Link to="#" className="tag-cloud-link">drinks</Link>
					</ul>
				</div>
			</div>
		);
	}

}
