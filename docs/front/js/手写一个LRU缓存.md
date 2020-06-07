# 手写一个 LRU 缓存

全程是 Least Recently Used，比如在浏览器中的浏览器缓存，比如 iOS 中的任务切换。

原理如下：

a. 如果缓存中存在，则需要将该值添加到队列的末尾

b. 如果缓存中没有，则需要将该值添加到队列的末尾，同时需要判断是否到了最大值，如果超出最大值，则需要将队首元素删除。

```
var LRUCache = function(max) {
	this.keys = []
	this.cache = Object.create(null)
	this.capaciry = max
}
LRUCache.prototype.get = function(key) {
	if(this.cache[key]) {
		remove(this.keys, key)
		this.keys.push(key)
		return this.cache[key]
	} else {
		return -1
	}
}
LRUCache.prototype.put = function(key, value) {
	if(this.cache[key]) {
		this.cache[key] = value
		remove(this.keys, key)
		this.keys.push(key)
	} else {
		this.keys.push(key)
		this.cache[key] = value
		if(this.keys.length > this.capacity) {
			removeCache(this.cache, this.keys, this.keys[0])
		}
	}
}
function remove(arr, key) {
	if(arr.length) {
		const index = arr.indexOf(key)
		if(index > -1) {
			return arr.splice(index, 1)
		}
	}
}
function removeCache(cache, keys, key) {
	cache[key] = null
	remove(kesy, key)
}
```
