module.exports = function (api) {
    api.cache(true);
    const presets = [
        ['@babel/preset-env', {
            'targets': [
                'last 2 version',
                'ie >= 9'
            ],
            modules: false
        }]
    ];
    const plugins = [
    ];
    return {
        presets,
        plugins
    };
};