var marko_template = module.exports = require("marko/html").t(__filename),
    marko_component = require("./component"),
    marko_widgets = require("marko/widgets/legacy"),
    marko_registerWidget = marko_widgets.rw,
    marko_widgetType = marko_registerWidget("/marko-test$1.0.0/autotests/widgets-compilation-deprecated/component-template-entry/index.marko", function() {
      return module.exports;
    }),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_attr = marko_helpers.a;

function render(input, out, widget, state) {
  var data = input;

  out.w("<div" +
    marko_attr("id", widget.id) +
    "></div>");
}

marko_template._ = marko_widgets.r(render, {
    type: marko_widgetType
  }, marko_component);

marko_template.Widget = marko_widgets.w(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      {
          type: "require",
          path: "./index.marko"
        },
      {
          type: "require",
          path: "marko/widgets"
        }
    ]
  };
