var svgedit = svgedit || {};

(function () {
    'use strict';

    if (!svgedit.shapes) {
        svgedit.shapes = {};
    }

    $.getJSON('/assets/shapes/shapes.json', function (data) {
        var shapesToLoad = data.shapesToLoad;

        svgedit.shapes.load = function (path, callback) {
            var progress = 0;
            $.each(shapesToLoad, function() {
                var name = this;
                $.getJSON('/assets/shapes/' + name + '.json', function(data) {
                    for (var i = 0; i < data.shapes.length; i++) {
                        data.shapes[i].name = data.typeId + '-' + data.shapes[i].name;
                    }
                    if (svgEditor.shapesGrps[data.shapesGroupName]) {
                        for (var i = 0; i < data.shapes.length; i++) {
                            svgEditor.shapesGrps[data.shapesGroupName].push(data.shapes[i]);
                        }
                    } else {
                        svgEditor.shapesGrps[data.shapesGroupName] = data.shapes;
                    }
                    if (++progress == shapesToLoad.length) {
                        callback();
                    }
                }).fail(function(){
                    console.log('ERROR: loading ' + '/assets/shapes/' + name  + '.json');
                    if (++progress == shapesToLoad.length) {
                        callback();
                    }
                });
            });
            return true;
        };
    });
}());
