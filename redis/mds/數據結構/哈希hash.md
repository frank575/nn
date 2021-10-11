數據結構/哈希 hash
===
[回首頁](https://github.com/frank575/nn/) / [返回目錄](../../)

* 結構為 key-field-value
* 可以把 key 當作是一張表，而 key 就是表 id

### 重要 API

> 記住 H，哈希都以 h 開頭

* `hget key field` 取
	* O(1)
* `hset key field value` 寫
	* O(1)
* `hdel key field` 刪
	* O(1)
	```shell
	> hset user:1:info name frank
	1
	> hget user:1:info name
	"frank"
	> hset user:1:info age 25
	1
	> hgetall user:1:info
	1) "name"
	2) "frank"
	3) "age"
	4) "25"
	> hdel user:1:info age
	(integer) 1
	> hgetall user:1:info
	1) "name"
	2) "frank"
	```
* `hexists key field` 判斷 hash key 是否有 field
	* O(1)
	* 返回 integer
* `hlen key` 獲取 hash key field 的數量
	* O(1)
	* 返回 integer
* `hmget key field1 field2... fieldN` 批量取
	* O(n)
* `hmset key field1 value1 field2 value2... fieldN valueN` 批量寫
	* O(n)
* `hincrby key field int` 自增
	* O(1)
* `hincrbyfloat key field float` 自增
	* O(1)
* `hgetall key` 返回 hash key 對應所有的 field 和 value
	* O(n)
	* 注意單線程架構，如果 filed value 過多可能會耗時過長
* `hvals key` 返回 hash key 對應所有 field 的 value
	* O(n)
* `hkeys key` 返回 hash key 對應所有的 field
	* O(n)
* `hsetnx key field value` 沒 field 就寫
	* O(1)
		
### 使用場景

1. 計數器
	* 用戶頁訪問數
	* hincrby user:1:info pageview 1
2. 緩存
	* 緩存視頻的基本信息(數據源在MYSQL中)偽代碼
	```typescript=
	const getVideoInfo = (vid: number): VideoInfo => {
		const redisKey: string = redisPrefix + vid
		const hashMap: { [key: string]: string } = redis.hgetAll(redisKey)
		let videoInfo: VideoInfo = transferMapToVideo(hashMap)
		if (videoInfo == null) {
			videoInfo = mysql.get(vid)
			if (videoInfo != null) {
				// 序列化
				redis.hmset(redisKey, transferVideoToMap(videoInfo))
			}
		}
		return videoInfo
	}
	```
	
### string 對比 hash


|string|hash|
|---|---|
|get|hget|
|set setnx|hset hsetnx|
|del|hdel|
|incr incrby decr decrby|hincrby|
|mset|hmset|
|mget|hmget|

### string & hash 序列化儲存對比

|類型|命令|優點|缺點|
|---|---|---|---|
|string|set key serializable|1. 編程簡單<br/>2. 可節約內存|1. 序列化開銷<br/>2. 設置屬性要操作整個數據|
|string|set key:field value|1. 直觀<br/>2. 可以局部更新|1. 內存占用大<br/>2. key 較為分散|
|hash|hset key field value|1. 直觀<br/>2. 節省空間<br/>3. 可以局部更新|1. 編程稍微複雜<br/>2. ttl 不好控制|
