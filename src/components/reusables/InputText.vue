<script setup>
import InputText from "primevue/inputtext";

defineProps(["modelValue", "label", "leftIcon", "rightIcon"]);

defineEmits(["update:modelValue"]);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div class="form-group" :class="$attrs.class">
    <label :for="$attrs.name" v-if="label">{{ label }}</label>
    <div
      class="d-block"
      :class="{
        'p-input-icon-left': leftIcon,
        'p-input-icon-right': rightIcon,
      }"
    >
      <i :class="leftIcon" v-if="leftIcon"></i>
      <InputText
        :type="$attrs.type"
        :id="$attrs.name"
        :name="$attrs.name"
        :placeholder="$attrs.placeholder"
        :aria-placeholder="label"
        :value="modelValue"
        :readonly="$attrs.readonly"
        :disabled="$attrs.disabled"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <i :class="rightIcon" v-if="rightIcon"></i>
    </div>
  </div>
</template>

<style scoped>
label {
  display: block;
  margin: 0 0 0.5rem 0;
}

.form-group {
  margin: 0 0 1rem 0;
}

input {
  width: 100%;
}
</style>
