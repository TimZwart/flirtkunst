/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(".playbutton").click(function(){
    var video=$("video").get()[0];
    if(video.paused){
        video.play();
        $(".playbutton").removeClass("play").addClass("pause");
        var interval=setInterval(function(){
            var nextmargin=24+(video.currentTime+0.05)/video.duration*206;
            var blok=$(".schuivert");
            blok.css({"margin-left": Math.floor(nextmargin)});
            var schuif0op=Math.ceil(nextmargin)-nextmargin;
            schuif0op=schuif0op===0?1:schuif0op;
            var context=$(".schuifcanvas").get()[0].getContext("2d");
//            context.fillStyle="#f00";
//            context.fillRect(0,0,13,18);
            
            var offscreen=$("#offscreen").get()[0].getContext("2d");
            offscreen.drawImage($(".schuivert img").get()[0],0,0);
            var pixels1=offscreen.getImageData(0,0,12,18);
            var data1=pixels1.data;
            var pixels2=context.createImageData(13,18);
            var data2=pixels2.data;
            for(var i=0,j=0;i<data1.length+pixels1.height*4;i++){
                var pixel=Math.floor(i/4);var posx=pixel%(pixels1.width+1);var posy=Math.floor(pixel/(pixels1.width+1));
                var colorch=i%4;
//                if(posx!==pixels1.width+1){
//                    data2[i]=data1[(posx+posy*pixels1.width)*4+colorch];
//                }
                if(posx<1){
                    if(colorch!==3){
                        data2[i]=data1[(posy*pixels1.width)*4+colorch];
                    }
                    else{
                        data2[i]=Math.round(schuif0op*255);
                    }
                }
                else if(posx<pixels1.width){
                    if(colorch!==3){
                    data2[i]=Math.round(schuif0op*data1[(posy*pixels1.width+posx)*4+colorch])+
                            Math.round((1-schuif0op)*data1[(posy*pixels1.width+posx-1)*4+colorch]);
                    }
                    else{
                        data2[i]=255;
                    }
                }
                else{
                    if(colorch!==3){
                        data2[i]=data1[(posy*pixels1.width+posx-1)*4+colorch];
                    }
                    else{
                        data2[i]=Math.round((1-schuif0op)*255);
                    }
                }
            }
            context.putImageData(pixels2,0,0);
//            $(".schuif0").css("opacity",schuif0op);
//            $(".schuif2").css("opacity",1-schuif0op);            
        },50);
    }
    else{
        video.pause();
        $(".playbutton").removeClass("pause").addClass("play");
        removeInterval(interval);
    }
});

//$(".volume").mousedown(function(e){
//    var interval=setInterval(function(ev){
//        $(".volume").css({"margin-left":32});
//    },50);
//    $("body").mouseup(function(e){
//        removeInterval(interval);
//    });
//});

$("#productbutton").mouseenter(function(){
    $("#productdropdown").show();
}).mouseleave(function(){
    $("#productdropdown").hide();
});

