/* See license.txt for terms of usage */

define(function(require, exports/*, module*/) {

"use strict";

// ReactJS
var React = require("react");

// Constants
const {
  ButtonToolbar, Button,
  DropdownButton, MenuItem,
  OverlayTrigger, Tooltip
} = require("shared/react-bootstrap-factories");

const { span, input } = React.DOM;

// RDP Window injected APIs
const { Locale } = require("shared/rdp-inspector-window");

/**
 * @template This object represents a template for a toolbar displayed
 * within the Packets tab
 */
var PacketsToolbar = React.createClass({
/** @lends PacketsToolbar */

  displayName: "PacketsToolbar",

  render: function() {
    var { showInlineDetails, packetCacheEnabled } = this.props;

    var labels = {};
    labels.inlineDetails = Locale.$STR("rdpInspector.option.showInlineDetails");
    labels.cachePackets = Locale.$STR("rdpInspector.option.packetCacheEnabled");

    var tooltips = {};
    tooltips.inlineDetails = Locale.$STR("rdpInspector.option.showInlineDetails.tip");
    tooltips.cachePackets = Locale.$STR("rdpInspector.option.packetCacheEnabled.tip");

    var paused = this.props.paused;
    var pauseClassName = paused ? "btn-warning" : "";

    return (
      ButtonToolbar({className: "toolbar"},
        DropdownButton({ bsSize: "xsmall", ref: "fileMenu", title: Locale.$STR("rdpInspector.menu.File")},
          MenuItem({key: "fileLoad", ref: "fileLoad", onClick: this.onLoadPacketsFromFile },
            Locale.$STR("rdpInspector.cmd.load")),
          MenuItem({key: "fileSave", ref: "fileSave", onClick: this.onSavePacketsFromFile },
            Locale.$STR("rdpInspector.cmd.save"))
        ),
        DropdownButton({
          bsSize: "xsmall", title: Locale.$STR("rdpInspector.menu.Options"),
          className: "pull-right", ref: "options"
        },
          OverlayTrigger({placement: "bottom", overlay: Tooltip({}, tooltips.inlineDetails)},
            MenuItem({key: "inlineDetails", ref: "optionShowInlineDetails", onClick: this.onShowInlineDetails},
              input({type: "checkbox", checked: showInlineDetails}), labels.inlineDetails
            )
          ),
          OverlayTrigger({placement: "bottom", overlay: Tooltip({}, tooltips.cachePackets)},
            MenuItem({key: "cachePackets", ref: "optionCachePackets", onClick: this.onCachePackets},
              input({type: "checkbox", checked: packetCacheEnabled}), labels.cachePackets
            )
          )
        ),
        Button({bsSize: "xsmall", onClick: this.onClear},
          Locale.$STR("rdpInspector.cmd.clear")
        ),
        Button({bsSize: "xsmall", onClick: this.onFind},
          Locale.$STR("rdpInspector.cmd.find")
        ),
        Button({bsSize: "xsmall", onClick: this.onSummary},
          Locale.$STR("rdpInspector.cmd.summary")
        ),
        Button({bsSize: "xsmall", className: pauseClassName,
          onClick: this.onPause},
          span({className: "glyphicon glyphicon-pause", "aria-hidden": true})
        )
      )
    );
  },

  // Commands

  onClear: function(/*event*/) {
    this.props.actions.clear();
  },

  onFind: function(/*event*/) {
    this.props.actions.find();
  },

  onSummary: function(/*event*/) {
    this.props.actions.appendSummary();
  },

  onShowInlineDetails: function() {
    this.props.actions.onShowInlineDetails();
  },

  onCachePackets: function() {
    this.props.actions.onPacketCacheEnabled();
  },

  onPause: function(/*event*/) {
    this.props.actions.onPause();
  },

  onLoadPacketsFromFile: function(/*event*/) {
    this.props.actions.loadPacketsFromFile();
    this.refs.fileMenu.setState({ open: false });

  },

  onSavePacketsFromFile: function(/*event*/) {
    this.props.actions.savePacketsToFile();
    this.refs.fileMenu.setState({ open: false });
  }
});

// Exports from this module
exports.PacketsToolbar = React.createFactory(PacketsToolbar);
exports.PacketsToolbarComponent = PacketsToolbar;
});
