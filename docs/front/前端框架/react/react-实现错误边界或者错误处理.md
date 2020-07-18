# react-实现错误边界或者错误处理

## react 程序出错了怎么办

在 react 中，一旦出错，如果每个组件去处理出错情况则比较麻烦，react 16 新出了错误边界的 api

### 错误边界

代码摘自[react 英文官网](https://reactjs.org/docs/error-boundaries.html)

```
// 先定义一个错误边界组件
class ErrorBoundary extends React.Component {
	contructor(props) {
		super(props)
		this.state = {
			hasError: false
		}
	}
	static getDerivedStateFromError(error) {
		return {
			hasError: true
		}
	}
	componentDidCatch(error, errorInfo) {
		logEorroToSever() // 在这里你可以上报异常数据
	}
	render() {
		if(this.state.hasError) {
			return <h1>the page has error</h1>
		}
		return this.props.children
	}
}
```

使用方法：

```
<ErrorBoundary>
	<YourComponent /> // 在这里使用你的页面
</ErrorBoundary>
```

更多精彩文章可以看[我的博客](https://www.luotuxiu.cn/)，如有错误，欢迎指正，共同进步
