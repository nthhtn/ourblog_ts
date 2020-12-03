import { Document, Model, model, Schema } from 'mongoose';

import { IUser } from './User';
import { ICategory } from './Category';
import { ITag } from './Tag';

export interface IArticle extends Document {
	title: string;
	content: string;
	coverImg: string;
	createdAt: Date;
	updatedAt: Date;
	authorId: IUser['_id'];
	categoryId: ICategory['_id'];
	tags: ITag['_id'][];
};

const articleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	coverImg: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	authorId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	categoryId: {
		type: Schema.Types.ObjectId,
		ref: 'Category'
	},
	tags: [{
		type: Schema.Types.ObjectId,
		ref: 'Tag'
	}]
});

const Article: Model<IArticle> = model('Article', articleSchema);

export default Article;
