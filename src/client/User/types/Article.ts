export default interface Article {
	_id: string;
	title: string;
	content: string;
	coverImg: string;
	createdAt: Date;
	updatedAt: Date;
	authorId: string;
	categoryId: string;
	tags: string[];
};
