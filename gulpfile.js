	var gulp       = require('gulp'), // Подключаем Gulp
		sass         = require('gulp-sass'), //Подключаем Sass пакет,
		browserSync  = require('browser-sync'), // Подключаем Browser Sync
		cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
		rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
		del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
		imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
		pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
		cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
		autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку дл
		concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
		uglify      = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)
	 
gulp.task('sass', function(){ // Создаем таск "sass"
	return gulp.src('source/sass/**/*.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
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
	return gulp.src('source/js/script.js')
		.pipe(browserSync.reload({stream: true}))
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('source/js')); // Выгружаем в папку app/js
});

gulp.task('code', function() {
	return gulp.src('source/*.html')
	.pipe(browserSync.reload({ stream: true }))
});


gulp.task('css-libs', function() {
	return gulp.src('source/css/styles.css') // Выбираем файл для минификации
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('source/css')); // Выгружаем в папку app/css
});

gulp.task('clean', async function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('source/img/**/*') // Берем все изображения
		.pipe(cache(imagemin({ // С кешированием
		// .pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('prebuild', async function() {
 
	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'source/css/styles.css',
		'source/css/styles.min.css'
		])
	.pipe(gulp.dest('dist/css'))
 
	var buildFonts = gulp.src('source/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))
 
	var buildJs = gulp.src('source/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))
 
	var buildHtml = gulp.src('source/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));
 
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})	

gulp.task('watch', function(){
	gulp.watch('source/sass/**/*.scss', gulp.parallel('sass'));
	gulp.watch('source/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('source/js/script.js', gulp.parallel('scripts')); // Наблюдение за главным JS файлом

});
gulp.task('default', gulp.parallel('css-libs', 'sass', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass'));

 
