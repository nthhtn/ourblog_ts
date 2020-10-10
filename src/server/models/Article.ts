import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from './User';
import { ICategory } from './Category';

export interface IArticle extends Document {
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	authorId: IUser['_id'];
	categoryId: ICategory['_id'];
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
	}
});

const Article: Model<IArticle> = model('Article', articleSchema);

export default Article;
