# Optics curriculum audit

Reviewed on 16 September 2026 against baseline `a35fc1d`, which committed all ten optics segments before this audit. The author approved committing the refinements and this report on 16 September 2026.

## Assessment

Retain the ten-segment structure. It covers the principal classical optical descriptions and a useful introduction to lasers, detection and nonlinear photonics. The first draft had several omissions within those chosen areas, particularly acousto-optic modulation, fibre propagation details and nonlinear feedback. Those fit into existing segments.

The route is broader than a single undergraduate optics course. Coherence theory, Fourier imaging and nonlinear pulse propagation include advanced material. Listing them does not remove their mathematical or quantum prerequisites, and the strand is not yet a self-contained beginner curriculum.

## Evidence inspected

### Local books

The local sources are in the author's `Physics/Optics & Acoustics` folder. This was a contents and selected-passage review, not a complete reading or derivation check.

- Ajoy Ghatak, *Optics*, McGraw-Hill, copyright 2010, ISBN 9780073380483.
    - Verified bibliographic details from the local front matter rather than assigning an edition from the filename.
    - Inspected contents for geometrical optics, interference, diffraction, polarisation, lasers and fibres, including chapters 3–6, 14–24 and 26–29.
    - Checked the sine-condition passage in section 4.11. Sections 27.7 and 29.3–29.5 identify numerical aperture, guided modes and fibre dispersion as explicit study topics.
- Max Born and Emil Wolf, *Principles of Optics*, fourth edition, 1970.
    - The filename names only Wolf, but the rendered title page confirms both authors and the edition.
    - The scanned copy required rendering and OCR. Inspected contents on PDF pages 12–18, with visual checks of the title and the coherence/diffraction contents page.
    - Chapters IV–X connect ray systems, aberrations, instruments, interference, diffraction, imaging and partial coherence. Sections 10.5 and 10.8 identify illumination coherence and the coherency matrix.
    - Used for structure and named coverage, not as evidence for modern detector or ultrafast technology.
- Robert W. Boyd, *Nonlinear Optics*, third edition.
    - Inspected contents across the book and selected passages in sections 7.2 and 8.4.
    - These distinguish phase conjugation from ordinary reflection and externally driven acousto-optic diffraction from stimulated scattering.
    - Chapters 7, 11 and 13 help identify the boundary between the shared introduction and specialised nonlinear response.

### University courses

