###2015.04.22
1.
**出现问题**：虚拟机Xcode调试时候发现**键盘出不来**
**错误提示**：Xcode提示:Can't find keyplane that supports type 8 for keyboard iPhone-Portrait-DecimalPad; using 3648623971_Portrait_iPhone-Simple-Pad_Default
**解决方法**：“这个可能是xcode6模拟器的bug，如果键盘不出来的话，可以通过Hardware->Keyboard->Toggle Software Keyboard手动激活键盘。 ”
**参考网址**：http://www.cocoachina.com/bbs/read.php?tid-248097.html

###2015.04.23
1.
**学习技巧**：编译指令＃inport和#include，注意两者区别；
**区别**：
（1）. #include 可能会引起重复引用。 如：ClassA ClassB 都引用了Class C,  Class D若引用 Class A 与 Class B, 就会报重复引用的错误。
(1.1)@class的作用：
**解决循环引用问题**，作用是仅仅告诉编译器，某个名称是一个类，在.h文件中使用；
好处：不需要引入该头文件，所以编译时效率提高，因为如果很多都引用该头文件，用import将降低编译性能；
(1.2)如果需要引用该类的方法，则在.m文件中#import该类头文件;
   （2） #import 避免了这个问题，它只被编译一次。
     #import <> ： 引用系统头文件
    #import " "  ： 引用自己创建的头文件,与C语言类似
**参考网址**：http://blog.csdn.net/oik_ios/article/details/38685077
2.
**学习技巧**：在界面选择一个对象（控件）后，按住option并且移动鼠标，将**实时显示对象与当前鼠标指向的对象之间的距离**。

###2015.04.24
1.
**学习技巧**：调整模拟器屏幕大小方法：
（1） 打开模拟器－>在上方的菜单中选择’Window’－>打开Window菜单，中的’缩放比例’－>选择50％，经验得选取百分之三十三是最好的；
（2） 快捷键 **command+1/2/3/4/5**。

###2015.04.25
1.
**学习技巧**：代码缩进的快捷键是：
左缩进 command+[ ；
右缩进 command+];
2.
**学习技巧**：对于propertory和synthesize的理解
Objective-C语言关键词，@property与@synthesize配对使用。
功能：让编译好器自动编写一个与数据成员同名的方法声明来省去读写方法的声明。
 
如：
1、在头文件中：
C代码  
	1	@property int count;  
等效于在头文件中声明2个方法：
C代码  
	1	- (int)count;  
	2	-(void)setCount:(int)newCount;  
 
2、实现文件(.m)中
C代码  
	1	@synthesize count;  
等效于在实现文件(.m)中实现2个方法。
C代码  
	1	- (int)count  
	2	{  
	3	    return count;  
	4	}  
	5	-(void)setCount:(int)newCount  
	6	{  
	7	    count = newCount;  
	8	}  
  
以上等效的函数部分由编译器自动帮开发者填充完成，简化了编码输入工作量。
 
格式:
 
声明property的语法为：@property (参数1,参数2) 类型 名字;
 
如：
C代码  
	1	@property(nonatomic,retain) UIWindow *window;
／／
**我的个人理解是这两个命令能够直接帮我写好seeter和getter函数，所以，我的自己的代码应该不要出现getter和setter函数；但是要注意，不要写漏@synthesize；这样也就能够用.去访问这个变量**；
**参考网址**：http://justcoding.iteye.com/blog/1444548
http://www.devtalking.com/articles/you-should-to-know-property/ 
3.
**学习技巧**：对于**静态变量**的理解：
在变量前面加上static就能够定义静态变量，而且会初始化为0，但是，要注意，如果在方法里面定义静态变量，那么就要注意只能在方法里面调用，方法外部无法调用，可参考《objecvtive程序设计第六版》**147页**；
**区别**： 
局部静态变量：属于所有同属同一个类的对象共同拥有，但仅局限于定义该变量的方法内使用，若要其它方法也能够访问，则定义成全局变量即可；
实例变量：属于每个对象所拥有。

###2015.04.28
1.
**学习技巧**：如果需要在**一个label标签显示多行**的信息，那么需要告知ui label需要容纳更多行的内容，参考《iOS7开发完全上手》71页；
2.
**学习技巧**：%@代替字符串对象或者对象的描述内容；
3.
**学习技巧**：不小心**删除了storyboard**，解决方法：
（1）到回收站中找到该文件，右键放回原位
（2）在xcode中 File> add File to "appName" , 选择刚刚恢复到目录下的Main.Storyboard即可恢复到xcode中，
注意 stroyBoard 是在你的**app目录下的Base.lproj 目录**中。
4.
**学习技巧**：对于标签的对齐，可以选中相应标签后，点击editor，然后选择对齐align，再去选择；
5.
**学习技巧**：如果有文本框和标签时，习惯时先设置文本框，再建立标签；
6.
对于前向引用的理解还不是很透彻
7.
**学习技巧**：**生命周期的理解**
iOS视图控制对象生命周期-init、viewDidLoad、viewWillAppear、viewDidAppear、viewWillDisappear、viewDidDisappear的区别及用途
 init－初始化程序
