<template>
  <div class="big-screen-layout">
    <div class="big-screen-layout__canvas">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.big-screen-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background:
    linear-gradient(rgb(69 217 255 / 4%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(69 217 255 / 4%) 1px, transparent 1px);
  background-size: 34px 34px;
}

.big-screen-layout__canvas {
  width: min(100vw, calc(100vh * 16 / 9));
  min-width: 1180px;
  height: min(100vh, calc(100vw * 9 / 16));
  min-height: 664px;
  margin: 0 auto;
  overflow: hidden;
}

@media (max-width: 1180px) {
  .big-screen-layout__canvas {
    width: 1180px;
    height: 664px;
  }
}
</style>
