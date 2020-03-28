# linux 学习笔记

## 2014.11.02:

1.执行 make menuconfig 对配置进行修改时出现错误： 错误提示：

```
HOSTCC
scripts/basic/fixdep HOSTCC scripts/kconfig/conf.o **_ Unable to find the
ncurses libraries or the _** required header files. **_ 'make menuconfig'
requires the ncurses libraries. _** **_ Install ncurses (ncurses-devel) and try
again. _** make[1]: **_ [scripts/kconfig/dochecklxdialog]
```

错误 1 make: \_\*\* [menuconfig] 错误 2 解决办法：yum install ncurses-devel
![c0e054804c6017c25068bc740af82ca7](https://github.com/LuoTuxiu/Learn-note/blob/master/note%20picture/c0e054804c6017c25068bc740af82ca7.jpg)

2014.11.04 :1.使用 open 函数时提示找不到 fcnt1.h 解决办法：印刷错误，应该是
fcntl.h，是英文字母 l

2014.11.07 :1.已经搭建好 win7 以及和台式机器 fedora 之间以及和开发板的
ftp,telnet 登陆，但是未尝试 Fedora 和开发板之间的 nfs 挂载；乱码问题没解决；

2014.11.11 :1.常用：linux 常用编码为 UTF-8，而往往 windows 下常用 ANSI 格式，这
里需要转换，请注意；

2014.11.13 :1.Fedora 关闭防火墙： 重启后生效开启： chkconfig iptables on 关闭：
chkconfig iptables off 或者 /sbin/chkconfig --level 2345 iptables off

即时生效，重启后失效 service 方式开启： service iptables start 关闭： service
iptables stop iptables 方式查看防火墙状态： /etc/init.d/iptables status 暂时关闭
防火墙： /etc/init.d/iptables stop 重启 iptables: /etc/init.d/iptables restart
2.ubuntu 中如何关闭防火墙 sudo ufw disable 关闭防火墙 sudo ufw enable 开启防火墙
sudo ufw status 检查防火墙的状态 3.利用 FlashTxp 时发现登陆不上 ubuntu，查看是否
是选择“主动模式”、“被动模式”错误；

2014.11.15 1.两台 linux 机器之间利用 ftp 传输文件时需要若提示： 425 Can't open
passive connection: Permission denied. Passive mode refused. 解决方法： passive
mode off；即可；原因？ 2.当在 linux 下编译好 arm 的可执行程序后，下载到 arm 板发
现提示： -sh: ./button: Permission denied 解决办法：传文件过程中文件属性发生修改
，要把文件修改成可执行文件才可以被执行；

2014.11.18; 1.union 数据结构; 公用内存，但只能取到一个变量；

2. 如何在 sourceinsight 里面显示行号 option->document option->editing options 中
   ，show line numbers 2014.11.20:
1. printk 和 printf 的区别： printk 是在内核中运行的向控制台输出显示的函数
   ，Linux 内核首先在内核空间分配一个静态缓冲区，作为显示用的空间，然后调用
   sprintf，格式化显示字符串，最后调用 tty_write 向终端进行信息的显示。 printk
   与 printf 的差异，是什么导致一个运行在内核态而另一个运行用户态？其实这两个函
   数的几乎是相同的，出现这种差异是因为 tty_write 函数需要使用 fs 指向的被显示的
   字符串，而 fs 是专门用于存放用户态段选择符的，因此，在内核态时，为了配合
   tty_write 函数，printk 会把 fs 修改为内核态数据段选择符 ds 中的值，这样才能正
   确指向内核的数据缓冲区，当然这个操作会先对 fs 进行压栈保存，调用 tty_write 完
   毕后再出栈恢复。总结说来，printk 与 printf 的差异是由 fs 造成的，所以差异也是
   围绕对 fs 的处理。
1. unix 中的 EBUSY 什么意思：这是一种标准的错误值，表示 “设备或资源忙”错误。

   2014.11.22 :1.编译驱动模块时可以只编译单个文件，如：比如编译自带的驱动演示
   ，qq2440*hello.c，可以在配置了 Makefile 和 Kconfig 之后执行 make
   drivers/char/qq2440_hello.o (注意这里是.o 不是.c) 然后 make
   drivers/char/qq2440_hello.ko 编译就完成了，只需要几秒钟时间参考链接
   :http://www.arm9home.net/read.php?tid-2670.html 2.编译 nrf24l01 驱动时出现警
   告： warning: passing argument 2 of 'SPI_Write_Buf' discards qualifiers from
   pointer target type note: expected 'uchar *' but argument is of type 'const
   uchar \_' 解决方法：主要是因为 uchar SPI_Write_Buf(uchar reg, uchar \*pBuf,
   uchar uchars)定义的时候为 uchar,而我真正在用这个函数的时候却实际赋值的是
   ：uchar const，导致实际的不对应；改成一一对应即可； 2014.11.28: 1．编译第一个
   程序：（1）编译模块： 现在 Makefile 里面修改添加上：obj-m +=NRF24L01.o; 在
   linux3.0.8 下面执行 make drivers/char/NRF24L01.o;生成 NRF24L01.o 文件； 接着
   ，执行：make drivers/char/NRF24L01.ko; 生成 NRF24L01.ko 文件； 将 ko 文件利用
   ftp 传入到开发板/lib/modules/3.0.8-FriendlyARM/;将权限改成 777； 进入开发板
   /lib/modules/3.0.8-FriendlyARM/目录，在当前开发板上执行：insmod NRF24L01.ko
   加载 NRF24L01 模块，再运行下列命令： cat /proc/devices； 即可发现多出了
   “NRF24L01”这一行，找到它的主设备号后，接着运行： mknod /dev/NRF24L01 c 241
   0;(备注：241 是驱动申请的主设备号，其它照常，c 表示的是字符设备)

   2014.11.29 :1.static 定义的静态变量的作用是：生命期延长，即相比自动变量而言，
   虽然局部函数已经失效，但是 static 定义的变量仍然存在，但是也不能引用，再次调
   用该函数时才能继续引用该静态变量； 2.关于如何卸载模块：（1）使用命令：rmmod
   /proc/devices NRF24L01，应该是要加上/proc/devices 才行；对于杂项设备，需要这
   样子输入：rmmod mini210_leds，就是把驱动后缀去掉，才能卸载，上一行的方法不行
   ； 2014.11.30： 1.对于 NRF24L01 的理解：（1）本机地址和接收地址，本机地址是指
   发送出去时对外宣称的本机地址，而不是要发送目标的目标地址；接收地址是指接收哪
   个地址的数据；（2）在 C 语言的编程中，一个函数若带有返回值，则遇到 return 语
   句函数终止执行，已经退出了，所以不会执行函数后面的语句； 2014.12.1: (1)在使用
   talnet 时，发现串口能够输出很多信息，而利用 talnet 则不能显示很多信息，而且，
   在用 talnet 时竟然连 plg 主文件夹都显示不出原来的文件，只显示了 NRF24L01.ko,
   和 test 两个文件，而用串口则显示正常，是网络的问题吗？之前都没遇到过；
   2014.12.4 :1.驱动函数注册时有两种注册方式，各有特点：参见
   ：http://blog.csdn.net/lanmanck/article/details/4713978 杂项设备（misc
   device）杂项设备也是在嵌入式系统中用得比较多的一种设备驱动。在 Linux 内核的
   include/linux 目录下有 Miscdevice.h 文件，要把自己定义的 misc device 从设备定
   义在这里。其实是因为这些字符设备不符合预先确定的字符设备范畴，所有这些设备采
   用主编号 10 ，一起归于 misc device，其实 misc_register 就是用主标号 10 调用
   register_chrdev()的。也就是说，misc 设备其实也就是特殊的字符设备，可自动生成
   设备节点。

