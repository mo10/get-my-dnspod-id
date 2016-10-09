function getcookie(objname){
	//获取指定名称的cookie的值
	var arrstr = document.cookie.split("; ");
	for(var i = 0;i < arrstr.length;i ++){
		var temp = arrstr[i].split("=");
		if(temp[0] == objname) return unescape(temp[1]);
	}
}
function getRecordId(domainid,recordname,recordtype){
	var postData = {
		"domain_id":domainid,
		"format":"json",
		"lang":"cn",
		"error_on_empty":"no",
		"use_session":"yes",
		"offset":"0",
		"length":"200"
	};

	postData = (function(obj){
		// 转成post需要的字符串.
		var str = "";
		for(var prop in obj){
			str += prop + "=" + obj[prop] + "&";
		}
		return str;
	})(postData);

	var xhr = new XMLHttpRequest();

	xhr.open("POST", "https://www.dnspod.cn/Api/Record.List?_xsrf="+getcookie("_xsrf"), true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.onreadystatechange = function(){
		var XMLHttpReq = xhr;
		if (XMLHttpReq.readyState == 4) {
			if (XMLHttpReq.status == 200) {
				var raw = JSON.parse(XMLHttpReq.responseText); 
				for (var i = 0; i <raw.records.length; i++) {
					if (raw.records[i].name==recordname&&raw.records[i].type==recordtype) {
						console.log("主机记录是"+recordname+" 类型是"+recordtype+"的 记录ID为:"+raw.records[i].id);
					}
				}
			}
		}
	};
	xhr.send(postData);

}
function getDomainRecordId(domain,record,recordtype){
	var postData = {
		"format":"json",
		"lang":"cn",
		"error_on_empty":"no",
		"use_session":"yes",
		"group_id":"0",
		"type":"recent",
		"offset":"0",
		"length":"15"
	};

	postData = (function(obj){
		// 转成post需要的字符串.
		var str = "";
		for(var prop in obj){
			str += prop + "=" + obj[prop] + "&";
		}
		return str;
	})(postData);

	var xhr = new XMLHttpRequest();

	xhr.open("POST", "https://www.dnspod.cn/Api/Domain.List?_xsrf="+getcookie("_xsrf"), true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.onreadystatechange = function(){
		var XMLHttpReq = xhr;
		if (XMLHttpReq.readyState == 4) {
			if (XMLHttpReq.status == 200) {
				var raw = JSON.parse(XMLHttpReq.responseText); 
				for (var i = 0; i <raw.domains.length; i++) {
					if (raw.domains[i].name==domain) {
						console.log("域名"+domain+"的 域名ID为:"+raw.domains[i].id);
						getRecordId(raw.domains[i].id,record,recordtype);
						break;
					}
				}
			}
		}
	};
	xhr.send(postData);

}
