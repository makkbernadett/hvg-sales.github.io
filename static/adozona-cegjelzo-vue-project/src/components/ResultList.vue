<template>
  <div id='resultlist' class='resultList'>
    <h3>Találatok<span>Összesen {{searchresultprop.length}} találat</span></h3>

    <div class="resultListItem" v-for="(result, index) in searchresultprop" @click="showresult(result.full_tax_number, 'result-list', result.name)" :key="index">
      <h2 class="resultTitle"><span>{{result.name}}</span><span><button>Részletek <i class="material-icons">add_circle_outline</i></button></span></h2>
      <p><strong>Székhely:</strong> {{result.address}} </p>
      <p><strong>Adószám:</strong> {{result.full_tax_number}}  </p>
      <p><strong>Cégtípus:</strong> {{getType('type', result.collection)}}  </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['searchresultprop', 'showresult']
}
</script>
