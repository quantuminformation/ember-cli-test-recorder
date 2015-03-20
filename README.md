# Ember-cli-test-recorder

[![Join the chat at https://gitter.im/QuantumInformation/ember-cli-test-recorder](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/QuantumInformation/ember-cli-test-recorder?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Record steps in an Ember app to them be added to an integration test. 

Current UI interactions that are recorded for acceptance tests:

* Button clicks, they also generate andThen code blocks. 
* Record any changes to route after 1 second 

## Usage
Currently this will record all UI interactions to the console. The functionality is contained inside a component.
It needs some additional properties set from the parent application.
* currentRoute: The component observes this.

## Roadmap
* Create an optional UI for the code generation to be output to the browser
* Record any changes to the UI visible to the user using Mutation Observers

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

