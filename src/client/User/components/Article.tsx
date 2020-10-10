import React, { Component } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';

import { listArticle, createArticle } from '../actions/article';

interface ArticleProps {
	changeMode?: Function,
	dispatch?: ThunkDispatch<any, any, AnyAction>
};

interface ArticleState {
	mode: string,
	_id: string,
	title: string,
	content: string
};

let self;

class ArticleTable extends Component<ArticleProps, {}> {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of blog post</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-content">
							<button type="button" className="btn btn-success mr-1 mb-3"
								onClick={() => this.props.changeMode('add')}>
								<i className="fa fa-fw fa-plus mr-1"></i> Write a blog post
							</button>
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-vcenter">
									<thead>
										<tr>
											<th className="text-center" style={{ width: '5%' }}>#</th>
											<th style={{ width: '20%' }}>Title</th>
											<th style={{ width: '40%' }}>Content</th>
											<th style={{ width: '10%' }}>Category</th>
											<th className="text-center" style={{ width: '20%' }}><i className="far fa-user"></i></th>
											<th className="text-center" style={{ width: '15%' }}>Actions</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}

};

interface ContentEditorState {
	editorState: EditorState
}

interface ContentEditorProps extends ArticleProps {
	editorMode: string;
	articleId?: string;
	title?: string;
	content?: string;
}


class ArticleEditor extends Component<ContentEditorProps, ContentEditorState>{

	constructor(props) {
		super(props);
		this.state = { editorState: EditorState.createEmpty() };
		self = this;
	}

	componentDidMount() {
		jQuery(() => {
		});
	}

	onChange(editorState) {
		self.setState({ editorState });
	}

	async createArticle() {
		const title = ($('#input-title').val() as string).trim();
		const contentState: ContentState = self.state.editorState.getCurrentContent();
		const content = stateToHTML(contentState);
		await self.props.dispatch(createArticle({ title, content }));
		self.props.changeMode('view', { _id: null, title: '', content: '' });
	}

	async updateArticle() {
		// const id = self.props.postId;
		// const content = `${self.props.postContent}\n and updated at ${Date.now()}`;
		// await self.props.dispatch(updateArticle(id, { content }));
		self.props.changeMode('view', { _id: null, title: '', content: '' });
	}

	render() {
		const { editorState } = this.state;
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">Write a new blog post</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-content block-content-full">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="input-title">Blog title</label>
										<input type="text" className="form-control" id="input-title" placeholder="Title" />
									</div>
									<Editor
										wrapperClassName="wrapper-class"
										editorClassName="editor-class"
										toolbarClassName="toolbar-class"
										editorStyle={{
											padding: "0 12px", borderRadius: "2px", border: "1px solid #F1F1F1",
											minHeight: "300px", maxHeight: "500px"
										}}
										editorState={editorState}
										ref='contentEditor'
										onEditorStateChange={this.onChange}
									/>
									<div className="row" style={{ margin: 0 }}>
										<div className="form-group col-md-6" style={{ paddingLeft: 0 }}>
											<label>Category</label>
											<select className="custom-select">
												<option value="0">Please select</option>
												<option value="1">Option #1</option>
												<option value="2">Option #2</option>
												<option value="3">Option #3</option>
											</select>
										</div>
										<div className="form-group col-md-6">
											<label className="d-block" htmlFor="input-image">Cover image</label>
											<input type="file" id="input-image" />
										</div>
									</div>
								</div>
								<div className="col-md-6">
								</div>
							</div>

							<button type="button" className="btn btn-primary mr-1 mb-3"
								onClick={this.props.editorMode === 'add' ? this.createArticle : this.updateArticle}>
								<i className="fa fa-plus-square mr-1"></i> Submit
							</button>
							<button type="button" className="btn btn-secondary mr-1 mb-3" onClick={() => this.props.changeMode('view')}>
								<i className="fa fa-stop-circle mr-1"></i> Cancel
							</button>
						</div>
					</div>
				</div>
			</main>
		);
	}

}

export default class Article extends Component<ArticleProps, ArticleState> {

	constructor(props) {
		super(props);
		this.state = { mode: 'view', _id: null, title: '', content: '' };
	}

	componentDidMount() {
		this.props.dispatch(listArticle());
	}

	changeMode(mode, data) {
		this.setState({ ...this.state, ...data, mode });
	}

	render() {
		const { mode, _id, title, content } = this.state;
		return mode === 'view' ?
			(<ArticleTable changeMode={this.changeMode.bind(this)} {...this.props} />) :
			(<ArticleEditor changeMode={this.changeMode.bind(this)} {...this.props} editorMode={mode}
				articleId={_id} title={title} content={content} />);
	}

};
