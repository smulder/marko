require('raptor-polyfill/string/endsWith');
var widgets = require('../');
var repeatedId = require('../lib/repeated-id');
var extend = require('raptor-util/extend');
var escapeXml = require('raptor-util/escapeXml');

exports.widgetArgs = function (out, scope, assignedId, customEvents, extendModule, extendConfig, extendState) {
    var data = out.data;
    var widgetArgs = data.widgetArgs;

    if (!widgetArgs) {
        if (assignedId != null) {
            assignedId = assignedId.toString();

            if (assignedId.endsWith('[]')) {
                assignedId = repeatedId.nextId(out, scope, assignedId);
            }
        }

        widgetArgs = data.widgetArgs = {
            id: assignedId != null ? scope + '-' + assignedId : null,
            scope: scope,
            customEvents: customEvents
        };
    }

    if (extendModule) {
        if (widgetArgs.extend) {
            // The nested extends should come before the outer extends
            // since the extends are applied from left to right and the
            // outer widget will expect for the inner widget to have been
            // patched
            widgetArgs.extend.push(extendModule);
        } else {
            widgetArgs.extend = [extendModule];
        }
    }

    // Merge in the extend config...
    if (extendConfig) {
        widgetArgs.extendConfig = widgetArgs.extendConfig ?
            extend(extendConfig, widgetArgs.extendConfig) :
            extendConfig;
    }

    // Merge in the extend state...
    if (extendState) {
        widgetArgs.extendState = widgetArgs.extendState ?
            extend(extendState, widgetArgs.extendState) :
            extendState;
    }
};

exports.cleanupWidgetArgs = function (out) {
    delete out.data.widgetArgs;
};

exports.widgetBody = function (out, id, content, widget) {
    if (id != null && content == null) {
        // There is no body content so let's see if we should reuse
        // the existing body content in the DOM
        var existingEl = document.getElementById(id);
        if (existingEl) {
            var widgetsContext = widgets.getWidgetsContext(out);
            widgetsContext.addReusableDOMNode(existingEl, true /* body only */);
        }
    } else if (typeof content === 'function') {
        content(out, widget);
    } else {
        if (typeof content === 'string') {
            content = escapeXml(content);
        }
        out.write(content);
    }
};