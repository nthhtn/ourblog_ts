import { Document, Model, model, Schema } from 'mongoose';

export interface ICategory extends Document {
	name: string;
	displayName: string;
};

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	displayName: {
		type: String,
		required: true
	}
});

const Category: Model<ICategory> = model('Category', categorySchema);

export default Category;
