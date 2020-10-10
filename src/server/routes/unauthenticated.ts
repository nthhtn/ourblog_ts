import { Router, Request, Response } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
// import { hashPassword, generateSalt } from '../helpers/password';
import User, { IUser } from '../models/User';

const router: Router = Router();

router.route('/login')
	.post(async (req: Request, res: Response) => {

	});

export default router;
