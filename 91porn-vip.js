// ==UserScript==
// @name         91porn 解锁VIP观看高清下载搜索等限制,去除广告.正则版通杀所有 for openuserjs
// @description  https://github.com/91p2022/91 解锁91pornVIP观看下载搜索限制,去除广告等,警告:本脚本无任何盈利方式,触犯某收费且含有监控追踪代码脚本,疯狂举报且用且珍惜,请保护好个人财产和隐私.
// @copyright    @chunv_bot
// @icon         https://www.google.com/s2/favicons?sz=64&domain=91porn.com
// @version      0.1
// @author       @chunv_bot
// @license      AGPL-3.0-only
// @homepageURL  https://t.me/chunvtgbot
// @match        *.91porn.com/*
// @match        *://*/view_video.php*
// @match        *://*/index.php*
// @match        *://*/search_result.php*
// @require      https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js
// @require      https://www.googletagmanager.com/gtag/js
// @run-at       document-end
// @grant        none
// ==/UserScript==
function playvideo() {
    $.ajax({
        url:"http://"+ window.location.host +"/api/playvideo.html",
        type:"post",
        data:{id:window.location.href.match(/\/([0-9]+)\./)[1]},
        success:function(e){
            e = JSON.parse(e);
            $(".share").html('<p></p><p>'+e.data.videoInfo.url.split("?")[0]+'</p>');
            if(e.message == "\u89c6\u9891\u9700\u8981\u4ed8\u8d39\u002c\u8bf7\u767b\u9646\u540e\u89c2\u770b"){
                console.log(e.data.videoInfo.url);
                $("body").append("<style>.layui-layer-shade,.layui-layer-dialog,.layui-layer-move{display:none}</style>");
                new ckplayer({container:"#playerBox",autoplay:true,video:e.data.videoInfo.url});
            }
        }
    });
};
function DeleagePlayBtnClickEvent()//委托播放按钮来执行代码
{
        var PlayVideoButton = document.getElementsByClassName("vjs-big-play-button");
        if(PlayVideoButton.length>0)
        {
            PlayVideoButton[0].setAttribute("onclick","EnableSkipButton_Skip()");
            console.log("success：成功委托播放按钮执行注入代码");
        }
    else
    {
        console.log("err...：没有找到网站的播放按钮")
    }
}


function RemovePipWindow()//移除小窗
{
  var PipElem_Close = document.getElementsByClassName("vjs-pip-close")[0];//
    if(PipElem_Close!=undefined)
    {
        PipElem_Close.click();//表示已经关闭
        document.onmousewheel = ()=>{};//执行之后不需要继续监听
        console.log("已经关闭小窗，停止监听");
    }
    else
    {
        console.log("检测到鼠标滚动，没有探测到区域内小窗...");
    }
}

