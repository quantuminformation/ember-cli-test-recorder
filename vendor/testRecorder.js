(function(){

  var emberSelector = '[id^=ember],[data-ember-action]';

  $.fn.extend({
    path: function () {

      if (this.length != 1) throw 'Requires one element.';

      var path, node = this;
      while (node.length) {
        var realNode = node[0], name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();

        var parent = node.parent();

        var siblings = parent.children(name);
        if (siblings.length > 1) {
          name += ':eq(' + siblings.index(realNode) + ')';
        }

        path = name + (path ? '>' + path : '');
        node = parent;
      }

      return path;    }
  });

  $(document).on('click', function(e){

    var $target = $(e.target);
    var $emberTarget = $target.is(emberSelector) ? $target : $target.parent(emberSelector);

    if($emberTarget.length) {
      console.log('click("' + $emberTarget.path() + '")');
    }

  });

}());
