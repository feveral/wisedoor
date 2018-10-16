# 基於人臉辨識的門禁系統

## How to install

### Server
```shell
# 先修改 server/config/config.js  的 db_name,db_config 成自己想要的
cd server
npm install
npm run init
sudo apt-get install mysql-server
sudo apt-get install python3-pip
sudo apt-get install python-dev
sudo apt-get install libopencv-dev
sudo pip3 install tensorflow
sudo pip3 install opencv-python
sudo pip3 install sklearn
sudo pip3 install flask
sudo pip3 install scipy
sudo pip3 install Pillow
```

### Client
```shell=
# 先修改 client/src/services/Api.js 的 baseURL 成自己想要的domain
cd client
npm run install
npm run build
```

### Device
```shell=
# 先修改 device/config.py  的 SERVER_URL 成自己想要的domain
sudo apt-get install python3-pip
sudo apt-get install python-dev
sudo apt-get install libopencv-dev
sudo pip3 install tensorflow
sudo pip3 install opencv-python
sudo pip3 install sklearn
sudo pip3 install flask
sudo pip3 install scipy
sudo pip3 install Pillow
```

## Use

### Server run 在主機上 , Device run 在門鎖樹莓派上

### Server
```shell=
# 以下兩個指令分別在兩個terminal執行
npm run dev 
npm run facenet 
```

### Device
```shell=
python3 Main.py
```

