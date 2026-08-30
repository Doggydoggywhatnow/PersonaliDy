import { prefs } from '../../core/preferences';
import { uiSection } from '../section';

var DEFAULT_INTERVAL = 25;

export function uiSectionQuickdrawInterval(context) {
    var section = uiSection('preferences-quickdraw-interval', context)
        .label(() => 'Quickdraw')
        .disclosureContent(renderDisclosureContent);

    function currentValue() {
        var stored = prefs('quickdraw.interval');
        var num = stored ? parseInt(stored, 10) : NaN;
        return (isNaN(num) || num < 1) ? DEFAULT_INTERVAL : num;
    }

    function renderDisclosureContent(selection) {
        var wrapEnter = selection.selectAll('.quickdraw-interval-wrap')
            .data([0])
            .enter()
            .append('div')
            .attr('class', 'quickdraw-interval-wrap');

        wrapEnter
            .append('label')
            .text('Quickdraw pixel interval');

        wrapEnter
            .append('input')
            .attr('type', 'text')
            .attr('class', 'quickdraw-interval-input')
            .on('change', function() {
                var val = parseInt(this.value, 10);
                if (isNaN(val) || val < 1) val = DEFAULT_INTERVAL;
                this.value = val;
                prefs('quickdraw.interval', String(val));
            });

        selection.selectAll('.quickdraw-interval-input')
            .property('value', currentValue());
    }

    return section;
}
