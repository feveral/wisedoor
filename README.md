# WiseDoor

## WARN

## Production
- 要改`server/controllers/ImageController.js`的 post url , 改成主機網址
- ‵server/config/config.js` 的 mysql 密碼要變更
- `server/facenetService/app.py` 的 localhost 要改成主機網址

## TODO
- face可刪除(server)(client)
- model檔的下載，若face是空會有bug(server)(device)
- 登入紀錄(client)(server)(device)
- 設定密碼(client)(server)(device)
- 前端記憶體問題(client)
- RFID
- server/controllers 的每個function都要測試，範例已經寫在server/test/controllers/EquipmentController.js
