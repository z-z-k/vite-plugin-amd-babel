const cheerio = require('cheerio');
const { babel } = require('@rollup/plugin-babel');
function amd(options) {
    if (!options) options = {};
    var requirejs = options.requirejs || "https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.min.js";
    return {
        name: 'amd',
        apply: 'build',
        configResolved(resolvedConfig) {
            resolvedConfig.plugins.push(babel({
                extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue']
            }))
        },
        config(config, { command }) {
            if (command === 'build') {
                var build = config.build;
                if (!build) {
                    build = config.build = {};
                }
                var rollupOptions = build.rollupOptions;
                if (!rollupOptions) {
                    rollupOptions = build.rollupOptions = {};
                }
                var output = rollupOptions.output;
                if (!output) {
                    output = rollupOptions.output = {};
                }
                build.polyfillModulePreload = false;
                output.format = "amd";
                output.freeze = options.freeze || false;
                output.strict = options.strict || false;
                output.interop = options.interop || false;
            }
        },

        transformIndexHtml(html, { bundle }) {
            const $ = cheerio.load(html);
            var entries = [];
            $('script[type=module]').each(function () {
                var url = $(this).attr('src');
                if (!url.match(/^\w+:/.test(url))) {
                    entries.push(url);
                    $(this).remove();
                }
            });
            $('link[rel=modulepreload]').each(function () {
                var url = $(this).attr('href');
                if (!url.match(/^\w+:/.test(url))) {
                    entries.push(url);
                    $(this).remove();
                }
            });
            $('head').append(
                $('<script></script>').attr('src', requirejs).attr('data-main', entries[0])
            );
            // $('head').append(
            // 	$('<script></script>').html(`require(${JSON.stringify(entries)})`)
            // );
            return $.html();
        }
    }
}
amd.default = amd;
module.exports = amd;