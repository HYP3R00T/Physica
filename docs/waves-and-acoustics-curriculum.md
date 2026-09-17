# Waves and acoustics curriculum

Proposed on 15 September 2026 for author review. The nine-segment baseline was committed as `61f67e0` before the source audit. See [Waves and acoustics audit](waves-and-acoustics-audit.md) for the comparisons, subsequent corrections and remaining gaps. All nine segments remain visible for inspection.

## Scope and sequence

The first segment establishes the language and equations of propagation. It is the beginning of a strand, not a complete waves curriculum. The continuation develops boundaries, spectra, sound fields, spatial propagation, sources, elastic media, confinement and nonlinear effects.

- Wave motion and propagation
    - Travelling disturbances, the string model, energy transport and introductory propagation limits.
- Wave boundaries, interference and standing waves
    - Interfaces, impedance, superposition and the spectra of finite one-dimensional systems.
- Wave packets, dispersion and periodic media
    - Spectral descriptions, pulse evolution, cutoffs, periodic structures and slowly varying media.
- Sound and linear acoustics
    - Fluid pressure waves, acoustic energy, impedance, sound levels and Doppler effects.
- Spatial waves, refraction and diffraction
    - Wavefront geometry, transverse polarisation, rays, apertures and beams.
- Acoustic radiation and scattering
    - Sources, outgoing fields, radiation impedance, obstacles and source–receiver relationships.
- Elastic and surface waves
    - Solid deformation, bulk and surface modes, fluid free-surface waves and reduced structural models.
- Waveguides, resonators and acoustic spaces
    - Confinement, modal propagation, cavities, room fields and response measurements.
- Dissipation and nonlinear acoustics
    - Losses, finite-amplitude propagation, shocks, mean forces and flows, and numerical investigation.

The grouping is based on related physical questions, not a fixed number of textbook chapters. Basic reflection and standing waves share a segment because boundary conditions connect them. Radiation and scattering share source and outgoing-field methods. Resonators and rooms share confinement, excitation and decay. The final segment combines competing effects that invalidate ideal linear propagation.

## Relationships and level

The strand begins at Coupled oscillations and normal modes. Subsequent segments use a cumulative reading sequence, with only the immediately preceding wave segment listed as a dependency. This follows the current Classical mechanics convention. It is an educational sequence, not a claim that every earlier model is essential to every later derivation.

No later Classical mechanics segment is made a prerequisite of the whole strand. The early propagation material revisits the oscillator-chain continuum limit and develops it further. Other returns are deliberate: string impedance becomes acoustic impedance, a basic wave packet becomes a spectral evolution problem, and a finite string becomes a multidimensional resonator.

The later sections reach undergraduate and introductory graduate material. Segments now use Foundations or Advanced relative to this strand; see [Segment stages](roadmap-stages.md). Specialist ideas labelled as overviews introduce possible continuations without promising a full research treatment.

## Foundations still to connect

The files list the physical relations they use, but the graph still lacks some underlying mathematics and physics segments. These gaps must remain visible during review.

- Partial differential equations, Fourier methods, complex amplitudes, linear algebra, special functions, asymptotic methods and numerical wave equations need mathematics coverage and direct links at their first use.
- Sound requires compressibility, an equation of state and the adiabatic approximation. Their immediate acoustic roles are listed, but a coherent thermal-physics foundation still needs to be built and linked.
- Elastic waves requires stress, strain and constitutive response. The segment introduces the linear isotropic framework; a later continuum-mechanics strand should provide its broader foundation.
- Fluid surface waves requires incompressible potential flow and free-surface conditions. These appear in the checklist, but the future fluid-mechanics foundation must be connected.
- Dissipation and nonlinear acoustics requires viscosity, thermal transport and nonlinear conservation equations. Its placement is proposed; it should eventually inherit the relevant thermal and continuum prerequisites as well.
- Numerical and nonlinear methods overlap the final Classical mechanics segment. During the cross-domain review, distinguish reusable mathematics from mechanical models rather than forcing every waves reader through unrelated mechanics applications.

Do not treat the currently valid dependency graph as proof that all these prerequisites are already documented.

## Coverage references

These are topic and scope comparisons, not claims that every lecture or textbook page has been audited. The proposed grouping is our own.

- [MIT 8.03SC, Vibrations and Waves, Fall 2016](https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/syllabus/): the oscillator-to-wave progression and the development of propagation, interference, dispersion and spatial waves. Its electromagnetic portion belongs to a later connection with electromagnetism.
- [Harvard Physics 15c, Spring 2006 syllabus](https://hoffman.physics.harvard.edu/courses/2006-spring-physics15c-syllabus.pdf): an additional undergraduate course comparison, using Georgi's The Physics of Waves among its references. This historical syllabus is not presented as a current offering.
- [MIT 2.062J, Wave Propagation, Spring 2017 lecture outline](https://www.ocw.mit.edu/courses/2-062j-wave-propagation-spring-2017/pages/lecture-notes/): dispersive waves, inhomogeneous media, fluid and elastic models, radiation and guided propagation. The course also includes applications outside our proposed scope.
- [MIT 6.013, chapter 13: Acoustics](https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-spring-2009/50a609ff2cc992401a099bca53801474_MIT6_013S09_chap13.pdf): acoustic fields, boundaries, guides and radiation. The chapter supplies an acoustics comparison without adopting the parent course's entire electromagnetic curriculum.
- [NC State MAE 555, Spring 2026](https://engineeringonline.ncsu.edu/online-courses/spring-2026/mae-555-application-of-acoustics-and-elastic-wave-propagation/): finite sources, diffraction, guided and elastic waves, and time reversal. Its imaging and device projects are specialist applications, not separate required segments here.
- [Montana State EELE 417/517, Fall 2018](https://www.montana.edu/rmaher/eele417_fl18/syllabus.html): acoustic intensity, source radiation, room response, absorption and measurement context. Detailed audio electronics, coding and auditory physiology are excluded from this shared physics route.
- [Robin Cleveland, ISNA 2022 short course on nonlinear acoustics, Part I](https://isna22.web.ox.ac.uk/sites/default/files/isna22/documents/media/isna_2022_short_course_nonlinear_acoustics_part_i.pdf): harmonic generation, steepening, weak shocks and reduced nonlinear propagation equations. This supports the final segment's progression; it is a specialist short course, not a universal undergraduate requirement.

The initial segment also retains the local Halliday, Resnick and Walker chapter 16 contents check and OpenStax references recorded in R033. No claim is made to have read Kinsler or Morse and Ingard merely because the institutional pages recommend those books.

## Boundaries for later strands

This is a proposed general waves and physical-acoustics route, not every acoustic specialisation. Electromagnetic waves and wave optics need electromagnetism; quantum waves need quantum mechanics. Full seismology, ocean acoustics, aeroacoustics, psychoacoustics, musical-instrument design, medical ultrasound and acoustic metamaterials remain possible continuations. Their underlying models can already have a home here without importing every application.

Future review should focus on missing foundations, genuine duplication and whether a grouping remains readable. A topic appearing in another course is a reason to consider it, not an automatic instruction to create another segment.
