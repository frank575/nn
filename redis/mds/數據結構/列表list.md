數據結構/列表 list
===
[回首頁](../../../) / [返回目錄](../../)

* 結構為 key elements([a b c])
* 有序
* 可重複
* 左右插入&彈出

### 重要 API

> [LR] 為開頭

* **增**
	* `[lr]push key value1 value2... valueN` [左右]增
		* O(n)
	* `linsert key (before|after) value newValue` 在 list 指定的值(前|後)插入新值
		* O(n)
* **刪**
	* `[lr]pop key` 左右彈出一個 item
		* O(1)
	* `lrem key count value` 根據 count 值，從列表中刪除所有 value 相等的值
		* **count > 0** 左到右，刪除最多 count 個 value 相等的項
		* **count < 0** 右到左，刪除最多 Math.abs(count) 個 value 相等的項
		* **count = 0** 刪除所有 value 相等的項
		* O(n)
	* `ltrim key start end` 保存索引範圍 start - end(包含) 的項而其餘刪除
		* O(n)
	* `b[lr]pop key timeout` [lr]pop的阻塞版本，timeout 是阻塞超時時間，timeout = 0 為永不超時
		* 可以理解為發布訂閱
		* O(1)
* **改**
	* `lset key index newValue` 設置列表指定索引值為 newValue
		* O(n)
* **查**
	* `lrange key start end` 獲取列表指定索引 start - end(包含)的所有項
		* O(n)
		* 如果為負數為最右方，如：0 -1，就是第 1 筆到最後 1 筆
	* `lindex key index` 獲取指定索引的項
		* O(n)
	* `llen key` 獲取列表長度
		* O(1)

### 使用場景

1. 時間截
	1. 如部落主關注，部落主文章更新就 lpush，釋放就 rpop，這樣就能做到發布時間新到舊的存儲

### 使用提示

1. lpush + lpop = stack
2. lpush + rpop = queue
3. lpush + ltrim = capped collection
4. lpush + brpop = message queue