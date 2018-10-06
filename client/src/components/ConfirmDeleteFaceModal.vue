<template>
    <div id="confirm-delete-face-modal" class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">確定刪除{{deleteFaceName}}?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            <div class="modal-body">
                <h6 class="modal-title">確定刪除的話，無法再復原喔</h6>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>   
                <button type="button" class="btn btn-primary" @click="deleteFace()">確定刪除</button>   
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import FaceService from '@/services/FaceService'

export default {
    name: 'ConfirmDeleteFaceModal',

    data () {
        return {
            deleteFaceId:"",
            deleteFaceName:"",
            equipmentId:"",
        }
    },

    mounted(){

    },

    methods: {
        async setDeleteFaceInformation(faceName,faceId,equipmentId){
            this.deleteFaceId = faceId
            this.deleteFaceName = faceName
            this.equipmentId = equipmentId
        },

        async deleteFace(){
            let faceId = this.deleteFaceId
            let equipmentId = this.equipmentId
            $('#confirm-delete-face-modal').modal('hide')
            this.$emit("deleteface",{faceId,equipmentId})
        },
    }
}
</script>

<style>
</style>