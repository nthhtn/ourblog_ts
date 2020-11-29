import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
	username: string;
	email: string;
	password: string;
	salt: string;
	fullName: string;
};

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		unique: true
	},
	salt: {
		type: String,
		required: true
	},
	fullName: {
		type: String,
		required: true
	}
});

const User: Model<IUser> = model('User', userSchema);

export default User;
