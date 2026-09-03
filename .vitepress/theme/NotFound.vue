<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <section class="zz-not-found" aria-labelledby="not-found-title">
    <div class="zz-not-found-copy">
      <p class="zz-not-found-code">404</p>
      <h1 id="not-found-title">这里暂时没有路线</h1>
      <p>你访问的页面可能已移动，或者还在整理中。</p>
      <a :href="withBase('/')">返回首页</a>
    </div>

    <figure class="zz-not-found-lum">
      <img
        :src="withBase('/lum/lum-404-seated.png')"
        alt="Lum 抱着膝盖坐在地上，小猫在身旁熟睡，正困惑地寻找路线"
        width="720"
        height="667"
      >
    </figure>
  </section>
</template>