viewDidLoad－加载视图
viewWillAppear－UIViewController对象的视图即将加入窗口时调用；
viewDidApper－UIViewController对象的视图已经加入到窗口时调用；
viewWillDisappear－UIViewController对象的视图即将消失、被覆盖或是隐藏时调用；
viewDidDisappear－UIViewController对象的视图已经消失、被覆盖或是隐藏时调用；
viewVillUnload－当内存过低时，需要释放一些不需要使用的视图时，即将释放时调用；
viewDidUnload－当内存过低，释放一些不需要的视图时调用。
**参考网址**：http://blog.csdn.net/weasleyqi/article/details/8090373
8.
**出现问题**：mac os 怎么改打开国外网站自动跳转 wpkg.org
**解决方法**：打开 Terminal 终端 (Finder/应用程序/实用工具/) (Finder/Applications/Utilities/) 输入 sudo nano /private/etc/hosts 之后，会弹出来一个东西，把你的电脑密码输入进去。按下箭头到页面最底部输入
127.0.0.1 wpkg.org
127.0.0.1facebook.net
加入了之后按 Control+O 然后 ENTER/RETURN 保存 /private/etc/hosts 最后按 Control+X 然后退出
**参考网址**：http://www.yxad.com/sina/1383587094326179900，但是文章里面的地址是错误的，要按照我写的来；**127.0.0.1**。
9.
**学习技巧**：可以根据不同的需求来**设置用户的键盘**：
点中文本框，选择右边的inspector，选择Keyboard，然后就有各种各样的键盘供选择；
10.
**学习技巧**：当设置页面时发现标签被挡住时，可以点击下面图中的相应标签名字，就可以实现选取该图标，而不是被标题挡住；
![截图](http://img.blog.csdn.net/20150801153542396)
11.
**学习技巧**：在故事编辑器要设置prepareForSegue函数，
![这里写图片描述](http://img.blog.csdn.net/20150801153817340)
这里的identifier应该是要和相对应，
所以，
![这里写图片描述](http://img.blog.csdn.net/20150801153749396)
这里可以用    
>if([segue.identifier isEqualToString:@"EditSegue"])；

###2015.04.29:
1.
**学习技巧**：使用协议添加的文件应该为objective－c文件；
![这里写图片描述](http://img.blog.csdn.net/20150801154006650)
2.
**学习技巧**：具有两种切换返回场景到方式，一种是利用viewWillDisappear方法，一种是添加unwind segue；

###2015.04.30
1.
**学习技巧**：实时**显示标签的坐标**
选中该标签，然后将鼠标移到标签外，按住option键即可显示；
2.
**学习技巧**：使用git进行版本控制，方法参考如下：
http://www.cocoachina.com/ios/20140524/8536.html

###2015.05.06
1.
**学习技巧**：在模拟器中需要删除应用程序，则可以长按住该图标，直到图标晃动时可以删除(与真机类似)，如果要reset ios模拟器，则可以选择ios simulator －>Reset Content and Setting;
2.
**学习技巧**：按住option键然后再加上三个手指，可以模拟真机中的放大缩小功能；
3.
**学习技巧**：实例变量名称命名以_打头；属性名不以下划线打头；（约定）
4.
**学习技巧**：发现不懂的创建故事面板，所以这样子来，选中故事面板，然后在右边的实用工具栏目中选到如下选项：
![这里写图片描述](http://img.blog.csdn.net/20150801154035712)
选择size，然后选择相应的手机尺寸大小，即可进行故事版编辑；
5.
**学习技巧**：alpha简介
液晶显示器是由一个个的像素点组成的，每个像素点都可以显示一个由RGBA颜色空间组成的一种色值。其中的A就表示透明度alpha，UIView中alpha是一个浮点值，取值范围0~1.0,表示从完全透明到完全不透明。选中该图片，即可在右边的属性设置中设置alpha；
6.
**学习技巧**：复制图像视图UIImageView的快捷键是command＋D；
7.
**学习技巧**：加入图象时1x像素图像直接命名即可，高分辨率图像命名为Image@2x.png即可；编程时只需指定低分辨率图像，必要时将自动加载高分辨率图像；
8.
**学习技巧**：默认背景颜色是白色，如果要修改，双击屏幕空白处，然后在右边属性栏即可找到背景设置；
9.
**学习技巧**：对于web视图的一些参数设置，参考《ios7应用开发经典》201页；
10.
**学习技巧**：在页面间滚动，参考《ios7应用开发经典》212页；
11.
**学习技巧**：在制作滚动视图时，不要在超过手机屏幕的情况下加东西，以免程序不正常；
12.
**学习技巧**：control + e移动到本行行尾；
13.
**学习技巧**：xcode中的快捷键示意图：
![这里写图片描述](http://img.blog.csdn.net/20150801153947847)
###2015.05.07.

1.
**学习技巧**：在实现回退场景时，若发现eixt不能够使用，则参考如下：
**参考网址**：http://www.cocoachina.com/bbs/read.php?tid=247806

###2015.05.08:
1.
**学习技巧**：导航控制器对象：navigation controller
2.
**出现问题**：错误提示Failed to instantiate the default view controller for UIMainStoryboardFile 'Main' - perhaps the designated entry point is not set?
但是我已经设置了storyboard的入口视图。 而且storyboard名字是Main.
**参考网址**：http://my.oschina.net/u/936286/blog/316565

###2015.05.10
1.
**出现问题**：ios 编程总会出现 提示 thread 1 breakpoint 1.1
**解决方法**：在该行最左侧的蓝色矩形区域右键，选择delete breakpoint即可。
2.
**学习技巧**：在选项卡栏切换时，要编写下列程序，才能实现切换到下个程序时数据已经更新；
```
-(void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    [self updateCounts];
}
```
###2015.05.13
1.
**出现问题**：编译时出现这个警告：
warning: Attribute Unavailable: Automatic Preferred Max Layout Width is not available on iOS versions prior to 8.0
**解决方法**：
(1).http://www.cocoachina.com/bbs/read.php?tid-226246.html
(2).http://stackoverflow.com/questions/25398312/automatic-preferred-max-layout-width-is-not-available-on-ios-versions-prior-to-8
2.
**学习技巧**：有时候xcode会出现意想不到的问题，查看下编程的环境是 是不是选择了ios7.0，改成8.3试试；

###2015.05.15
1.
**出现问题**：
出现这个警告：Null passed to a callee that requires a non-null argument
**解决方法**：其实错误发生在：
我错误地写成了DISPATCH_QUEUE_PRIORITY_DEFAULT
正确应该dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0)
从这里可以看出，**xcode的警告不能忽略**，而且要先从英文去理解意思先；

###2015.05.17
1.
**学习技巧**：注意，主线程是其他线程最终的父线程，所有界面的显示操作必须在主线程进行。
2.
**出现问题**：后台线程无法更新UI界面和响应用户点击事件
**解决方法**：参考ios多线程概述：http://www.cnblogs.com/qingche/p/3496157.html
3.
**学习技巧**：gcd异步多线程操作，注意引入线程的参数类型是：dispatch_queue_t。

###2015.05.18
1.
**学习技巧**：instancetype和id的异同
**参考网址**：http://blog.csdn.net/kuizhang1/article/details/18048829
2.
**学习技巧**：[iOS]iOS AudioSession详解 Category选择 听筒扬声器切换
**参考网址**：http://blog.csdn.net/xy5811/article/details/8563137
**如果以后编程没有声音，有可能是这个原因**；
3.
**学习技巧**：
iOS控件的**Sent Events**的含义
Did End on Exit ：用户点击return或者done按钮
Editing Changed ：字符增减，Cursor改变位置等
Editing Did Begin ：当field得到焦点
Editing Did end ：焦点离开field
Touch Cancel  ：一个系统的事件，取消当前区域的点击操作
Touch Down ：一个区域内的touch-down事件
Touch Down Repeat ：区域内重复的touch-down事件; UITouch的tapCount方法大于1
Touch Drag Enter ：手指拖进入(into)区域内的事件
Touch Drag Exit  ：手指从区域内拖出边界的事件
Touch Drag Inside  ：手指在区域内(inside)拖的事件
Touch Up Inside ：一个在区域内触发的touch-up事件
Touch Up Outside ：按下在区域外结束的事件
Value Changed ：一个点击拖拽或者操作一个区域，产生一系列的值。
4.github的使用：
**参考网址**： http://blog.csdn.net/g1jun/article/details/25422953
###2015.05.19
1.
**出现问题**：
mac 下安装wireshark首次运行时会提示There are no interfaces on which a capture can be done
 **解决方法**：原因是wireshark没有获得root的运行权限。

在终端输入：

>sudo chown $USER:admin /dev/bp*

 回车OK!
2.
**项目记录**：在客户端执行完11步骤时，即相当于执行到了车台电脑端软件的连接环节，经过抓包，发现，如果这个时候不继续往下发数据包，则客户端此时需要在21秒后开始发心跳包；
3.
**出现问题**：今天下载了一个源代码，有C＋＋文件，然后提示：
>the file couldn’t be opened because you don't have permission to view it

**解决方法**：Project---Build Setting中 修改这一项，变成Default Compiler（Apple LLVM 6.0）
**参考网址**：http://www.cocoachina.com/bbs/read.php?tid-282194.html
###2015.05.21
1.
**出现问题**：下载了AQS,编译时发现提示Xcode - Error creating LLDB target
**参考网址**：http://stackoverflow.com/questions/25088252/xcode-error-creating-lldb-target；
###2015.05.24
1.
**学习技巧**：但是c写法的函数内是无法调用[self ***]这种格式的写法，所以还是用静态函数通过void *input来获取原类指针 ；
**参考网址**：http://blog.csdn.net/samguoyi/article/details/7881122
2.
**错误提示**：Unknown type name 'class'; did you mean ‘Class
**原因分析**：因为我引用了C＋＋，所以需要注意一下异同；
**参考网址**：http://blog.sina.com.cn/s/blog_7c8dc2d50101fubl.html
###2015.05.27
1.
**出现问题**：在使用openal时需要导入OpenAL.framework，这时参考网址的：
http://www.cnblogs.com/SeeMeFly/archive/2011/09/09/2172688.html
，却找不到相应的Build Phases
**原因分析**：没有选中响应的target；
**解决方法**：点击
![这里写图片描述](http://img.blog.csdn.net/20150801154017066)
才算是选择了该target，要不然是选择了该工程而已，所以没有该选项出来；
###2015.05.28
1.
**学习技巧**：填写ip地址的那个文本框可选择键盘类型为numbers and punctuation，刚好合适；
2.
**学习技巧**：在编写键盘隐藏时，需要添加一个button，将文本去掉，修改type为custom，然后点击button，选择xcode菜单editor->arrange->send to back，在代码中写好hidekeyboard，然后按住control，将button拉到归属的viewcontroll，选择hidekeyboard，即可；
###2015.05.30
1.
**学习技巧**：在利用字符串存储的数字时，仅用（uint）是不能转换成功的，必须使用
字符串拼接
```
 NSString *newString = [NSString stringWithFormat:@"%@%@",tempA,tempB];
```

2.
**学习技巧**：字符转int
```
int intString = [newString intValue];
```
才能够成功；
**参考网址**：http://blog.sina.com.cn/s/blog_8280f5ec0100tt2c.html
2.
**学习技巧**：nstime默认的scheduledTimerWithTimeInterval是只能在主线程用的，如果需要在本线程用，需要添加：
```
[[NSRunLoop currentRunLoop] addTimer:self.repeatTime forMode:NSDefaultRunLoopMode];//添加timer加入到当前线程的runloop中，timer才能在该线程生效
 [[NSRunLoop currentRunLoop] run];//NSRunLoop currentRunLoop]是获取当前runloop的意思；
 
```


###2015.06.02
1.
**学习技巧**：按住control与空格，就能够打开spotlight，可以快速启动程序；

###2015.06.04
1.
**出现问题**：local declareation “XXX” hide instance variable
**错误原因**：程序中有重名的变量；
**解决方法**：找出重名的变量并进行修改；
2.
**出现问题**：对于单例只能定义一次？
###2015.07.18
1.
**学习技巧**：和CFStringRef相关的CFSTR与和NSString相关的@，
**参考网址**：http://blog.csdn.net/muyu114/article/details/7527501
###2015.07.22
1.
**学习技巧**：经常在 Xcode IDE 里面的代码中看到以下代码指令:
```
#pragma mark -   //#pragma 是什么
#pragma mark Initialization
```

从技术上讲，以 #pragma 开头的代码是一条编译器指令，是一个特定于程序或编译器的指令。它们不一定适用于其它编译器或其它环境。如果编译器不能识别该指令，则会将其忽略。

**作用**:它们告诉Xcode编译器，要在编辑器窗格顶部的方法和函数弹出菜单中将代码分隔开，如下图所示：
一些类（尤其是一些控制器类）可能很长，方法和函数弹出菜单可以便于代码导航。此时加入#pragma 指令对代码进行逻辑组织很有效果。

**注意:#pragma mark – 的“-”后面不能有空格**。
如果你的标志没有出现在弹出菜单中，比如没有分隔线出现，请在Xcode菜单 “Preferences..”中的 “Code Sense”选项取消选中”Sort list alphabetically”即可。#pragma mark纯粹是Xcode的工具，对程式一点影响都没有，是为了提高程序员阅读代码的格式。
**参考网址**：http://my.oschina.net/u/615517/blog/90282
2.
NSAssert()的使用
**参考网址**：
http://blog.csdn.net/univcore/article/details/16859263
http://my.oschina.net/u/615517/blog/90282
**学习技巧**：在iOS开发中，可以使用宏NSAssert()在程序中进行断言处理。NSAssert()使用正确，可以帮助开发者尽快定位bug。开发者没有必要在应用程序的每个版本中都进行断言检查，这是因为大多数项目都是有两个版本：Debug版和Release版。在Debug版中，开发者希望所有的断言都检查到，而在Release版中，往往都是禁用断言检查的。设置Release版本中禁用断言的方法如下：
在Build Settings菜单，找到Preprocessor Macros项，Preprocessor Macros项下面有一个选择，用于程序生成配置：Debug版和Release版。选择 Release项，设置NS_BLOCK_ASSERTIONS，不进行断言检查。如下图所示。

下面，我们在一个 打印名字的函数里面，加入断言，以使程序在发现输入的名字为空时，抛出异常。
[objc] view plaincopyprint?在CODE上查看代码片派生到我的代码片
```
- (void)printMyName:(NSString *)myName
{
    NSAssert(myName != nil, @"名字不能为空！");
    NSLog(@"My name is %@.",myName);
}
```

当传给函数的参数（myName）为空时，断言将被执行，程序Crash，并打印出断言中的描述信息。本例中，在控制台打印出了如下的日志：
```
NSAssert[1268:a0b] *** Assertion failure in -[ViewController printMyName:]
NSAssert/NSAssert/ViewController.m:38
2013-11-21 13:56:01.927 NSAssert[1268:a0b] *** Terminating app due to uncaught exception 'NSInternalInconsistencyException', reason: '名字不能为空！'
```
断言告诉我们，传入的参数不能为空，通过这个报错很容易就能确定错误发生的原因及位置。
如果，我们传入非空的参数，则程序会正确打印出传入的名字：
```
My name is UnivCore.
```
下面，我们将测试程序设置为Release版本，依据之前的设定，即使当传入的参数为空时，断言也不会被执行。设置为Release版本的方法如下：
依次点击Product->Scheme->Edit Scheme...(也可以直接按快捷键command + shift + ,)，选择Run 项，然后在Info面板上修改Build Configuration为Release，就可以将当前的生成配置改为Release。然后，生成并运行程序，就会生成Release版本的程序。注意，对于Archive 项，默认的生成配置就是Release。

此时，我们再运行程序，程序会打印如下语句：
```
My name is (null).
```
这说明，断言代码没有运行。
###2015.07.28
1.
**学习技巧**：**NSURLRequest NSMutableURLRequest区别**
NSURLRequest 申请的request是不可变的，但是NSMutableURLRequest是可以变化的
**参考网址**：http://blog.csdn.net/hmt20130412/article/details/24268091
2.
**学习技巧**：markdown使用说明：
(1)control+shift+m 代表着开或者关preview界面（在mac中）；
###2015.08.01
1.
**学习技巧**:
UTF8String: **将NSString转换成UTF8编码的NSString**
**参考网址**：http://blog.csdn.net/ios_db/article/details/22483989

###2015.08.02
1.
**学习技巧**：关于自动释放池：
自动释放池用@autoreleasepool；
**参考网址**：http://blog.csdn.net/hherima/article/details/16355887
2.
**学习技巧**：**NSNotificationCenter** 
iOS 提供了一种 "同步的" 消息通知机制，观察者只要向消息中心注册， 即可接受其他对象发送来的消息，消息发送者和消息接受者两者可以互相一无所知，完全解耦；
**参考网址**：http://www.cnblogs.com/xunziji/p/3257447.html

###2015.08.
1.
**出现问题**：之前在xcode6上写的代码，在Xcode7真机调试时发现屏幕只能显示3.5寸的；
**学习技巧**：参考了网络的各种教程，未能解决，但是今天解决了：
![这里写图片描述](http://img.blog.csdn.net/20150812204457843)
**将最后一行选成（Main）就可以了，之前是未选上的；**
2.
**学习技巧**：设置iOS设备转向的方法：
![这里写图片描述](http://img.blog.csdn.net/20150812205211274)
prtrait:纵向；
upside down:纵向倒转；
landscape left：横向朝左；
landscape right: 横向朝右；


2015.08.14
1.
**出现问题**：在编写类的初始化函数时出现以下错误：
Cannot assign to 'self' outside of a method in the init family
 **解决问题**：
 >原因：只能在init方法中给self赋值，Xcode判断是否为init方法规则：方法返回id，并且名字以init     +大写字母开头+其他  为准则。例如：- (id) initWithXXX;
出错代码：- (id) Myinit{
  self = [super init];
  ……
}
解决方法：- (id) initWithMy
{
  self = [super init];
}

**参考网址**：http://blog.sina.com.cn/s/blog_4aacd7af01011woj.html

2015.08.17
1.
**学习技巧：**关于ios以及mac中版本号的常识
>NS_AVAILABLE_IOS(5_0),这就告诉我们这个方法可以在iOS5.0及以后的版本中使用。如果我们在比指定版本更老的版本中调用这个方法，就会引起崩溃。
>NS_DEPRECATED_IOS(2_0, 6_0)这个宏中有两个版本号。前面一个表明了这个方法被引入时的iOS版本，后面一个表明它被废弃时的iOS版本。被废弃并不是指这个方法就不存在了，只是意味着我们应当开始考虑将相关代码迁移到新的API上去了。
>NS_AVAILABLE(10_8, 6_0),这里的NS_AVAILABLE宏告诉我们这方法分别随Mac OS 10.8和iOS 6.0被引入。
>NS_DEPRECATED(10_0, 10_6, 2_0, 4_0),这里表示这个方法随Mac OS 10.0和iOS 2.0被引入，在Mac OS 10.6和iOS 4.0后被废弃。
**参考网址：**http://codingobjc.com/blog/2014/02/11/ni-xu-yao-zhi-dao-de-suo-you-guan-yu-ioshe-os-xyi-qi-yong-de-apide-shi-er/

2.
respondsToSelector
**学习技巧：**
>-(BOOL) respondsToSelector: selector 用来判断是否有以某个名字命名的方法(被封装在一个selector的对象里传递)

**参考网址：**http://blog.csdn.net/firefly7788/article/details/8480092

3.
**学习技巧：**NSNotFound的基本用法
>例一：
NSString *_string = [NSStringstrinWithFormat:@"123 456"];
NSRange _range = [_stringrangeOfString:@" "];
if (_range.location != NSNotFound){
     //有空格
}else{
     //没有空格
}
 
先查找空格的位置，然后查找到不到位置的即为-1.可以知道是否有空格
 
例二：
if ([videoURL rangeOfString:@"http://".location!=NSNotFound|| [videoURL rangeOFString:@"https://"].location != NSNotFound] )
{
      //网络请求格式正常
}else{
      //网络请求格式不是以http或者https开头的     
}
 
NSNotFound是用来判断这个字符串是否符合网络请求格式，即以http或https开头。NSNotFound字面理解就好。

**参考网址：**http://blog.csdn.net/braver_smile/article/details/40825971

4.
**学习技巧：** UIButton详解
**参考网址：**http://blog.csdn.net/vincent_zeze/article/details/15339987

2015.08.18
1.
**学习技巧：**今天调试的时候，发现开关总是引发意外退出，这是查看调试信息，说找不到其中一个执行函数，发现这时候是我对开关连接了两个动作函数，但是我后来又删除了其中一个动作函数，但并不在storyboard上删除，导致系统找不到该函数而退出；
2.
**学习技巧：** Debug和Release版本区别
**参考网址：**http://blog.csdn.net/mad1989/article/details/40658033

3.
**学习技巧：**
Objective-C 的 Nullability 特性
**参考网址：**http://xuexuefeng.com/nullability-feature-of-objective-c/

4.
**出现问题**：
connectSuccessful原本定义的是类里面的成员，同时也定义为block类型的，在首次使用block去更改它的值时是没有问题的，但是如果重新生成了一次该对象，相应地类里面的成员connectSuccessful也会重新生成，但是实际上在block里面connectSuccessful（原变量）依然存在，所以导致block内和block外两者值不一样；
**解决问题**：
首先，通过打印block内和block外该成员变量地址可以找出问题所在，接着，又查到
>Block变量，被__block修饰的变量称作Block变量。 基本类型的Block变量等效于全局变量、或静态变量。

仔细想想，应该是block改变了该变量的生存期，所以，得以解释；
**参考网址：**http://tanqisen.github.io/blog/2013/04/19/gcd-block-cycle-retain/

2015.08.20
1.
**出现问题：**更新了mac系统后，发现wiresharp出现闪退现象，在Launchpad中打不开，然后在终端用超级用户打开，出现下列错误：
```
2015-08-20 11:44:23.212 defaults[1593:98737] 
The domain/default pair of (kCFPreferencesAnyApplication, AppleAquaColorVariant) does not exist
2015-08-20 11:44:23.224 defaults[1594:98744] 
The domain/default pair of (kCFPreferencesAnyApplication, AppleHighlightColor) does not exist
dyld: Library not loaded: /usr/X11/lib/libcairo.2.dylib
  Referenced from: /Applications/Wireshark.app/Contents/Resources/bin/wireshark-bin
  Reason: image not found
```
**解决问题**：
```
sudo ln -s /opt/X11 /usr/X11
```
**参考网址：**https://ask.wireshark.org/questions/36367/wireshark-doesnt-start-after-upgrading-to-mac-os-x-yosemite

2015.08.25
1.
**学习技巧：**
用代码使应用转向设置页面：
```
  NSURL *url=[NSURL URLWithString:@"prefs:root=WIFI"];//转向->"设置wifi"页面
        [[UIApplication sharedApplication] openURL:url];

```
**参考网址：** http://www.cocoachina.com/ios/20120116/3878.html

2.
**学习技巧：**
设置提醒框，用block的确很方便

**参考网址：** http://blog.csdn.net/yujianxiang666/article/details/35990789

3.
**出现问题：**
 EXC_BAD_ACCESS:经常的原因：访问了一块坏得内存->野指针；
 **学习技巧：** 给空指针发送消息并不会报错，所以在回收内存的时候记得将指针p=nil（防止在后文成为野指针）；养成好习惯；
 
 4.
 **学习技巧：** 在Xcode设置监控僵尸对象：
 ![这里写图片描述](http://img.blog.csdn.net/20150825161107613)

5.
**学习技巧**：
对于内存管理：
（1）对于多个对象的内存管理，每引用一个对象，该对象计数加1（retain），每删除一个对象，该对象计数减1（release，并不是释放），然后释放由系统自动控制（当计数为0的时候自动回收）；
（2）alloc和release要成对出现；没有alloc则不需要release；
看了视频后理解了下面这段setter代码，每一行都是必须的（内存管理,非ARC状态）
```
-(void) setName:(NSString *)name{
    if (_name != name) {
        [_name release];
        _name = [name copy];
    }
}
```
内存代码规范：
（1）对于基本数据类型，直接复制就好，不需要管理内存，但是如果是对象的话，必须按照上述setter方法那样写才规范；
（2）对于重写dealloc：
```
//do something.like [car release];
[super dealloc];
```
一定要最后使用，不要自己调用，这个是要由系统自动调用的。

6.
**学习技巧：**
**非常重要：**
（1）如果是property只影响getter和setter两个，不影响dealloc；
（2）**非oc类的记得要写assign,如果是oc类的写retain**；
（3）现在都用nonatomic，不要写atomic；
```
@property (nonatomic,retain) 类名 *属性名;(id也是类名，不用*)
@property (nonatomic,assign) 基本数据类型 属性名; 
```

7.
**出现问题：**
出现循环retain的问题时：（面试题）
**解决办法**
（1）.一端用retain，一端用assign；
**参考网址：** http://www.cnblogs.com/qm80/p/3594879.html

8.
**学习技巧：**关于自动释放池
（1）用法（现在的ios5.0及以后的写法）
```
    @autoreleasepool {//开始代表创建了释放池
        //do something
        //如调用autorelease则将该对象加入自动释放池[result autorelease](这句话会返回对象本身);
        //是栈的结构，先进后出（对于嵌套的池子）
    }//结束代表销毁释放池，此时对于池子里面的每一个对象做一次release操作
```
（2）
自动释放池可以嵌套使用，原则参考以上；

autorelease好处：
>不需要关心对象释放时间，不需要关心什么时候调用release；

autorelease缺点：
>对于占用内存较大的对象不要随便使用autorelease，占用内存较小的对象没有太大影响；

（3）**使用autorelease常用错误：**（面试题）
（3.1）使用autorelease又使用release，这样容易导致错误；
（3.2）连续调用多次autorelease也会导致一些错误；
如：
```
[[[person alloc] autorelease] autorelease];
```
（3.3）在ios程序运行过程中，会创建无数个池子，这些池子都是以栈的结构存在（先进先出）；
（3.4）autorelease并不是自动释放；
（3.5）**如果没有alloc创建的对象，通过系统自带的方法创建的对象，如nsstring，不需要调用release，因为系统默认它为autorelease类型的，不需要我们关心；**
**准则：有alloc，才需要release；**
（3.6）对于系统自带的方法中没有包含alloc,new,copy，说明返回的对象是autorelease类型的！

9.
**学习技巧：**
id一般都用在对象上；

10.
**学习技巧：**
NSNumber：命名规则，NS是前缀，是为了防止两个类重名冲突；

11.
创建对象时不要直接使用类名，而是使用self
```
+(id)person
{
	return [[[self alloc]init]autorelease];
}
```
这里应该和C++中多态的思想类似，就是如果在对象继承的时候，用self就能够完成谁创建，就返回什么类型的对象，不需要重写构造函数；

12.
**学习技巧：**
ARC的判断准则：只要没有**强指针指向对象**，就会释放对象；
指针分两种：
（1）强指针，**默认情况下，所有的指针都是强指针**；strong;
（2）弱指针，weak;
**如果对象A内有属性对象B，如果希望当指向对象B的强指针被置为nil时对象A依然保持拥有对象B的值，则使用strong，如果不希望保持，则可以使用weak；**
所以weak用处就在于解决循环引用问题，一端用strong，一端用weak；（和非ARC一起记）；

13.
**学习技巧：**
delloc可以重写，**但是在ARC下不需要使用[super dealloc];**

14.
**学习技巧：**
如果工程中有些文件需要ARC,而有些不需要，设置方法参考如下:
![这里写图片描述](http://img.blog.csdn.net/20150825215454285)
如果反过来，则输入
```
-f-objc-arc
```

15.
**学习技巧：**
关于button和textview的知识：
```
/**
 1> UIButton    -> UIControl -> UIView
 
 1.1 设置控件的状态
 UIControl.h内容：
 启用、禁用
 @property(nonatomic,getter=isEnabled) BOOL enabled;
 选中、不选中
 @property(nonatomic,getter=isSelected) BOOL selected;
 高亮或者不高亮
 @property(nonatomic,getter=isHighlighted) BOOL highlighted;
 
 1.2 设置控件内容的布局
 垂直居中方向
 @property(nonatomic) UIControlContentVerticalAlignment contentVerticalAlignment;
 水平居中方向
 @property(nonatomic) UIControlContentHorizontalAlignment contentHorizontalAlignment;
 
 1.3 添加/删除监听方法
 - (void)addTarget:(id)target action:(SEL)action forControlEvents:(UIControlEvents)controlEvents;
 - (void)removeTarget:(id)target action:(SEL)action forControlEvents:(UIControlEvents)controlEvents;

 2> UILabel     -> UIView
 3> UIImageView -> UIView
 4> UITextField -> UIControl
 
 *** 代理设计模式，在OC中，使用最为广泛的一种设计模式
 
 1> 代理的用处是什么？
 *  监听那些不能通过addTarget监听的事件！(addTarget 是UIControl.h头文件的内容)
 *  主要用来负责在两个对象之间，发生某些事件时，来传递消息或者数据
 
 2> 代理的实现步骤
 (1)    成为(子)控件的代理，父亲（控制器）成为儿子（文本框）的代理（按住control，将文本框连线到视图控制器）
 (2)    遵守协议->利用智能提示，快速编写代码
 (3)    实现协议方法
 */
- (void)viewDidLoad
{
    [super viewDidLoad];

    UIButton *btn =[UIButton buttonWithType:UIButtonTypeContactAdd];
    btn.center =self.view.center;
    [self.view addSubview:btn];
    
    [btn addTarget:self action:@selector(click:) forControlEvents:UIControlEventTouchUpInside];
}

- (void)click:(UIButton *)btn
{
    NSLog(@"%S",__func__);
    [btn removeTarget:self action:@selector(click:) forControlEvents:UIControlEventTouchUpInside];
}

#pragma mark - 文本框代理方法
/**
 成为代理之后要做的事情，以及如何工作
 
 1> 协议：预先定义的一些方法名，每个方法对应不同的事件，但是没有具体的实现

 */
- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string
{
    NSLog(@"%@ %@", NSStringFromRange(range), string);
    
    // 限制输入的长度
    int loc = range.location;
    return (loc < 6);
    
//    if (loc < 6) {
//        return YES;//代表显示在文本框内，也就是算有效状态；
//    } else {
//        return NO;//代表不显示在文本框内，算是失效状态；
//    }
    
    // 如果返回NO，就不向文本框中添加字符
//    return YES;
}

@end

```


16.
关于文本框的默认输入：
在placeholder那里设置：
![这里写图片描述](http://img.blog.csdn.net/20150825233441002)

17.
**学习技巧：**
>预处理器在C/C++/Objective-C语言中提供的宏
*   __func__%s 当前函数签名，就是当前函数名,获取当前方法在哪个类中调用；
*   __LINE__ %d 在源代码文件中当前所在行数
*   __FILE__ %s 当前源代码文件全路径
*   __PRETTY_FUNCTION__ %s 像 __func__，但是包含了C++代码中的隐形类型信息。

**参考网址：**http://blog.csdn.net/shiren1118/article/details/8674354

18.
关于文本框的参考：
```

@implementation HMViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self.userNameText becomeFirstResponder];//一进来就显示
}

- (IBAction)login
{
    NSLog(@"%s %@ %@", __func__, self.userNameText.text, self.pwdText.text);
}

#pragma mark 文本框代理方法
// 在文本框中按回车的处理
- (BOOL)textFieldShouldReturn:(UITextField *)textField
{
    NSLog(@"%@", textField);
    // 如果光标在用户名，切换到密码
    if (textField == self.userNameText) {
        // 设置密码框成为第一响应者
        [self.pwdText becomeFirstResponder];
    } else if (textField == self.pwdText) {
        // 输入焦点就在密码框中
        // 如果是密码，直接调用登录方法
        [self login];
        
        // 关闭键盘
//        [self.view endEditing:YES];
        // 让密码文本框关闭键盘
//        [textField resignFirstResponder];
        [self.pwdText resignFirstResponder];//撤销密码框成为第一响应者，这样就能够让键盘消失
    }
    
    return YES;
}


@end

```

2015.08.26
1.
**出现问题：**
>如果UIScrollView无法滚动，可能是以下原因：
没有设置contentSize
scrollEnabled = NO
没有接收到触摸事件:userInteractionEnabled = NO
没有取消autolayout功能（如果在Storyboard中添加了ScrollView的子控件，要想scrollView滚动，必须取消autolayout）.

2.
关于UIScrollView的各种尺寸：
![这里写图片描述](http://img.blog.csdn.net/20150826084124550)
**注意，这里的contentOffset、contentSize的原点是不包括contentInset的；**

3.
```
#import "HMViewController.h"

@interface HMViewController ()
@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;
@property (nonatomic, strong) UIImageView *imageView;

// 假设图像是从网络上获取的
@property (nonatomic, strong) UIImage *image;

@end

@implementation HMViewController

// 图像的setter
- (void)setImage:(UIImage *)image
{
    _image = image;
    
    // 设置图像视图的内容
    self.imageView.image = image;
    // 让图像视图根据图像自动调整大小
    [self.imageView sizeToFit];
    
    // 告诉scrollView内部内容的实际大小
    self.scrollView.contentSize = image.size;
}

//UIImageView相当于相框，UIImage相当于相框里面的照片
- (UIImageView *)imageView
{
    if (_imageView == nil) {
        _imageView = [[UIImageView alloc] init];
        
        [self.scrollView addSubview:_imageView];
    }
    return _imageView;
}

- (void)viewDidLoad
{
    [super viewDidLoad];

    // 设置图像
    self.image = [UIImage imageNamed:@"minion"];//选取叫做minion的图片，必须将图片复制进来Images.xcassets
    
    // 设置边距，scrollView距离屏幕边缘的设置
    self.scrollView.contentInset = UIEdgeInsetsMake(20, 20, 20, 20);
    
    // 不显示水平滚动标示，就是右边的下边提示框
    self.scrollView.showsHorizontalScrollIndicator = NO;
    // 不显示垂直滚动标示
    self.scrollView.showsVerticalScrollIndicator = NO;
    
    // *** （重要）偏移位置
    self.scrollView.contentOffset = CGPointMake(0, -100);//注意是负数
    
    // 取消弹簧效果，内容固定，不希望出现弹簧效果时
    // 不要跟bounds属性搞混了
    self.scrollView.bounces = YES;
    
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeContactAdd];//+号的button
    btn.center = self.view.center;
    [self.view addSubview:btn];//这个代表将button添加到view，随view改变，所以和scrollView不同层次，所以scrollView动，不跟着移动
    //[self.scrollView addSubview:btn];//这个代表将button添加到scrollView，随scrollView改变，就是scrollView移动，也跟着移动
    [btn addTarget:self action:@selector(click) forControlEvents:UIControlEventTouchUpInside];
}

- (void)click
{
    // 移动大图的偏移位置，相对于视图的偏移位置
    CGPoint offset = self.scrollView.contentOffset;
    offset.x += 20;
    offset.y += 20;
    
    // 注意：设置contentOffset会忽略contentSize
    self.scrollView.contentOffset = offset;
}

@end

```


4.
**学习技巧：**
复制控件时按住option键，移动鼠标即可，先松鼠标的手，再松option键；

5.
**学习技巧：**
>UIScrollView的用法很简单
将需要展示的内容添加到UIScrollView中
设置UIScrollView的contentSize属性，告诉UIScrollView所有内容的尺寸，也就是告诉它滚动的范围（能滚多远，滚到哪里是尽头）

6.
```
// 系统加载了Main.storyboard后，给scrollView对象进行赋值
// setScrollView是由系统自动调用的,先调用setScrollView再调用viewDidLoad
//- (void)setScrollView:(UIScrollView *)scrollView
//{
    // setter方法中，第一句赋值
//    _scrollView = scrollView;
//    
//    // 设置边距,与后面的设置有先后顺序
//    self.scrollView.contentInset = UIEdgeInsetsMake(64, 0, 49, 0);
//    
 //   NSLog(@"%s", __func__);
//
//    // 设置滚动视图内容
//    // 1> 如果当前有间距，根据间距自动调整contentOffset
//    // 2> 如果没有间距，contentOffset是(0,0)
//    CGFloat h = CGRectGetMaxY(self.lastButton.frame) + 10;
//    self.scrollView.contentSize = CGSizeMake(0, h);
//}

// 视图加载完成之后执行
- (void)viewDidLoad
{
    [super viewDidLoad];
    
    NSLog(@"%s %@", __func__, self.scrollView1);

    // 设置间距
    // 只是指定内容外侧边距，并不会根据contentSize自动调整contentOffset
//    self.scrollView.contentInset = UIEdgeInsetsMake(64, 0, 49, 0);
//    // 修改contentOffset
//    self.scrollView.contentOffset = CGPointMake(0, -64);
}
```

7.
**学习技巧：**
```
 // 设置代理
        _scrollView.delegate = self;
        // 设置最大/最小缩放比例
        _scrollView.maximumZoomScale = 2.0;
        _scrollView.minimumZoomScale = 0.2;

```

实现代理：
```
#pragma mark - UIScrollView的代理方法
/**
 1> 设置了代理
 2> 指定了最大、最小的缩放比例
 
 表示ScrollView是可以缩放的
 
 代理方法的"返回值"实际上就是控制器告诉滚动视图，要缩放的是UIImageView
 */
// 告诉ScrollView要缩放的视图是谁，具体的缩放实现，是由ScrollView来完成的
// 1> scrollView要知道缩放谁
- (UIView *)viewForZoomingInScrollView:(UIScrollView *)scrollView
{
    return self.imageView;
}

// 2> 滚动视图即将开始缩放，通常不需要写
- (void)scrollViewWillBeginZooming:(UIScrollView *)scrollView withView:(UIView *)view
{
    NSLog(@"%s", __func__);
}

// 3> 正在缩放，通常也不需要实现
- (void)scrollViewDidZoom:(UIScrollView *)scrollView
{
    //    NSLog(@"%s", __func__);
    NSLog(@"%@", NSStringFromCGAffineTransform(self.imageView.transform));//这句话应该打印了具体的缩放信息
}

// 4> 完成缩放，通常也不需要实现
- (void)scrollViewDidEndZooming:(UIScrollView *)scrollView withView:(UIView *)view atScale:(CGFloat)scale
{
    NSLog(@"%s", __func__);
}

```

8.
**学习技巧：**
如果在soryboard中拖控件，则不需要alloc控件；
如果是自己代码添加，则参考如下：
```
- (UIScrollView *)scrollView
{
    if (_scrollView == nil) {
        _scrollView = [[UIScrollView alloc] initWithFrame:self.view.bounds];
        
        // 设置属性
        // 设置边距
        _scrollView.contentInset = UIEdgeInsetsMake(20, 20, 20, 20);
        
        // 不显示水平滚动标示
        _scrollView.showsHorizontalScrollIndicator = NO;
        // 不显示垂直滚动标示
        _scrollView.showsVerticalScrollIndicator = NO;
        
        // *** 偏移位置
        _scrollView.contentOffset = CGPointMake(0, 0);
        
        // 取消弹簧效果，内容固定，不希望出现弹簧效果时
        // 不要跟bounds属性搞混了
        _scrollView.bounces = NO;
        
        // 设置代理
        _scrollView.delegate = self;
        // 设置最大/最小缩放比例
        _scrollView.maximumZoomScale = 2.0;
        _scrollView.minimumZoomScale = 0.2;
        
        [self.view addSubview:_scrollView];
    }
    return _scrollView;
}

```

9.
**学习技巧：**
可以在Xcode查看各种布局效果，如下：
![这里写图片描述](http://img.blog.csdn.net/20150826103052831)
第二个是设置显示方向（水平或者垂直）

10.
**学习技巧：**
自动布局中设置水平居中或者垂直居中：
![这里写图片描述](http://img.blog.csdn.net/20150826103209217)

11.
**学习技巧：**在Xcode中如果需要改变同名的变量，可以这样做：
将光标点在该单词，但出现下三角形的符号的时候，点击下三角形，然后点击edit，这是就已经选中了全部同名的变量，直接修改就等于了修改全部的变量；

12.
**学习技巧：**
```
    // 计时器
    /** 
     参数说明 
     1. (NSTimeInterval)ti 时间间隔，double
     2. target:self 监听时钟触发的对象
     3. selector  调用方法
     4. userInfo，可以是任意对象，通常传递nil
     5. repeats：是否重复
     */
    self.counterLabel.text = @"2";
    
    // scheduledTimerWithTimeInterval 方法本质上就是创建一个时钟，
    // 添加到运行循环的模式是DefaultRunLoopMode
    // ----------------------------------------------
    // 1>
//    self.timer = [NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(updateTimer:) userInfo:@"hello timer" repeats:YES];
    
    // ----------------------------------------------
    // 2> 与1等价
//    self.timer = [NSTimer timerWithTimeInterval:1.0 target:self selector:@selector(updateTimer:) userInfo:nil repeats:YES];
//    // 将timer添加到运行循环
//    // 模式：默认的运行循环模式
//    [[NSRunLoop currentRunLoop] addTimer:self.timer forMode:NSDefaultRunLoopMode];
    
    // ----------------------------------------------
    // 3>
    self.timer = [NSTimer timerWithTimeInterval:1.0 target:self selector:@selector(updateTimer:) userInfo:nil repeats:YES];
    // 将timer添加到运行循环
    // 模式：NSRunLoopCommonModes的运行循环模式（监听滚动模式）
    [[NSRunLoop currentRunLoop] addTimer:self.timer forMode:NSRunLoopCommonModes];
```
在iOS程序中，每一个程序都是全屏的

每个程序都以自己独立的运行循环，负责监听所有的事件！


[btn addTarget:self action:@selector(click) event:]

从代码上看，运行循环有两种模式：

NSDefaultRunLoopMode
NSRunLoopCommonModes(滚动)

一旦发现有滚动事件，默认模式暂时不监听
（看视频的PPT）

13.
**学习技巧：**
关于tableview，如果要显示分组的效果，则进行下列设置：
![这里写图片描述](http://img.blog.csdn.net/20150826150236201)
plain：不显示分组，group：显示分组

14.
**学习技巧：**
```
_dataList = @[stu2, stu1];
```
如何理解？

15.
**学习技巧：** 关于tableview的简单实例：
```
#import "HMViewController.h"

@interface HMViewController () <UITableViewDataSource>
@property (weak, nonatomic) IBOutlet UITableView *tableView;
@end

@implementation HMViewController

#pragma mark - 数据源方法
// 如果没有实现，默认是1
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 2;
}

// 每个分组中的数据行总数
// sction：分组的编号
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    if (section == 0) {
        // 第0个分组
        return 5;
    } else {
        return 18;
    }
}

// 告诉表格控件，每一行cell单元格的细节
// indexPath
//  @property(nonatomic,readonly) NSInteger section;    分组
//  @property(nonatomic,readonly) NSInteger row;        行
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    // 实例化TableViewCell时，使用initWithStyle方法来进行实例化
    UITableViewCell *cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:nil];
    
    cell.textLabel.text = [NSString stringWithFormat:@"黑马学员 %02ld 期 - %04ld", (long)indexPath.section, (long)indexPath.row];
    
    return cell;
}

// 返回分组的标题要显示的文字
- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    return [NSString stringWithFormat:@"黑马 %02ld 期", (long)section];
}

//返回分组页脚的文字
- (NSString *)tableView:(UITableView *)tableView titleForFooterInSection:(NSInteger)section
{
    if (section == 0) {
        return @"太牛叉了";
    } else {
        return @"牛叉闪闪亮";
    }
}

@end
```

16.
**学习技巧：** 
代理阶段性小结

表格可以显示非常丰富的数据，为了达到这一效果，设置表格的"数据源"
@required 	必须实现的方法
@optional	可选的实现方法->不强求实现->如果实现了能得到特殊的效果，如果不实现，也不影响程序的正常运行
	能够增加控件的灵活度
	

1. 遵守协议，预先定义好方法，不实现，具体的实现工作由代理负责
<控件的名字+DataSource>		定义的与数据有关的方法
<控件的名字+Delegate>			定义的与事件有关的方法，通常用来监听控件事件、控件的。

2. 代理方法

1>	方法名以控件名称开头(没有类前缀)	->	方便程序员编写的时候，快速找到需要的协议方法
2>	第一个参数是自己				-> 	意味着在协议方法中，可以直接访问对象的属性，或者调用方法

17.
**学习技巧：** 
导入素材进入Images.xcassets时，如果已经是文件夹，则应该在Finder上复制进去就可以，而不是通过Xcode移动进去；

18.
**学习技巧：** 
代码块存放路径
~/Library/Developer/Xcode/UserData/CodeSnippets
**换新电脑，直接替换文件夹中的内容即可**

19.
**学习技巧：** 
```
#import "HMViewController.h"
#import "HMHero.h"

@interface HMViewController () <UITableViewDataSource, UITableViewDelegate>
@property (nonatomic, strong) UITableView *tableView;
@property (nonatomic, strong) NSArray *heros;
@end

@implementation HMViewController

- (NSArray *)heros
{
    if (_heros == nil) _heros = [HMHero heros];
    return _heros;
}

/**
 UITableViewStylePlain,     // 平板的格式
 UITableViewStyleGrouped    // 分组的格式
 */
- (UITableView *)tableView
{
    
    if (_tableView == nil) {
        // 表格控件在创建时必须指定样式，只能使用以下实例化方法，因为style为readonly的，所以只能制定一次，如果需要改变，则重新实例化一个类
        _tableView = [[UITableView alloc] initWithFrame:self.view.bounds style:UITableViewStylePlain];
        
        _tableView.dataSource = self;
        _tableView.delegate = self;
        
        [self.view addSubview:_tableView];//添加到视图
    }
    return _tableView;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self tableView];
    
    // 设置行高
    self.tableView.rowHeight = 80;
}

#pragma mark - 数据源方法
// 每个分组中的数据总数
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    NSLog(@"每个分组的数据总数 %d", self.heros.count);
    
    return self.heros.count;
}

/**
 UITableViewCellStyleDefault,   默认类型 标题+可选图像
 UITableViewCellStyleValue1,    标题+明细+图像
 UITableViewCellStyleValue2,    不显示图像，标题+明细
 UITableViewCellStyleSubtitle   标题+明细+图像（明细显示在第二行，小字）
 */
// 告诉表格每个单元格的明细信息
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSLog(@"表格行明细 %d", indexPath.row);
    
    UITableViewCell *cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:nil];
    
    // 取出英雄对象
    HMHero *hero = self.heros[indexPath.row];
    
    // 标题
    cell.textLabel.text = hero.name;
    // 明细信息
    cell.detailTextLabel.text = hero.intro;
    // 图像
    cell.imageView.image = [UIImage imageNamed:hero.icon];
    
    // 设置右边的箭头
    // 1> UITableViewCellAccessoryDisclosureIndicator 箭头，可以"告诉"用户，当前行是可以点击的，通常选中行，会跳到新的页面，跟设置那里的箭头的功能是一样的
    // 2> UITableViewCellAccessoryCheckmark 打钩，对号，通常提示用户该行数据设置完毕，使用的比较少
    // 3> UITableViewCellAccessoryDetailButton 按钮，通常点击按钮可以做独立的操作，例如alertView
    //    点击按钮并不会选中该行
    // 4> UITableViewCellAccessoryDetailDisclosureButton 按钮+箭头，都可以点击
//    cell.accessoryType = UITableViewCellAccessoryDetailDisclosureButton;
    
    // 指定右侧的自定义视图
    /**
     通常accessoryType提供的类型不能满足时，才会使用自定义控件
     
     但是需要自行添加监听方法，通常用在自定义cell，不要写在视图控制器中！！！
     
     自定义控件的事件触发，同样不会影响表格行的选中！
     */
    UISwitch *switcher = [[UISwitch alloc] init];
    // 添加监听方法
    [switcher addTarget:self action:@selector(switchChanged:) forControlEvents:UIControlEventValueChanged];
    
    cell.accessoryView = switcher;//通常用在自定义cell
    
    return cell;
}

- (void)switchChanged:(UISwitch *)sender
{
    NSLog(@"%s %@", __func__, sender);
}

#pragma mark - 代理方法
// accessoryType为按钮时，点击右侧按钮的监听方法
// 此方法不会触发行选中，跟行选中各自独立，行就是“>”
// 只是为accessoryType服务，对自定义控件不响应,例如accessoryView的控件
- (void)tableView:(UITableView *)tableView accessoryButtonTappedForRowWithIndexPath:(NSIndexPath *)indexPath
{
    NSLog(@"%s %@", __func__, indexPath);
}

// 取消选中某一行，极少用，极容易出错！比如第一次选了第一行，然后第二次选了第二行，这是先调用第一行的didDeselectRowAtIndexPath，再调用第二行的didSelectRowAtIndexPath
// didDeselectRowAtIndexPath
// didSelectRowAtIndexPath
- (void)tableView:(UITableView *)tableView didDeselectRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSLog(@"%s %@", __func__, indexPath);
}

// 如果选中了某一行，有箭头的
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSLog(@"%s %@", __func__, indexPath);
}

/**
 代理方法的优先级比rowHeight优先级高
 
 应用场景：很多应用程序，每一行的高度是不一样的，例如：新浪微博
 
 表格工作观察的小结
 
 1> 要知道总共有多少数据
 - (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
 
 2> 计算“每一行”的行高
 - (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
 
 问题：在此方法执行时，cell被实例化了吗？
 方法的作用是什么？
 
 scrollView需要指定contentSize才能够滚动，如果没有实现方法，行高默认是44
 
 需要知道每一行的高度，才能够准确的计算出contentSize，计算一次就够了
 
 知道每一行的高度后，自然知道每一个屏幕应该显示多少行，表格明细方法的执行次数就知道了
 
 3> 表格明细
 调用屏幕显示所需要的行数，懒加载，只有要显示的表格行，才会被实例化！
 
 
 
 小的结论：
 
 *  tableView.rowHeight：    效率高，适用于所有的表格行高度一致
 *  代理方法指定行高：          效率差，适合于每一个行的行高不一样，能够让表格更加的灵活
 如果行高是一样的，就不要使用代理，因为会很影响性能
 */
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
   NSLog(@"行高 %d", indexPath.row);
//    
    return (indexPath.row % 2) ? 60 : 44;
    
    // 以下代码可以使用rowHeight属性替换！
//    return 60;
}

@end

```

20.
**学习技巧：**
cell重用技巧：
```
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    // 1.定义一个cell的标识，可以区分不同类型的cell
    //定义为静态变量，能够保证系统为变量在内存中只分配一次内存空间
      static NSString *ID = @"mjcell";
    
    // 2.从缓存池中取出cell
      UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:ID];
    
    // 3.如果缓存池中没有cell
      if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:ID];
    }
    
    // 4.设置cell的属性...
    
      return cell;
}
```

21.
**学习技巧：**
```
    // 设置分隔线的样式，跟设置里面一样的分隔线
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;
    /**
     32位真彩色 ARGB 2^8 * 2^8 * 2^8 * 2^8 = 2^32 = 2^2 * 2^10 * 2^10 * 2^10  = 4G
     2^64 = 16 GG
     
     A = Alpha
     R
     G
     B
     24位真彩色 RGB 2^8 * 2^8 * 2^8 = 2 ^ 24 = 2^4 * 2^10 = 16 * 100万
     R = Red     1个字节  8位 0~255
     G = Green
     B = Blun
     
     # ff ff ff ff
     */
    //指定颜色
    self.tableView.separatorColor = [UIColor colorWithWhite:0.0 alpha:0.2];//alpha不是透明度？
    
    //下面两个属性是跟分组数没有关系的！
    // headView，放在tableView最顶部的视图，通常用来放图片轮播器，广告
    UIView *head = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 320, 130)];
    head.backgroundColor = [UIColor blueColor];
    self.tableView.tableHeaderView = head;
    
    // footerView，通常做上拉刷新
    UIView *foot = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 320, 44)];
    foot.backgroundColor = [UIColor redColor];
    self.tableView.tableFooterView = foot;
```

22.
**学习技巧：**
nslog的打印格式：
![这里写图片描述](http://img.blog.csdn.net/20150826191708880)

23.
**学习技巧：**
在Xcode中添加文件夹以区分不同的类：
选择New Group from Selection
![这里写图片描述](http://img.blog.csdn.net/20150826202025022)

24.
**学习技巧：**
对于风火轮，第一个是让他转，第二个是停止的时候让它消失
![这里写图片描述](http://img.blog.csdn.net/20150826203304642)

25.
**学习技巧：**
```
// 代理如果使用强引用，就会产生循环引用，造成控制器和子视图都无法被释放，造成内存泄露
@property (nonatomic, weak) id <HMTgFooterViewDelegate> delegate;
```


26.
**学习技巧：**
 预处理指令
 #if 0
 所有代码都不会执行
 
 #endif
 
 27.
 **学习技巧：**
 做分隔线，则可以用view来弄，设置高度为1；

28.
 **学习技巧：**
代理模式：是父控件(视图控制器)监听子控件的事件，当子控件发生某些事情时，通知父控件工作！

*	footView => controller 去工作，使用代理
*	controller => footView 去工作，直接调用footView的方法即可


2015.08.27
1.
 **学习技巧：**
 设置UINavigationBar的title和UITabBarController下面item的文字为不同的标题

当一个视图控制器是UINavigationController的当前控制器时，如果设置了self.title属性，那么当前视图的navigationBar的title就是会自动取self.title的值。如果当前视图控制器还在tabBarController中，那么下面item的title也会取self.title，如果想要bar上面的文字和item的文字不一样，那么需要单独的对bar上面的文字设定，即除了设置self.title 意外还要在设置self.navigationItem.title的值，来吧bar上面的标题改回来，还可以单独设置item上的文字，self.navigationController.tabbarItem.title对该属性修改即可。


**参考网址：**http://www.cnblogs.com/madpanda/p/4656392.html

2015.08.28
1.
**学习技巧：** 关于NSBundle类
获取app包的readme.txt文件路径
```
NSString *path = [[NSBundle mainBundle] pathForResource:@"readme" ofType:@"txt"];
```
**参考网址：**http://ship2013.blog.163.com/blog/static/228611067201310281336641/


2.
**出现问题：**在api中经常看到这样的方法，一个 ＋ 函数初始化，一个 - 初始化。 
在项目中使用[NSMutableArray array]，在没有主动申请释放的时候就别释放了。 
只有retain后正常使用。 
[NSMutableArray array]和[[NSMutableArray alloc] init]区别难道只是没有retain引用，另一个retain引用？甚感疑惑 

这两者主要用途的区别又是什么，难道只是兼容obj-c 2.0的@property (retain),望指教。 

**解决方法：**
[NSMutableArray array]相当于[[[NSMutableArray alloc] init] autorelease]; 
区别就是一个是autorelease一个需要你去release。 
autorelease的对象有时候会在你不用的时候已经release了，而过后你又想用到，所以要retain一次。

**提出问题：**
那如果在ARC下呢？是不是还是一样的？

**参考网址：**http://stackoverflow.com/questions/8557190/nsmutablearray-alloc-init-vs-nsmutablearray-array

3.
**学习技巧：**
ios view的frame和bounds之区别（位置和大小）
> frame: 该view在父view坐标系统中的位置和大小。（参照点是，父亲的坐标系统）
       bounds：该view在本地坐标系统中的位置和大小。（参照点是，本地坐标系统，就相当于ViewB自己的坐标系统，以0,0点为起点）

**参考网址：**
http://www.jcodecraeer.com/IOS/2015/0207/2427.html

4.
**学习技巧：** 
关于背景：
```
        // 背景颜色，只会影响到未选中表格行的标签背景，被选中的表格行是没有背景颜色的
//        cell.backgroundColor = [UIColor redColor];
       
        // 在实际开发中，使用背景视图的情况比较多
        // 背景视图，不需要指定大小，cell会根据自身的尺寸，自动填充调整背景视图的显示
        // 没有选中的背景颜色
        //代码形式1
//        UIImage *bgImage = [UIImage imageNamed:@"img_01"];
//        cell.backgroundView = [[UIImageView alloc] initWithImage:bgImage];
        //代码形式2
//        UIView *bgView = [[UIView alloc] init];
//        bgView.backgroundColor = [UIColor yellowColor];
//        cell.backgroundView = bgView;
        
        
        // 选中的背景视图
//        UIImage *selectedBGImage = [UIImage imageNamed:@"img_02"];
//        cell.selectedBackgroundView = [[UIImageView alloc] initWithImage:selectedBGImage];
```

5.
**学习技巧：**
修改NSLog和%@的默认输出：重写类对象或者实例对象的description方法即可。因为NSLog函数进行打印的时候会自动调用description方法
**参考网址：**
http://www.cnblogs.com/QM80/p/3587064.html

6.
**学习技巧：**
05-汽车品牌代码学习：
```
//
//  HMViewController.m
//  05-汽车品牌
//
//  Created by apple on 14-8-19.
//  Copyright (c) 2014年 itcast. All rights reserved.
//

#import "HMViewController.h"
#import "HMCarGroup.h"
#import "HMCar.h"

@interface HMViewController () <UITableViewDataSource>
@property (nonatomic, strong) NSArray *carGroups;
@property (nonatomic, strong) UITableView *tableView;
@end

@implementation HMViewController

- (UITableView *)tableView
{
    if (_tableView == nil) {
        _tableView = [[UITableView alloc] initWithFrame:self.view.bounds style:UITableViewStylePlain];
        _tableView.dataSource = self;
        
        [self.view addSubview:_tableView];
    }
    return _tableView;
}

- (NSArray *)carGroups
{
    if (_carGroups == nil) {
        _carGroups = [HMCarGroup carGroups];
    }
    return _carGroups;
}

- (void)viewDidLoad
{
    [super viewDidLoad];

    // 调用tableView添加到视图
    [self tableView];
}

#pragma mark - 数据源方法
// 分组总数
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return self.carGroups.count;
}

// 每一组的总数
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    HMCarGroup *group = self.carGroups[section];
    
    return group.cars.count;
}

// 单元格
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    // 可重用标示符
    static NSString *ID = @"Cell";
    
    // 让表格缓冲区查找可重用cell
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:ID];
    
    // 如果没有找到可重用cell
    if (cell == nil) {
        // 实例化cell
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:ID];
    }
    
    // 设置cell内容
    // 1> 取出数据模型
    HMCarGroup *group = self.carGroups[indexPath.section];
    HMCar *car = group.cars[indexPath.row];
    
    // 2> 设置数据
    cell.imageView.image = [UIImage imageNamed:car.icon];
    cell.textLabel.text = car.name;
    
    return cell;
}

// 标题,只有在plain模式的tableView才有效
- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    // 找到group
    HMCarGroup *group = self.carGroups[section];
    
    return group.title;
}

// 右侧索引列表
- (NSArray *)sectionIndexTitlesForTableView:(UITableView *)tableView
{
    // 索引数组中的"内容"，跟分组无关
    // 索引数组中的下标，对应的是分组的下标
//    return @[@"哇哈哈", @"hello", @"哇哈哈", @"hello", @"哇哈哈", @"hello", @"哇哈哈", @"hello"];
    
    // 返回self.carGroup中title的数组
//    NSMutableArray *arrayM = [NSMutableArray array];
//    for (HMCarGroup *group in self.carGroups) {
//        [arrayM addObject:group.title];
//    }
//    return arrayM;
    
    // KVC是cocoa的大招
    // 用来间接获取或者修改对象属性的方式
    // 使用KVC在获取数值时，如果指定对象不包含keyPath的"键名"，会自动进入对象的内部查找
    // 如果取值的对象是一个数组，同样返回一个数组，下面两句只是打印测试
    NSArray *array = [self.carGroups valueForKeyPath:@"cars.name"];
    NSLog(@"%@", array);
    
    return [self.carGroups valueForKeyPath:@"title"];
}

@end

```


2015.08.30
1.
**学习技巧：**
关于字典转模型：
![这里写图片描述](http://img.blog.csdn.net/20150830092243431)
写的模型代码如下：
```
//
//  HMCar.h
//  05-汽车品牌
//
//  Created by apple on 14-8-19.
//  Copyright (c) 2014年 itcast. All rights reserved.
//
#import <Foundation/Foundation.h>

@interface HMCar : NSObject
@property (nonatomic, copy) NSString *name;
@property (nonatomic, copy) NSString *icon;

- (instancetype)initWithDict:(NSDictionary *)dict;
+ (instancetype)carWithDict:(NSDictionary *)dict;

// 传入一个包含字典的数组，返回一个HMCar模型的数组
+ (NSArray *)carsWithArray:(NSArray *)array;

@end

```

HMCar.m文件：
```
//
//  HMCar.m
//  05-汽车品牌
//
//  Created by apple on 14-8-19.
//  Copyright (c) 2014年 itcast. All rights reserved.
//

#import "HMCar.h"

@implementation HMCar

- (instancetype)initWithDict:(NSDictionary *)dict
{
    self = [super init];
    if (self) {
        [self setValuesForKeysWithDictionary:dict];
    }
    return self;
}

+ (instancetype)carWithDict:(NSDictionary *)dict
{
    return [[self alloc] initWithDict:dict];
}

+ (NSArray *)carsWithArray:(NSArray *)array
{
    NSMutableArray *arrayM = [NSMutableArray array];
    for (NSDictionary *dict in array) {
        [arrayM addObject:[self carWithDict:dict]];
    }
    
    return arrayM;
}

- (NSString *)description
{
    return [NSString stringWithFormat:@"<%@: %p> {name: %@, icon: %@}", self.class, self,self.name, self.icon];
}

@end

```

HMCarGroup.h文件
```
//
//  HMCarGroup.h
//  05-汽车品牌
//
//  Created by apple on 14-8-19.
//  Copyright (c) 2014年 itcast. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface HMCarGroup : NSObject
/** 首字母 */
@property (nonatomic, copy) NSString *title;
/** 车的数组，存放的是HMCar的模型数据 */
@property (nonatomic, strong) NSArray *cars;

- (instancetype)initWithDict:(NSDictionary *)dict;
+ (instancetype)carGroupWithDict:(NSDictionary *)dict;

+ (NSArray *)carGroups;

@end

```

HMCarGroup.m文件：
```
//
//  HMCarGroup.m
//  05-汽车品牌
//
//  Created by apple on 14-8-19.
//  Copyright (c) 2014年 itcast. All rights reserved.
//

#import "HMCarGroup.h"
#import "HMCar.h"

@implementation HMCarGroup

- (instancetype)initWithDict:(NSDictionary *)dict
{
    self = [super init];
    if (self) {
//        [self setValuesForKeysWithDictionary:dict];
        [self setValue:dict[@"title"] forKey:@"title"];
        
        // dict[@"cars"]存放的是字典的数组
        // 希望将字典的数组转换成HMCar模型的数组
//        [self setValue:dict[@"cars"] forKey:@"cars"];
        self.cars = [HMCar carsWithArray:dict[@"cars"]];
    }
    return self;
}

+ (instancetype)carGroupWithDict:(NSDictionary *)dict
{
    return [[self alloc] initWithDict:dict];
}

+ (NSArray *)carGroups
{
    
    //从filePath 这个指定的文件里读
    //NSString *path = [[NSBundle mainBundle] pathForResource:@"readme" ofType:@"txt"];//获取app包的readme.txt文件路径
    NSArray *array = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"cars_total.plist" ofType:nil]];
    
    NSMutableArray *arrayM = [NSMutableArray array];
    for (NSDictionary *dict in array) {
        [arrayM addObject:[self carGroupWithDict:dict]];
    }
    
    return arrayM;
}

- (NSString *)description
{
    return [NSString stringWithFormat:@"<%@: %p> {title: %@, cars: %@}", self.class, self, self.title, self.cars];
}

@end

```

这样，就完成了一个字典转模型的功能，具体的使用参照上一天的记录；

2.
**学习技巧：**
instancetype只能用于返回值使用！！！不能当做参数使用；

3.
**学习技巧：**
```
+ (NSArray *)appList
{
    NSArray *array = [NSArray arrayWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"app.plist" ofType:nil]];
    
    // 创建一个临时数组
    NSMutableArray *arrayM = [NSMutableArray array];
    
    // 遍历数组，依次转换模型
    for (NSDictionary *dict in array) {
        [arrayM addObject:[HMAppInfo appInfoWithDict:dict]];
    }
    
    return arrayM;
}
```

4.
**学习技巧:**
关于要实现关于通信录的功能：
```
//
//  HMViewController.m
//  06-表格的修改
//
//  Created by apple on 14-8-19.
//  Copyright (c) 2014年 itcast. All rights reserved.
//

#import "HMViewController.h"

@interface HMViewController () <UITableViewDataSource, UITableViewDelegate>
/** 数据列表 */
@property (nonatomic, strong) NSMutableArray *dataList;
@property (nonatomic, strong) UITableView *tableView;
@end

@implementation HMViewController

- (UITableView *)tableView
{
    if (_tableView == nil) {
        _tableView = [[UITableView alloc] initWithFrame:self.view.bounds style:UITableViewStylePlain];
        
        _tableView.dataSource = self;
        _tableView.delegate = self;
        
        [self.view addSubview:_tableView];
    }
    return _tableView;
}

- (NSMutableArray *)dataList
{
    if (_dataList == nil) {
        _dataList = [NSMutableArray arrayWithObjects:@"zhangsan", @"lisi", @"wangwu", @"zhangsan", @"lisi", @"wangwu", @"zhangsan", @"lisi", @"wangwu", @"zhangsan", @"lisi", @"wangwu", @"zhangsan", @"lisi", @"wangwu", @"zhangsan", @"lisi", @"wangwu", @"zhangsan", @"lisi", @"wangwu", @"zhangsan", @"lisi", @"wangwuwangwuwangwuwangwuwangwu", nil];
    }
    return _dataList;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self tableView];

    // 开始编辑，一旦editing == YES就默认开启删除模式,左边出现红色的删除按钮
    self.tableView.editing = YES;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.dataList.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *ID = @"Cell";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:ID];
    
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:ID];
    }
    
    // 设置表格
    cell.textLabel.text = self.dataList[indexPath.row];
    
    return cell;
}

// 只要实现了此方法，就能够支持手势拖拽删除了(只是显示，但此时并不能做删除操作)，删除需要自己干！
/**
 UITableViewCellEditingStyleNone,
 UITableViewCellEditingStyleDelete,     删除
 UITableViewCellEditingStyleInsert      添加
 */
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        NSLog(@"要删除");
        
        // MVC => 数据是保存在模型中
        // 1. 删除self.dataList中indexPath对应的数据
        [self.dataList removeObjectAtIndex:indexPath.row];
        NSLog(@"%@", self.dataList);
        
        // 2. 刷新表格(重新加载数据)
        // 重新加载所有数据,但不建议使用
//        [self.tableView reloadData];
        // deleteRowsAtIndexPaths让表格控件动画删除指定的行
        [self.tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationMiddle];
    } else if (editingStyle == UITableViewCellEditingStyleInsert) {
        NSLog(@"要添加数据");
        
        // 1. 向数组添加数据
        [self.dataList insertObject:@"王小二" atIndex:indexPath.row + 1];//+1是为了在下面一行添加

        // 2. 刷新表格
//        [self.tableView reloadData];
        // insertRowsAtIndexPaths让表格控件动画在指定indexPath添加指定行
        // 新建一个indexPath
        NSIndexPath *path = [NSIndexPath indexPathForRow:indexPath.row + 1 inSection:indexPath.section];//+1是为了显示在下面一行
 
        [self.tableView insertRowsAtIndexPaths:@[path] withRowAnimation:UITableViewRowAnimationMiddle];
    }
}

// 只要实现此方法，就可以显示拖动控件,如果没有写里面的方法，则只是界面更新，但是数据并未更新
- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)sourceIndexPath toIndexPath:(NSIndexPath *)destinationIndexPath
{
    // 界面数据UITableView已经完成了
    // 调整数据即可,但是以下这个方法是交换，不能够实现插入操作
//    [self.dataList exchangeObjectAtIndex:sourceIndexPath.row withObjectAtIndex:destinationIndexPath.row];
    // 1. 将源从数组中取出
    id source = self.dataList[sourceIndexPath.row];
    // 2. 将源从数组中删除
    [self.dataList removeObjectAtIndex:sourceIndexPath.row];
    NSLog(@"%@", self.dataList);
    
    // 3. 将源插入到数组中的目标位置
    [self.dataList insertObject:source atIndex:destinationIndexPath.row];
    
    NSLog(@"%@", self.dataList);
}

#pragma mark - 代理方法
// 返回编辑样式，如果没有实现此方法，默认都是删除
- (UITableViewCellEditingStyle)tableView:(UITableView *)tableView editingStyleForRowAtIndexPath:(NSIndexPath *)indexPath
{
//    if (indexPath.row % 2) {
//        return UITableViewCellEditingStyleInsert;
//    } else {
//        return UITableViewCellEditingStyleDelete;
//    }
    return UITableViewCellEditingStyleInsert;
}

@end

```

7.
**学习技巧：**
类名的首字母要大写，方法名首字母要小些；

8.
**学习技巧：**
对于自动以xib，如果使用mvc的模式去思考，则视图控制器是不需要了解xib里面的细节，所以参考02-团购的代码；

9.
**学习技巧：**
新建xib时，如果拖入UiView控件，一开始发现并不能够改变它的大小，所以需要设置以下：
![这里写图片描述](http://img.blog.csdn.net/20150830114038335)
才能继续设置大小；

10.
**学习技巧：**
关于延时：
```
延迟执行（掌握）
1> perform....
// 3秒后自动回到当前线程调用self的download:方法，并且传递参数：@"http://555.jpg"
[self performSelector:@selector(download:) withObject:@"http://555.jpg" afterDelay:3];

2> dispatch_after...
// 任务放到哪个队列中执行
dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
double delay = 3; // 延迟多少秒
dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delay * NSEC_PER_SEC)), queue, ^{
    // 3秒后需要执行的任务
});

```

11.
**学习技巧：**
```
// 代理如果使用强引用，就会产生循环引用，造成控制器和子视图都无法被释放，造成内存泄露
@property (nonatomic, weak) id <HMTgFooterViewDelegate> delegate;
```

12.
**学习技巧：**
通过预处理指令来注释或者打开一个代码块
```

 预处理指令
 #if 0
 所有代码都不会执行
 
 #endif
 
```


13.
**学习技巧：**
制作分隔线：
用uiView来做，调整高度为1，**调整背景颜色为灰色**；

14.
**学习技巧：**
在字典转模型的时候，模型里面的变量可以比文件里面的变量多，但是文件里的变量不能比模型里面的变量多，否则会报错；

15.
**学习技巧：**
>一旦重写了readonly属性的getter方法，_的成员变量就不存在了 
 如果写了getter方法，此时还需要使用_成员变量，则需要使用@synthesize生成对应的成员变量
16.
**学习技巧：**
>     在Storyboard中指定了可重用标示符，同时指定了Cell的类是HMStatusCell
     
>     系统会为tableView注册一个原形Cell，专门用来做可重用单元格的，一旦缓冲区中不存在
     可重用单元格，系统会使用原形Cell新实例化一个Cell用程序使用！
     
  >   因此如果在，Storyboard中，注册了原形Cell，就不再需要 cell == nil的判断了,也不需要init；

17.
**学习技巧：**
xib做不了tableview的嵌套，storyboard可以；


2015.08.31
1.
**学习技巧：**
关于内存
（1）
>栈(stack)（操作系统）：由操作系统自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。后进先出（根据存放函数的参数来记）

>堆(heap)（操作系统）： 一般由程序员分配释放， 若程序员不释放，程序结束时可能由OS回收，分配方式倒是类似于链表。

![这里写图片描述](http://www.cleey.com/Public/image/blog/20150811143803_55c9984b59fa4.jpg)

2.
**学习技巧：**
// 在堆中所有的变量类型都是匿名访问的
// 所有堆中的变量都是通过指针来访问的

3.
**学习技巧：**
如果是可变的，则在后面名字写M，以区分可变与不可变，如：
NSMutableArray *arrayM;
Array *array;
（3）
**学习技巧：**
（1）关于copy， 
**浅复制：不可变=>不可变**
深复制：其他三种情况
>浅复制：在执行复制操作时，对于对象中每一层（对象中包含的对象，例如说属性是某个对象类型）复制都是指针复制（如果从引用计数器角度出发，那么每层对象的引用计数器都会加1）。
深复制：在执行复制操作时，至少有一个对象的复制是对象内容复制（如果从引用计数器角度出发，那么除了对象内容复制的那个对象的引用计数器不变，其他指针复制的对象其引用计数器都会加1）。

实际上，这样子记，浅复制，两者的指针是一样的，只是计数加1；
深复制，两者地址不一样了，这样副本就可以被修改了，实现copy；
（2）

// *** 对于"可变类型"的属性，不要使用copy描述符定义，否则赋值后，就是不可变了！否则会出现问题：
 Attempt to mutate immutable object with xxx
 试图修改一个不可变的类型，使用方法xxx

//源代码：
//@property (nonatomic, copy) NSMutableString *name;

4.
**学习技巧：**
关于自定义对象要实现copy功能
```
void copyDemo5()
{
    Person *p = [[Person alloc] init];
    p.name = @"zhangsan";
    p.age = 18;
    
    NSLog(@"%@", p);
    
    Person *p1 = [p copy];
    p1.name = @"lisi";
    NSLog(@"%@", p1);
}

```
**上面的copy会自动调用下面的copyWithZone**
```
#import "Person.h"

/**
 自定义对象要实现copy功能
 1> 遵守NSCopying协议，本质上就是方便程序员编写代码时候，有快捷提示
 2> 实现- (id)copyWithZone:(NSZone *)zone
 */
@implementation Person

// zone，区域，极少用，用来管理和减少内存碎片
// 所有的copy（包括nutable）方法，最终都会调用copyWithZone
// copy操作将一个对象，复制(当前对象的属性)给一个新的对象
- (id)copyWithZone:(NSZone *)zone
{
    // 1> 实例化对象，self 是对象
    // self.class能够保证继承的子类同样使用copy方法
    Person *p = [[self.class alloc] init];
    
    // 2> 给属性赋值
    p.name = self.name;
    p.age = self.age;
    
    // 3> 返回新对象
    return p;
}
```

一个对象究竟是什么类型，只跟alloc那时候有关，所以
```
      Student *p = [[Student alloc] init];
        p.name = @"zhangsan";
        p.age = 18;
        p.no = @"0001";
        
        NSLog(@"%@, %@", p, p.no);
        
        Person *p1 = [p copy];
        p1.name = @"lisi";
        //NSLog(@"%@ %@", p1, p1.no);
```

p1并不一定就是person类型，因为在[p copy]语句中，p调用copy，返回的不一定是Person类型；参考02-copy

2015.08.31
1.
**学习技巧：**
苹果常见尺寸：
4寸屏幕大小：高568，
44

2.
**学习技巧：**
用下面的写法就不会因为self.time是弱引用而被删除掉了；
```
        UILabel *time = [[UILabel alloc]init];
        [self.contentView addSubview:time];
        self.time = time;
```


3.
**学习技巧：**
带边框的UIImage缩放
**参考网址：**http://onevcat.com/2011/12/uiimage/

4.
**学习技巧：**
```
//返回一个可拉伸的图片
- (UIImage *)resizeWithImageName:(NSString *)name
{
//返回一个可拉伸的图片
- (UIImage *)resizeWithImageName:(NSString *)name
{
    UIImage *normal = [UIImage imageNamed:name];
    
//    CGFloat w = normal.size.width * 0.5f ;
//    CGFloat h = normal.size.height *0.5f ;
    
    CGFloat w = normal.size.width*0.8;
    CGFloat h = normal.size.height*0.8;
    //传入上下左右不需要拉升的编剧，只拉伸中间部分
    return [normal resizableImageWithCapInsets:UIEdgeInsetsMake(h, w, h, w)];
    
//    [normal resizableImageWithCapInsets:UIEdgeInsetsMake(<#CGFloat top#>, <#CGFloat left#>, <#CGFloat bottom#>, <#CGFloat right#>)]
    
    // 1 = width - leftCapWidth  - right
    // 1 = height - topCapHeight  - bottom
    
    //传入上下左右不需要拉升的编剧，只拉伸中间部分，并且传入模式（平铺/拉伸）
//    [normal :<#(UIEdgeInsets)#> resizingMode:<#(UIImageResizingMode)#>]
}
```

**参考网址：**http://blog.csdn.net/chaoyuan899/article/details/19811889

4.
**学习技巧：**
新建分类：
点击iOS，点击Objective-C File文件，点击Categoy，即是建立分类文件
作用是扩充类的函数方法；

5.
**学习技巧：**
监听的时候的userInfo的写法：(04天-05通知)
```
 [center postNotificationName:@"zhenaiwang"
                              object:za
                            userInfo:@{@"title":@"新来了一批美女",
                                       @"info":@"........."}];
```

观察者调用的方法：(字典)
```
 NSLog(@"%@ %@：%@",self.name,noti.name,noti.userInfo[@"title"]);
```

6.
**学习技巧：**
UIDevice类提供了一个单粒对象，它代表着设备，通过它可以获得一些设备相关的信息，比如电池电量值(batteryLevel)、电池状态(batteryState)、设备的类型(model，比如iPod、iPhone等)、设备的系统(systemVersion)

通过[UIDevice currentDevice]可以获取这个单粒对象

UIDevice对象会不间断地发布一些通知，下列是UIDevice对象所发布通知的名称常量：
UIDeviceOrientationDidChangeNotification // 设备旋转
UIDeviceBatteryStateDidChangeNotification // 电池状态改变
UIDeviceBatteryLevelDidChangeNotification // 电池电量改变
UIDeviceProximityStateDidChangeNotification // 近距离传感器(比如设备贴近了使用者的脸部)

关于键盘通知：
我们经常需要在键盘弹出或者隐藏的时候做一些特定的操作,因此需要监听键盘的状态

键盘状态改变的时候,系统会发出一些特定的通知
UIKeyboardWillShowNotification // 键盘即将显示
UIKeyboardDidShowNotification // 键盘显示完毕
UIKeyboardWillHideNotification // 键盘即将隐藏
UIKeyboardDidHideNotification // 键盘隐藏完毕
UIKeyboardWillChangeFrameNotification // 键盘的位置尺寸即将发生改变
**UIKeyboardDidChangeFrameNotification // 键盘的位置尺寸改变完毕**

7.
**学习技巧：**
```
//    UIKeyboardAnimationCurveUserInfoKey = 7;  动画曲线动画
//    UIKeyboardAnimationDurationUserInfoKey = "0.25"; 动画时间
//    UIKeyboardBoundsUserInfoKey = "NSRect: {{0, 0}, {320, 216}}"; 键盘bounds
//    UIKeyboardCenterBeginUserInfoKey = "NSPoint: {160, 588}";  开始键盘的居中位置
//    UIKeyboardCenterEndUserInfoKey = "NSPoint: {160, 372}";结束键盘的居中位置
//    UIKeyboardFrameBeginUserInfoKey = "NSRect: {{0, 480}, {320, 216}}"; 键盘开始弹出的frame
//    UIKeyboardFrameChangedByUserInteraction = 0;   键盘改变frame
//    UIKeyboardFrameEndUserInfoKey = "NSRect: {{0, 264}, {320, 216}}"; 退出键盘的frame

//    UIKeyboardAnimationCurveUserInfoKey = 7;
//    UIKeyboardAnimationDurationUserInfoKey = "0.25";
//    UIKeyboardBoundsUserInfoKey = "NSRect: {{0, 0}, {320, 216}}";
//    UIKeyboardCenterBeginUserInfoKey = "NSPoint: {160, 372}";
//    UIKeyboardCenterEndUserInfoKey = "NSPoint: {160, 588}";
//    UIKeyboardFrameBeginUserInfoKey = "NSRect: {{0, 264}, {320, 216}}";
//    UIKeyboardFrameChangedByUserInteraction = 0;
//    UIKeyboardFrameEndUserInfoKey = "NSRect: {{0, 480}, {320, 216}}";
```

8.
**学习技巧：**
控制器的view是在根的window上的

9.
**学习技巧：**
文本框中那个删除键其实是个rightView，关于模式就是leftViewMode，如下，UITextField.h定义：
```
@property(nullable, nonatomic,strong) UIView              *leftView;        // e.g. magnifying glass
@property(nonatomic)        UITextFieldViewMode  leftViewMode;    // sets when the left view shows up. default is UITextFieldViewModeNever

@property(nullable, nonatomic,strong) UIView              *rightView;     
```

10.
**学习技巧：**
当UITextField中内容为空时，软键盘中的Search按钮是灰色不可点击状态。

UITextField内容不为空时，软键盘中的Search按钮可以点击
![这里写图片描述](http://img.blog.csdn.net/20150901170058983)

11.
**学习技巧：**
用静态单元格，选择tableview 改属性content为static，先写一个cell，然后改row或者session，这样可以统一，然后依次往后做，只适用于不需要修改界面，但是实际开发最好不要用，因为以后更新还是需要代码；

12.
**学习技巧：**
在xcode上直接拖动文件夹并不能够改变在finder中的位置，我们必须删除掉Xcode中的引用，重新在finder新建文件夹，拖好文件后，再从Xcode导入该文件，并且做好在Xcode和finder两端都确认，当确认无误后，方可以继续；

2015.09.03
1.
**学习技巧：**
对于block变量，可以使用copy，strong属性，但是视频中推荐使用copy属性；

2.
**学习技巧：**
view传递数据或者通知控制器，可以使用三种方法：
（1）block；
（2）代理；
（3）通知；

2015.09.04
1.
**学习技巧：**
直接拖动那个tableViewController时，本身就有个cell，只有在选择cell的类型为custom自定义类型时才能自己拉控件；

2.
**学习技巧：**
关于重用默认的cell。
（1）需要指定cell的ID，然后编程的时候直接制定ID为该ID，就不需要alloc了；
因为：程序启动的时候，会先去storyboard找有没有默认的cell，如果有的话就不需要程序猿初始化了，如果没有的话需要程序猿自己初始化；
（2）在重用cell的时候，应该改变cell上的所有控件的状态，不然的话有可能其它控件会有意外地状态；

3.
**学习技巧：**
协议的方法名是以类名开头的，这样子别人使用我的类的时候就可以知道是用了哪个代理；

4.
**学习技巧：**
```
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *ID=@"contact";
    
    //这句话forIndexPath:indexPath代表从storyboard加载cell，就不执行alloc这句话了，但是我们并没有cell在storyboard，所以应该去掉这句话
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:ID];
    
    // Configure the cell...
    if (cell ==nil) {
        cell =[[UITableViewCell alloc]initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:ID];
        
    }
    
    contact *givecontact = self.contacts[indexPath.row];
    //给cell里面的控件赋值
    cell.textLabel.text=givecontact.name;
    cell.detailTextLabel.text=givecontact.phone;
    return cell;
}
```

2015.09.06
1.
**学习技巧：**
NSTemporaryDirectory()，可获取到tmp文件夹；

2.
**学习技巧：**
获取到导航栏的按钮：
```
    UIBarButtonItem *add = self.navigationItem.rightBarButtonItem;

```

3.
**学习技巧：**
关于滑动出删除菜单以及编辑tableview的编辑样式：
```
//当提交一个操作时就会调用这个函数，实现往左划即出现删除菜单
//tableView的代理方法
-(void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (editingStyle == UITableViewCellEditingStyleDelete) {
            [self.contacts removeObjectAtIndex:indexPath.row];
            [self.tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationLeft];
    }
    
//    [self.tableView reloadData];
    //前提是tableview中cell总数和模型中数据总数一样
    else
    {
        contact *newcontact  = [contact contactWithName:@"grace" phone:@"123"];
//        [self.contacts addObject:newcontact];
        [self.contacts insertObject:newcontact atIndex:indexPath.row+1];
//        [self.tableView reloadData];
        NSIndexPath *nextIndexPath = [NSIndexPath indexPathForRow:indexPath.row+1 inSection:0];
        [self.tableView insertRowsAtIndexPaths:@[nextIndexPath] withRowAnimation:UITableViewRowAnimationLeft];
    }
}



/**
 *  //当tableView进入编辑模式前调用该方法；
 *
 *  @param tableView tableView description
 *  @param indexPath indexPath description
 *
 *  @return 返回每一行的编辑样式
 */
-(UITableViewCellEditingStyle)tableView:(UITableView *)tableView editingStyleForRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (indexPath.row == 0) {
        return UITableViewCellEditingStyleInsert;
    }
    return UITableViewCellEditingStyleDelete;
}
```

4.
**学习技巧：**
![这里写图片描述](http://img.blog.csdn.net/20150906173745335)
![这里写图片描述](http://img.blog.csdn.net/20150906173756840)


5.
**学习技巧：**
（1）在tabBar中，子视图控制器是不能够tabBarButton的属性的，只有在tabBarController中才能获取；
（2）在tabBar中，不同视图的切换是不会销毁视图的，所以，
不同视图的切换顺序如下：
首先，开第一个视图：
![这里写图片描述](http://img.blog.csdn.net/20150906175804747)
接着，切换到第二个视图：
![这里写图片描述](http://img.blog.csdn.net/20150906175837827)
接着，回到原来的视图：
![这里写图片描述](http://img.blog.csdn.net/20150906175914965)
注意，回传到原来的视图的时候并不会调用viewDidLoad了；

6.
**学习技巧：**
AppDelegate.m文件中(需要注意的两个函数)：
```
//应用程序获取焦点的时候调用（application已经有主窗口并且显示）
- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    NSLog(@"%s\n",__func__);
    UITabBarController *tabVc = (UITabBarController *)application.keyWindow.rootViewController;
    NSLog(@"%@\n",NSStringFromCGRect(tabVc.tabBar.frame));
    NSLog(@"%@\n",tabVc.tabBar.subviews);
    NSLog(@"%@\n",application.keyWindow);
    for (UIView *chileview in tabVc.tabBar.subviews) {
       // if ([chileview isKindOfClass:[UIImageView class]]) { //判断是否是本类或者子类
        if ([chileview isMemberOfClass:[UIImageView class]]){  //判断是否是本类
            [chileview removeFromSuperview];
        }
        if(chileview.bounds.size.height == 49)
        {
            [chileview removeFromSuperview];
        }
    }
}



//程序关闭的时候会调用该函数
//程序进入后台的时候会进入休眠状态，应用程序中所有事件都不接收，所以，在后台关闭程序是不会调用这个函数的。
- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    NSLog(@"%s\n",__func__);
}

```

7.
**学习技巧:**
（1）导航栏上的控件的同个位置，只能够显示同个控件，也就是说如果一开始放文字，然后给该按钮添加图片，图片会覆盖掉文字的；


8.
**学习技巧：**
（1）静态单元格小技巧：选中cell，选择为static的style，然后只保留一行，先搞定一行，然后再看有多少组，设置setion，然后再每一组中用cmd+c复制，cmd+v粘贴就好了！注意要选择是group还是plain。
（2）tableview的指示器设置：
![这里写图片描述](http://img.blog.csdn.net/20150906211130754)
（3）将文本居中的好方法：将宽度拉到与屏幕大小一致，然后选择居中，以后如果文字发生改变，则可以自动居中；

（4）如果在tabBarCOntroller跳转出去的页面不需要底部的条的话，则可以选中该控制器，勾选下列选项：
![这里写图片描述](http://img.blog.csdn.net/20150906213429410)

（5）在做跳转时，如果前一个导航栏的标题不是我们下一个页面返回的按钮的标题，这时可以选中前一个导航栏的Navigation Item，设置如下：
![这里写图片描述](http://img.blog.csdn.net/20150906214121475)
，这样，就能够实现返回的按钮的文字是“联系人”了；

（6）一个模块一个控制器;
（7）静态单元格的行数和组数都已经固定死了，当在storyboard时做静态单元格的界面时，控制器如果继承来自tableviewController的类，那么Xcode会自动帮我们写默认的函数，此时会将我们之前在界面中写的单元格给抹掉，所以，可以注释掉默认的代码。
```
#pragma mark - Table view data source

//- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
//#warning Incomplete implementation, return the number of sections
//    return 0;
//}
//
//- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
//#warning Incomplete implementation, return the number of rows
//    return 0;
//}


```
如果第一个函数返回的数目比实际静态单元格的数量多，会发生内存错误；少的话就显示少些组；
（8）iOS7后只有在UINavigationController中UIScrollView顶部会自动添加64的滚动区；

9.
**学习技巧：**
除了push之外，还有另外一种控制器的切换方式，那就是Modal
任何控制器都能通过Modal的形式展示出来
Modal的默认效果：新控制器从屏幕的最底部往上钻，直到盖住之前的控制器为止

以Modal的形式展示控制器
```
- (void)presentViewController:(UIViewController *)viewControllerToPresent animated: (BOOL)flag completion:(void (^)(void))completion
```
关闭当初Modal出来的控制器
```
- (void)dismissViewControllerAnimated: (BOOL)flag completion: (void (^)(void))completion;
```

10.
**学习技巧：**
选择push必须依赖于导航控制器，modal则不需要；

11.
**出现问题：**
有时候出现拖动不了bar button进去navigation item的情况；

 **解决方法：**重新开启Xcode就好了；
12.
**学习技巧：**
navigation的导航条只跟栈顶控制器有关，所以如果先有导航控制器，再由tabBarController，这样，只能在tabBarController设置导航条的标题，所以一般都先由tabBarController，再有导航控制器；
13.
**学习技巧：**
APP主流框架：
![这里写图片描述](http://img.blog.csdn.net/20150906233102229)

14.
**学习技巧：**
![这里写图片描述](http://img.blog.csdn.net/20150906233313085)

2015.09.07
1.Quartz 2D学习笔记
**学习技巧：**

（1）画出一条简单的线：
```
//当视图显示的时候会调用，默认只会调用一次
- (void)drawRect:(CGRect)rect {
    //1.获取上下文
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    
    //2.设置绘图信息（拼接路径）
    UIBezierPath *path = [UIBezierPath bezierPath];
    
    //3.设置起点
    [path moveToPoint:CGPointMake(10, 10)];
    
    //4.添加一条线到某个点
    [path addLineToPoint:CGPointMake(125, 125)];
//    [path addLineToPoint:CGPointMake(240, 10)];
    //5.将路径添加到上下文
    //path.CGPath 能够将UIKit的路径转换成CoreGraphics,只要是CG开头就可以
    CGContextAddPath(ctx, path.CGPath);
    
    //6.把上下文渲染到视图
    //stroke描边
    CGContextStrokePath(ctx);
    
    
    
}
```

（2）注意，
```
    [path addLineToPoint:CGPointMake(125, 125)];

```
添加了一条线后，这条线的终点将成为下一条线的起点；
（3）
设置线条的属性：
```
    CGContextAddPath(ctx, path.CGPath);
    
    //设置绘图状态
    //设置线宽
    CGContextSetLineWidth(ctx, 10);
    
    //设置线的样式
    CGContextSetLineCap(ctx, kCGLineJoinRound);
    
    //设置颜色
//    CGContextSetRGBStrokeColor(ctx, 1, 0, 0, 1);//通过RGB来设置
    [[UIColor redColor] set];//较简便的方法
    
    CGContextStrokePath(ctx);
    
```

（4）
画一条曲线：
```
    //1、获取上下文
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    
    //2.拼接路径
    UIBezierPath *path  = [UIBezierPath bezierPath];
    
    CGPoint startp = CGPointMake(10, 125);
    CGPoint endp = CGPointMake(240, 125);
    CGPoint controlp = CGPointMake(10, 10);
    
    [path moveToPoint:startp];
    //3.
    [path addQuadCurveToPoint:endp controlPoint:controlp];
    
    //
    CGContextAddPath(ctx, path.CGPath);
    
    CGContextStrokePath(ctx);
    
```
参考网址：http://donbe.blog.163.com/blog/static/138048021201052093633776/

（5）
画一个三角形：
```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    //1.获取上下文
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    
    //2.拼接路径
    UIBezierPath *path = [UIBezierPath bezierPath];
    
    CGPoint startP = CGPointMake(10, 10);
    [path moveToPoint:startP];
    
    [path addLineToPoint:CGPointMake(125, 125)];
    
    [path addLineToPoint:CGPointMake(240, 10)];
    
//    [path addLineToPoint:startP];//指向起点，则形成回路
    [path closePath];//关闭路径，自动从上一个的终点指向最初的起点
    
    //3.把路径添加到上下文
    CGContextAddPath(ctx, path.CGPath);
    
    //设置属性
    [[UIColor blueColor] setFill];//设置里面的填充
    [[UIColor redColor] setStroke];//设置线框的颜色
    
    CGContextSetLineWidth(ctx, 15);//这句对于（1）（2）两句是无效的，只对（3）有效
    
    //4.渲染上下文
//    CGContextStrokePath(ctx);//只是将线连接起来（1）
//    CGContextFillPath(ctx);//填充包括里面内容，是黑色的（2）
    
    //既填充又描边 kCGPathFillStroke
    CGContextDrawPath(ctx, kCGPathFillStroke);//(3)
    
    
}

```

效果图：
![这里写图片描述](http://img.blog.csdn.net/20150907125458629)


（3）画矩形：
```
-(void)drawjuxing
{
    // Drawing code
    //1.获取上下文
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    
    //2.拼接路径
    UIBezierPath *path = [UIBezierPath bezierPathWithRect:CGRectMake(0, 0, 250, 250)];//画矩形
    
    path = [UIBezierPath bezierPathWithRoundedRect:CGRectMake(10, 10, 200, 200) cornerRadius:100];//画圆
    
    //3.把路径添加到上下文
    CGContextAddPath(ctx, path.CGPath);
    
    //4.渲染上下文
    CGContextStrokePath(ctx);//只是将线连接起来（1）
    //    CGContextFillPath(ctx);//填充包括里面内容，是黑色的（2）
    
    //既填充又描边 kCGPathFillStroke
    //    CGContextDrawPath(ctx, kCGPathFillStroke);//(3)
}

```
（3）
画圆弧以及填充圆
```
-(void)drwatianchongyuan
{
    //1.获取上下文
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    
    //2.拼接路径
    CGPoint center = CGPointMake(125, 125);//圆心
    CGFloat radius = 100;//半径
    CGFloat startA = 0;//起始角
    CGFloat endA = M_PI_2;//转过的角度
    UIBezierPath *path = [UIBezierPath bezierPathWithArcCenter:center radius:radius startAngle:startA endAngle:endA clockwise:YES];
    
    [path addLineToPoint:center];//这句话让终点在圆心，填充时就能够填充四分之一圆了
    //3.将路径添加到上下文
    CGContextAddPath(ctx, path.CGPath);
    
    //4.渲染上下文
    //    CGContextStrokePath(ctx);
    CGContextFillPath(ctx);

}
//画弧
-(void)drwaArc
{
    //1.获取上下文
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    
    //2.拼接路径
    CGPoint center = CGPointMake(125, 125);//圆心
    CGFloat radius = 100;//半径
    CGFloat startA = 0;//起始角
    CGFloat endA = M_PI_2;//转过的角度
    UIBezierPath *path = [UIBezierPath bezierPathWithArcCenter:center radius:radius startAngle:startA endAngle:endA clockwise:YES];
    
    //3.将路径添加到上下文
    CGContextAddPath(ctx, path.CGPath);
    
    //4.渲染上下文
    CGContextStrokePath(ctx);
}
```
填充圆效果图：
![这里写图片描述](http://img.blog.csdn.net/20150907161637538)
画圆时的初始位置是右边缘线中心位置，所以
```
 CGFloat startA = 0;//起始角
```

（4）
![这里写图片描述](http://img.blog.csdn.net/20150907164028572)
代码名字叫做：我的下载进度条


2.
**学习技巧：**
iOS的转义字符是%，所以，如果要输出%，应该写“%%”；

3.
UIKit下的画文字和画图片
```
-(void)drawView:(CGRect)rect
{
    UIImage *image = [UIImage imageNamed:@"屏幕快照 2015-09-07 10.45.54"];
    
    //    [image drawAtPoint:CGPointZero];(1)
    //    [image drawInRect:CGRectMake(0, 0, 100, 100)];//会自动缩放，如果图片过大会缩小至指定rect；(2)
    
    //设置裁剪区，超出裁剪区的区域都被裁去
    UIRectClip(CGRectMake(0, 0, 100, 100));//如果需要裁减才需要调用此函数
    [image drawAsPatternInRect:rect];//平铺(3）
}

//画文字
-(void)drawText
{
    // Drawing code
    NSString *text = @"luotuxiu";
    
    CGRect textFrame = CGRectMake(0, 0, 100, 100);
    NSDictionary *dict  = @{
                            NSFontAttributeName:[UIFont systemFontOfSize:20],
                            NSForegroundColorAttributeName:[UIColor redColor],
                            NSStrokeWidthAttributeName:@10
                            
                            };
    //    UIRectFill(textFrame);//画矩形
    //    [text drawInRect:textFrame withAttributes:dict];//画文字,会自动换行
    [text drawAtPoint:CGPointZero withAttributes:dict];//也是画文字，但不会自动换行
}

```

4.
**学习技巧：**
如果继承UIImageView的话，是不能够调用Draw方法的，因为苹果已经做好了。

5.
**学习技巧：**
Quartz 2D中一根线一个路径管理。

6.
**学习技巧：**
关于图形上下文的出栈入栈操作：
```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    
    CGContextSaveGState(ctx);//把上下文保存放在栈中，相当于保存一份最初的上下文
       //绘图信息
    UIBezierPath *path = [UIBezierPath bezierPath];
    
    [path moveToPoint:CGPointMake(10, 125)];
    
    [path addLineToPoint:CGPointMake(240, 125)];
    

    
    CGContextAddPath(ctx, path.CGPath);


    //设置绘图状态
    [[UIColor redColor] set];
    CGContextSetLineWidth(ctx, 10);
    CGContextSetLineCap(ctx, kCGLineCapRound);//设置末尾是圆角
    
    CGContextStrokePath(ctx);
    
    UIBezierPath *path1 = [UIBezierPath bezierPath];
    
    [path1 moveToPoint:CGPointMake(125, 10)];
    
    [path1 addLineToPoint:CGPointMake(125, 240)];
    CGContextAddPath(ctx, path1.CGPath);
    
    //把栈顶上下文取出来，这样相当于上下文已经重新初始化了，所以替换成当前上下文
    CGContextRestoreGState(ctx);
//    //设置绘图状态
//    [[UIColor redColor] set];
//    CGContextSetLineWidth(ctx, 1);
//    CGContextSetLineCap(ctx, kCGLineCapRound);//设置末尾是圆角
    CGContextStrokePath(ctx);
}
```

7.
**学习笔记：**
上下文的缩放平移可以用矩阵：
```
- (void)drawRect:(CGRect)rect {
    // Drawing code
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    
    
    //矩阵变换要在拼接路径前完成,平移上下文
    CGContextTranslateCTM(ctx, 100, 100);
    
    //旋转上下文
    CGContextRotateCTM(ctx, M_PI_4);
    
    //缩放上下文,
    //void CGContextScaleCTM (CGContextRef c,CGFloat sx,CGFloat sy);sx代表着x缩放了多少倍，以此类推
    CGContextScaleCTM(ctx, 0.5, 1.2);
    
    UIBezierPath *path = [UIBezierPath bezierPathWithOvalInRect:CGRectMake(-50, -100, 150,200)];
    
    
    CGContextAddPath(ctx, path.CGPath);
    
    CGContextFillPath(ctx);
}
```
8.
**学习技巧：**
生成图片水印
```
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    UIImage *oldImage = [UIImage imageNamed:@"1"];
    /**     *
     *   开启上下文，位图的上下文
     *  @param size  尺寸,新的图片的大小
     *  @param opaque 不透明 YES
     */
    UIGraphicsBeginImageContextWithOptions(oldImage.size, NO, 0.0);
    
    [oldImage drawAtPoint:CGPointZero];
    
    NSString *text = @"哈哈哈哈";
    NSDictionary *dict = @{
                           NSFontAttributeName :[UIFont systemFontOfSize:15],
                           NSForegroundColorAttributeName:[UIColor redColor]
                           };
    [text drawAtPoint:CGPointMake(140, 140) withAttributes:dict];
    
    //获取新的图片,UIGraphicsGetImageFromCurrentImageContext返回一个Image
    UIImage *newImage =  UIGraphicsGetImageFromCurrentImageContext();
    _imageView.image = newImage;
    
    //关闭上下文,以免耗内存
    UIGraphicsEndImageContext();
    
    //把图片转换成PNG格式的二进制数据
    NSData *data = UIImagePNGRepresentation(newImage);
    //写入桌面
    [data writeToFile:@"/Users/xulei/Desktop/newImage.png" atomically:YES];
}
```
2015.09.08
1.
**学习技巧：**
先调用-(id)initWithFrame:(CGRect)frame，再调用-(void)awakeFromNib；注意顺序；

![这里写图片描述](http://img.blog.csdn.net/20150908103103384)

2.
**学习技巧：**
使用tool Bar可以让那些控件自动摆放好位置；

3.
**学习技巧：**
按住ctrl，然后从一个按钮点击到另一个按钮，可以设置两者间的位置关系：
![这里写图片描述](http://img.blog.csdn.net/20150908151113609)
按住shift可以选择多项，第一个选择则表示保持与左边的间距，center Vertically表示保持和另一个控件水平；

4.
**学习技巧：**
清空该控件的约束![这里写图片描述](http://img.blog.csdn.net/20150908151917283)

5.
**学习技巧：**
如果在storyboard拖监听事件时拖了两次，也会发生错误的；

6.
**学习技巧：**
扩展属性只能够使用继承，扩展方法可以使用分类；

7.
**学习技巧：**
左上角的空白区域的边就是_imageView.layer.cornerRadius，圆角半径，当设置成边长一半时，则变成一个圆；
![这里写图片描述](http://img.blog.csdn.net/20150908230209324)

8.