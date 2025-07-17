const mix = require('laravel-mix');

mix.postCss(
    'website/assets/tailwind.css',
    'website/assets/style.css',
    [
        require('tailwindcss'),
    ]
);

mix.options({
    processCssUrls: false,
});

mix.disableNotifications();