 var data = [//将每张图片上字体的样式、大小、在图片上的位置记录下来，以便于换到不同图片时获取所需信息（移动端字体样式并不能这样设置，字体样式只适合PC端）
        {"family":"微软雅黑","size":"0.043","x":"0.5","y":"0.7","color":"#ffe032"},
        {"family":"微软雅黑","size":"0.045","x":"0.23","y":"0.298","color":"#4c4c4c"},
        {"family":"微软雅黑","size":"0.043","x":"0.5","y":"0.60","color":"#c1272c"}
    ]
    function changeImg(id){
        var imgbox = document.getElementById("imgbox");
        imgbox.src = "images/"+id+".png";//将图片名称设置为比较简单的名称方便与通过id切换
        var liList = document.getElementsByTagName("li");
        for(var i = 0; i < liList.length; i++){
            liList[i].className = "";
        }
        liList[id-1].className = "on";
    }

    
    var canvas = document.getElementById("myCanvas");
    function drawImage() {
        var name = document.getElementById("name").value;

        var html = "";
        if(name){
            var name= "制卡人："+name;
            var on = document.getElementsByClassName("on")[0];
            var liList = document.getElementsByTagName("li");
            var index = getIndex(on,liList);  //获取有on类名的li
            var  clientWidth = getWidth();　　//获取屏幕宽度用于canvas宽度自适应移动端屏幕
            canvas.width = 2*clientWidth;　　//由于手机屏幕时retina屏，都会多倍渲染，在此只设置2倍，如果直接设置等于手机屏幕，会导致生成的图片分辨率不够而模糊
            canvas.height = 2*clientWidth*667/375;
            var context = canvas.getContext("2d");
            
            var imgbox = document.getElementById("imgbox");
            var num = index + 1;
            var src = "images/"+num+".png";
            var img = new Image();//创建图片对象，用于在canvas中渲染
            img.src=src;
            var w = 2*clientWidth;
            img.onload = function(){ //当图片加载成功以后再进行下一步动作，如果不加这句，会生成黑图
                context.drawImage(img, 0, 0, w, w*667/375);//按设计稿图片比例渲染图片高度
                var font = "600 " + data[index].size*w + "px " + data[index].family;//文字大小也得按照分辨率变化，类似使用rem
                context.font = font;
                context.textAlign = "center";

                context.fillStyle = data[index].color;
                // context.fillStyle = "#fff";


                // if(index == 0){
                //     var x = w*data[index].x;
                //     var oy = data[index].y*w*667/375;
                //     for(var i = 0; i < name.length; i++){
                //         var y = oy + 44*i;
                //         context.fillText(name[i],x,y);
                //     }
                // }else
                 if(index ==1 ){//当文字时竖向显示的时候，以中间为基准，向上向下一行插入一个字
                    var x = w*data[index].x;
                    var oy = data[index].y*w*667/375;
                    for(var i = 0; i < name.length; i++){
                        var y = oy + 44*i;
                        context.fillText(name[i],x,y);
                    }
                }else{
                    context.fillText(name,w*data[index].x,data[index].y*w*667/375);
                }
                var downloadImg = canvas.toDataURL("image/jpeg");
                imgbox.src = downloadImg;
               


            }
        }else{
            alert("请输入您的名字！");
        }

    }
    function getWidth(){
        if(window.innerWidth){
            return window.innerWidth;
        }
        else{
            if(document.compatMode == "CSS1Compat"){
                return document.documentElement.clientWidth;
            }
            else{
                return document.body.clientWidth;
            }
        }
    }

    function getIndex(current,obj){
        var length = obj.length
        for(var i = 0; i<length; i++) {
            if (obj[i] == current) {
                return i;
            }
        }
    }



$(function(){
    animate();

    // 分享
    $.post("http://wx.ledianduo.com/wechatapi.asmx/GetConfigV5",function (datas) {
    wx.config(datas.config);
    var content={
        title:"分享汇贺卡制作",
        link:window.location.href,
        imgUrl:"http://resource.ledianduo.com/images/logo.png",
        desc:"新年春节贺卡制作"
    }
        wx.ready(function () {
        wx.onMenuShareTimeline(content);
        wx.onMenuShareAppMessage(content);
        wx.onMenuShareQQ(content);
        wx.onMenuShareWeibo(content)                  
        });
    });


})

//css3
function animate(){
    $(".mode15img").click(function(){
        $(".mode16img img").addClass("open");
        $(this).addClass("fadeOut animated");
        $(".mode1").addClass("remove");
        $(".mode2").show().addClass("openPage");
    })
}

window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        if (window.orientation === 180 || window.orientation === 0) { 
           $("body").css("opacity","1");
           $("#hengp").hide();
        } 
        if (window.orientation === 90 || window.orientation === -90 ){ 
            $("body").css("opacity"," 0").after("<div id='hengp' style='opacity: 1;position: fixed;width: 100%;height: 80%;background: #000;z-index: 9999;color:#fff;font-size:18px;text-align: center;padding-top:20%;}'>请横屏操作</div>");
        }  
    }, false); 