function Toast_Success()//对部分地址进行注入，提示用户脚本写入成功
{
    
    var Tips_Ele = document.getElementsByClassName("boxPart")[0];
    if(Tips_Ele!=undefined)
    {
        Tips_Ele.setAttribute("style","font-size:22px;color:#ff8800");
        Tips_Ele.textContent = "全局脚本预注入成功";//提示注入成功
        var DownLoadAreaInfo=document.evaluate('//*[@id="videodetails-content"]/a[1]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
        if(DownLoadAreaInfo!=undefined)
        {
            DownLoadAreaInfo.removeAttribute("href");
            DownLoadAreaInfo.setAttribute("style","font-size:25px;color:white");
            DownLoadAreaInfo.textContent="";
            DownLoadAreaInfo.onclick = ()=>{scrollTo({top:document.body.scrollHeight,left:0})};//滚动到底部
        }
       var DownLoadAreaInfo2=document.evaluate("//div[@class='floatmenu'][4]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
        if(DownLoadAreaInfo2!=undefined)
        {
           // DownLoadAreaInfo2.replace("vip","");
            DownLoadAreaInfo2.setAttribute("style","font-size:22px;color:#ff8800");
            DownLoadAreaInfo2.textContent="点击下载";
            DownLoadAreaInfo2.onclick = ()=>{scrollTo({top:document.body.scrollHeight,left:0})};//滚动到底部
        }
    }
    else
    {
        console.log("无法找到boxpart");
    }
}
function RemoveBannerAd()
{
    var Ad_Image = document.getElementsByClassName("ad_img");//广告的图片
    for(var i=0;i<Ad_Image.length;i++)
    {
        console.log("正在移除第"+(i+1)+"个广告");
        Ad_Image[i].setAttribute("style","display:none");
    }
    if(location.href.includes("index.php"))
    {
        var Timer = setInterval(()=>
                                {
        var In = document.evaluate('/html/body/div[4]/div[1]/div[3]/div/text()',document).iterateNext();
        if(In!=undefined)
        {
            In.remove();
        }
        else
        {
            clearInterval(Timer);
        }
        },10);
    }
}
function Load_3U8Api()
{

          // 注入html
           let $section = document.createElement('section');
          $section.innerHTML = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><h1>脚本预注入成功，将当前页面网址发送<a href="https://t.me/chunv_bot" target="_blank" rel="noopener noreferrer">https://t.me/chunv_bot</a>至即可下载</h1><img src="https://dd-static.jd.com/ddimg/jfs/t1/116275/21/26636/117659/625ced50E7521f198/0b09220d167b59d2.png" width="50%" /></body>'
          $section.style.width = '100%'
          $section.style.height = '600px'
          $section.style.top = '0'
          $section.style.left = '0'
          $section.style.position = 'relative'
          $section.style.zIndex = '9999'
          $section.style.backgroundColor = 'white'
          document.body.appendChild($section);


          // 加载 vue
          let $vue = document.createElement('script')
          $vue.src = 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js'

          // 监听 vue 加载完成，执行业务代码
          $vue.addEventListener('load', () => {
document.getElementById('loading') && document.getElementById('loading').remove()
new Vue({
  el: '#m-app',





})
})

          document.body.appendChild($vue);
}
function RemoveVideoIframeAd()
{
    while(true)//强制进行移除广告，移除完毕则停止
    {
    var AdIFrames = document.getElementsByTagName("iframe");
    for(var u=0;u<AdIFrames.length;u++)
    {
        AdIFrames[u].remove();
    }
        if(AdIFrames.length==0)
        {
            console.log("[*] 已经无法找到iframe广告，代码停止运行");
            break;
        }
    }
}
function HookSearch()
{
    try
    {
    var PageElement = document.createElement("input");//创建一个input元素
    var SearchForm = document.getElementById("search_form")//搜索表单的元素
    PageElement.setAttribute("type","hidden");
    PageElement.setAttribute("name","page");
    PageElement.setAttribute("value","2");
    SearchForm.appendChild(PageElement);//向表单中追加元素
    console.log("注入成功");
    if(location.href.includes("search"))
    {
        var HostSearchElement= document.evaluate('//*[@id="videobox"]/p[2]', document, null, XPathResult.ANY_TYPE, null).iterateNext();//热搜榜
        for(var i=0;i<HostSearchElement.childElementCount;i++)
        {
            HostSearchElement.children[i].href+="&page=2";
        }
    }
    }
    catch(err)
    {

    }
}
function GetVideoTitleName()
{
    var VideoName = document.evaluate('//*[@id="videodetails"]/h4', document, null, XPathResult.ANY_TYPE, null).iterateNext();
    var DownloadName = VideoName.textContent.trim();
    return DownloadName;
}
function Rotate()
{
    var VideoPlayer = document.evaluate('//*[@id="player_one_html5_api"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();//获取视频播放器
    var PIP = document.evaluate('//*[@id="player_one"]/div[5]/button[4]', document, null, XPathResult.ANY_TYPE, null).iterateNext();//找到画中画，准备接管
    var PlayerMain = document.querySelector("#player_one", document, null, XPathResult.ANY_TYPE, null);//播放器主体
    var RotateFlag=true;//保持原始画面，没有进行旋转，此时为90deg
    PIP.textContent="旋转视频";
    PIP.setAttribute("style","font-size:2px");
    PIP.onclick=function(){
            if(RotateFlag)
            {
                VideoPlayer.setAttribute("style","transform:rotate(-90deg)");//此时画面为-90deg，非90deg，证明画面被旋转
                PlayerMain.style.height = "1000px";
                RotateFlag=false;//此时画面为非原始画面，此时为-90deg
            }
        else
        {
            VideoPlayer.setAttribute("style","transform:rotate(360deg)");//此时将画面恢复正常
            PlayerMain.style.height = "200px";
            RotateFlag=true;//交换flag，以正常执行代码
        }
    }
}
function MainFunction()
{
    var CurrentPageHref = location.href;//当前网页的链接
    HookSearch();//注入搜索参数
    $("head").append('<script async src="https://www.googletagmanager.com/gtag/js?id=G-6E1L856HPS"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'\G-6E1L856HPS\');</script>');
    if(CurrentPageHref.includes("view_video.php"))
    {
    document.onmousewheel = ()=>{RemovePipWindow()};//监听滚动事件，检测到鼠标滚动就尝试关闭小窗
    DeleagePlayBtnClickEvent();//通过播放按钮加载跳过广告代码
    Toast_Success();//进行信息提示
    Load_3U8Api();
    RemoveBannerAd();//删除Banner广告
    RemoveVideoIframeAd();//移除iframe广告
    }
    else
    {
       
        RemoveBannerAd();
    }
}
MainFunction();//主函数执行
