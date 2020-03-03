<template>
  <div class="cegjelzo-container_form">
    <div class="autocomplete">
      <input type="text"
      :placeholder="placeHolderText"
      v-on:keyup.enter="onEnter(keywordSearch);keywordSearch='';"
      v-on:input="!autoCompleteProgress ? onKeyUp(keywordSearch) : ''"
      v-model="keywordSearch"
      class="form-textinput"
      :class="{ 'loading-circle' : (keywordSearch.length > 3), 'hide-loading-circle': resultItems.length > 0 || resultItems.length == 0 && !autoCompleteProgress  }"
      :disabled="loggedIn !== true"/>
      <ul class="autocomplete-results" v-if="resultItems.length > 0">
        <li class="autocomplete-result" v-for="(item,i) in resultItems" :key="i" @click="keywordSearch='';onSelected(item.full_tax_number, 'autocomplete-list', item.name)">
          {{ item.name }}
          <small>({{ item.full_tax_number }})</small>
        </li>
      </ul>
    </div>
    <button @click="onEnter(keywordSearch);keywordSearch='';"><i class="material-icons">search</i></button>

  </div>
</template>
<script>
export default {
  props: {
    placeHolderText: String,
    onKeyUp: Function,
    onEnter: Function,
    onSelected: Function,
    resultItems: Array,
    autoCompleteProgress: Boolean,
    itemId: String,
    loggedIn: Boolean
  },
  data () {
    return {
      keywordSearch: ''
    }
  },
  mounted: function () {
  }
}
</script>