字符设备(char device) 使用 register_chrdev(LED_MAJOR,DEVICE_NAME,&dev_fops)注册
字符设备驱动程序时，如果有多个设 备使用该函数注册驱动程序，LED_MAJOR 不能相同，
否则几个设备都无法注册(我已验证)。如果模块使用该方式注册并且 LED_MAJOR 为 0(自动
分配主设备号 )，使用 insmod 命令加载模块时会在终端显示分配的主设备号和次设备号，
在/dev 目录下建立该节点，比如 设备 leds，如果加载该模块时分配的主设备号和次设备
号为 253 和 0，则建立节点:mknod leds c 253 0。使用 register_chrdev
(LED_MAJOR,DEVICE_NAME,&dev_fops)注册字符设备驱动程序时都要手动建立节点 ，否则在
应用程序无法打开该设备。 2014.12.11: (1)在 C 语言编程中，当定义了 unsigned char
时，如果我们在赋值的时候赋的是十进制的数，那么也就相当于赋值了一个字符，在
ascall 表中有一一对应关系，这时候重点就是要注意如果调用 printk 函数时要注意如果
用%d 则显示的是十进制的数，如果用%s 显示的是字符串的格式，如果用%c 显示的是字符
的格式，以此类推；（2）printk 有时候显示有时候不显示的问题未解决，而且用 dmesg
也查看不到全部的信息；难道真的是没有执行到？需要再次检查；首先，查看 printk 的等
级命令如下：cat /proc/sys/kernel/printk，修改 printk 等级命令如下: echo "7 1 1
7" > /proc/sys/kernel/printk;如果需要查看所有的未打印的信息，输入命令：cat
/proc/kmsg；参考链接：http://blog.csdn.net/zhenwenxian/article/details/4336211
（3）已经调试好 nrf24l01 的驱动和应用程序，保存在 linux program\nrf24l01 调试成
功代码； 2014.12.13：（1）今天开始重新书写 usb 摄像头关于 v4l2 的驱动以及应用程
序； (2)在 C 语言当中，enum 是表示的是枚举类型；查找资料有
：http://blog.csdn.net/logogcn/article/details/7879398 2014.12.16: (1)在 C 语言
的文件编程中，运用哪个 read 和 write 函数需要参考不同的情况，参见教科书 393 页；
2014.12.18: (1)对于 misc 的驱动应该是如何去卸载和动态加载呢，这点需要学习的；：
解决方法：将设备名字改成不同的，还是 insmod 加载； 2014.12.19 :1.看帮助最重要看
三点，一点是看函数描述和函数参数类型，二点是看包含的函数头文件，三点是看返回值，
英文为 return values; 2.如果命令只有一个含义，则可以直接 man 来查询帮助，如果该
命令或者函数有多个含义，则这样子查询：man n 　命令；如果ｔｉｍｅ（３）代表函数，
则这样子输入：ｍａｎ　３　ｔｉｍｅ；即可实现查询帮助；

