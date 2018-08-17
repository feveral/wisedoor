# WiseDoor

## WARN

## Production
- 要改`server/controllers/ImageController.js`的 post url , 改成主機網址
- ‵server/config/config.js` 的 mysql 密碼要變更
- `server/facenetService/app.py` 的 localhost 要改成主機網址

## TODO
- face可刪除(server)(client)，要注意
- model檔的下載，若face是空會有bug(server)(device)，在server端設狀態，若正在寫入model則不回傳檔案
- 登入紀錄(client)(server)(device)
- 設定密碼(client)(server)(device) , 用漢堡的icon放在左邊，按下會有選單
- 手機版的打開相機
- 前端UI設計(RWD)
- 新增設備(client)
- 前端記憶體問題(client)
- RFID
- server/controllers 的每個function都要測試，範例已經寫在server/test/controllers/EquipmentController.js

#### bug
- 新增臉孔 設定密碼 要清空 input