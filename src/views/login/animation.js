import * as THREE from 'three'

export const init = function(dom) {
  // webpack 编译后的绝对路径才有效
  var img1 =  require('../../assets/login/椭圆1.png')
  var img2 =  require('../../assets/login/椭圆2.png')
  var img3 =  require('../../assets/login/椭圆3.png')
  var img4 =  require('../../assets/login/椭圆4.png')
  var img5 =  require('../../assets/login/椭圆5.png')

  // var container = document.getElementById('animationContainer')
  var container = dom
  var containerWidth = container.offsetWidth
  var containerHeight = container.offsetHeight
  var particle
  var camera
  var scene
  var renderer
  var mouseX = 0
  var mouseY = 0
  var windowHalfX = window.innerWidth / 2 // window.innerWidth 浏览器窗口宽
  var windowHalfY = window.innerHeight / 2
  var particles = []
  var particleImages = [new Image(), new Image(), new Image(), new Image(), new Image()]
  particleImages[0].src = img1
  particleImages[1].src = img2
  particleImages[2].src = img3
  particleImages[3].src = img4
  particleImages[4].src = img5
  var snowNum = 100

  camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 1, 10000)
  camera.position.z = 1000
  scene = new THREE.Scene()
  scene.add(camera)
  renderer = new THREE.CanvasRenderer()
  renderer.setSize(containerWidth, containerHeight)
  for (var i = 0; i < snowNum; i++) {
    var material = new THREE.ParticleBasicMaterial({ map: new THREE.Texture(particleImages[i % 5]) })
    particle = new THREE.Particle(material)
    particle.position.x = Math.random() * 2000 - 1000
    particle.position.y = Math.random() * 2000 - 1000
    particle.position.z = Math.random() * 2000 - 1000
    particle.scale.x = particle.scale.y = 1
    scene.add(particle)
    particles.push(particle)
  }
  container.appendChild(renderer.domElement)
  document.addEventListener('mousemove', onDocumentMouseMove, false)
  document.addEventListener('touchstart', onDocumentTouchStart, false)
  document.addEventListener('touchmove', onDocumentTouchMove, false)
  setInterval(loop, 20)

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX
    mouseY = event.clientY - windowHalfY
  }
  function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
      event.preventDefault()
      mouseX = event.touches[0].pageX - windowHalfX
      mouseY = event.touches[0].pageY - windowHalfY
    }
  }
  function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
      event.preventDefault()
      mouseX = event.touches[0].pageX - windowHalfX
      mouseY = event.touches[0].pageY - windowHalfY
    }
  }
  function loop() {
    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i]
      particle.updateMatrix()
      const position = particle.position
      if (position.y < -1000) {
        position.y += 2000
      }
      if (position.x > 1000) {
        position.x -= 2000
      } else {
        if (position.x < -1000) {
          position.x += 2000
        }
      }
      if (position.z > 1000) {
        position.z -= 2000
      } else {
        if (position.z < -1000) {
          position.z += 2000
        }
      }
    }
    camera.position.x += (mouseX - camera.position.x) * 0.005
    camera.position.y += (-mouseY - camera.position.y) * 0.005
    camera.lookAt(scene.position)
    renderer.render(scene, camera)
  }
}