3.这个图标可以看成是个ｍａｎ帮助的结构解读：

4.#include <stdio.h>　表示存放在系统默认位置，即／ｕｓｒ／ｉｎｃｌｕｄｅ位置存放
的； #include “myinc.h”表示存放在当前其它位置；需要再次确认该定义； 2014.12.21:
(1)今天开始配置 apache 服务器，现在记下来每一步所做的： 1.修改设定 apache 服务器
的网页根目录: /home/zhangsan123456；

2.设置最大连接数：注意，这里有两个.c 文件，貌似都要设置；

3.设置主机名：（前提是已经改成这个主机名了，要不然会出现错误）

4.设置为 big5 语言：

改成你想要的即可； 5.开始设置个人认证，参考鸟哥的 804 页，设置好后，我应该输入的
是：
http://luotuxiu2012130138:1080/protect/，这里容易因为拼写错误而导致访问失败； 参
照 794 页设置个人主页；设置好个人主页后，应该输入的是
：http://luotuxiu2012130138:1080/~luotuxiu2012130138/ 如果设置了/home/www 为网页
认证文件夹，则需要这样子输入
：http://luotuxiu2012130138:1080/~luotuxiu2012130138/html/ (2)设置 linuxz 终端为
护眼模式，如下：点到 color, 将 background color 颜色改为#CCE8CF 即可；

2014.12.23 :1.如果需要将驱动程序编译进内核，那么需要 linux-3.0.8 目录下执行 make
menuconfig 进行配置，配置选项有三个，功能分别如下： Y－-将该功能编译进内核 N－-
不将该功能编译进内核 M－-将该功能编译成可以在需要时动态插入到内核中的模块 ；接着
,进行 make，就能够在 arch/arm/boot 下编译出内核文件； 2.关于 linux 出现内存错误
：参照网址
：http://www.cnblogs.com/justacoder/archive/2010/04/14/segmentation_fault.html

造成 segment fault，产生 core dump 的可能原因

