import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Pagination from 'react-js-pagination';
import ReactHtmlParser from 'react-html-parser';

import { listArticles } from '../actions/article';
import Article from '../types/Article';

interface HomeProps {
	dispatch?: ThunkDispatch<any, any, AnyAction>;
	article?: { list: Article[], current: Article };
};

interface ArticleItemProps {
	_id: string;
	title: string;
	content: string;
	coverImg: string;
};

class ArticleItem extends Component<ArticleItemProps, {}> {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const { _id, title, content, coverImg } = this.props;
		return (
			<div className="col-md-12">
				<div className="blog-entry ftco-animate fadeInUp ftco-animated">
					<Link to="#" className="img"
						style={{
							backgroundImage: `url(${coverImg})`, backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'
						}}></Link>
					<div className="text pt-2 mt-5">
						<h3 className="mb-4"><Link to="#">{title}</Link></h3>
						<div className="mb-4">
							{ReactHtmlParser(content)}
						</div>
						<div className="author mb-4 d-flex align-items-center">
							<Link to="#" className="img" style={{ backgroundImage: 'url("/assets/explore/images/person_1.jpg")' }}></Link>
							<div className="ml-3 info">
								<h3><Link to="#">Dave Lewis</Link>, <span>October 04, 2018</span></h3>
							</div>
						</div>
						<div className="meta-wrap d-md-flex align-items-center">
							<div className="half">
								<p><Link to="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">Continue Reading</Link></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

class Sidebar extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="col-lg-4 sidebar ftco-animate">
				<div className="sidebar-box">
					<form action="#" className="search-form">
						<div className="form-group">
							<span className="icon icon-search"></span>
							<input type="text" className="form-control" placeholder="Type a keyword and hit enter" />
						</div>
					</form>
				</div>
				<div className="sidebar-box ftco-animate">
					<h3>Categories</h3>
					<ul className="categories">
						<li><Link to="#">Africa <span>(6)</span></Link></li>
						<li><Link to="#">Asia <span>(8)</span></Link></li>
						<li><Link to="#">Australia <span>(2)</span></Link></li>
						<li><Link to="#">Europe <span>(2)</span></Link></li>
						<li><Link to="#">North America <span>(7)</span></Link></li>
						<li><Link to="#">South America <span>(5)</span></Link></li>
					</ul>
				</div>
				<div className="sidebar-box ftco-animate">
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
				</div>
				<div className="sidebar-box ftco-animate">
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

export default class Home extends Component<HomeProps, {}> {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		// var contentWayPoint = function () {
		// 	var i = 0;
		// 	$('.ftco-animate').waypoint(function (direction) {

		// 		if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

		// 			i++;

		// 			$(this.element).addClass('item-animate');
		// 			setTimeout(function () {

		// 				$('body .ftco-animate.item-animate').each(function (k) {
		// 					var el = $(this);
		// 					setTimeout(function () {
		// 						var effect = el.data('animate-effect');
		// 						if (effect === 'fadeIn') {
		// 							el.addClass('fadeIn ftco-animated');
		// 						} else if (effect === 'fadeInLeft') {
		// 							el.addClass('fadeInLeft ftco-animated');
		// 						} else if (effect === 'fadeInRight') {
		// 							el.addClass('fadeInRight ftco-animated');
		// 						} else {
		// 							el.addClass('fadeInUp ftco-animated');
		// 						}
		// 						el.removeClass('item-animate');
		// 					}, k * 50, 'easeInOutExpo');
		// 				});

		// 			}, 100);

		// 		}

		// 	}, { offset: '95%' });
		// };
		// contentWayPoint();
		this.props.dispatch(listArticles());
	}

	render() {
		console.log(this.props.article);
		return (
			<section className="ftco-section">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="row">
								{this.props.article.list.map((item) => (<ArticleItem {...item} key={item._id} />))}
							</div>
							<div className="row mt-5">
								<div className="col text-center">
									<div className="block-27">
										<ul>
											<li><Link to="#">&lt;</Link></li>
											<li className="active"><span>1</span></li>
											<li><Link to="#">2</Link></li>
											<li><Link to="#">3</Link></li>
											<li><Link to="#">&gt;</Link></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<Sidebar />
					</div>
				</div>
			</section>
		);
	}

}
