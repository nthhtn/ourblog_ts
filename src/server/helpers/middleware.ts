import { Request, Response } from 'express';

export function isLoggedIn(req: Request, res: Response, next: Function) {
	return req.isAuthenticated() ? next() : res.status(401).json({ success: false, error: 'Invalid session' });
};

export function isNotLoggedIn(req: Request, res: Response, next: Function) {
	return req.isUnauthenticated() ? next() : res.status(402).json({ success: false, error: 'Invalid session' });
};
