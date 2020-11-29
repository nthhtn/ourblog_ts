import crypto from 'crypto';

export function hashPassword(password: string, salt: string) {
	let hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	return hash.digest('hex');
};

export function generateSalt(length = 16) {
	return crypto.randomBytes(length).toString('hex');
};
