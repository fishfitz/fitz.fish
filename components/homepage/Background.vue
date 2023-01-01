<template>
  <div class="homepage-background fixed grid h-screen place-items-center -z-10">
    <div
      ref="container"
      class="oscillate w-full h-full"
    />
  </div>
</template>

<script setup>
import { useWindowSize, useMouse, useDeviceOrientation } from '@vueuse/core'
import { Application, Assets, Sprite } from 'pixi.js'

const emit = defineEmits(['loaded'])

const { width: windowWidth, height: windowHeight } = useWindowSize()

const container = $ref()

onMounted(async () => {
  const { height, width, images } = windowWidth.value > 970
    ? await import('../../assets/data/homepage-images-hd.json')
    : await import('../../assets/data/homepage-images-sd.json')

  // Init app
  const app = new Application({
    height,
    width,
    antialias: true,
    roundPixels: true
  })
  app.stage.sortableChildren = true

  // Draw sprites
  await Promise.all(images.map(async (image, index) => {
    const sprite = new Sprite(await Assets.load(image.src))
    sprite.x = image.x
    sprite.y = image.y
    sprite.zIndex = index
    app.stage.addChild(sprite)
    image.sprite = sprite
  }))

  // Fitz fade in animation
  const fitz = images.find(({ src }) => src.indexOf('007_fitz') !== -1)
  fitz.sprite.alpha = 0

  setTimeout(() => {
    app.ticker.add(function () {
      if (fitz.sprite.alpha < 1) {
        fitz.sprite.alpha += 0.015
        fitz.depth -= 0.015
      } else app.ticker.remove(this)
    })
  }, 2000)

  container.appendChild(app.view)

  // Handle parallax
  const useGyroscope = !!window.DeviceOrientationEvent &&
    navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i)

  const friction = 75 / 1000
  const { x: mouseX, y: mouseY } = useMouse()
  const { beta, gamma } = useDeviceOrientation()

  const velocity = { x: 0, y: 0 }
  app.ticker.add(() => {
    let motionX, motionY
    if (useGyroscope) {
      const scale = 2 / 30
      motionX = -1 * (gamma.value || 0) * scale * 10
      motionY = -1 * ((beta.value - 90) || 0) * scale
    } else {
      const scale = 15 / 1000
      motionX = -1 * (mouseX.value - windowWidth.value / 2) * (width / windowWidth.value) * scale
      motionY = -1 * (mouseY.value - windowHeight.value / 2) * (height / windowHeight.value) * scale
    }

    velocity.x += (motionX - velocity.x) * friction
    velocity.y += (motionY - velocity.y) * friction

    images.forEach(image => {
      image.sprite.x = image.x + velocity.x * image.depth
      image.sprite.y = image.y + velocity.y * image.depth
    })
  })

  app.ticker.addOnce(() => emit('loaded'))
})
</script>

<style lang="scss" scoped>
  .homepage-background {
    left: -50px;
    top: -50px;

    &:deep(canvas) {
      width: calc(100vw + 100px);
      height: calc(100vh + 100px);
      object-fit: cover;
    }
  }
</style>
