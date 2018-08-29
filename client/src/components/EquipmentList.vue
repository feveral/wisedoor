<template>
  <div id="equipment-list" ref="equipmentList">
    <div class="card" v-for="equipment in equipments">
      <div class="card-header">
        <button class="btn btn-outline-dark equipment-button" data-toggle="collapse" :data-target="'#equipment' + equipment.Id" aria-expanded="true" :aria-controls="'#equipment' + equipment.Id">
          {{equipment.Name + ' (' + equipment.Face.length + '人)'}}
        </button>
      </div>
      <div :id="'equipment' + equipment.Id" class="collapse" aria-labelledby="headingOne" data-parent="#equipment-list">
        <div class="card-body">
          <p id="no-face-prompt" v-if="equipment.Face.length == 0">尚未新增臉孔</p>
          <button type="button" class="face-button btn btn-outline-primary mb-2"  v-for="face in equipment.Face">{{face.Name}}
              <a href="#" data-toggle="modal" data-target="#confirm-delete-face-modal" v-on:click="setDeleteFace(face.Id,face.Name,equipment.Id)">
                <img src="@/assets/icon_delete.png" alt="" class="icon" >
              </a>
          </button>
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
      password: "",
      deleteEquipmentId:"",
      deleteFaceId:""
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

    async setDeleteFace(faceId,faceName,equipmentId){
      this.$emit("askIfcheckDelete",{faceId,faceName,equipmentId})
    },

    async deleteFace(faceId,equipmentId){
      console.log(equipmentId)
      let response =  await FaceService.UploadDeleteFace(faceId,equipmentId)
      this.UpdateEquipmentList()
    }
  }
}
</script>

<style>
@media only screen and (max-width: 768px) {
  .icon {
    max-width: 9%;
    width: 100%;
    float: right;
    vertical-align:middle;
  }  
}

@media only screen and (min-width: 768px) {
  .icon {
    max-width: 15%;
    width: 100%;
    float: right;
    vertical-align:middle;
  }  
}

.equipment-button {
  font-size: 20px;
}

.face-button {
  font-size: 22px;
  font-weight: bold;
  position:relative; 
}

.scroll {
  overflow: scroll;
}

#no-face-prompt {
  color: gray;
}
</style>
