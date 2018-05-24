# WiseDoor

### WARN
- 目前存image的路徑為 `server/facenetTrain/image/`
- 將來若要將資料夾`server/facenetTrain`重構，必須更改 `server/database/InitialDatabase.js`

### Production
- 要改`server/controllers/ImageController.js`的 post url , 改成主機IP
- ‵server/config/config.js` 的 mysql 密碼要變更

### TODO
- 模糊檢測改為前端運行
- device Main.py的下載model部份的code 分離到 Model.py，並讓其可參數化(不是寫死email,password等等)
- server/controllers 的每個function都要測試，範例已經寫在server/test/controllers/EquipmentController.js
