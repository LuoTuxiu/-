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
*   __func__%s 当前函数签名，就是当前函数名
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
        [self.pwdText resignFirstResponder];//撤销密码框成为第一响应者
    }
    
    return YES;
}


@end

```
