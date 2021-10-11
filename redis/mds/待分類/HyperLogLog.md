待分類/HyperLogLog
===
[回首頁](https://github.com/frank575/nn/) / [返回目錄](../../)

1. 基於HyperLogLog算法：極小空間完成獨立數量統計
2. 本質還是字符串
    ```shell
    > type hyperloglog_key
    string 
    ```

# 三個命令

1. `pfadd key element [element...]` 向 hyperloglog 添加元素
2. `pfcount key [key...]` 計算 hyperloglog 的獨立總數
3. `pfmerge destkey sourcekey [sourcekey...]` 合併多個 hyperloglog

```shell
> pfadd 2021_10_12:uuids "uuid-1" "uuid-2" "uuid-3" "uuid-4"
(integer) 1
> pfcount 2021_10_12:uuids
(interger) 4
> pfadd 2021_10_12:uuids "uuid-1" "uuid-2" "uuid-3" "uuid-90"
(integer) 1
> pfcount 2021_10_12:uuids
(interger) 5
> pfadd 2021_10_13:uuids "uuid-9" "uuid-10"
(integer) 1
> pfmerge 2021_10_12_13:uuids 2021_10_12:uuids 2021_10_13:uuids
OK
> pfcount 2021_10_12_13:uuids
(interger) 7
```

# 內存消耗

## 百萬獨立用戶

執行以下 shell 寫入百萬 hyperloglog 數據

```shell
elements=""
key="2021_10_12:uuids"
for i in `seq 1 1000000`
do
  elements="${elements} uuid-"${i}
  if [[ $((i%1000)) == 0 ]]
  then
    redis-cli pfadd ${key} ${elements}
  fi
done
```

-|內存消耗
---|---
一天|15KB
一個月|450KB
一年|15KB * 365 約 5MB

可以看到消耗的內存量是相當小的，那是不是表示可以使用 hyperloglog 來取代 bitmap 或者是 set 等數據結構呢？這就要看你能否接受以下侷限

# 侷限

1. 是否能容忍錯誤？(錯誤率約：0.81%)
   * 比方說上方 shell 代碼執行完後，你可以使用 `pfcount` 查看個數，會發現顯示的數量基本上不會是 100W 筆數據
2. 是否需要單條數據？
   * 從以上 API 不難看出，該數據結構無法取出單筆數據
