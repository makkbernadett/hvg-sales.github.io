<template>
  <div class="cegjelzo-container_form">
    <div class="autocomplete">
      <input type="text"
      :placeholder="placeHolderText"
      class="form-textinput"/>
    </div>
    <button ><i class="material-icons">search</i></button>

  </div>
</template>
<script>
export default {
  props: {
    placeHolderText: String
  }
}
</script>
