<template>
    <button
      :class="`button ${color}`"
    >
      {{ title }}
    </button>
</template>

<script setup>
const props = defineProps({
    title: String,
    color: {
        type: String,
        default: 'blue'
    },
})
</script>

<style scoped>

.button {
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 15px;
    padding: 12px 18px 14px 18px;
    color: rgb(255, 255, 255);
    cursor: pointer;
}

.blue {
    background: #216CFF;
}

.red {
    background: #FF218B;
}

</style>