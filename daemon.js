var runningCalc = false;
var floatX;
var floatY;
var i = 0;
var pass = 0;
var instances = 0;
var canvas = document.getElementById('canvas');
var data = [];
if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.strokeRect(50, 50, 750, 750);
    var circle = new Path2D();
    circle.arc(425, 425, 375, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgb(255,255,255)"
    ctx.stroke(circle)
   // ctx.fillStyle = "rgb(240,240,240)"
    //ctx.fill(circle);
}

function runPred(){
    instances++;
    document.getElementById('instances').innerHTML = "[P] = " + instances
    montecarlo()
}

function montecarlo(){
    if(i<100){
        i++;
        floatX = Math.random(), floatY = Math.random()
        floatX = (floatX*750+50).toFixed(0), floatY = (floatY*750+50).toFixed(0)
        var vecPoint = new Path2D();
        vecPoint.rect(floatX, floatY, 1, 1)
       // vecPoint.arc(floatX, floatY, 1, 0, 2*Math.PI);
        document.getElementById('nCount').innerHTML = "n = " + i
        if(ctx.isPointInPath(circle, floatX, floatY)){
            ctx.fillStyle = 'red';
            ctx.fill(vecPoint);
            console.log("Pass")
            pass++;
            data.push([i,1,(pass/i*4),(pass/i*4)-Math.PI,Math.abs((pass/i*4)-Math.PI)])
            document.getElementById('perc').innerHTML = (pass/i*100).toFixed(2) + "%"
        } else {
            ctx.fillStyle = 'blue';
            ctx.fill(vecPoint);
            console.log("Fail")
            data.push([i,0,(pass/i*4),(pass/i*4)-Math.PI,Math.abs((pass/i*4)-Math.PI)])

        }
        document.getElementById('estimate').innerHTML = "π ≈ " + (pass/i*4)
        setTimeout(montecarlo, 0);
    }
}


function downloadCsv() {
    var csv = ["n","InsideCircle","PiEstimate","Delta","AbsDelta","\n"];
    data.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
    });
 
    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'mc100.csv';
    hiddenElement.click();

}