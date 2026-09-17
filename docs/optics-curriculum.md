# Optics curriculum

Current grouping: see [Segment consolidation](roadmap-consolidation.md) and the [roadmap index](roadmap-index.md). Original drafting counts and audit descriptions below record the earlier file boundaries.

Proposed on 16 September 2026. Ten segments are visible for author review, with `draft: false`. Each contains topic and subtopic lists. The first draft was committed as `a35fc1d` before the [optics audit](optics-audit.md). Audit refinements were approved for commit on 16 September 2026.

## Proposed sequence

- Geometrical optics and optical systems
    - Optical paths, reflection, refraction, mirrors, lenses and ray limits.
    - Compound systems, apertures, instruments, light collection and image defects.
- Wave optics and image formation
    - Interferometers, temporal and spatial coherence, and partially coherent light.
    - Aperture propagation, near-field and far-field patterns, resolution and scalar-model limits.
    - Spatial filtering, coherent and incoherent imaging, phase imaging and holography.
- Polarisation and crystal optics
    - Polarimetric methods, anisotropic propagation, retarders and controlled optical response.
- Optical beams resonators and lasers
    - Gaussian and structured beams, mode matching and optical cavities.
    - Gain, pumping, threshold, modes, dynamics and pulse generation.
- Optical detection and spectroscopy
    - Radiometry, detectors, noise, signal recovery and spectral measurements.
- Nonlinear and ultrafast optics
    - Frequency conversion, intensity-dependent response, short-pulse propagation and measurement.

The first seven segments develop classical optical descriptions and instruments. The last three introduce gain, detection and nonlinear response, including models that require quantum, statistical or material foundations. They provide a route towards photonics and optical measurement, without claiming to complete quantum optics or microscopic matter theory.

Segments now use Foundations or Advanced relative to this strand; see [Segment stages](roadmap-stages.md). It does not mean every item is introductory. Fourier imaging, partial coherence and nonlinear pulse propagation include advanced material.

## Dependencies and existing coverage

Geometrical optics begins after Wave motion and propagation. Its opening topics introduce refractive index and the ray approximation without requiring the whole electromagnetism strand first.

Each later optical segment depends on the preceding one as a cumulative reading step. This keeps the agreed continuous study trail. It does not claim that, for example, holography is a necessary physical prerequisite for crystal optics.

- Optical interference and coherence adds Electromagnetic waves and material response. This supplies optical field amplitudes, polarisation, interface response and dispersion.
- Polarisation and crystal optics adds Elastic and surface waves for photoelastic coupling and acousto-optic modulation.
- Optical beams and resonators adds Electromagnetic waveguides and resonators. The optical segment develops beam geometry, open mirror cavities and mode matching on that foundation.
- Later segments inherit those prerequisites. No redundant links or references to nonexistent segments were added.

The general wave strand already introduces scalar diffraction and Gaussian beams. Optics develops their optical implementations, imaging consequences and validity limits. The electromagnetism strand already introduces Jones and Stokes descriptions, Fresnel coefficients, birefringence and guided modes. Optics develops instruments, crystal geometry, polarimetry and beam control. These are intentional connections rather than separate claims to introduce the same physical laws.

## Missing foundations and scope decisions

- Ray-transfer methods require matrices and elementary linear algebra. Geometrical optics also assumes trigonometry and coordinate geometry.
- Diffraction and Fourier imaging require multidimensional integration, complex amplitudes, Fourier transforms and linear-systems concepts.
- Coherence and detection noise require probability, random processes and correlation functions. The existing calculus segments do not supply these prerequisites.
- Crystal optics requires tensors and eigenvalue problems. Nonlinear propagation requires partial differential equations, Fourier methods and approximation methods.
- Laser transitions, detector mechanisms and spectroscopy require quantum and atomic foundations. The draft introduces their optical models; it cannot replace those missing strands.
- Optical Bloch equations, photon noise and microscopic response need quantum dynamics. Semiconductor laser and detector descriptions also need solid-state physics.
- Nonlinear and ultrafast optics includes the envelope approximation and its limits. Few-cycle fields and strong-field physics are later continuations.
- Full quantum optics, quantum information, nanophotonics, fibre communications and detailed optical engineering remain specialised continuations. General fibre confinement is represented in electromagnetism. Optical beams and resonators adds fibre-specific coupling, mode and dispersion topics without creating another segment.

These gaps remain explicit until the corresponding segments are authored and linked. They do not justify silently treating the draft as a self-contained beginner course.

## Initial course comparison

[MIT 2.71 Optics, spring 2014](https://ocw.mit.edu/courses/2-71-optics-spring-2014/pages/calendar/) provides an initial comparison for ray systems, interference, diffraction, Fourier imaging, beams and polarisation. Its [syllabus](https://ocw.mit.edu/courses/2-71-optics-spring-2014/pages/syllabus/) also identifies radiometry, aberrations and optical-system analysis. These support the main areas covered, not our exact ten boundaries.

[MIT 6.161 Modern Optics Project Laboratory, fall 2005](https://ocw.mit.edu/courses/6-161-modern-optics-project-laboratory-fall-2005/pages/syllabus/) connects the foundations to optical processing, modulation, lasers and detectors. [MIT 6.977 Ultrafast Optics, spring 2005](https://ocw.mit.edu/courses/6-977-ultrafast-optics-spring-2005/) provides a graduate scope reference for short pulses, nonlinear propagation and pulse characterisation. Our last segment is an introduction to that direction, not the whole graduate course.

The subsequent [source audit](optics-audit.md) compares local books and university curricula, records the refinements, and retains the ten segments. Missing prerequisites and advanced endpoints remain explicit author-review items.
