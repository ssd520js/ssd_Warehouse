<template>
    <div class="article_box">
        <mavonEditor 
        v-model="value"
        :boxShadow="false"
        :toolbarsFlag="false" defaultOpen="preview" :editable="false" :subfield="false"
        />
    </div>
</template>
<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    name:"ArticleBase",
    components: {
        mavonEditor
    },
    data(){
        return {
            value:""
        }
    },
    methods:{
        async getmd(val){
        let {data} = await this.$axios.get("/node"+val)
           this.value =data
        }
    },
    created(){
        this.getmd(this.$route.query.info)
    }
}
</script>


<style lang="less" scoped>

</style>

