import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';

import Article, { IArticle } from '../models/Article';
import User from '../models/User';

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
			const { title, content } = req.body;
			const fields = { title, content, coverImg: `/assets/uploads/img/cover/${req.file.filename}` };
			const article = new Article(fields);
			await article.save();
			return res.json({ success: true, result: article });
		})
	.get(async (req: Request, res: Response) => {
		const result: Array<IArticle> = await Article.find({}).exec();
		return res.json({ success: true, result });
	});

router.route('/:id')
	.get(async (req: Request, res: Response) => {
		const article = await Article.findOne({ _id: req.params.id });
		console.log(article);
		return res.json({ success: true, result: article });
	})
	.put(async (req: Request, res: Response) => {
		const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
		return res.json({ success: true, result: article });
	})
	.delete(async (req: Request, res: Response) => {

	});

export default router;
