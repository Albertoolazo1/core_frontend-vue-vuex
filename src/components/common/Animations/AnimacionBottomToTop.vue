<template>
  <transition
    name="router-anim"
    enter-active-class="router-anim-enter-active"
    leave-active-class="router-anim-leave-active"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {};
</script>

<style>
.router-anim-enter-active {
  animation: coming 0.15s;
  animation-delay: 0.15s;
  opacity: 0;
}
.router-anim-leave-active {
  animation: going 0.15s;
}

@keyframes going {
  from {
    transform: translateY(0px);
    opacity: 1;
  }
  to {
    transform: translateY(20px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>