# grunt-simple-mocha

A simple wrapper for running tests with Mocha. It's pretty much a cleaned up
and plugin-ized version of [this helpful Gist by johnkpaul][johnkpaul_gist].

If you're looking to run client-side specs with PhantomJS, you might be
interested in [grunt-mocha][othermocha].

## Installation
1. Install this grunt plugin next to your project's
   [Gruntfile.js][getting_started] with:
   ```javascript
   npm install grunt-simple-mocha --save-dev
   ```

2. Then add this line to your project's `grunt.js` gruntfile:
   ```javascript
   grunt.loadNpmTasks('grunt-simple-mocha');
   ```

## Usage

In your Gruntfile.js:

```javascript
grunt.initConfig({
  simplemocha: {
    all: {
      src: ['test/**/*.js', '**/*.spec.js']
    }
  }
});

// For this to work, you need to have run `npm install grunt-simple-mocha`
grunt.loadNpmTasks('grunt-simple-mocha');

// Add a default task. This is optional, of course :)
grunt.registerTask('default', 'simplemocha');
```

Now, you can just run `grunt simplemocha` in your shell to run the tests. That's it!

## Advanced Mocha Options

All `options` parameters are passed directly to Mocha. Therefore, you can use these options to configure how Mocha runs.

  - `ui` name "bdd", "tdd", "exports" etc
  - `reporter` reporter instance, defaults to `mocha.reporters.spec`
  - `globals` array of accepted globals
  - `timeout` timeout in milliseconds
  - `retries` number of times to retry failed tests
  - `bail` bail on the first test failure
  - `slow` milliseconds to wait before considering a test slow
  - `ignoreLeaks` ignore global leaks
  - `fullTrace` display the full stack-trace on failing
  - `grep` string or regexp to filter tests with

The Gruntfile configuration would look like this:

```javascript
grunt.initConfig({
  simplemocha: {
    //
    // These are passed directly to the mocha constructor. See:
    //   https://github.com/mochajs/mocha/blob/master/lib/mocha.js#L56-L74
    //
    options: {
      ui: 'bdd',
      reporter: 'tap',
      globals: ['window','document','$','should'],
      timeout: 3000,
      retries: 2,
      bail: false,
      slow: 2000,
      ignoreLeaks: false,
      fullTrace: true,
      grep: 'users'
    },

    all: { src: ['test/**/*.js'] }
  }
});
```


## Running tests

Run `npm install && npm test`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test your
code using [grunt][grunt_github].

## Migration Guides

### Updating from 0.2.x to 0.3.x

This task now depends on grunt 0.4.x. Please see the
[grunt 0.3 to 0.4 migration guide][migration_guide] for more details.

### Updating from 0.1.x to 0.2.x

If you were using 0.1.x, the task name has changed from `mocha` to
`simplemocha` to avoid confusion with [grunt-mocha][othermocha]. Please make
sure your grunt.js file is updated. See [#3][issue3].  

## Release History

* v0.1 - Woo!
* v0.2 - Changed the task name from `mocha` to `simplemocha`. See [#3][issue3].
* v0.3 - Updated to support grunt 0.4.x.
* v0.4 - Updated to support node 0.10.x.
* v0.4.1 - Updated readme and added tests.

## License
Copyright (c) 2012 Mukund Lakshman

Licensed under the MIT license.

[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
[johnkpaul_gist]: https://gist.github.com/2361303
[grunt_github]: http://github.com/cowboy/grunt
[issue3]: https://github.com/yaymukund/grunt-simple-mocha/issues/3
[othermocha]: https://github.com/kmiyashiro/grunt-mocha
[migration_guide]: https://github.com/gruntjs/grunt/wiki/Upgrading-from-0.3-to-0.4
