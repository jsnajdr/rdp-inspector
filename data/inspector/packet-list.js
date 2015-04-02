/* See license.txt for terms of usage */

define(function(require, exports, module) {

// Dependencies
const React = require("react");

// Firebug SDK
const { Reps } = require("reps/reps");

// RDP Inspector
const { Packet } = require("packet");

// Shortcuts
const { DIV } = Reps.DOM;

/**
 * @template This template represents a list of packets displayed
 * inside the panel content.
 */
var PacketList = React.createClass({
  displayName: "PacketList",

  getInitialState: function() {
    return { data: [] };
  },

  render: function() {
    var output = [];

    var packets = this.props.data;
    for (var i in packets) {
      if (this.props.searchFilter &&
         JSON.stringify(packets[i]).indexOf(this.props.searchFilter) < 0) {
        // filter out packets which don't match the filter
        continue;
      }
      packets[i].key = i;
      output.push(Packet({data: packets[i], actions: this.props.actions}));
    };

    return (
      DIV({className: "list"},
        DIV({}, output)
      )
    );
  }
});

// Exports from this module
exports.PacketList = React.createFactory(PacketList);
});
