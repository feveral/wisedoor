<template>
  <div id="equipment-list">
    <div class="card" v-for="equipment in equipments">
      <div class="card-header">
        <button class="btn btn-success" data-toggle="collapse" :data-target="'#equipment' + equipment.id" aria-expanded="true" :aria-controls="'#equipment' + equipment.id">
          {{equipment.name}}
         </button>
      </div>
      <div :id="'equipment' + equipment.id" class="collapse" aria-labelledby="headingOne" data-parent="#equipment-list">
        <div class="card-body">
          <button type="button" class="btn btn-outline-info col-12 mb-2"  v-for="face in equipment.face">{{face}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import equipmentListData from '../fixtures/equipmentList.json'
export default {
  name: 'EquipmentList',
  data () {
    return {
      equipments: equipmentListData.equipment
    }
  },

  created () {
    
  },

  methods: {

  }
}
</script>

<style>

</style>
