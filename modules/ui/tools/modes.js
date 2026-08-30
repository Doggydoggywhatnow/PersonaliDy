import { debounce } from 'es-toolkit';

import { select as d3_select } from 'd3-selection';

import {
    modeAddArea,
    modeAddLine,
    modeAddPoint,
    modeRapidPoint,
    modeBrowse
} from '../../modes';

import { presetManager } from '../../presets';
import { t } from '../../core/localizer';
import { svgIcon } from '../../svg';
import { uiTooltip } from '../tooltip';
import { uiModal } from '../modal';
import { node2areaActive, node2areaSetActive, node2areaSetMode } from '../../core/node2area_state';

export function uiToolDrawModes(context) {

    var tool = {
        id: 'old_modes',
        label: t.append('toolbar.add_feature')
    };

    var modes = [
        modeAddPoint(context, {
            title: t.append('modes.add_point.title'),
            button: 'point',
            description: t.append('modes.add_point.description'),
            preset: presetManager.item('point'),
            key: '1'
        }),
        modeRapidPoint(context, {
            title: t.append('modes.rapid_point.title'),
            button: 'point',
            description: t.append('modes.rapid_point.description'),
            preset: null,
            key: '4'
        }),
        modeAddLine(context, {
            title: t.append('modes.add_line.title'),
            button: 'line',
            description: t.append('modes.add_line.description'),
            preset: presetManager.item('line'),
            key: '2'
        }),
        modeAddArea(context, {
            title: t.append('modes.add_area.title'),
            button: 'area',
            description: t.append('modes.add_area.description'),
            preset: presetManager.item('area'),
            key: '3'
        })
    ];


    function enabled(
        // eslint-disable-next-line no-unused-vars
        _mode // parameter is currently not used, but might be at some point
    ) {
        return osmEditable();
    }

    function osmEditable() {
        return context.editable();
    }

    modes.forEach(function(mode) {
        context.keybinding().on(mode.key, function(d3_event) {
            if (!enabled(mode)) return;

            d3_event.preventDefault();

            if (mode.id === context.mode().id) {
                context.enter(modeBrowse(context));
            } else {
                context.enter(mode);
            }
        });
    });

    tool.render = function(selection) {

        var wrap = selection
            .append('div')
            .attr('class', 'joined')
            .style('display', 'flex');

        var debouncedUpdate = debounce(update, 500, { edges: ['leading', 'trailing'] });

        context.map()
            .on('move.modes', debouncedUpdate)
            .on('drawn.modes', debouncedUpdate);

        context
            .on('enter.modes', update);

        update();


        function update() {

            var buttons = wrap.selectAll('button.add-button')
                .data(modes, function(d) { return d.id; });

            // exit
            buttons.exit()
                .remove();

            // enter
            var buttonsEnter = buttons.enter()
                .append('button')
                .attr('class', function(d) { return d.id + ' add-button bar-button'; })
                .on('click.mode-buttons', function(d3_event, d) {
                    if (!enabled(d)) return;

                    // When drawing, ignore accidental clicks on mode buttons - #4042
                    var currMode = context.mode().id;
                    if (/^draw/.test(currMode)) return;

                    if (d.id === currMode) {
    context.enter(modeBrowse(context));
} else if (d.id === 'rapid-point') {
    context.enter(d);
} else {
    context.enter(d);
}

                })
                .call(uiTooltip()
                    .placement('bottom')
                    .title(function(d) { return d.description; })
                    .keys(function(d) { return [d.key]; })
                    .scrollContainer(context.container().select('.top-toolbar'))
                );

            buttonsEnter
                .each(function(d) {
                    d3_select(this)
                        .call(svgIcon('#iD-icon-' + d.button));
                });

            buttonsEnter
                .append('span')
                .attr('class', 'label')
                .text('')
                .each(function(mode) { mode.title(d3_select(this)); });

            // if we are adding/removing the buttons, check if toolbar has overflowed
            if (buttons.enter().size() || buttons.exit().size()) {
                context.ui().checkOverflow('.top-toolbar', true);
            }

            // update
            buttons
                .merge(buttonsEnter)
                .attr('aria-disabled', function(d) { return !enabled(d); })
                .classed('disabled', function(d) { return !enabled(d); })
                .attr('aria-pressed', function(d) { return context.mode() && context.mode().button === d.button; })
                .classed('active', function(d) { return context.mode() && context.mode().button === d.button; });
        }
    };

    return tool;
}

export function uiToolQuickdraw(context) {
    var tool = {
        id: 'quickdraw',
        label: function(selection) { selection.text('Quickdraw'); }
    };

    tool.render = function(selection) {
       var wrap = selection
           .append('div')
           .attr('class', 'joined')
           .style('display', 'flex');

       wrap
            .append('button')
            .attr('class', 'quickdraw bar-button')
            .text('Quickdraw')
            .on('click.quickdraw', function() {
                var modal = uiModal(context.container());
                var content = modal.select('.content');

                content
                    .append('div')
                    .attr('class', 'modal-section header')
                    .append('h3')
                    .text('Quickdraw');

                var buttons = content
                    .append('div')
                    .attr('class', 'modal-section buttons cf');

                buttons
                    .append('button')
                    .attr('class', 'button action')
                    .text('Quickdraw Line')
                    .on('click', function() {
                        modal.close();
                        context.enter(modeAddLine(context, {
                            title: t.append('modes.add_line.title'),
                            button: 'line',
                            description: t.append('modes.add_line.description'),
                            preset: presetManager.item('line'),
                            key: '2',
			    quickdraw: true
                        }));
                    });

                buttons
                    .append('button')
                    .attr('class', 'button action')
                    .text('Quickdraw Area')
                    .on('click', function() {
                        modal.close();
                        context.enter(modeAddArea(context, {
                            title: t.append('modes.add_area.title'),
                            button: 'area',
                            description: t.append('modes.add_area.description'),
                            preset: presetManager.item('area'),
                            key: '3',
			    quickdraw: true
                        }));
                    });
            });

       var node2areaButton = wrap
           .append('button')
           .attr('class', 'node2area bar-button')
           .text('Node2Area')
           .classed('active', node2areaActive());

       node2areaButton
           .on('click.node2area', function() {

               if (node2areaActive()) {
                   node2areaSetActive(false);
                   node2areaButton.classed('active', false);
                   return;
               }

               var modal = uiModal(context.container());
               var content = modal.select('.content');

               content
                   .append('div')
                   .attr('class', 'modal-section header')
                   .append('h3')
                   .text('Node2Area');

               var buttons = content
                   .append('div')
                   .attr('class', 'modal-section buttons cf');

               buttons
                   .append('button')
                   .attr('class', 'button action')
                   .text('Merge Nodes\' Tags')
                   .on('click', function() {
                       node2areaSetMode('merge');
                       node2areaSetActive(true);
                       node2areaButton.classed('active', true);
                       modal.close();
                   });

               buttons
                   .append('button')
                   .attr('class', 'button action')
                   .text('Delete Nodes')
                   .on('click', function() {
                       node2areaSetMode('delete');
                       node2areaSetActive(true);
                       node2areaButton.classed('active', true);
                       modal.close();
                   });
           });
    };

    return tool;
}
