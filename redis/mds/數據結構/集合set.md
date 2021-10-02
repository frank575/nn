數據結構/集合 set
===
[回首頁](../../../) / [返回目錄](../../)

* 結構為 key values(a b c)
* 無序
* 無重複
* 集合間操作(交並差集)

### 重要 api

> 以 Z 開頭

* 增
	* `sadd key element` 添加 element(如果 element 已存在則添加失敗)
		* O(1)
* 刪
	* `srem key element` 將集合中的 element 移除
		* O(1)
* 改
* 查
	* `scard key` 計算集合大小
	* `sismember key element` 判斷 element 是否在集合中(1 表示存在)
	* `srandmember key count` 從集合中隨機挑選 count 個元素
	* `spop key` 從集合中隨機彈出一個元素
	* `smembers key` 取出集合中的所有元素(無序)
		* 如果元素量過多可以使用 `sscan` 來處理

### 使用場景