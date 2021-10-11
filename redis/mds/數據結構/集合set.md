數據結構/集合 set
===
[回首頁](https://github.com/frank575/nn/) / [返回目錄](../../)

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
  ```shell
  # 以上命令的 shell 範例
  > sadd user:1:follow news his it sports
  (integer) 4
  > smembers user:1:follow
  1) "news"
  2) "his"
  3) "it"
  4) "sports"
  > spop user:1:follow
  "news"
  > scard user:1:follow
  (integer) 3
  > sismember user:1:follow envoirnment
  (integer) 0
  ```
* 集合間查詢
  * `sdiff key1 key2` 差集
  * `sinter key1 key2` 交集
  * `sunion key1 key2` 並集
  * `s(diff|inter|union)store destkey key1 key2` 將 key1 與 key2 的集合間查詢結果儲存到 destkey 中
  ```shell
  # user:1:follow 的 set 有 it, music, his, sports 元素
  # user:2:follow 的 set 有 it, news, ent, sports 元素
  
  > sdiff user:1:follow user:2:follow
  1) "music"
  2) "his"
  > sinter user:1:follow user:2:follow
  1) "it" 
  2) "sports"
  > sunion user:1:follow user:2:follow
  1) "it"
  2) "music"
  3) "his"
  4) "sports"
  5) "news"
  6) "ent"
  > sdiffstore user:1and2:follow user:1:follow user:2:follow
  (integer) 2
  > smembers user:1and2:follow
  1) "music"
  2) "his"
  ```

### 使用場景

1. 抽獎系統
   1. 將人數存到集合內並使用 srandmember/spop 隨機挑選中獎者
2. 點讚
   1. 可以把 user id 存到 set 裡
3. tag
   1. 比方說給用戶添加標籤
      ```shell
      > sadd user:1:tags tag1 tag2 tag5
      > sadd user:2:tags tag6 tag11
      # ...
      > sadd user:n:tags tagx
      ```
   2. 給標籤添加用戶
      ```shell
      > sadd tag1:1:users user1 user2
      > sadd tag1:2:users user3 user4
      # ...
      > sadd tag1:n:users userx
      ```
   3. 以上儲存內容相關係，可以使用事務處理(後面講)
4. 共同關注、好友
   1. 使用集合間語法，如共同好友就是交集
    
