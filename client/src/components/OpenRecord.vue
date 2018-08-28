<template>
  <div id="login-record" >
    <div class="dropdown show">
      <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{choosed_equipment}}
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="dropdown-item" href="#" v-on:click="UpdateLoginRecord(equipment)" v-for="equipment in equipments">{{equipment.Name}}</a>
      </div>
    </div>
    <table class="table table-hover">
    <thead>
        <tr>
        <th scope="col">開門時間</th>
        <th scope="col">人名</th>
        <th scope="col">開啟成功與否</th>
        <th scope="col">如何開門</th>
        <th scope="col">開門照片</th>
        </tr>
    </thead>
    <tbody v-for="(record,index) in records">
        <tr >
        <td >{{ record.OpenTime }}</td>
        <td>{{ record.FaceName }}</td>
        <td>{{ record.DoorState }}</td>
        <td>{{ record.OpenDoorType }}</td>
        <img v-bind:src="'data:image/jpeg;base64,'+ record.FaceImage">
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
    },

  }
}



</script>

<style>
img{
  max-width:90%;
}
</style>
