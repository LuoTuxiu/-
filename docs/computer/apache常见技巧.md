# apache常见技巧

## 关于apache

apache是一个服务器，可以用于配置静态页面服务器

## apache配置路径 以及 查看apache版本及更详细的信息
```
apachectl -V
```

mac端打印如下：
```
Server version: Apache/2.4.46 (Unix)
Server built:   Oct 29 2020 20:35:15
Server's Module Magic Number: 20120211:93
Server loaded:  APR 1.5.2, APR-UTIL 1.5.4
Compiled using: APR 1.5.2, APR-UTIL 1.5.4
Architecture:   64-bit
Server MPM:     prefork
  threaded:     no
    forked:     yes (variable process count)
Server compiled with....
 -D APR_HAS_SENDFILE
 -D APR_HAS_MMAP
 -D APR_HAVE_IPV6 (IPv4-mapped addresses enabled)
 -D APR_USE_FLOCK_SERIALIZE
 -D APR_USE_PTHREAD_SERIALIZE
 -D SINGLE_LISTEN_UNSERIALIZED_ACCEPT
 -D APR_HAS_OTHER_CHILD
 -D AP_HAVE_RELIABLE_PIPED_LOGS
 -D DYNAMIC_MODULE_LIMIT=256
 -D HTTPD_ROOT="/usr"
 -D SUEXEC_BIN="/usr/bin/suexec"
 -D DEFAULT_PIDLOG="/private/var/run/httpd.pid"
 -D DEFAULT_SCOREBOARD="logs/apache_runtime_status"
 -D DEFAULT_ERRORLOG="logs/error_log"
 -D AP_TYPES_CONFIG_FILE="/private/etc/apache2/mime.types"
 -D SERVER_CONFIG_FILE="/private/etc/apache2/httpd.conf"
```

**可以看到，apache的配置文件地址在/private/etc/apache2/httpd.conf**


## apache常见命令

### 启动apache
```
sudo apachectl start
```

按照默认配置，可以去访问http://localhost/，可以看到服务已经起来了

![20201130233715](http://qiniu.luotuxiu.cn/img/20201130233715.png)

### 重启apache
```
apachectl restart
```

### 关闭apache
```
apachectl stop
```

### 查看apache配置是否有错误
```
apache configtest
```

如有错误，会提示如下示例
```
AH00526: Syntax error on line 559 of /private/etc/apache2/httpd.conf:
Invalid command 'RewriteEngine', perhaps misspelled or defined by a module not included in the server configuration
```



#### 配置解读

```
<IfDefine SERVER_APP_HAS_DEFAULT_PORTS>
    Listen 8080
</IfDefine>
<IfDefine !SERVER_APP_HAS_DEFAULT_PORTS>
    Listen 80
</IfDefine>
```
apache默认服务端口：80


```
#LoadModule proxy_module libexec/apache2/mod_proxy.so
```

默认很多服务是没有加载的，比如这个代理转发服务，如果要使用相应的功能，则需要将这里的注释打开

```
<VirtualHost 80>
	ServerName youname
	ProxyPass /hello http://localhost:8080/
  ProxyPassReverse /hello http://localhost:8080/
</VirtualHost>
```

上述的含义是将所有80端口的/hello请求转发到http://localhost:8080/地址


### 更改apache的配置
```
vi /private/etc/apache2/httpd.conf
```

有时候会出现不能保存，提示只读的问题，这是权限问题，默认权限如下：终端输入ls -al /private/etc/apache2/httpd.conf

```
-rw-r--r--  1 root  wheel  21641 Jan  1  2020 /private/etc/apache2/httpd.conf
```

可以看到，是只读的。这是我们需要用管理员权限更改该文件的只读权限

```
sudo chmod 744 /private/etc/apache2/httpd.conf
```

再次查看权限
```
-rwxr--r--  1 root  wheel  21733 Dec  3 07:18 /private/etc/apache2/httpd.conf
```

接着，去vi编辑即可保存

### 查看apache的access log

可以查得到，默认log的日志都是放在/private/var/log/apache2/access_log

这时候，执行
```
cat /private/var/log/apache2/access_log
```
命令就可以看到了


### 查看apache的错误log

首先，去查找apache log存放地址，去httpd.conf中查找
```
ErrorLog "/private/var/log/apache2/error_log"
```

可以查得到，默认log的日志都是放在/private/var/log/apache2/error_log

这时候，执行
```
cat /private/var/log/apache2/error_log
```
命令就可以看到了

### 调试apache（调整apache log 日志级别以查看更多调试信息）

```
LogLevel alert rewrite:trace3
```

### 域名转发（接口转发）

编辑apache配置文件


需求：localhost:8080 vuepress本地已经run起来，现在要求访问localhost/blog/也能够访问同样的内容。
思路：localhost/blog/ 接口转发到 localhost:8080


方式1 
```
<Location "/">
    ProxyPass "http://localhost:8080/"
</Location>
```

方式2
```
<VirtualHost *:80>
    ServerName blog
    RewriteEngine  on
    RewriteRule "^/blog/(.*)" http://localhost:8080/blog/$1 [P]
</VirtualHost>
```

注意，一般很多前端构建的base url是/，如果我们在这加了blog的相对路径，往往需要去前端页面构建的配置里面添加相对路径，比如，vuepress的配置如下：

```
// docs/.vuepress/config.js
base: '/blog/',
```

### apache常见错误

#### Invalid command 'RewriteEngine'

```
AH00526: Syntax error on line 559 of /private/etc/apache2/httpd.conf:
Invalid command 'RewriteEngine', perhaps misspelled or defined by a module not included in the server configuration
```

原因可能是因为你没有开启mod_rewrite模块，去配置文件将开模块的引入注释去掉即可

更多精彩文章可以看[我的博客](https://www.luotuxiu.cn/)，如有错误，欢迎指正，共同进步
