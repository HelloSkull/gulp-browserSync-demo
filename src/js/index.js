$(function () {
        let winHeight = 0;
        let winWidth = 0;
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
                winHeight = document.documentElement.clientHeight;
                winWidth = document.documentElement.clientWidth;
                console.log("浏览器宽度->",winHeight);
                console.log("浏览器高度->",winWidth);
                if(winHeight >= 768){
                    $.stellar();
                }
            }

        $('.carousel').carousel({
            interval: 3000
        });
});
