import React, { Component } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Pagination from 'react-js-pagination';

import { listArticles, createArticle, updateArticle, deleteArticle } from '../actions/article';
import Article from '../types/Article';

interface ArticleViewProps {
	changeMode?: Function;
	dispatch?: ThunkDispatch<any, any, AnyAction>;
	article?: { list: Article[], current: Article };
};

interface ArticleViewState {
	mode: string;
	_id: string;
	title: string;
	content: string;
};

class ArticleTable extends Component<ArticleViewProps, {}> {

	constructor(props) {
		super(props);
		this.state = {};
	}

	onRowClick(row) {
		this.props.changeMode('edit', row);
	}

	render() {
		const list = this.props.article.list.map((item) => {
			return item;
		});
		const options = {
			onRowClick: this.onRowClick.bind(this)
		};
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
							<BootstrapTable data={list} hover options={options} bodyStyle={{ cursor: 'pointer' }}>
								<TableHeaderColumn dataField='_id' isKey={true} hidden></TableHeaderColumn>
								<TableHeaderColumn dataField='title' columnClassName="font-w600" tdStyle={{ color: '#5c80d1' }} width="20%">
									Title
								</TableHeaderColumn>
								<TableHeaderColumn dataField='content' width="50%">Brief Content</TableHeaderColumn>
								<TableHeaderColumn dataField='createdAt' width="30%">Created At</TableHeaderColumn>
							</BootstrapTable>
						</div>
					</div>
				</div>
			</main>
		);
	}

};

interface ContentEditorState {
	editorState: EditorState;
	coverImg: string;
	file: File;
}

interface ContentEditorProps extends ArticleViewProps {
	editorMode: string;
	articleId?: string;
	title?: string;
	content?: string;
}

class ArticleEditor extends Component<ContentEditorProps, ContentEditorState>{

	constructor(props) {
		super(props);
		const { contentBlocks, entityMap } = convertFromHTML(this.props.content);
		const contentState: ContentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
		this.state = {
			editorState: EditorState.createWithContent(contentState),
			coverImg: '',
			file: null
		};
	}

	componentDidMount() {
		$('#input-title').val(this.props.title);
	}

	onEditorChange(editorState) {
		this.setState({ editorState });
	}

	previewCoverImg(e: React.ChangeEvent<HTMLInputElement>) {
		e.target.files && e.target.files.length > 0 &&
			this.setState({ coverImg: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] })
	}

	async createArticle() {
		const title = ($('#input-title').val() as string).trim();
		const contentState: ContentState = this.state.editorState.getCurrentContent();
		const content = stateToHTML(contentState);
		const file = this.state.file;
		if (!title || !content || !file) {
			return $('.input-error').html('Missing required field(s)');
		}
		$('.input-error').html('');
		await this.props.dispatch(createArticle({ title, content, file: this.state.file }));
		this.props.changeMode('view', { _id: null, title: '', content: '' });
	}

	async updateArticle() {
		const id = this.props.articleId;
		const title = ($('#input-title').val() as string).trim();
		const contentState: ContentState = this.state.editorState.getCurrentContent();
		const content = stateToHTML(contentState);
		await this.props.dispatch(updateArticle(id, { title, content }));
		this.props.changeMode('view', { _id: null, title: '', content: '' });
	}

	render() {
		const { editorState, coverImg } = this.state;
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
										<label htmlFor="input-title">Blog title *</label>
										<input type="text" className="form-control" id="input-title" placeholder="Title" />
									</div>
									<Editor
										wrapperClassName="wrapper-class"
										editorClassName="editor-class"
										toolbarClassName="toolbar-class"
										editorStyle={{
											padding: "0 12px", borderRadius: "2px", border: "1px solid #F1F1F1",
											minHeight: "500px", maxHeight: "800px"
										}}
										editorState={editorState}
										ref='contentEditor'
										onEditorStateChange={this.onEditorChange.bind(this)}
									/>
									<div className="row" style={{ margin: 0 }}>
										<div className="form-group col-md-6" style={{ paddingLeft: 0 }}>
											<label>Category *</label>
											<select className="custom-select">
												<option value="0">Please select</option>
												<option value="1">Option #1</option>
												<option value="2">Option #2</option>
												<option value="3">Option #3</option>
											</select>
										</div>
										<div className="form-group col-md-6">
											<label className="d-block" htmlFor="input-image">Cover image *</label>
											<input type="file" id="input-image" accept='image/*' onChange={this.previewCoverImg.bind(this)} />
										</div>
									</div>
								</div>
								<div className="col-md-6">
									{coverImg && <img src={coverImg} style={{ maxWidth: '100%' }} />}
								</div>
								<div className="form-group col-md-6">
									<label className="d-block input-error" style={{ color: 'red' }}></label>
								</div>
							</div>

							<button type="button" className="btn btn-primary mr-1 mb-3"
								onClick={this.props.editorMode === 'add' ? this.createArticle.bind(this) : this.updateArticle.bind(this)}>
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

export default class ArticleView extends Component<ArticleViewProps, ArticleViewState> {

	constructor(props) {
		super(props);
		this.state = { mode: 'view', _id: null, title: '', content: '' };
	}

	componentDidMount() {
		this.props.dispatch(listArticles());
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
