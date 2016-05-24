/**
 * Created by Administrator on 2016/5/24.
 */

function require(jsFiles){
    for(var i = 0; i < jsFiles.length; i++){
        var script = document.createElement("script");
        script.setAttribute("type","text/javascript");
        script.setAttribute("src","../../js/" + jsFiles[i] + ".js");
        document.body.appendChild(script);
    }
}
