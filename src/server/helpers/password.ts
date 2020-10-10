import crypto from 'crypto';

module.exports = {
	hashPassword: (password: string, salt: string) => {
		let hash = crypto.createHmac('sha512', salt);
		hash.update(password);
		return hash.digest('hex');
	},
	generateSalt: (length = 16) => {
		return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
	}
};
