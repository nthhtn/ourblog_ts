import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import bluebird from 'bluebird';

import Article, { IArticle } from '../models/Article';
import { IUser } from '../models/User';
import Tag, { ITag } from '../models/Tag';

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
		const result: Array<IArticle> = await Article.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec();
		const count: number = await Article.countDocuments({});
		return res.json({ success: true, result, count });
	});

router.route('/title/:title')
	.get(async (req: Request, res: Response) => {
		const article = await Article.findOne({ title: req.params.title });
		return res.json({ success: true, result: article });
	});

router.route('/:id')
	.get(async (req: Request, res: Response) => {
		const article = await Article.findOne({ _id: req.params.id });
		return res.json({ success: true, result: article });
	})
	.put(async (req: Request, res: Response) => {
		const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
		return res.json({ success: true, result: article });
	})
	.delete(async (req: Request, res: Response) => {

	});

export default router;
