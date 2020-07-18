## 类组件

```
class Book extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return <div>{this.props.name}</div>
	}
}
```

## 函数组件

```
function Book(props) {
	return <div>{props.name}</div>
}
```

## 区别

> 类组件内部拥有状态 state，函数组件无法拥有状态 state，现在在 react16.8 的版本可以用 react hook 解决

> 类组件通过继承成新的类，函数组件通过高阶组件返回新组件

## react hook

### useState

```
function Book(props) {
	const [name, setName] = useState(null)
	return {
		<div>{name}</div>
	}
}
```

### useEffect

原 class 类写法

```
class Book extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: null
		}
	}
	componentDidMount() {
		const self = this
		setTimeout(function() {
			self.setState({
				name: self.props.name
			})
		}, 0)
	}
	render() {
		return <div>{this.state.name}</div>
	}
}
```

现在 hook 写法

```
function Book(props) {
	const [name, setName] = useState(null)
	useEffect(function() {
		setTimeout(function() {
			setName(props.name)
		})
	}, [])
	return <div>{name}</div>
}
```

更多精彩文章可以看[我的博客](https://www.luotuxiu.cn/)，如有错误，欢迎指正，共同进步
