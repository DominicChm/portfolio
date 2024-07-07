---
title: "Scipy Studentized Range"
date: "2021-04-28"
github: https://github.com/scipy/scipy/pull/13732
categories:
  - "python"
  - "cython"
cover: "/portfolio/assets/scipy-studentized-range/hero.png"
excerpt: Addition of optimized distribution to Scipy 
---
## Background
Scipy is a scientific computing library for Python which provides a large number of statistical functions. Tukey's Honestly Significant Difference (HSD) test is a test used to evaluate the true significance of extreme difference of means (read more [here](https://en.wikipedia.org/wiki/Tukey%27s_range_test)).

## Development
As part of implementing Tukey's HSD test into Scipy's `stats` package, I was tasked with writing code to evaluate the Studentized Range distribution which is a very complex multidimensional double integral 

<img src="/portfolio/assets/scipy-studentized-range/studentized_range.png" style="filter: invert(1); mix-blend-mode: difference; margin:auto"/>

Naively dropping the above directly into python resulted in extremely slow evaluation (>10s) which would have been unusable considering the existing solution used in `statsmodels` and `R` (provided by the fortran routine `qsturng`) regularly managed millisecond-level evaluation times. This put me on a multi-step journey to optimize the code, eventually getting evaluation times down to 5ms (a 2500x improvement!).

<img src="/portfolio/assets/scipy-studentized-range/timings.png" style="margin:auto"/>

As it stands today, it is significantly more accurate than the `qsturng` approximation present in `statsmodels` and `R` while being only slightly slower.

<img src="/portfolio/assets/scipy-studentized-range/accuracy.png" style="margin:auto"/>

You can read more about the development and validation process in the [paper we published at Scipy 2021](https://zenodo.org/records/5151976)
