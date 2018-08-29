<template>
  <div id="login-record">
    <div class="row justify-content-between">
      <h4 class="col-8 sub-title">開門紀錄</h4>
      <div class="dropdown show col-4 align-right">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{choosed_equipment}}
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" href="#" v-on:click="UpdateLoginRecord(equipment)" v-for="equipment in equipments">{{equipment.Name}}</a>
        </div>
      </div>
    </div>
    <table class="table table-hover">
    <thead>
        <tr>
        <th scope="col">時間</th>
        <th scope="col">人名</th>
        <th scope="col">成功與否</th>
        <th scope="col">如何開門</th>
        <th scope="col">開門照片</th>
        </tr>
    </thead>
    <tbody v-for="(record,index) in records">
        <tr>
        <td>{{ record.OpenTime }}</td>
        <td>{{ record.FaceId }}</td>
        <td>{{ record.DoorState }}</td>
        <td>{{ record.OpenDoorType }}</td>
        <img class="history-img" v-bind:src="'data:image/jpeg;base64,'+ record.FaceImage">
        </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
import RecordService from '@/services/RecordService'
import EquipmentService from '@/services/EquipmentService'
import FaceService from '@/services/FaceService'

export default {
  name: 'LoginRecord',

  data () {
    return{
      equipments: [],
      choosed_equipment: "",
      records:[],
    }
  },

  mounted(){
    this.GetEquipment()
  },

  methods: {
    async GetEquipment(){
      let response =  await EquipmentService.GetEquipments()
      this.equipments = response.data
      this.choosed_equipment = this.equipments[0].Name
      this.UpdateLoginRecord(this.equipments[0])
    },

    async UpdateLoginRecord(equipment){
      const recordList = await RecordService.getRecord(equipment.Id)
      this.choosed_equipment = equipment.Name
      this.records = recordList.data

      this.records.forEach(element => {
        if (element.OpenDoorType == 'face')
          element.OpenDoorType = '臉部辨識'
        if (element.DoorState == 'success')
          element.DoorState = '成功'
      });

      console.log(this.records)
    },

  }
}



</script>

<style>

.sub-title {
  margin-bottom: 10px;
  margin-top: 3px;
}

.align-right {
  text-align: right
}

@media only screen and (max-width: 768px) {
  .history-img {
    max-width: 150%;
  }
}

@media only screen and (min-width: 768px) {
  .history-img {
    max-width:45%;
  }
}

</style>
