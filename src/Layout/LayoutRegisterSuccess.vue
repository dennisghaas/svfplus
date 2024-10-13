<template>
  <main class="pageMain">
    <div class="container">
      <slot name="pageMainContent"></slot>
    </div>
  </main>
</template>

<style scoped lang="scss">
.pageMain {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
