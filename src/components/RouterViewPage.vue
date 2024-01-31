<template>
    <div id="base">
        <transition name="fade" mode="out-in">
                <router-view></router-view>
        </transition>
    </div>
</template>
<style scoped>
#base {
    height: 100%;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;

}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>