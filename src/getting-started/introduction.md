# ZZULI.dev 简介

<!--![GitHub Org's stars](https://img.shields.io/github/stars/zzuli-dev)-->

<p style="display: flex; gap: 12px;">
  <a href="https://github.com/zzuli-dev/learn" target="_blank"><img src="https://img.shields.io/github/stars/zzuli-dev" alt="Stars"></a>
  <a href="https://qm.qq.com/cgi-bin/qm/qr?k=1q3IN4-zn7JIQYdtBIIMF3N4otjgqB51&jump_from=webapi&authKey=nrhi6CY7BcXgEPiTqrs5+5NFX7um+Z9GKJbERupRl1XWfEPWiSm3abjXf/W4/3g9" target="_blank"><img src="https://img.shields.io/badge/QQ群-733107768-527dec?style=flat-square" alt="QQ群"></a>
  <img src="https://img.shields.io/github/license/zzuli-dev/learn?style=flat-square" alt="License">
</p>

{{ greeting }}，欢迎来到 `ZZULI.dev`（以下简称 ZDev）。

这是一个由校友共同建立的从 0 到 1 的 CS 学习文档 [^1]，

它涵盖了尽可能多的 CS 学习方向，以及需要掌握的各种核心技能等内容。

如果你是一名刚入门的大学生或者正在挑选一份全面的学习指南，那么我向你推荐本网站。

## 为什么选择 ZDev

<img src="/lum/logo.png" alt="lum logo" width="128px"/>

- **足够新**：与时俱进的新文档，拥有更多更前沿的内容。

- **足够开放**：不论是 ZDev 官网，还是本学习文档均在 [GitHub](https://github.com/zzuli-dev) 开源共享。

- **完全足够**：覆盖全面的内容，学习方向、编程语言、核心技能、求职准备，以及未来的更多。

所以我想你不应该错过 ZDev，和我们萌萌的 Lum [^2]。

## 感谢贡献

感谢以下共建者对本文档的贡献，排名不分先后。

[![Contributors](https://contrib.rocks/image?repo=zzuli-dev/learn)](https://github.com/zzuli-dev/learn/graphs/contributors)

## 留言板

> 来自贡献者的留言，暂时没有留言哦。

- [@Dogxi](https://dogxi.me/)：本文档招黑奴，997，没有工资，点击右上角更多加入我们（？

## 开源协议

文档采取更开放的开源协议，内容 CC BY-SA 4.0 开源和代码 MIT 开源。

[^1]: CS: Computer Science，计算机科学。（为什么这个要注解呢，因为加个标注比较酷 XD）。

[^2]: Lum: 露姆，吉祥物，笨蛋程序员，但学习很努力。

<script setup>
import { ref, onMounted } from 'vue'

const greeting = ref('你好')  // 服务端/首屏的默认值

onMounted(() => {
  const h = new Date().getHours()
  if (h < 6)        greeting.value = '凌晨好'
  else if (h < 11)  greeting.value = '早上好'
  else if (h < 14)  greeting.value = '中午好'
  else if (h < 18)  greeting.value = '下午好'
  else              greeting.value = '晚上好'
})
</script>
