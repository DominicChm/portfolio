---
title: "Nerf Turret"
date: "2023-12-28"
categories:
  - "cad"
  - "python"
  - "robotics"
  - "computer vision"
  - "web"
  - "svelte"
cover: "/portfolio/assets/turret/turret.gltf"
excerpt: Autonomous Nerf turret
---

This project used some steppers, an Atomic Pi, a custom-built Nerf Rival launcher, and OpenCV to track and aim at a target. I developed a web UI and used OpenCV's built in MOSSE tracking algorithm to achieve high-rate, camera-based, closed-loop control on the relatively weak, intel atom-powered Atomic Pi. This way, target detection - a very expensive operation in most cases - only needed to be run once.

The launcher mechanism is completely custom-designed and uses two BLDC motors to launch Nerf Rival balls at almost 130mph. The whole thing is designed to be 3d printed on an ender 3 using minimal support material, driven by a 3d printer board (RAMPS), and controlled without any external compute.

<model-viewer
  src="/portfolio/assets/turret/exploded/turret.gltf"
  environment-image="/portfolio/assets/environment.hdr"
  shadow-intensity="1"
  camera-controls
  touch-action="pan-y"
  orientation="0deg -90deg 0deg"
  class="w-full pb-[100%]"
/>

## Final Build
![Nerf turret](/portfolio/assets/turret/turret.png)