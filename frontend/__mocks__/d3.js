var svgns = "http://www.w3.org/2000/svg";

function createSelection(elements) {
  return {
    _elements: Array.isArray(elements) ? elements : [elements],
    _data: [],
    _parent: elements[0],  // Store first element as parent for future operations
    attr: function(name, value) {
      this._elements.forEach(function(el) {
        el.setAttribute(name, value);
      });
      return this;
    },
    style: function(name, value) {
      this._elements.forEach(function(el) {
        el.style[name] = value;
      });
      return this;
    },
    on: function(eventName, handler) {
      this._elements.forEach(function(el) {
        el.addEventListener(eventName, handler);
      });
      return this;
    },
    call: function(func) {
      func(this);
      return this;
    },
    selectAll: function(selector) {
      var selectedElements = [];
      var parent = this._parent;
      this._elements.forEach(function(el) {
        if (selector === '*') {
          selectedElements = selectedElements.concat(Array.from(el.children));
        } else {
          var nodeList = el.querySelectorAll(selector);
          selectedElements = selectedElements.concat(Array.from(nodeList));
        }
      });
      // Keep parent reference even if no elements found
      var selection = createSelection(selectedElements.length ? selectedElements : []);
      selection._parent = parent;
      return selection;
    },
    remove: function() {
      this._elements.forEach(function(el) {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      return this;
    },
    data: function(data) {
      this._data = data || [];
      return {
        enter: function() {
          return {
            append: function(type) {
              var elements = this._data.map(function(item) {
                var element = document.createElementNS(svgns, type);
                // Use stored parent reference
                if (this._parent) {
                  this._parent.appendChild(element);
                }
                return element;
              }.bind(this));
              return createSelection(elements);
            }.bind(this)
          };
        }.bind(this)
      };
    },
    transition: function() {
      return this;
    },
    duration: function() {
      return this;
    }
  };
}

module.exports = {
  select: function(element) {
    // For direct selection, element is its own parent
    var selection = createSelection([element]);
    selection._parent = element;
    return selection;
  },
  selectAll: function(selector) {
    // For global selectAll, document is the parent
    var selection = createSelection(Array.from(document.querySelectorAll(selector)));
    selection._parent = document;
    return selection;
  },
  drag: function() {
    var dragBehavior = function(selection) {
      selection._elements.forEach(function(el) {
        // Just mark element as draggable for testing
        el.setAttribute('draggable', 'true');
      });
    };
    
    // Allow chaining of event listeners
    dragBehavior.on = function(event, callback) {
      // Store callback for verification if needed
      dragBehavior._handlers = dragBehavior._handlers || {};
      dragBehavior._handlers[event] = callback;
      return dragBehavior;
    };
    
    return dragBehavior;
  },
  forceSimulation: jest.fn(() => ({
    force: jest.fn().mockReturnThis(),
    on: jest.fn().mockReturnThis(),
    stop: jest.fn()
  })),
  forceManyBody: jest.fn(() => ({
    strength: jest.fn().mockReturnThis()
  })),
  forceLink: jest.fn(() => ({
    id: jest.fn().mockReturnThis()
  })),
  forceCenter: jest.fn()
}; 