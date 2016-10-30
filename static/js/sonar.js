/**
 * Created by PavelCSS on 13.01.15.
 */
var time = 2;
var peopleCount = 150;
var peoples = [];

for (i = 0; i < peopleCount; i++) {
    peoples.push({
        distance : Math.floor((Math.random() * 130) + 1),
        angle    : Math.floor((Math.random() * 360) + 1)
    });
}

(function radar(){

    var radius = 150;
    for (i = 0; i < peoples.length; i++) {
        var disX = 90 < peoples[i].angle + 90 < 270 ? radius - peoples[i].distance : radius,
            disY = 180 < peoples[i].angle + 90 < 360 ? radius - peoples[i].distance : radius,
            angleNew = (peoples[i].angle + 90) * Math.PI / 180,
            getDegX = disX + peoples[i].distance - Math.round(peoples[i].distance * Math.cos(angleNew)),
            getDegY = disY + peoples[i].distance - Math.round(peoples[i].distance * Math.sin(angleNew)),
            delay = time / radius * (peoples[i].distance + 5);

        $('#guides').append($('<span>')
            .addClass('dot')
            .css({
                left : getDegX,
                top  : getDegY,
                '-webkit-animation-delay' : delay + 's',
                'animation-delay' : delay + 's'
            })
            .attr({
                'data-atDeg' : peoples[i].angle
            }));
      $("#sonar").addClass('animated');
    }
})();
