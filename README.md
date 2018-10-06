# WiseDoor

## WARN

## Production
- 要改`server/controllers/ImageController.js`的 post url , 改成主機網址
- ‵server/config/config.js` 的 mysql 密碼要變更
- `server/facenetService/app.py` 的 localhost 要改成主機網址

## TODO
- face可刪除(server)(client)，要注意
- 登入紀錄(client)(server)(device)
- 設定密碼(client)(server)(device) , 用漢堡的icon放在左邊，按下會有選單
- 手機版的可更換相機鏡頭(client)
- 新增設備(client)
- 前端記憶體問題(client)
- RFID

----- 0826更新
- history api串接 加上圖片以及成功或失敗(client)(server)(device)
- python server加入task manager(server)

#### bug

- 需要偵測是手機或電腦連到web，給予不一樣的camera size
- 若沒訓練好，face就出現，此時操作會有bug