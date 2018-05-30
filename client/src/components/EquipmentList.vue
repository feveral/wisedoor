<template>
  <div id="equipment-list">
    <div class="card" v-for="equipment in equipments">
      <div class="card-header">
        <button class="btn btn-outline-dark equipment-button" data-toggle="collapse" :data-target="'#equipment' + equipment.Id" aria-expanded="true" :aria-controls="'#equipment' + equipment.Id">
          {{equipment.Name}}
         </button>
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
      equipments: []
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
    }
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
