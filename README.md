# Get my dnspod id
DNSPOD 查询指定域名ID/记录ID

使用方法:

1.打开    https://www.dnspod.cn/Login?default=email    并登录你的DNSPOD账号

2.在登录后页面内按 F12 打开开发者工具

3.进入CONSOLE选项卡

4.复制本文件全部内容,并粘贴进Console页面内,最后按下Enter键提交代码

5.在Console内输入 getDomainRecordId("这里填写域名","这里填写主机记录","这里填写记录类型");并回车

域名:直接输入顶级域名 如 google.com 不要填写二级域名 如: www.google.com
    
主机记录: 输入解析的主机记录 如 www  @ 

记录类型: 必须输入大写的记录类似 如 A CNAME MX NS 

完整例子: getDomainRecordId("google.com","www","A");

getDomainRecordId("google.com","@","MX");
