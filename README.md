# grunt-simple-mocha

A simple wrapper for running tests with Mocha. It's pretty much a cleaned up
and plugin-ized version of
[this helpful Gist by johnkpaul](https://gist.github.com/2361303).

## Installation
1. Install this grunt plugin next to your project's
   [grunt.js gruntfile][getting_started] with: `npm install grunt-simple-mocha`

2. Then add this line to your project's `grunt.js` gruntfile:
   ```javascript
   grunt.loadNpmTasks('grunt-simple-mocha');
   ```

## Usage
In your grunt.js:

```javascript
grunt.initConfig({
  mocha: {
    all: {
      src: 'test/**/*.js',
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        grep: '*-test',
        ui: 'bdd',
        reporter: 'tap'
      }
    }
  }
});

// For this to work, you need to have run `npm install grunt-simple-mocha`
grunt.loadNpmTasks('grunt-simple-mocha');

// Add a default task.
grunt.registerTask('default', 'mocha');
```

Now, you can just run `grunt mocha` in your shell to run the tests. That's it!

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test your
code using [grunt][grunt].

## Release History
v0.1 - Woo!

## License
Copyright (c) 2012 Mukund Lakshman

Licensed under the MIT license.
