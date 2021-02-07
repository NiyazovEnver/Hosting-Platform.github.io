var gulp = require('gulp'), // Подключаем Gulp
	sass = require('gulp-sass'); //Подключаем Sass пакет
	browserSync = require('browser-sync');
 
gulp.task('sass', function(){ // Создаем таск "sass"
	return gulp.src('source/sass/**/*.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(gulp.dest('source/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browser Sync
		server: { // Определяем параметры сервера
			baseDir: 'source' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('scripts', function() {
	return gulp.src(['source/js/common.js', 'source/libs/**/*.js'])
	.pipe(browserSync.reload({ stream: true }))
});
 
gulp.task('code', function() {
	return gulp.src('source/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function(){
	gulp.watch('source/sass/**/*.scss', gulp.parallel('sass'));
	gulp.watch('source/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
	gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом
});
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));

