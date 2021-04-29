import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import bluebird from 'bluebird';

import Article, { IArticle } from '../models/Article';
import { IUser } from '../models/User';
import Tag, { ITag } from '../models/Tag';
import Category from '../models/Category';

const router: Router = Router();
const folder: string = `${__dirname}/../../../static/uploads`;

interface RequestWithMulter extends Request {
	file: any;
};

router.route('/')
	.post(
		multer({
			storage: multer.diskStorage({
				destination: path.resolve(folder, 'img/cover'),
				filename: (req, file, callback) => {
					const imageId = mongoose.Types.ObjectId();
					const nameArr = file.originalname.split('.');
					const ext = nameArr[nameArr.length - 1];
					return callback(null, `${imageId}.${ext}`);
				}
			})
		}).single('file'),
		async (req: RequestWithMulter, res: Response) => {
			const { title, content, categoryId, tags } = req.body;
			const fields = {
				title,
				content,
				coverImg: `/assets/uploads/img/cover/${req.file.filename}`,
				categoryId,
				authorId: (req.user as IUser)._id
			};
			let article = new Article(fields);
			await article.save();
			let newTags = [];
			await bluebird.map(JSON.parse(tags), async (tag) => {
				const newTag = await Tag.findOneAndUpdate({ tagValue: tag }, { $addToSet: { articles: article._id } }, { upsert: true, new: true });
				newTags.push(newTag);
			});
			article = await Article.findByIdAndUpdate(article._id, { tags: newTags.map((item) => (item._id)) }, { new: true });
			return res.json({ success: true, result: article });
		})
	.get(async (req: Request, res: Response) => {
		const page: number = req.query.page ? Number(req.query.page) : 1;
		const limit: number = req.query.limit ? Number(req.query.limit) : 5;
		let filter_options = Object.assign({});
		if (req.query.categoryId) {
			filter_options.categoryId = req.query.categoryId
		}
		const result: Array<IArticle> = await Article.find(filter_options).sort({ createdAt: -1 })
			.skip((page - 1) * limit).limit(limit)
			.populate({ path: 'authorId', select: 'fullName' })
			.populate({ path: 'categoryId', select: 'displayName' })
			.exec();
		const count: number = await Article.countDocuments({});
		return res.json({ success: true, result, count });
	});

router.route('/title/:title')
	.get(async (req: Request, res: Response) => {
		const article = await Article.findOne({ title: req.params.title })
			.populate({ path: 'tags', select: 'tagValue' })
			.populate({ path: 'authorId', select: 'fullName' })
			.populate({ path: 'categoryId', select: 'displayName' })
			.exec();
		return res.json({ success: true, result: article });
	});

router.route('/category/:category')
	.get(async (req: Request, res: Response) => {
		const page: number = req.query.page ? Number(req.query.page) : 1;
		const limit: number = req.query.limit ? Number(req.query.limit) : 5;
		const category = await Category.findOne({ displayName: req.params.category });
		const result: Array<IArticle> = await Article.find({ categoryId: category._id }).sort({ createdAt: -1 })
			.skip((page - 1) * limit).limit(limit)
			.populate({ path: 'authorId', select: 'fullName' })
			.populate({ path: 'categoryId', select: 'displayName' })
			.exec();
		const count: number = await Article.countDocuments({ categoryId: category._id });
		return res.json({ success: true, result, count });
	});

router.route('/search')
	.get(async (req: Request, res: Response) => {
		const page: number = req.query.page ? Number(req.query.page) : 1;
		const limit: number = req.query.limit ? Number(req.query.limit) : 5;
		let filterOptions = Object.assign({});
		if (req.query.category) {
			const categoryIds = (req.query.category as string || '').split(',');
			filterOptions.categoryId = { $in: categoryIds };
		}
		if (req.query.keyword) {
			const keyword = req.query.keyword as string || '';
			const regexFilter = { $regex: new RegExp(keyword, 'gi') };
			filterOptions['$or'] = [{ title: regexFilter }, { content: regexFilter }];
		}
		const result: Array<IArticle> = await Article.find(filterOptions)
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit).limit(limit)
			.populate({ path: 'authorId', select: 'fullName' })
			.populate({ path: 'categoryId', select: 'displayName' })
			.exec();
		const count: number = await Article.countDocuments(filterOptions);
		return res.json({ success: true, result, count });
	});

router.route('/:id')
	.get(async (req: Request, res: Response) => {
		const article = await Article.findOne({ _id: req.params.id }).populate({ path: 'tags', select: 'tagValue' }).exec();
		return res.json({ success: true, result: article });
	})
	.put(async (req: Request, res: Response) => {
		const { tags } = req.body;
		let article = await Article.findOne({ _id: req.params.id }).populate({ path: 'tags', select: 'tagValue' }).exec();
		const removeTags = article.tags.filter((tag) => !tags.includes(tag.tagValue));
		await Tag.updateMany(
			{ _id: { $in: removeTags.map((tag) => (tag._id)) } },
			{ $pull: { articles: [req.params.id] } }
		);
		let addTags = [];
		await bluebird.map(tags, async (tag) => {
			const newTag = await Tag.findOneAndUpdate({ tagValue: tag }, { $addToSet: { articles: article._id } }, { upsert: true, new: true });
			addTags.push(newTag);
		});
		article = await Article.findByIdAndUpdate(article._id, { ...req.body, tags: addTags.map((item) => (item._id)) }, { new: true });
		return res.json({ success: true, result: article });
	})
	.delete(async (req: Request, res: Response) => {

	});

export default router;
