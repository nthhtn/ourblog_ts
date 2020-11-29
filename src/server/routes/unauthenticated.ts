import { Router, Request, Response } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { hashPassword, generateSalt } from '../helpers/password';
import User, { IUser } from '../models/User';

const router: Router = Router();

passport.use(new Strategy({ usernameField: 'username', passwordField: 'password', passReqToCallback: true },
	async (req: Request, username: string, password: string, done: Function) => {
		const user = await User.findOne({ username });
		if (user.password !== hashPassword(password, user.salt)) {
			return done(null, false, { success: false, error: 'Invalid username/password' });
		}
		return done(null, user);
	}));

router.route('/login')
	.post(async (req: Request, res: Response) => {
		passport.authenticate('local', (err, user, info) => {
			if (err) { return res.status(500).json({ success: false, error: err.message }); }
			if (!user) { return res.status(401).json(info); }
			req.login(user, (err) => {
				if (err) { return res.status(500).json({ success: false, error: err.message }); }
				return res.json({ success: true });
			});
		})(req, res);
	});

export default router;
