<template>
  <div id="login-record">
    <div class="row justify-content-between">
      <h4 class="col-8 sub-title">開門紀錄</h4>
      <div class="dropdown show col-4 align-right">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{choosed_equipment.Name}}
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
    <p id="no-record-prompt" v-if="records.length == 0">尚未有任何開門紀錄</p>
    
    <nav id="open-record-page" v-if="!records.length == 0" aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item"><a class="page-link" @click="choosePage(pageIndex-1)" href="#">上一頁</a></li>
        <li class="page-item"><a class="page-link" href="#">{{pageIndex}}</a></li>
        <li class="page-item"><a class="page-link" v-if="pageIndex+1 <= maximumPage" @click="choosePage(pageIndex+1)" href="#">{{pageIndex+1}}</a></li>
        <li class="page-item"><a class="page-link" v-if="pageIndex+2 <= maximumPage" @click="choosePage(pageIndex+2)" href="#">{{pageIndex+2}}</a></li>
        <li class="page-item"><a class="page-link" href="#">...</a></li>
        <li class="page-item"><a class="page-link" href="#">{{maximumPage}}</a></li>
        <li class="page-item"><a class="page-link" @click="choosePage(pageIndex+1)" href="#">下一頁</a></li>
      </ul>
    </nav>
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
      records:[],
      choosed_equipment: {},
      pageIndex: 1,
      maximumPage: 1
    }
  },

  async mounted(){
    this.GetEquipment()
  },

  methods: {
    async GetEquipment(){
      let response =  await EquipmentService.GetEquipments()
      this.equipments = response.data
      this.choosed_equipment = this.equipments[0]
      this.UpdateLoginRecord(this.equipments[0])
      this.maximumPage = (await RecordService.getPageAmount(this.choosed_equipment.Id)).data.amount
    },

    async UpdateLoginRecord(equipment){
      const recordList = await RecordService.getRecord(equipment.Id, this.pageIndex-1)
      this.choosed_equipment = equipment
      this.records = recordList.data

      this.records.forEach(element => {
        if (element.OpenDoorType == 'face')
          element.OpenDoorType = '臉部辨識'
        if (element.DoorState == 'success')
          element.DoorState = '成功'
      });
    },

    async choosePage (page) {
      if(page <= this.maximumPage && page > 0) {
        this.pageIndex = page
        this.records = (await RecordService.getRecord(this.choosed_equipment.Id, this.pageIndex-1)).data
      }
    }
  }
}



</script>

<style>

#no-record-prompt {
  color: gray;
  text-align: center;
}

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
