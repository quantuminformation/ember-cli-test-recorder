import Ember from 'ember';

export default Ember.Component.extend({
  generatedScript: "",//holds the script to be rendered in <pre> tags for copyed as source
  currentRouteName: "",
  routeHasChanged: false, //if true render a test condition for this
  onCurrentRouteNameChange: function () {
    //console.log(this.get("currentRouteName"));

    /* //todo alternative?
     window.onhashchange = function locationHashChanged() {
     };
     window.addEventListener('popstate', function locationHashChanged(e) {
     });
     * */
    //todo have a timing mechanism or wait for all promises are fulfilled
    this.set("routeHasChanged", true);
  }.observes("currentRouteName"),

  /**
   * Initialize Test recorder
   * @return {undefined}
   */
  didInsertElement: function () {

    var emberSelector = '[id^=ember],[data-ember-action]';
    var self = this;
    var indendation = '  ';//2 spaces

    Ember.$.fn.extend({
      path: function () {

        if (this.length !== 1) {
          throw 'Requires one element.';
        }

        var path, node = this;
        while (node.length) {
          var realNode = node[0], name = realNode.localName;
          if (!name) {
            break;
          }
          name = name.toLowerCase();

          var parent = node.parent();

          var siblings = parent.children(name);
          if (siblings.length > 1) {
            name += ':eq(' + siblings.index(realNode) + ')';
          }

          path = name + (path ? '>' + path : '');
          node = parent;
        }

        return path;
      }
    });

    Ember.$(document).on('click', function (e) {

      var $target = $(e.target);
      var $emberTarget = $target.is(emberSelector) ? $target : $target.parent(emberSelector);

      if ($emberTarget.length) {
        var pathPrint = e.target.id ? "#" + e.target.id : $emberTarget.path();
        var newTestPrint = 'click("' + pathPrint + '");<br/>' + 'andThen(function () {' + '<br/>';

        if (self.get("routeHasChanged")) {
          newTestPrint += indendation + 'equal(currentRouteName(), "' + self.get("currentRouteName") +
          ', "The page navigates to ' + self.get("currentRouteName") +
          ' on button click");<br/>'; //todo make reason more dynamic
          self.set("routeHasChanged", false);
        }

        newTestPrint += '});<br/><br/>'
        // console.log(testLinePrint);
        self.set("generatedScript", self.get("generatedScript") + newTestPrint);
        $("#generatedCode").html('<pre>' + self.get("generatedScript") + '</pre>');
      }

    });


    /*    var target = document.querySelector('body');

     var observer = new MutationObserver(function (mutations) {
     mutations.forEach(function (mutation) {
     console.log(mutation.type);
     });
     });
     var config = {attributes: true, childList: true, characterData: true};

     observer.observe(target, config);
     //observer.disconnect();*/


  }
});
