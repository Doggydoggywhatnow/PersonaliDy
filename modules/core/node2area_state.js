// Shared state for the Node2Area toggle feature.
//
// When active, finishing a new area checks whether exactly one
// standalone node sits inside it:
//   - mode 'merge':  that node's tags are copied onto the new area,
//                     and the node is deleted.
//   - mode 'delete': that node is deleted, area tags are untouched.
// If zero or multiple nodes are found inside, the area's tags and
// any nodes inside it are left completely unchanged either way.
// This never affects line drawing, and never auto-starts an area draw.

var _active = false;
var _mode = null; // 'merge' | 'delete'

export function node2areaActive() {
    return _active;
}

export function node2areaSetActive(val) {
    _active = val;
}

export function node2areaMode() {
    return _mode;
}

export function node2areaSetMode(val) {
    _mode = val;
}
