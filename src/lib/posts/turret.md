---
title: "Turret"
date: "2023-12-28"
categories:
  - "cad"
  - "python"
  - "robotics"
cover: "/portfolio/assets/turret/turret.gltf"
excerpt: A person-tracking Nerf turret
---

This project used some steppers, an Atomic Pi, a custom-built Nerf Rival launcher, and OpenCV to track and aim at a person. I developed a web UI and used OpenCV's built in tracking algorithms (mostly MOSSE) to achieve high-rate, camera-based, closed-loop control on the relatively weak Atomic Pi. This way, target detection - a very expensive operation in most cases - only needed to be run once.