1.内存访问越界 a) 由于使用错误的下标，导致数组访问越界 b) 搜索字符串时，依靠字符
串结束符来判断字符串是否结束，但是字符串没有正常的使用结束符 c) 使用 strcpy,
strcat, sprintf, strcmp, strcasecmp 等字符串操作函数，将目标字符串读/写爆。应该
使用 strncpy, strlcpy, strncat, strlcat, snprintf, strncmp, strncasecmp 等函数防
止读写越界。 2 多线程程序使用了线程不安全的函数。 3 多线程读写的数据未加锁保护。
对于会被多个线程同时访问的全局数据，应该注意加锁保护，否则很容易造成 core dump 4
非法指针 a) 使用空指针 b) 随意使用指针转换。一个指向一段内存的指针，除非确定这段
内存原先就分配为某种结构或类型，或者这种结构或类型的数组，否则不要将它转换为这种
结构或类型的指针，而应该将这段内存拷贝到一个这种结构或类型中，再访问这个结构或类
型。这是因为如果这段内存的开始地址不是按照这种结构或类型对齐的，那么访问它时就很
容易因为 bus error 而 core dump.

5 堆栈溢出.不要使用大的局部变量（因为局部变量都分配在栈上），这样容易造成堆栈溢
出，破坏系统的栈和堆结构，导致出现莫名其妙的错误。例如，我的数组引用了越界的数据
，就会这样子，必须注意；

2014.12.24 :1.今天查到 210 上面的 video 的说明如下：

S5PV210 会在/dev/下生成几个 video 相关的设备节点，分别为 /dev/video0,
/dev/video1, /dev/video2 /dev/video14, /dev/video21, /dev/video22

video0, video1, video2 的作用是和 Android camera/overlay HAL 密切相关的，HAL 层
来决定这三个设备的具体作用，也就是说在设备驱动层并不会定义他们的具体作用。
/dev/video0 被 android camera HAL 用于 capture 和 preview 时，获取 camera sensor
数据 /dev/video1 被 android overlay HAL 用于视频输出，参见
samsung/proprietary/liboverlay/overlay.cpp，overlay_createOverlay 函数
，v4l2_overlay_open 打开设备节点/dev/video1 /dev/video2 被 android camera HAL 用
于录像时，获取 camera sensor 数据 /dev/video14 是 TVout mixer 的 video 设备
/dev/video21 是 TVout overlay1 /dev/video22 是 TVout overlay2

