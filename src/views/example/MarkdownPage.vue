<template>
  <article class="prose dark:prose-invert m-auto">
    <EnProcess v-if="locale === 'en'"></EnProcess>
    <ZhProcess v-else></ZhProcess>
  </article>
</template>

<script setup lang="ts">
const { locale } = useI18n();
</script>
