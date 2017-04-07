//page.vue
<template>
    <li v-bind:class='{active: isActive}'></li>
</template>
<script>
    module.exports = {
        props:['index','isActive'],
        data: function(){
            return {
            }
        },
        created: function(){
        	if(this.index==0){
        		this.isActive = true;
        	}
        },
        events: {
        	idxChange: function(idx){
        		if(this.index == idx){
        			this.isActive = true;
        		}else{
        			this.isActive = false;
        		}
        	}
        }
    }
</script>
