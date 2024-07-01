---
title: "ASABE Robotics Robot"
date: "2023-06-01"
categories:
  - "paac"
  - "python"
  - "robotics"
  - "software"
  - "arduino"
coverImage: "/images/linus-nylund-Q5QspluNZmM-unsplash.jpg"
excerpt: Cotton-picking robot for the ASABE robotics competition
---

This project is a carrythrough from my earliest days on Baja to the present day. This library is designed to run on an ESP32 and make gathering lots of data at relatively high rates (~200hz) easy on the programmer (like all good Arduino libraries). It's still very much under active development.

For this project, I developed a fully custom file format to log timeseries data with **zero** overhead (outside of a header, of course). This results in very small file sizes, especially compared with CSV or JSON, which allows the ESP32 to handle data writing to SD even with its limited resources. It also allows huge datasets to be loaded into a browser webpage for viewing without going over the browser's ~2GB/page RAM limit. 