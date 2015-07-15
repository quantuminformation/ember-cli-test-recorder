# Ember-cli-test-recorder

This addon uses a script from this repo: https://github.com/QuantumInformation/test-recorder
Please see this for more details

This records the ways you interact with an Ember application


##Usage

To use this addon, simply include this line of code someone in your app, I recommend in your `app.js`:

```js
import main from 'ember-cli-test-recorder/main';// jshint ignore:line
```
Note: we use jshint ignore:line as we don't actually do anything with the main object, it sets everything up by itself



## Roadmap
* Allow selects to be automated
* Allow more complex click actions like the steps to click on inputs like select2 to be recorded
* Ignore clicks on ember elements with no effect
* Get mutations to work with async effects
* Separate out recording to its own library and just use ember adapters for code test style

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

