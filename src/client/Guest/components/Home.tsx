import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Pagination from 'react-js-pagination';
import ReactHtmlParser from 'react-html-parser';

import { listArticles } from '../actions/article';
import Article from '../types/Article';
import Sidebar from './Sidebar';
import { scrollToElement } from '../helper';

class ArticleItem extends Component<Article, {}> {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const { _id, title, content, coverImg, createdAt, authorId } = this.props;
		return (
			<div className="col-md-12">
				<div className="blog-entry ftco-animate fadeInUp ftco-animated">
					<Link to={`/articles/${title}`} className="img"
						style={{
							backgroundImage: `url(${coverImg})`, backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'
						}}></Link>
					<div className="text pt-2 mt-5">
						<h3 className="mb-4"><Link to={`/articles/${title}`}>{title}</Link></h3>
						<div className="mb-4">
							{ReactHtmlParser(content)}
						</div>
						<div className="author mb-4 d-flex align-items-center">
							<Link to="#" className="img" style={{ backgroundImage: 'url("/assets/explore/images/person_1.jpg")' }}></Link>
							<div className="ml-3 info">
								<h3><Link to="#">{authorId?.fullName}</Link>, <span>{createdAt}</span></h3>
							</div>
						</div>
						<div className="meta-wrap d-md-flex align-items-center">
							<div className="half">
								<p><Link to={`/articles/${title}`} className="btn btn-primary p-3 px-xl-4 py-xl-3">Continue Reading</Link></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

interface HomeProps {
	dispatch?: ThunkDispatch<any, any, AnyAction>;
	article?: { list: Article[]; current: Article; page: number; count: number };
};

interface HomeState {
	activePage: number;
};

export default class Home extends Component<HomeProps, HomeState> {

	constructor(props) {
		super(props);
		this.state = { activePage: 1 };
	}

	async componentDidMount() {
		await this.props.dispatch(listArticles(1, 5));
	}

	async onPageChange(page) {
		await this.props.dispatch(listArticles(page, 5));
		scrollToElement('articles-wrapper');
	}

	render() {
		return (
			<section className="ftco-section" id="articles-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="row">
								{this.props.article.list.map((item) => (<ArticleItem {...item} key={item._id} />))}
							</div>
							<div className="row mt-5">
								<div className="col text-center">
									<div className="block-27">
										<Pagination
											innerClass='block-27'
											activePage={this.state.activePage}
											itemsCountPerPage={5}
											totalItemsCount={this.props.article.count}
											pageRangeDisplayed={3}
											onChange={this.onPageChange.bind(this)}
										/>
									</div>
								</div>
							</div>
						</div>
						<Sidebar {...this.props} />
					</div>
				</div>
			</section>
		);
	}

}
