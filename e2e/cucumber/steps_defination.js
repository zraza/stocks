/* global by */
'use strict';

var chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;
chai.use(chaiAsPromised);

// Generic steps that can be used on any page

module.exports = function() {
  this.Given('I am on the "$page" page', (page, next) => {
    browser.get('/#'+page);
    browser.controlFlow().execute(next);
  });

  this.Then('I should see list of 100 rows',function(){
    expect(element.all(by.repeater('post in vm.posts')).count()).to.eventually.equal(100);
  });

};
