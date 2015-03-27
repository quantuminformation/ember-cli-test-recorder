import Ember from 'ember';




export default Ember.Component.extend({
  classNames: ['dont'],

  MUTATIONS_PLACEHOLDER: "[MUTATIONS_PLACEHOLDER]", //holds text to be added from mutations

  generatedScript: "",//holds the script to be rendered in <pre> tags for copying as source
  renderedScript: "",//holds the actual rendered script

  // holds the script generated by the mutation observers, because
  // want this test recorder to sit outside the ember app and not be intrusive
  pendingGeneratedDomChangedScript: "",

  initialObservedTarget: null,// cache this for performance

  currentRouteName: "",
  routeHasChanged: false, //if true render a test condition for this

  /**
   * selects all the generated source code when user clicks on the UI for the code
   * @param el
   */
  click: function (el) {
    var range;
    if (window.getSelection && document.createRange) {
      range = document.createRange();
      var sel = window.getSelection();
      range.selectNodeContents(el.currentTarget);
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (document.body && document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(el);
      range.select();
    }
  },

  actions: {
    copyToClipBoard: function () {
      //todo
    }
  },

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

  onRenderedScriptChange: function () {
    $("#renderedScript").html(this.get("renderedScript"));
  }.observes("renderedScript"),

  /**
   * Initialize Test recorder
   * @return {undefined}
   */
  didInsertElement: function () {

    this.set("initialObservedTarget", document.querySelector("body [id^=ember]")); // cache this for performance

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    //listen to clicks on ember items, apart from
    //the test recorder UI
    var emberSelector = '[id^=ember]:not(.dont),[data-ember-action]';
    var self = this;
    var indendation = ' ';//2 spaces
    var currentNestedLevel = 0; //tracks the nesting level for mutations

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

      //clear this if not DOM mutations happen ()
      var cleanText = self.get("generatedScript").replace(self.get("MUTATIONS_PLACEHOLDER"), "");
      self.set("generatedScript", cleanText);

      var $target = $(e.target);
      var $emberTarget = $target.is(emberSelector) ? $target : $target.parent(emberSelector);

      if ($emberTarget.length) {
        var pathPrint = e.target.id ? "#" + e.target.id : $emberTarget.path();
        var newTestPrint = 'click("' + pathPrint + '");<br/>' + 'andThen(function () {' + '<br/>';

        //TEST 1 - > Assert the route is what it a changed to
        // todo hook this to afterModel in the final route
        if (self.get("routeHasChanged")) {
          newTestPrint += indendation + 'equal(currentRouteName(), "' +
          self.get("currentRouteName") +
          '", "The page navigates to ' + self.get("currentRouteName") +
          ' on button click");<br/>'; //todo make reason more dynamic
          self.set("routeHasChanged", false);
        }

        //TEST 2 - > Place holder that will be replaced with dom visibility Assertions
        // the last one of these is replaced each time the mutation observes are run
        newTestPrint += self.get("MUTATIONS_PLACEHOLDER") + '<br/>' +

          //Close the and then block
        '});<br/><br/>'
        // console.log(testLinePrint);

        //add to exisiting tests
        self.set("generatedScript", self.get("generatedScript") + newTestPrint);

        //todo hack to fill in mutations
        var withReplacement = self.get("generatedScript").replace(self.get("MUTATIONS_PLACEHOLDER"), self.get("pendingGeneratedDomChangedScript"));
        self.set("generatedScript", withReplacement);
        self.set("pendingGeneratedDomChangedScript", "") //clear

        //wrap in <pre> block to make code well formatted
        self.set("renderedScript", '<pre>' + self.get("generatedScript") + '</pre>');
      }

    });

    /**
     * Adds observer for target and generates source code
     * @param target
     */
    function addObserverForTarget(target) {
      //todo, fix this hack -> this will fire before the onClick of jquery so we cache the generated text here for now
      var observer = new MutationObserver(function (mutations) {

        mutations.forEach(function (mutation) {

          var addedNodesTestText = "";
          var removedNodesTestText = "";

          //convert these to Arrays
          var addedNodesArray = Array.prototype.slice.call(mutation.addedNodes);
          var removedNodesArray = Array.prototype.slice.call(mutation.removedNodes);

          //ignore non tagged markup like carriage returns //todo investigate why ember does this, potential reflow issue
          //ignore things with no id
          //ignore ember-view wrapper divs

          // This array is used to add new mutation Observers from the newly added DOM
          var newMutationsFromAddedNodesArray = addedNodesArray.filter(function (node) {
            var classListArray = node.classList && Array.prototype.slice.call(node.classList);
            //var isEmberView = classListArray ? (classListArray.indexOf("ember-view") === -1) : false;
            var hasDoNotRecordClass = classListArray ? (classListArray.indexOf("doNotRecord") !== -1) : false;
            return node.nodeType !== 3 && !hasDoNotRecordClass;
          });

          //loop through the above and add observers
          newMutationsFromAddedNodesArray.forEach(function (node) {
            addInnerObserversForTarget(node,2); //just drill down 2 levels more
          })

          //this array is used to generate the source code, we ignore anything with no ID
          addedNodesArray = addedNodesArray.filter(function (node) {
            var classListArray = node.classList && Array.prototype.slice.call(node.classList);
            //var isEmberView = classListArray ? (classListArray.indexOf("ember-view") === -1) : false;
            var hasDoNotRecordClass = classListArray ? (classListArray.indexOf("doNotRecord") !== -1) : false;

            return node.nodeType !== 3 && node.id && !hasDoNotRecordClass;
          });

          removedNodesArray = removedNodesArray.filter(function (node) {
            var classListArray = node.classList && Array.prototype.slice.call(node.classList);
            //var isEmberView = classListArray ? (classListArray.indexOf("ember-view") === -1) : false;
            var hasDoNotRecordClass = classListArray ? (classListArray.indexOf("doNotRecord") !== -1) : false;

            return node.nodeType !== 3 && node.id && !hasDoNotRecordClass;
          });

          if (!addedNodesArray.length && !removedNodesArray.length) {
            //no point continuing in this iteration if nothing of interest
            return;
          }

          //mutations should be mutually exclusive?
          if (addedNodesArray.length && removedNodesArray.length) {
            alert("strange");
            return;
          }

          addedNodesArray.forEach(function (node) {
            addedNodesTestText += indendation + 'equal(find("#' + node.id + '").length, 1, "' + node.id + ' shown AFTER user [INSERT REASON]");' + '<br/>';
          });

          removedNodesArray.forEach(function (node) {
            removedNodesTestText += indendation + 'equal(find("#' + node.id + '").length, 0, "' + node.id + ' removed AFTER user [INSERT REASON]");' + '<br/>';
          });

          self.set("pendingGeneratedDomChangedScript", self.get("pendingGeneratedDomChangedScript") + (addedNodesTestText || removedNodesTestText));
          // self.set("generatedScript", newText);
          console.log(mutation);
        });
      });
      var config = {attributes: true, childList: true, characterData: true};

      observer.observe(target, config);
      //observer.disconnect();
      //var rect = obj.getBoundingClientRect();
    }

    /**
     * Create observers for the children
     * Can be used recursively to desired depth, atm this is set to max of 4
     * @param target
     */
    function addInnerObserversForTarget(target, currentLevel) {
      for (var i = 0; i < target.children.length; i++) {
        var child = target.children[i];
        var classListArray = child.classList && Array.prototype.slice.call(child.classList);
        var hasDoNotRecordClass = classListArray ? (classListArray.indexOf("doNotRecord") !== -1) : false;

        if (!hasDoNotRecordClass) {//abort any recording of this dom tree
          addObserverForTarget(child);
          if (currentLevel <= 6) {//todo compare with root ember element
            var nextLevel = currentLevel + 1;
            addInnerObserversForTarget(child, nextLevel)
          }
        }
      }
    }

    //only observe inside the ember app, get 1st ember div todo possibly move this outside if users wish to look outside ember app
    //var initialObservedTarget = document.querySelector('body [id^=ember]');
    addObserverForTarget(this.get("initialObservedTarget"));

    //this is still WIP, as things are behaving a bit weird..
    addInnerObserversForTarget(this.get("initialObservedTarget"), 0);//forms new observers recursively
  }
});

