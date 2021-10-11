數據結構/集合 set
===
[回首頁](https://github.com/frank575/nn/) / [返回目錄](../../)

* key-分值(score)+element
* 與 set 相比時間複雜度較高，因為需要保持有序

# 與其他數據結構的比較
|-|list|set|**zset**|
---|---|---|---
重複|有重複|無重複|無重複
排序|有序|無序|有序
儲存值|element|element|score + element

# 重要 api

> 以 z 開頭

* 增
  * `zadd key score element(n筆)` 添加，score 可重複，element 則不行
    * O(logN) 
      * 因為使用兩種數據結構來實現(hashtable + ziplist 與 hashtable + skiplist 來實現)
* 刪
  * `zrem key element(n筆)` 刪除元素
    * O(logN)
* 改
  * `zincrby key increScore element` 增加或減少元素的分數
    * o(1)
* 查
  * `zscore key element` 獲取 score 
    * o(1)
  * `zcard key` 返回元素的總個數
    * o(1)
  * `z(rev)?range key start end [withscores]` 返回指定索引範圍內的(降)?升序元素[分值(是否連 score 也返回)]
    * O(log(N(唯有序集合中的個數)) + M(要獲取的個數))
  * `zrangebyscore key minScore maxScore [withscores]` 返回指定分數範圍內的升序元素[分值]
    * O(logN + M)
  * `zrevrangebyscore key maxScore minScore [withscores]` 返回指定分數範圍內的升序元素[分值]
    * O(logN + M)
  * `zcount key minScore maxScore` 返回指定分數範圍內的元素個數
    * O(logN + M)
  * `zremrangebyrank key start end` 刪除指定排名內的升序元素
    * O(logN + M)
  * `zremrangebyscore key minScore maxScore` 刪除指定分數內的升序元素
    * O(logN + M)

```shell
# 重要命令命令行事例
> zadd player:rank 1000 nana 900 mimi 800 lulu 600 kaka
(integer) 4
> zscore player:rank nana
1000.0
> zrank player:rank nana
(integer) 3
> zrem player:rank lulu
(integer) 1
> zrange player:rank 0 -1 withscores
1) "kaka"
2) 600.0
3) "mimi"
4) 900.0
5) "nana"
6) 1000.0
> zrevrange player:rank 0 -1
1) "nana"
2) "mimi"
3) "kaka"
```

# 其他 API

* `zinterstore` 交集
* `zunionstore` 並集

# 使用場景

1. 排行榜，比方說書本排行等
  * zadd, zincrby...
