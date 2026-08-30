# PersonaliDy - A Vibecoded iD Fork For Powermapping

[![build](https://github.com/openstreetmap/iD/workflows/build/badge.svg)](https://github.com/openstreetmap/iD/actions?query=workflow%3A%22build%22)

## Basics

* iD is a JavaScript [OpenStreetMap](https://www.openstreetmap.org/) editor.
* PersonaliDy is a fork of iD that adds new features for experienced users.

## Added Features... So Far!

* **Rapid node editing**: one is able to select specific tags and place as many nodes as they wish without copy and pasting that carry those same tags. This helps with repetitive mapping of the same feature as a node.
* **Quickdraw**: one is able to drag the cursor to continually place nodes that form a line or area, allowing the user to map curves of lines or areas with minimal clicking. This helps with creating smoother curves and mapping curvy features quicker.
* **Zoom preferences**: one is able to set the max zoom level of the aerial imagery, allowing one to zoom in closer without double clicking. This can help with some tasks where being close to the edge of the feature is important, for example pool mapping.
* **Node2Area**: a toggle that allows one to draw an area, either having the area adopt the tagging of a single node within the area (deleting the node as the tags of the node are now on the area), or delete the single node inside of the area without adopting its tags. This can help to turn features that are mapped as nodes into ways that carry much more detail, in a much quicker manner. This toggle will not affect areas with multiple nodes inside of them.

## Participate!

* Remember to be nice to one another.

Join the OpenStreetMap community!
* [OpenStreetMap US Slack](https://slack.openstreetmap.us/) 
* [OpenStreetMap Discord](https://discord.com/invite/openstreetmap) 
* [OpenStreetMap community forum](https://community.openstreetmap.org/)

## Installation

Download PersonaliDy as a zip file, or clone it where you wish, then install npm itself onto your system. open a terminal in the folder for PersonaliDy, run npm install, and then run npm start. This should open up a localhost for you to use PersonaliDy in your browser.

## Issues

* The locator overlay is not and will not ever work; this is because it is a paid Mapbox API.
* It appears mapillary is not working.

## Did You Write Any of This Yourself?

 No. I did what AI said to implement, based on the features I wished to add.

## License

iD is available under the [ISC License](https://opensource.org/licenses/ISC).

Thusly, PersonaliDy is available under the same license, the [ISC License](https://opensource.org/licenses/ISC).

See the [LICENSE.md](LICENSE.md) file for more details.

iD, and thusly PersonaliDy, also bundles portions of the following open source software.

* [D3.js (BSD-3-Clause)](https://github.com/d3/d3)
* [CLDR (Unicode Consortium Terms of Use)](https://github.com/unicode-cldr/cldr-json)
* [editor-layer-index (CC-BY-SA 3.0)](https://github.com/osmlab/editor-layer-index)
* [Font Awesome (CC-BY 4.0)](https://fontawesome.com/license)
* [Maki (CC0 1.0)](https://github.com/mapbox/maki)
* [Temaki (CC0 1.0)](https://github.com/ideditor/temaki)
* [Röntgen icon set (CC-BY 4.0)](https://github.com/enzet/Roentgen)
* [Mapillary JS (MIT)](https://github.com/mapillary/mapillary-js)
* [iD Tagging Schema (ISC)](https://github.com/openstreetmap/id-tagging-schema)
* [name-suggestion-index (BSD-3-Clause)](https://github.com/osmlab/name-suggestion-index)
* [osm-community-index (ISC)](https://github.com/osmlab/osm-community-index)


## Thank you

Initial development of iD was made possible by a [grant of the Knight Foundation](https://blog.mapbox.com/large-investment-in-openstreetmap-from-knight-foundation-cf7aa00534db).
