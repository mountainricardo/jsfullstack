const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const exec = require('child_process').exec;

const paths = {
	allSrcJs: 'src/**/*.js',
	libDir: 'lib',
};

gulp.task('clean', () => {
	console.log('CLEAN');
	return del(paths.libDir);
});

gulp.task('build', ['clean'], ()=> {
	console.log('BUILD');
	return gulp.src(paths.allSrcJs)
	.pipe(babel())
	.pipe(gulp.dest(paths.libDir));
});

gulp.task('main', ['build'], (callback) => {
	console.log('MAIN');
	exec(`node ${paths.libDir}`, (error,stdout) => {
		console.log(stdout);
		return callback(error);
	});
});

gulp.task('watch', () => {
	gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch','main']);