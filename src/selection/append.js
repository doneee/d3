import "../core/ns";
import "selection";

d3_selectionPrototype.append = function(name) {
  //Check if using Polymer and ShadyDom
  var shadyDom = Polymer && (typeof Polymer.dom === 'function');
  name = d3_selection_creator(name);
  return this.select(function() {
    return (shadyDom ? Polymer.dom(this).appendChild(name.apply(this, arguments)) :
      this.appendChild(name.apply(this, arguments)));
  });
};

function d3_selection_creator(name) {

  function create() {
    var document = this.ownerDocument,
        namespace = this.namespaceURI;
    return namespace
        ? document.createElementNS(namespace, name)
        : document.createElement(name);
  }

  function createNS() {
    return this.ownerDocument.createElementNS(name.space, name.local);
  }

  return typeof name === "function" ? name
      : (name = d3.ns.qualify(name)).local ? createNS
      : create;
}
