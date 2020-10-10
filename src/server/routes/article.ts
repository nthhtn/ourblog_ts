import { Router, Request, Response } from 'express';
import Article, { IArticle } from '../models/Article';
import User from '../models/User';

const router: Router = Router();

router.route('/')
	.post(async (req: Request, res: Response) => {
		const { title, content } = req.body;
		const fields = { title, content };
		const article = new Article(fields);
		await article.save();
		console.log(article);
		return res.json({ success: true, result: article });
	})
	.get(async (req: Request, res: Response) => {
		const result: Array<IArticle> = await Article.find({}).exec();
		console.log(result);
		return res.json({ success: true });
	});

router.route('/:id')
	.put(async (req: Request, res: Response) => {

		return res.json({ success: true });
	});

export default router;
