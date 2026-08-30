import { t } from '../core/localizer';
import { behaviorDraw } from '../behavior/draw';
import { modeBrowse } from './browse';
import { modeSelect } from './select';
import { osmNode } from '../osm/node';
import { actionAddEntity } from '../actions/add_entity';
import { actionChangeTags } from '../actions/change_tags';
import { actionAddMidpoint } from '../actions/add_midpoint';


export function modeRapidPoint(context, mode) {

    mode.id = 'rapid-point';

        mode.setTags = function(tags) {
        mode.tags = tags;
        return mode;
    };

    mode.setPreset = function() {
        return mode;
    };

    var behavior = behaviorDraw(context)
	.dragToClick(false)
        .on('click', add)
        .on('clickWay', addWay)
        .on('clickNode', addNode)
        .on('cancel', cancel)
        .on('finish', cancel);

        function defaultTags() {
        return mode.tags || {};
    }

    function parseTags(input) {
        var tags = {};

        input.trim().split(/\s+/).forEach(function(pair) {
            var separator = pair.indexOf('=');
            if (separator > 0) {
                var key = pair.slice(0, separator);
                var value = pair.slice(separator + 1);
                if (value) tags[key] = value;
            }
        });

        return tags;
    }

    function add(loc) {
    var node = new osmNode({ loc: loc, tags: defaultTags(loc) });

    context.perform(
        actionAddEntity(node),
        t('operations.add.annotation.point')
    );
}


    function addWay(loc, edge) {
        var node = new osmNode({ tags: defaultTags(loc) });

        context.perform(
            actionAddMidpoint({loc: loc, edge: edge}, node),
            t('operations.add.annotation.vertex')
        );

        enterSelectMode(node);
    }

    function enterSelectMode(node) {
        context.enter(
            modeSelect(context, [node.id]).newFeature(true)
        );
    }


    function addNode(node) {
        const _defaultTags = defaultTags(node.loc);
        if (Object.keys(_defaultTags).length === 0) {
            enterSelectMode(node);
            return;
        }

        var tags = Object.assign({}, node.tags);  // shallow copy
        for (var key in _defaultTags) {
            tags[key] = _defaultTags[key];
        }

        context.perform(
            actionChangeTags(node.id, tags),
            t('operations.add.annotation.point')
        );

        enterSelectMode(node);
    }


    function cancel() {
        context.enter(modeBrowse(context));
    }


        mode.enter = function() {
        var input = window.prompt(
            'Enter tags separated by spaces (key=value):',
            ''
        );

        if (input === null) {
            cancel();
            return;
        }

        mode.tags = parseTags(input);
        context.install(behavior);
    };


    mode.exit = function() {
        context.uninstall(behavior);
    };


    return mode;
}
