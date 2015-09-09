##Xcode默认生成的文件
###默认工程有的Info.plist 和pch文件
####Info.plist 文件
建立一个工程后，会在Supporting files文件夹下看到一个“工程名-Info.plist”的文件，该文件对工程做一些运行期的配置，非常重要，不能删除

在旧版本Xcode创建的工程中，这个配置文件的名字就叫“Info.plist”
项目中其他Plist文件不能带有“Info”这个字眼，不然会被错认为是传说中非常重要的“Info.plist”
项目中还有一个InfoPlist.strings的文件，跟Info.plist文件的本地化相关

####常见设置：
![这里写图片描述](http://img.blog.csdn.net/20150904100840530)

常见属性(括号里面是用文本编辑器打开时看到的key)
Localiztion native development region(CFBundleDevelopmentRegion)-本地化相关

Bundle display name(CFBundleDisplayName)-程序安装后显示的名称,限制在10－12个字符，如果超出，将被显示缩写名称

Icon file(CFBundleIconFile)-app图标名称,一般为Icon.png

Bundle version(CFBundleVersion)-应用程序的版本号，每次往App Store上发布一个新版本时，需要增加这个版本号

Main storyboard file base name(NSMainStoryboardFile)-主storyboard文件的名称

Bundle identifier(CFBundleIdentifier)-项目的唯一标识，部署到真机时用到

###pch文件：
项目的Supporting files文件夹下面有个“工程名-Prefix.pch”文件，也是一个头文件

pch头文件的内容能被项目中的其他所有源文件共享和访问

一般在pch文件中定义一些全局的宏

在pch文件中添加下列预处理指令，然后在项目中使用Log(…)来输出日志信息，就可以在发布应用的时候，一次性将NSLog语句移除（在调试模式下，才有定义DEBUG）
```
#ifdef DEBUG
#define Log(...) NSLog(__VA_ARGS__)
#else
#define Log(...) /* */
#endif
```



##Xcode默认启动的对象：
###基本介绍:
UIApplication对象是应用程序的象征

每一个应用都有自己的UIApplication对象，而且是单例的

通过[UIApplication sharedApplication]可以获得这个单例对象

一个iOS程序启动后创建的第一个对象就是UIApplication对象

利用UIApplication对象，能进行一些应用级别的操作

###常用属性：
设置应用程序图标右上角的红色提醒数字
@property(nonatomic) NSInteger applicationIconBadgeNumber;
