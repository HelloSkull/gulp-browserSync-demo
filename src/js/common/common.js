const com = {
    //锚点跳转
    jumpAnchor:function (destination){
        $('html,body').animate({
            scrollTop: $(destination).offset().top
        }, 800);
    }
};