import { Router, Request, Response } from 'express';

import Category, { ICategory } from '../models/Category';

const router: Router = Router();

router.route('/')
	.get(async (req: Request, res: Response) => {
		const result: Array<ICategory> = await Category.find({}).exec();
		return res.json({ success: true, result });
	});

export default router;
