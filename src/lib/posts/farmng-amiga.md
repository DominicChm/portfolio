---
title: "Autonomous Robot Guidance"
date: "2024-7-1"
categories:
  - "ros2"
  - "python"
  - "robotics"
  - "highlight"
  - "computer vision"
  - "csc"
cover: "/portfolio/assets/farmng-amiga/hero.jpg"
excerpt: Autonomous robot platform guidance for strawberry fields
---

This project is part of my ongoing work at the CSC. The idea was to develop a guidance system for the Farm-ng Amiga to allow it to autonomously navigate within strawberry fields. To accomplish this, I used a combination of ROS2, RTK GPS, and computer vision w/ an Intel Realsense. This is the project that originally motivated the development of [aioros2](/portfolio/projects/aioros2). 

### Guidance
Strawberry field furrows are very well visually defined, with usually about a foot of vertical wall on either side. My furrow recognition method was inspired by [this paper](https://www.mdpi.com/1424-8220/20/18/5249) with some changes made to improve performance and use a realsense depth camera rather than a heavy CNN. My optimizations allowed processing to be performed on a RPI4 in under 3ms while still being written in python. 

![Strawberry field](/portfolio/assets/farmng-amiga/field.png)

<div class="flex min-h-300px min-w-0 overflow-hidden min-h-0">

<img src="/portfolio/assets/farmng-amiga/cv-demo-setup.png" class="min-w-0 min-h-0 w-full h-auto">

<img src="/portfolio/assets/farmng-amiga/cv-demo.png" class="min-w-0 min-h-0 w-full h-auto">

</div>

### Integration

To make testing easier and less hazardous (the Farm-ng Amiga is ~300lbs) I developed a test platform using an old roomba. It's controlled using the same GRPC APIs used by Farm-ng, meaning that software tested on it can be directly used on the larger robot. This significantly sped development of the furrow guidance concept.

![Roomba mock](/portfolio/assets/farmng-amiga/roomba.png)

### Demo
The Amiga is in autoguidance here. No manual steering input is being given.
<video controls src="/portfolio/assets/farmng-amiga/amiga.webm"></video>