2014.12.25： 1.关于 fprint 的用法：参考网址
：http://baike.baidu.com/view/3233662.htm 【unix】标准输出(设备)文件，对应终端的
屏幕。进程将从标准输入文件中得到输入数据，将正常输出数据输出到标准输出文件，而将
错误信息送到标准错误文件中。在 C 中，程序执行时，一直处于开启状态。可能的使用方
法有：fprintf(stderr,"error message") stderr -- 标准错误输出设备 stdout -- 标准
输出设备 (printf("..")) 同 stdout。　　两者默认向屏幕输出。　　但如果用转向标准
输出到磁盘文件，则可看出两者区别。stdout 输出到磁盘文件，stderr 在屏幕。　　例如
： fprintf(stderr, "Can't open it!\n"); 　　 fprintf(stdout, "Can't open
it!\n"); 2.关于 linux 函数的退出方式提示： EXIT_FAILURE 是 C 语言头文件库中定义
的一个符号常量，在 vc++6.0 下头文件 stdlib.h 中定义如下： #define EXIT_FAILURE 1
. EXIT_FAILURE 可以作为 exit()的参数来使用，表示没有成功地执行一个程序。
EXIT_SUCCESS 作为 exit()的参数来使用，表示成功地执行一个程序。注意：记得包括头文
件：stdlib.h 3.xioctl 函数对于 ioctl 函数的封装：参考
：http://www.jayrambhia.com/blog/capture-v4l2/ #include <sys/ioctl.h> static int
xioctl(int fd, int request, void \*arg) { int r; do r = ioctl (fd, request,
arg); while (-1 == r && EINTR == errno); return r; }

2014.12.26 :1 如何查看 linux 系统版本号等信息：方法一：命令：cat /proc/version 2
今天在虚拟机时发现 yum 安装安装不了，出现的错误提示如下： Error: Cannot retrieve
repository metadata (repomd.xml) for repository: fedora. Please verify its path
and try again 经过谷歌，找到解决方法：参考网址
：http://forums.fedoraforum.org/showthread.php?t=223472 修改文件：vi
/etc/yum.repos.d/fedora.repo

正如最后一行所言（最后的 https 打错了，应该是 http），将出现错误提示的段的 https
改成 http 就好了；即可解决；那么问题来了，我的另一台电脑也是一样的配置，为啥不可
以呢？ 3.如何开启 linux 的 telnet 服务：对于 fedora: 先 yum install
telnet-server; 然后就是修改配置文件： vi /etc/xinetd.d/telnet service telnet {
disable = yes flags = REUSE socket_type = stream wait = no user = root server =
/usr/sbin/in.telnetd log_on_failure += USERID disable=no //仅修改了这里
#disable=yes }

4. stat 函数讲解（转）

表头文件: #include <sys/stat.h> #include <unistd.h> 定义函数: int stat(const
char *file_name, struct stat *buf); 函数说明: 通过文件名 filename 获取文件信息，
并保存在 buf 所指的结构体 stat 中返回值: 执行成功则返回 0，失败返回-1，错误代码
存于 errno 5.ioctl 函数的返回值： ioctl 函数的返回值是一个整数类型的值，如果命令
执行成功，ioctl 返回零，如果出现错误，ioctl 函数应该返回一个负值。这个负值会作为
errno 值反馈给调用此 ioctl 的用户空间程序。关于返回值的具体含义，请参考
<linux/errno.h>和<asm/errno.h>头文件。参考网址
：http://www.cnblogs.com/noaming1900/archive/2010/10/20/1856581.html

2014.12.29 :1.下面介绍视频的相关知识点： 5.1.1 RGB 与 YUV 格式简介 （1） RGB 格
式简介 RGB 色彩模式是一种颜色标准，是通过对红(R)、绿(G)、蓝(B)三个颜色通道的变化
以及它们相互之间的叠加来得到各式各样的颜色的。图像中每一个像素的 RGB 分量都分配
一个 0~255 范围内的强度值。这个标准几乎包括了人类视力所能感知的所有颜色，主要应
用在显示器上。 （2） YUV 格式简介 YUV 是一种颜色编码方法。Y'UV, YUV,
YCbCr，YPbPr 等专有名词都可以称为 YUV。“Y”表示明亮度（Luminance、Luma），“U”和
“V”则是色度、浓度（Chrominance、Chroma）。RGB 诉求于人眼对色彩的感应，YUV 则着重
于视觉对于亮度的敏感程度。采用 YUV 色彩空间的重要性是它的亮度信号 Y 和色度信号
U、V 是分离的。如果只保留 Y 信号分量去掉 U、V 分量，那么这样表示的图像就是黑白灰
度图像，从而实现使黑白电视机也能接收彩色电视信号。 YUV 主要的采样格式有 YCbCr
4:2:0、YCbCr 4:2:2、YCbCr 4:1:1 和 YCbCr 4:4:4。因为摄像头常见的输入格式为 YUV
4:2:2,所以本文主要介绍 YUV4:2:2. YUV 4:2:2 采样格式的每个色差信道的采样率是亮度
信道的一半。例如两个像素点的 Y,U,V 值依次为：[Y0 U0 V0][y1 u1 v1]。采样后的码流
为：Y0 U0 Y1 V1。 最后显示时的像素点又还原为：[Y0 U0 V1][y1 u0 v1]。显然舍弃了
V0，U1，这样可以减少传输时占用的带宽，而且对画质并没有很大影响，因为人眼对彩度的
敏感度远不如亮度，而亮度信息并没有减少。 （3） YUV 与 RGB 格式的转换 本设计中需
要将摄像头输出的 YUV 格式的图像数据，通过 libjpeg 压缩为 JPEG。但是 libjpeg 不支
持直接压缩 YUV，所以本文先将 YUV 数据转换成 RGB 再调用 libjpeg 库来压缩成 JPEG。
YUV 转换为 RGB 只需要通过公式简单换算即可，具体换算方法见 YUYV 压缩为 JPEG 的函
数 compress_yuyv_to_jpeg。若是基于 libjpeg 库将 YUYV 图像转换为 jpeg 格式进行网
络传输，则参考下列网址：
http://wenku.baidu.com/link?url=ea_bUrwm2HyS0Rgn6NzBBuQLALSKld_bWG9Mbuj3lteXySknGinm0sGObIL4uhsPHtklk3Z-ovtkGQzPmMuSwmjSpo4CGjFlL8BYiBqLkva

2. gzip: stdin: not in gzip format 解决办法今天解压文件时出现如下问题：

# sudo tar zxvf ./jdk-7ull-linux-i586.tar.gz -C /usr/lib/jvm

gzip: stdin: not in gzip format tar: Child returned status 1 tar: Error is not
recoverable: exiting now 问题解决方法如下：将 z 参数换成 j 参数问题解决 bz2 格式
用 j gz 格式用 z c 是创建 x 是解压缩 v 是详细信息 f 是指定文件 3.一开始在开发板
上面提示找不到: ./camera_h264encode: error while loading shared libraries:
libx264.so.122: cannot open shared object file: No such file or directory 所以我
将 libx264.so.122 放到/usr/lib，解决；还有一定需要注意：最后面的 122 要和程序的
对应，要不然会报错，所以有可能网络传输后解码会有问题，因为 ubuntu 的貌似是 140
的（编译的时候发现它提示\_140 错误）； 4.代码错误在这里：

初步判断是内存非法使用导致程序退出；

2014.12.30： 1.make 时提示"make: 警告:检测到时钟错误。您的创建可能是不完整的"的
警告；原因是有文件的时间比当前时间还要晚，解决方法：（对该文件夹或者文件使用）
[root@luo camera]# touch . 2.今天开始搭建 gdb 的环境，尝试找出段错误的地方；参照
网址：http://www.arm9home.net/read.php?tid=1396 在开发板上输入：gdbserver
172.31.101.222:2012 /home/plg/camera/bin/camera_h264encode（172.31.101.222 对应
的是 linux 的地址，/home/plg/camera/bin/camera_h264encode 表示要调试的那个可执行
文件）搭建好后，在 linux 上输入 arm-linux-gdb
/home/luo/camera/bin/camera_h264encode（/home/plg/camera/bin/camera_h264encode
表示要调试的那个可执行文件，这个文件是在 linux 上的），进入 gdb 调试模式后，再输
入 target remote 172.31.101.180:2012（172.31.101.180 对应着开发板的 ip）；初步即
可调试； 3.添加共享库的寻找命令如下：

4.在用 gdb 调试时发现出现错误： Error while mapping shared library sections:
/lib/ld-linux.so.3: No such file or directory. 解决方法：参考网址
：http://blog.csdn.net/harry_helei/article/details/5740456，安装完毕后，成功；

5. GDB 的基本指令： load：装入一个程序 symbol-file：装入符号库文件，可以是用-g
   参数编译的可执行文件。 f(ile)：指定一个可执行文件进行调试，gdb 将读取些文件的
   调试讯息，如 f a.exe l(ist)：列程序出源文件 r(un) ：装载完要调试的可执行文件
   后，可以用 run 命令运行可执行文件 b(reak)：设置断点（break point），如 b 25，
   则在源程序的第 25 行设置一个断点，当程序执行到第 25 行时，就会产生中断；也可
   以使用 b funcname，funcname 为函数的名称，当程序调用些函数时，则产生中断
   c(ontinue)：c 命令可以另中断的程序继续执行，直到下一个中断点或程序结束
   p(rint)：输入某个变量的值，如程序定义了一个 int aa 的就是，p aa 就会输出 aa
   的当前值 n(ext)：程序执行到断点时中断执行，可以用 n 指令进行单步执行 s(tep)：
   程序执行到断点时中断执行，可以用 s 指令进行单步执行进某一函数 q(uit)：退出
   GDB；

   2015.1.4： 1.今天继续完成 linux 的期末大设计：（1）学习 wireshark 来分析网络
   协议：参考网址
   ：http://www.cnblogs.com/tankxiao/archive/2012/10/10/2711777.html 封包详细信
   息 (Packet Details Pane) 这个面板是我们最重要的，用来查看协议中的每一个字段。
   各行信息分别为 Frame: 物理层的数据帧概况 Ethernet II: 数据链路层以太网帧头部
   信息 Internet Protocol Version 4: 互联网层 IP 包头部信息 Transmission Control
   Protocol: 传输层 T 的数据段头部信息，此处是 TCP Hypertext Transfer Protocol:
   应用层的信息，此处是 HTTP 协议（2）完成 6.1 题 Uniq 的用法：参考网址
   ：http://blog.51yip.com/shell/1022.h 文本中的重复行，基本上不是我们所要的，所
   以就要去除掉。linux 下有其他命令可以去除重复行，但是我觉得 uniq 还是比较方便
   的一个。使用 uniq 的时候要注意以下二点 1，对文本操作时，它一般会和 sort 命令
   进行组合使用，因为 uniq 不会检查重复的行，除非它们是相邻的行。如果您想先对输
   入排序，使用 sort -u。 2，对文本操作时，若域中为先空字符(通常包括空格以及制表
   符)，然后非空字符，域中字符前的空字符将被跳过

1. [zhangy@BlackGhost ~]\$ uniq --help
1. 用法：uniq [选项]... [文件]
1. 从输入文件或者标准输入中筛选相邻的匹配行并写入到输出文件或标准输出。
1.
1. 不附加任何选项时匹配行将在首次出现处被合并。
1.
1. 长选项必须使用的参数对于短选项时也是必需使用的。
1. -c, --count //在每行前加上表示相应行目出现次数的前缀编号
1. -d, --repeated //只输出重复的行
1. -D, --all-repeated //只输出重复的行，不过有几行输出几行
1. -f, --skip-fields=N //-f 忽略的段数，-f 1 忽略第一段
1. -i, --ignore-case //不区分大小写
1. -s, --skip-chars=N //根-f 有点像，不过-s 是忽略，后面多少个字符 -s 5 就忽略后
   面 5 个字符
1. -u, --unique //去除重复的后，全部显示出来，根 mysql 的 distinct 功能上有点像
1. -z, --zero-terminated end lines with 0 byte, not newline
1. -w, --check-chars=N //对每行第 N 个字符以后的内容不作对照
1. --help //显示此帮助信息并退出
1. --version //显示版本信息并退出

   2015.2.5 :1.fedora14 的 miniCOM 出现了问题，在谷歌后找到一点解决方案，如下：
   在用户账号下输入 sudo minicom -S ttyS0 –o，即可进入超级终端； 2015.3.5 :1.发
   现一个现象，插入 usb 摄像头后，程序中使用 video0 或者 video3 都是一样的效果，
   这是为什么呢？ 2.不管我在 main 函数或者在设置 fmt 那个结构体的变量的宽度和长
   度的时候，该摄像头都会自动设置为 176*144 的大小，可是上个学期的时候我是可以根
   据程序来调整图片宽度的，这又是为什么呢？只有我在设置为 160*120 的时候，它就会
   调整为 160\*120，这样在压缩为 h.264 时才不会导致出现段错误，内存错误退出。 3.
   更换了网站上面新的内核后也没有改善实验效果。 2015.3.12 :1.在 Ubuntu 下重启
   samba 的正确命令是：/etc/init.d/smbd start，网上面许多写的/samba 是错误的；
   2.vs 对应的版本如下：

注意不要搞错； 2015.3.15 :1.vs2012 更改字体参考网站：
http://www.cnblogs.com/lushuicongsheng/archive/2012/07/17/2595006.html 2.\_T 的
作用是：\_T 是一个宏，作用是让你的程序支持 Unicode 编码用法：wchar_tStr[] =
L"Hello World!"; 2015.3.20 :1.在 mfc 界面输出 printf 信息需要加入一下步骤： 3）
将标准输出定向到自己创建的控制台 #include "io.h" #include "fcntl.h" void
InitConsole() { int nRet= 0; FILE* fp; AllocConsole(); nRet=
\_open_osfhandle((long)GetStdHandle(STD_OUTPUT_HANDLE), \_O_TEXT); fp =
\_fdopen(nRet, "w"); *stdout = \*fp; setvbuf(stdout, NULL, \_IONBF, 0); } 将此函
数在 MFC 程序初始化的地方调用，即可使用控制台查看 printf 函数的打印信息
2015.05.08

1. typedef 与#define 的区别 typedef：类型定义，其功能是用户为已有数据类型取“别名
   ”。 如：typedef int INT; 意思是将 int 重新定义为 INT，以后使用 INT a；就相当
   于 int a； 用 typedef 定义数组、指针、结构等类型将带来很大的方便，不仅使程序
   书写简单，而且使意义更为明确，因而增强了可读性。例如：typedef int a[10]；表示
   a 是整型数组类型，数组长度为 10，然后就可用 a 定义变量，如：a s1，s2；完全等
   效于：int s1[10]，s2[10]； define：宏定义。 如：#define PI 3.14 意思是以后程
   序中出现 PI 的地方将用 3.14 代替，这个替换是在编译预处理阶段完成的，注意
   #define 最后没有分号，否则编译时将分号一同带入 PI 中。

   2015.07.31 1.linux 下删除文件夹： rm 命令 -r 递归删除 -I 互动模式，提示是否删
   除 -f force 的意思，忽略不存在的文件，不会出现警告信息；

## 查看公网 ip

```
curl ifconfig.me
```
