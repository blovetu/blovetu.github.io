
//banner 轮播
$.fn.extend({
    Init : function(opt){
        var _this = $(this);
        var LiLen = _this.find(".lunbiT li").length;
        var $sec 	= 5000; 			//自动播放默认时间;
        var index = 0;                  //轮播开始索引号;

        $default = {
            Dom  :  opt.Dom         ? opt.Dom       : "$('#J_lunbo')"   ,
            time :  opt.time        ? opt.time      : $sec              ,
            auto :  opt.auto        ? opt.auto      : true              ,
            LiLen:  opt.Len         ? opt.Len       : LiLen             ,
            Index:  index                                               
        };
        this.createHTML($default.LiLen);
        this.clickBtn(_this);
        if($default.auto){//自动播放
            this.runScroll($default.time);
        }
    },
    runScroll : function(t){
        var timer = null,_that = this;
        timer = setInterval(function(){
            $default.Index++;
            if( $default.Index >=$default.LiLen){  $default.Index = 0; }
            _that.showPic(_that, $default.Index);
        },t);
    },
    createHTML :function(len){
        var html = '',_that = this;
        var ListDom = _that.find(".Btnlist");
        for(var i = 1; i <= len; i++){
            if(i == 1){
                html +='<a href="###" class="cur">'+i+'</a>';
            }else{
                html +='<a href="###">'+i+'</a>';
            }
        }
        ListDom.html(html);
    },
    clickBtn :function(obj){
        var _that = this;
        obj.find(".Btnlist a").on("click",function(){
            //获取索引值
            var _index = $(this).index();
            _that.showPic(obj,_index);
            $default.Index = _index;//赋值
        })
    },
    showPic :function(obj,Ind){
        $(obj).find("li").eq(Ind).stop(true,true).fadeIn('slow').siblings().fadeOut('slow');
        $(obj).find(".Btnlist a").removeClass("cur");
        $(obj).find(".Btnlist a").eq(Ind).addClass("cur").siblings().removeClass("cur");
    }
});

//Tab切换
function TabFn(ele,event){
    $(ele).find(".Tab_title a").on(event,function(){
        var _ind = $(this).index();
        $(this).addClass("cur").siblings().removeClass("cur");
        $(ele).find("ul").hide();
        $(ele).find("ul").eq(_ind).show();
    })
}

$.fn.srcollFn = function(opt){
    var UlDom = $(this).find("ul"),
        LiLen = UlDom.find("li").length,
        LiWid = UlDom.find("li").outerWidth(true),// true：附加边框宽度
        LBtn =  $(this).find("a.Prev"),
        RBtn =  $(this).find("a.Next"),
        Num = opt.num,
        auto = opt.auto;
    var page = 1;
    var curBlock = 2;
    //设置ul的宽度值
    UlDom.css({'width':(LiWid*LiLen)+"px"});
    //根据总数计算出顶端预留多少个位置
    var page_num = Math.ceil(LiLen/curBlock);

    //left
    LBtn.on("click",function(){
        if(!UlDom.is(":animated")){//不在动画的时候执行
            //检测当前页码
            if(page == 1){
                //已经是第一页了
                UlDom.stop(true,true).animate({left:'-='+( page_num*LiWid )+"px"});
                //重新赋值
                page = page_num+1;
            }else{
                UlDom.stop(true,true).animate({left:'+='+ (LiWid*1)+"px"});
                page--;
            }
        }
    });
    //right
    RBtn.on("click",function(){
        if(!UlDom.is(":animated")){//不在动画的时候执行
            if(page == page_num+1){//最后一页咯！！！
                UlDom.stop(true,true).animate({left:'+='+(LiWid*page_num)+"px"});
                //改变ul的宽度 Left值
                page = 1;//吧当前页面设置成第一页
            }else{
                UlDom.stop(true,true).animate({left:'-='+(LiWid*1)+"px"});
                page++;

            }
        }
    });
    //mouseenter
    UlDom.find("li").on("mouseenter",function(){
        var _index = $(this).index();
        $(this).addClass("cur");
        var NewUrl = 'images/Sicon_'+(_index+1)+'_'+(_index+1)+'.png';
        $(this).find("img").attr({'src':NewUrl});
    }).on("mouseleave",function(){
        $(this).removeClass("cur");
        var _index = $(this).index();
        var NewUrl = 'images/Sicon_'+(_index+1)+'.png';
        $(this).find("img").attr({'src':NewUrl});
    })
}


