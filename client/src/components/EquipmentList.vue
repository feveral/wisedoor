<template>
  <div id="equipment-list">
    <div class="card" v-for="equipment in equipments">
      <div class="card-header">
        <button class="btn btn-outline-dark equipment-button" data-toggle="collapse" :data-target="'#equipment' + equipment.Id" aria-expanded="true" :aria-controls="'#equipment' + equipment.Id">
          {{equipment.Name}}
        </button>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#set-password-modal">
          設定密碼
        </button>
        <div id="set-password-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">設定密碼</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p class="prompt-text-size">請輸入要改的密碼</p>
                <div class="form-group">
                  <input type="text" class="form-control input-face-name-size" v-model="password" placeholder="輸入密碼">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="setPassword(equipment.Name)">確認修改</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :id="'equipment' + equipment.Id" class="collapse" aria-labelledby="headingOne" data-parent="#equipment-list">
        <div class="card-body">
          <button type="button" class="face-button btn btn-outline-primary col-12 mb-2"  v-for="face in equipment.Face">{{face.Name}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import equipmentListData from '../fixtures/equipmentList.json'
import EquipmentService from '@/services/EquipmentService'
import FaceService from '@/services/FaceService'

export default {
  name: 'EquipmentList',

  data () {
    return {
      equipments: [],
      password: ""
    }
  },

  mounted () {
    this.UpdateEquipmentList()
  },

  methods: {
    async UpdateEquipmentList () {
      let response =  await EquipmentService.GetEquipments()
      let jobs = response.data.map(async (e) => {
        e.Face = (await FaceService.GetFaces(e.Id) ).data
      })
      Promise.all(jobs).then((results) => {
        this.equipments = response.data
      });
    },

    async setPassword (equipmentName) {
      console.log(equipmentName)
      if(this.password.length < 4 ){
        alert("密碼太短 至少要4位元")
      }
      else if(isNaN(this.password)){
        alert("密碼只能是數字喔")
      }
      else{
        let response =  await EquipmentService.SetPassword(equipmentName,this.password)
        $('#set-password-modal').modal('hide')
      }
    },
  }
}
</script>

<style>

.equipment-button {
  font-size: 20px;
}

.face-button {
  font-size: 22px;
  font-weight: bold;
}

</style>
