---
title: "Nursery Robot"
date: "2021-6-13"
categories:
  - "c++"
  - "arduino"
  - "web"
  - "computer vision"
  - "highlight"
cover: "/portfolio/assets/theodore/theo.gltf"
excerpt: Autonomous nursery tree monitoring
---

The main requirement of this project was to show that it was possible to automate measuring saplings in the tree nursery business. 
At the time, the involved company was sending laborers into the fields to manually measure sapling diameters before as part of their operation.
I developed this robot (named theodore) which demonstrated the ability to measure sapling-sized cylinders, autonomously navigate using RTK GPS, and recharge using solar power.


<div class="flex overflow-hidden w-full">
<img class="min-w-0 object-scale-down min-h-0 flex-1" alt="Test saplings" src="/portfolio/assets/theodore/sapling-front.jpg" />
<img class="min-w-0 object-scale-down min-h-0 flex-1" alt="Test Saplings rear" src="/portfolio/assets/theodore/sapling-rear.jpg" />
</div>

Saplings are measured using a 650nm line laser with a DIY wavelength-filtered camera positioned at an angle. 
The triangle formed by these components allows both a distance and apparent width to be calculated, resulting in a precise measurement.
In particular, this system outperforms any reasonably priced depth camera for this application and doesn't require any machine learning.

I also presented this concept at a Cal Poly CAFES poster session.

<img  alt="PCB back" src="/portfolio/assets/theodore/poster.png" />

## Demo
<video class="m-auto w-[50%]" src="/portfolio/assets/theodore/video.mp4" controls></video>
