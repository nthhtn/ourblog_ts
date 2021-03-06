import express, { Request, Response } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import { ConnectionOptions, connect, Error } from 'mongoose';
import morgan from 'morgan';
import webpack from 'webpack';
import path from 'path';

import articleRouter from './routes/article';
import categoryRouter from './routes/category';
import userRouter from './routes/user';
import unauthenticatedRouter from './routes/unauthenticated';
import config from '../../webpack.config';
import { generateCategories } from './helpers/init';

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	secret: 'ourblog_ts',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	// console.log('serialize');
	return done(null, user);
});

passport.deserializeUser((user, done) => {
	// console.log('deserialize');
	return done(null, user);
});

app.use('/assets', express.static(`${__dirname}/../../static`));

app.use(morgan('dev'));

const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

const mongoURI: string = 'mongodb://localhost/ourblog_ts';
const options: ConnectionOptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
};
const viewFolder = `${__dirname}/../../views`;

connect(mongoURI, options).then(async () => {
	console.log('MongoDB Connected...');

	await generateCategories();

	// @route   GET /
	// @desc    Test Base API
	// @access  Public
	// app.get('/', (req, res) => {
	// 	res.send('API Running');
	// });

	app.use('/api/articles', articleRouter);
	app.use('/api/categories', categoryRouter);
	app.use('/api/users', userRouter);
	app.use('/', unauthenticatedRouter);

	app.route('/logout')
		.get((req: Request, res: Response) => {
			if (req.isAuthenticated()) { req.logOut(); }
			return res.sendFile(path.resolve(`${viewFolder}/guest.html`));
		});

	app.route('/dashboard/*')
		.get(async (req: Request, res: Response) => {
			const filename = path.resolve(`${viewFolder}/${req.isAuthenticated() ? 'user' : 'guest'}.html`);
			return res.sendFile(filename);
		});

	app.route('/dashboard')
		.get(async (req: Request, res: Response) => {
			const filename = path.resolve(`${viewFolder}/${req.isAuthenticated() ? 'user' : 'guest'}.html`);
			return res.sendFile(filename);
		});

	app.route('*')
		.get(async (req: Request, res: Response) => {
			res.sendFile(path.resolve(`${viewFolder}/guest.html`));
		});

	const port = app.get('port');
	app.listen(port, () => console.log(`Server started on port ${port}`));

}).catch((error: Error) => {
	console.error(error.message);
	process.exit(1);
});
