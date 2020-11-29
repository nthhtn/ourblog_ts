import { Router, Request, Response } from 'express';

import { IUser } from '../models/User';

const router: Router = Router();

router.route('/me')
	.get(async (req: Request, res: Response) => {
		if (!req.user) {
			return res.json({ success: false, error: 'User not logged in' });
		}
		const { _id, username, email, fullName } = req.user as IUser;
		return res.json({ success: true, result: { _id, username, email, fullName } });
	});

export default router;
