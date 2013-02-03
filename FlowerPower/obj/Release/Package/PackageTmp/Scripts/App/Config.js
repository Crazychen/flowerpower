// Set the require.js configuration for your application.
require.config({
    deps: ["Main"],
    paths: {
        // Use the underscore build of Lo-Dash to minimize incompatibilities.
        jquery: '/Scripts/libs/jquery/jquery',
        jqueryui: '/Scripts/libs/jquery/jqueryui',
        underscore: '/Scripts/libs/underscore/underscore-amd',
        backbone: '/Scripts/libs/backbone/backbone-amd',
        knockout: '/Scripts/libs/knockout/knockout',
        knockback: '/Scripts/libs/knockback/amd-0.16.7/knockback',
        text: '/Scripts/libs/require/text',
        // Put additional paths here.
    },
    map: {
        // Ensure Lo-Dash is used instead of underscore.
        //"*": { "underscore": "lodash" }

        // Put additional maps here.
    },
    shim: {
        'jqueryui': 'jquery',
        'knockback': 'knockout',
        // Put shims here.
    }

});