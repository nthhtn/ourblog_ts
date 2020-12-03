import { Document, Model, model, Schema } from 'mongoose';

import { IArticle } from './Article';

export interface ITag extends Document {
	tagValue: string;
	articles: IArticle['_id'][];
};

const tagSchema = new Schema({
	tagValue: {
		type: String,
		required: true,
		unique: true
	},
	articles: [{
		type: Schema.Types.ObjectId,
		ref: 'Article'
	}]
});

const Tag: Model<ITag> = model('Tag', tagSchema);

export default Tag;
