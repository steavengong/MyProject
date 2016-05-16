/**
 * Created by Administrator on 2016/5/4.
 */
angular.module("controllers.enjoy",[])
    .controller("enjoyCtrl",["$scope","$state","$config","$wx","$modal","$timeout","Upload","$alert","$httpServices",function($scope,$state,$config,$wx,$modal,$timeout,Upload,$alert,$httpServices){



        $scope.showRule = function(){
            $modal.closeModal($config.modals.enjoy);
            $modal.openModal($config.modals.rule);
        }

        $scope.goHome = function(){
            $modal.closeModal($config.modals.enjoy);
            $state.go($config.controllers.home.name);
        }

        $scope.changeDate = function(dateValue){
            $timeout(function(){
                $scope.enjoyObj.dateInput = DateFormat.format.date(dateValue,"yyyy/MM/dd");
            })
        }

        $scope.getChangFile = function(file){
            if(file!=null){
                $scope.enjoyObj.fileCu = file;
            }
        }

        $scope.enjoyObj = {
            babyName:"Hello",
            dateInput:"2016/05/16",
            phoneNumber:"12345678911",
            wxNumber:"test123",
            fileCu:"",
            remark:"test123"
        }

        $scope.validate = function($file){
            if (!/image\/\w+/.test($file.type)){
                $alert.show("图片格式错误");
                return false;
            }
        }

        $scope.submitEnjoy = function(enjoyObj){
            console.log(enjoyObj);

            if(enjoyObj.babyName==""){
                $alert.show("宝宝姓名不能为空");
                return;
            }

            if(enjoyObj.dateInput==""){
                $alert.show("宝宝生日不能为空");
                return;
            }

            if(enjoyObj.phoneNumber==""){
                $alert.show("手机号不能为空");
                return;
            }
            if(enjoyObj.wxNumber==""){
                $alert.show("微信号不能为空");
                return;
            }
            if(enjoyObj.fileCu==""){
                $alert.show("参赛图片不能少");
                return;
            }
            if(enjoyObj.remark==""){
                $alert.show("简介不能为空");
                return;
            }

            var action = $config.getRequestAction();
            var data = {
                "cmd":$config.cmds.attendMzc,
                "parameters":{
                    "openId" : $config.personInfo.openId,
                    "babyNick":enjoyObj.babyName,
                    "phoneNumber":enjoyObj.phoneNumber,
                    "wxNumber":enjoyObj.wxNumber,
                    "babyBrithday":enjoyObj.babyBrithday,
                    "remark":enjoyObj.remark,
                    "image":enjoyObj.fileCu
                }
            }

            $httpServices.uploadWithFile(action,data)
                .then(function(result){
                    console.log(result)
                },function(error){
                    console.log(error)
                })

            /*var action = $config.getRequestAction();
            var formData = needsFormDataShim ? new FormDataShim() : new FormData();
            formData.append("cmd",$config.cmds.attendMzc);
            var parameters = {
                "openId" : $config.personInfo.openId,
                "babyNick":enjoyObj.babyName,
                "phoneNumber":enjoyObj.phoneNumber,
                "wxNumber":enjoyObj.wxNumber,
                "babyBrithday":enjoyObj.babyBrithday,
                "remark":enjoyObj.remark,
                "image":enjoyObj.fileCu.$ngfBlobUrl
            }
            formData.append("parameters",parameters);


            var xhr = new XMLHttpRequest();
            xhr.onload = function(){
                console.log(xhr.responseText);
                if(xhr.status == 200){
                }
            }
            xhr.open('POST',action,true);
            xhr.send(formData);*/
        }



        // 判断是否需要blobbuilder
        var needsFormDataShim = (function () {
                var bCheck = ~navigator.userAgent.indexOf('Android')
                    && ~navigator.vendor.indexOf('Google')
                    && !~navigator.userAgent.indexOf('Chrome');

                return bCheck && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
            })(),
            blobConstruct = !!(function () {
                try { return new Blob(); } catch (e) {}
            })(),
            XBlob = blobConstruct ? window.Blob : function (parts, opts) {
                var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
                parts.forEach(function (p) {
                    bb.append(p);
                });

                return bb.getBlob(opts ? opts.type : undefined);
            };

//封装FormData 重写
        function FormDataShim () {
            // Store a reference to this
            var o = this,
                parts = [],// Data to be sent
                boundary = Array(5).join('-') + (+new Date() * (1e16*Math.random())).toString(32),
                oldSend = XMLHttpRequest.prototype.send;

            this.append = function (name, value, filename) {
                parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');

                if (value instanceof Blob) {
                    parts.push('; filename="'+ (filename || 'blob') +'"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                    parts.push(value);
                } else {
                    parts.push('\r\n\r\n' + value);
                }
                parts.push('\r\n');
            };

            // Override XHR send()
            XMLHttpRequest.prototype.send = function (val) {
                var fr,
                    data,
                    oXHR = this;
                if (val === o) {
                    //注意不能漏最后的\r\n ,否则有可能服务器解析不到参数.
                    parts.push('--' + boundary + '--\r\n');
                    data = new XBlob(parts);
                    fr = new FileReader();
                    fr.onload = function () { oldSend.call(oXHR, fr.result); };
                    fr.onerror = function (err) { throw err; };
                    fr.readAsArrayBuffer(data);

                    this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                    XMLHttpRequest.prototype.send = oldSend;
                }
                else {
                    oldSend.call(this, val);
                }
            };
        }



    }])