- [SVNIT second-year Integrated MSc Physics curriculum](https://www.svnit.ac.in/web/department/physics/pdf/2-Integrated%20M.Sc.%20%28Physics%29%20%28w.e.f.%202023-24%20under%20NEP%29/2B-MSC-II_Physics_wef_AY2023-24_NEP.pdf), effective 2023–24, with modifications dated 30 April 2024.
    - PH205, PDF pages 6–7, covers optical systems, interference, diffraction, holography and polarisation.
    - PH208, PDF pages 18–19, adds lasers, modulators, detection, nonlinear effects, photonic materials and fibres.
    - This is a curriculum comparison. It does not establish the author's cohort, electives or personal exposure to every topic.
- [IIT Kanpur Centre for Lasers and Photonics course descriptions](https://www.iitk.ac.in/celp/course-content), retrieved 16 September 2026.
    - PSE601A includes propagation, coherence, anisotropic optics, modulation and guides. PSE602A covers lasers and detection. PSE603A makes the supporting numerical and mathematical methods explicit.
    - These support the scope and the missing prerequisite assessment, not our exact ten divisions. The page does not specify a single cohort year for the descriptions.
- [MIT 2.71 Optics, spring 2014 calendar](https://ocw.mit.edu/courses/2-71-optics-spring-2014/pages/calendar/) and [syllabus](https://ocw.mit.edu/courses/2-71-optics-spring-2014/pages/syllabus/).
    - Support the progression from ray systems to interference, diffraction, Fourier imaging, Gaussian beams and polarisation. The order of polarisation and laser introductions is flexible across curricula.
- [MIT 6.161 Modern Optics Project Laboratory, fall 2005](https://ocw.mit.edu/courses/6-161-modern-optics-project-laboratory-fall-2005/pages/syllabus/).
    - Provides a comparison for the connection between optical principles, modulation, detectors and laboratory instruments.
- [MIT 6.977 Ultrafast Optics, spring 2005](https://ocw.mit.edu/courses/6-977-ultrafast-optics-spring-2005/).
    - Establishes the graduate nature of pulse generation, nonlinear propagation, amplification and pulse characterisation. Our final segment is an entry to this field, not coverage of the whole course.

Direct retrieval of the IIT Kanpur PHY224 page and IIT Madras syllabus page failed. Their search snippets were not used as full-course evidence. The accessible IIT Kanpur photonics descriptions supplied the institutional comparison instead.

## Segment-by-segment findings

- Geometrical optics
    - The entry covers optical paths, interfaces, mirrors, lenses and approximation limits. No substantial omission found within its introductory ray scope. Its placement before full electromagnetic optics remains useful.
- Optical systems and aberrations
    - Matrix optics, apertures, instruments and aberrations are present. Added aplanatic imaging and Abbe's sine condition, supported by Ghatak 4.11 and Born and Wolf 4.5.
    - Corrected the radiance statement. For passive lossless geometrical propagation, refractive-index weighting matters; unqualified radiance conservation across different media is misleading.
- Optical interference and coherence
    - The principles and correlation framework are present. Added Fresnel biprism and Lloyd's mirror as representative wavefront-division arrangements, and explicit antireflection and dielectric-mirror topics within the existing thin-film group.
    - These additions improve recognisability without trying to catalogue every interferometer.
- Optical diffraction
    - Scalar formulations, angular spectra, near and far fields, gratings and resolution are covered. The vector treatment is explicitly introductory. No expansion needed in this pass.
- Fourier optics and image formation
    - Transfer descriptions, aberrated imaging, phase methods and holography are present. Added critical and Kohler illumination and condenser-coherence effects, following Born and Wolf 10.5.
    - This connects illumination to image formation rather than leaving illumination as an instrument label.
- Polarisation and crystal optics
    - Added the coherency matrix and total-internal-reflection retarders to connect statistical polarisation and practical retardance.
    - Added acousto-optic modulation, including Raman–Nath and Bragg regimes. Boyd 8.4, SVNIT PH208 and IIT Kanpur PSE601A identify this as a distinct optical-control mechanism. Stimulated Brillouin scattering in the last segment did not cover it.
    - Added Elastic and surface waves as an independent prerequisite for strain and photoelastic coupling.
- Optical beams and resonators
    - Gaussian beams and optical cavities were already well represented. The electromagnetic prerequisite supplies general guided modes but does not explicitly cover several fibre-specific quantities.
    - Added index profiles, numerical aperture, normalised frequency, weak guidance, mode-field diameter and dispersion categories. Ghatak chapters 27–29 and SVNIT PH208 support this refinement.
- Laser physics
    - Gain, thresholds, rate dynamics and pulsed operation cover the intended introduction. Added named ruby, neodymium, helium–neon and carbon-dioxide models so level schemes and pumping mechanisms have searchable examples.
    - Detailed material physics and quantum-noise derivations remain outside the segment's current foundations.
- Optical detection and spectroscopy
    - Detector mechanisms, noise, detection methods and instruments are present. No substantial addition needed at this level. Atomic and molecular spectroscopy foundations remain missing elsewhere in the roadmap.
- Nonlinear and ultrafast optics
    - Added phase conjugation, degenerate four-wave mixing, bistability and introductory photorefractive coupling, following the areas identified in Boyd chapters 7 and 11.
    - Added chirped-pulse amplification and group-velocity mismatch. Pulse compression alone did not identify the amplification sequence or the interaction-length limitation from pulse walk-off.
    - The current segment remains an introduction to nonlinear propagation and short pulses. It is not the entirety of nonlinear optics.

## Sequence and prerequisite assessment

The cumulative optical sequence remains intact. The added acoustic edge supplies a genuinely independent foundation for modulation. It also means later optics inherits part of the acoustics route under the current dependency convention. That is the cost of placing sound-driven modulation within the shared strand; a future specialised module could make that branch optional without pretending the physics has no prerequisite.

Interference currently adds the existing Electromagnetic waves and material response segment, which itself inherits much of electromagnetism. Basic two-slit interference does not require every earlier electromagnetic boundary method. This is an editorial consequence of the agreed cumulative trails, not a fundamental requirement of optics. Keep it visible as a future navigation decision rather than changing the graph model during this content audit.

The first two segments provide a usable ray-optics starting point. The later progression connects field superposition, aperture propagation, imaging, polarisation control, beam confinement, generation, measurement and nonlinear response. No new segment is needed solely to repair the omissions found here.

The prerequisites still to author or complete are:

- Matrix algebra, eigenvalue methods and tensor descriptions.
- Complex amplitudes, multidimensional Fourier transforms, convolution and correlation.
- Random processes and statistical coherence.
- Partial differential equations, mode expansions and numerical propagation.
- Quantum transitions, atomic and molecular structure, optical dephasing and photon statistics.
- Semiconductor and material-response foundations for detectors, lasers and nonlinear media.

No nonexistent prerequisite slugs were added. The optics lists expose these requirements, but do not themselves teach the missing mathematics or quantum mechanics.

## Scope boundaries

- Quantum states of light, squeezing, entanglement and full quantum photodetection belong to a quantum-optics continuation.
- Strong-field ionisation, high-harmonic generation and attosecond physics extend beyond the perturbative and envelope-based treatment here.
- Comprehensive optical design, fabrication, alignment laboratories and instrument calibration programmes need practical modules. A checklist cannot certify laboratory competence.
- Fibre communication protocols, integrated photonic circuit design, nanophotonics and specialist imaging methods can branch from this route.
- Historical quantum and relativity chapters in an optics textbook are not automatically optics segments. Those foundations belong to their own coherent strands.

This audit supports the ten-part shared route with these qualifications. It does not establish that every topic found in every optics book belongs in the strand, or that further author review cannot reveal a gap.

## Validation

- Roadmap index generation passed with 60 active segments, including the new acoustic prerequisite.
- Production build passed with 12 pages.
- Markdown lint and `git diff --check` passed.
- Seven optics MDX files contain post-baseline refinements. Other strands and archived content were not edited by this audit.
- The audit refinements and documentation were approved for commit on 16 September 2026.
