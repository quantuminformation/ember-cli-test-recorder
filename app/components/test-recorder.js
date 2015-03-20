import Ember from 'ember';

export default Ember.Component.extend({
  generatedScript: "",
  currentRouteName: "",
  onCurrentRouteNameChange: function () {
    console.log(this.get("currentRouteName"));

    /* //todo alternative?
     window.onhashchange = function locationHashChanged() {
     };
     window.addEventListener('popstate', function locationHashChanged(e) {
     });
    * */

  }.observes("currentRouteName"),

  /**
   * Initialize Test recorder
   * @return {undefined}
   */
  didInsertElement: function () {

    var emberSelector = '[id^=ember],[data-ember-action]',
      self = this;
    $.fn.extend({
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

    $(document).on('click', function (e) {

      var $target = $(e.target);
      var $emberTarget = $target.is(emberSelector) ? $target : $target.parent(emberSelector);

      if ($emberTarget.length) {
        var pathPrint = e.target.id ? "#" + e.target.id : $emberTarget.path();
        var testLinePrint = 'click("' + pathPrint + '");<br/>' +
          'andThen(function () {' +
          '  <br/><br/>' +
          '});<br/><br/>'

        console.log(testLinePrint);
        self.set("generatedScript", self.get("generatedScript") + testLinePrint);
        $("#generatedCode").html(self.get("generatedScript"));
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
