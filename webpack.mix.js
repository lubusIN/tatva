const mix = require('laravel-mix');

mix.postCss(
    'assets/tailwind.css',
    'assets/style.css',
    [
        require('tailwindcss'),
    ]
);

mix.options({
    processCssUrls: false,
});

mix.disableNotifications();