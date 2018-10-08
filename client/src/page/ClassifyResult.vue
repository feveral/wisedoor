<template>
  <div id="classify-result" class="container">
    <div class="row justify-content-between">
      <h3 id="classify-result-title" class="col-6">線上辨識結果</h3>
      <div id="classify-result-dropdown" class="dropdown show col-4">
        <a class="btn btn-secondary dropdown-toggle"href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{choosedEquipment}}
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" href="#"  @click="changeChoosedEquipment(equipment.Name)"  v-for="equipment in equipmentList">{{equipment.Name}}</a>
        </div>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">時間</th>
          <th scope="col">人名</th>
          <th scope="col">準確率</th>
          <th scope="col">照片</th>
          <th scope="col">辨識Id</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in resultList">
          <th scope="row">{{result.Time}}</th>
          <td>{{result.FaceName}}</td>
          <td>{{Math.round(result.FaceRate*1000)/10}}</td>
          <td><img v-bind:src="'data:image/jpeg;base64,'+ result.FaceImage"></td>
          <td>{{result.Id}}</td>
        </tr>
      </tbody>
    </table>

    <nav id="classify-result-page" aria-label="Page navigation">
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

import ClassifyResultService from '@/services/ClassifyResultService'
import EquipmentService from '@/services/EquipmentService'


export default {
  name: 'ClassifyResult' ,
  
  data () {
    return {
      resultList:[],
      equipmentList:[],
      pageIndex: 1,
      maximumPage: 1,
      choosedEquipment: '',
    }
  },

  async mounted () {
    this.equipmentList = (await EquipmentService.GetEquipments()).data
    this.choosedEquipment = this.equipmentList[0].Name
    this.resultList = (await ClassifyResultService.getClassifyResults(this.choosedEquipment,this.pageIndex-1)).data
    this.maximumPage = (await ClassifyResultService.getPageAmount(this.choosedEquipment)).data.amount
  },

  methods: {
    async changeChoosedEquipment (equipmentName) {
      this.choosedEquipment = equipmentName
      this.resultList = (await ClassifyResultService.getClassifyResults(equipmentName,this.pageIndex-1)).data
    },

    async choosePage (page) {
      if(page <= this.maximumPage && page > 0) {
        this.pageIndex = page
        this.resultList = (await ClassifyResultService.getClassifyResults(this.choosedEquipment,this.pageIndex-1)).data
      }
    }
  }
}
</script>

<style>

#classify-result-title {
  margin: 20px;
}

#classify-result-dropdown {
  margin-top: 20px;
  margin-bottom: 10px;
}

</style>
