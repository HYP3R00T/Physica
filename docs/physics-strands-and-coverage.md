# Physics strands and coverage

Initial expansion for author review, 17 September 2026. The roadmap now has 18 physics strands: eight existing strands and ten additions. The additions contain 69 visible segments with `draft: false`. They are proposed study lists, not source-audited or complete accounts of their fields. Baseline approved for commit on 17 September 2026.

The aim is broad, traceable coverage of physics. A named home does not prove that a subject has been covered. This document distinguishes existing checklists, introductory coverage, planned continuations and deliberate boundaries. It is an inventory to revise as omissions are found, not a claim to enumerate every research specialism.

## Design rules

- Keep the five agreed foundational strands: Classical mechanics, Electromagnetism, Thermodynamics and statistical mechanics, Quantum mechanics, and Relativity.
- Give a separate strand to a recognisable subject with a coherent sequence of segments and a reason to follow it independently.
- Give each topic a primary teaching home. Later strands develop its use in new systems and link to the required foundations.
- Connect strands through prerequisites without forcing each subject into a single-parent tree.
- Use cumulative reading sequences within these initial drafts, consistent with the existing curricula. Completing the previous segment is an educational entry requirement, not a claim that every earlier application is necessary for every later derivation.
- List only direct prerequisites. Inherited requirements remain available through the graph.
- Add mathematical prerequisites when their segments exist. Record missing foundations explicitly rather than inventing links or claiming that the current mathematics is sufficient.
- Use `stage: Foundations` or `stage: Advanced` to indicate progression within each strand. Neither label means compulsory for every physicist or fully audited. See [Segment stages](roadmap-stages.md).
- Preserve the five foundations while adding specialist routes. The site's flat strand metadata has not been replaced with a new hierarchy or category filter.

## Existing strands

- Classical mechanics: 14 segments.
- Electromagnetism: 12 segments.
- Thermodynamics and statistical mechanics: 10 segments.
- Quantum mechanics: 12 segments.
- Relativity: 10 segments.
- Waves and acoustics: 9 segments.
- Optics: 10 segments.
- Atomic and molecular physics: 10 segments.

These counts describe files, not completed audits. Previous curriculum documents and review entries retain their own audit status.

## New study sequences

The nine previously proposed strands are included below, together with Electronics and semiconductor devices to give junctions, transistor circuits and logic an explicit home. Segment titles are listed in intended reading order. The generated roadmap index records direct prerequisites.

### Continuum mechanics and fluid dynamics

Begins with deformable continua and conservation laws, then develops solids, ideal and viscous fluids, compressibility, instability and environmental flow models. Elastic waves remain introduced in Waves and acoustics; this route supplies the broader stress and constitutive framework.

- Continuum kinematics and balance laws
- Elasticity and deformable solids
- Fluid statics and ideal flow
- Viscous flow and boundary layers
- Compressible flow and transport
- Hydrodynamic stability and turbulence
- Rotating stratified and environmental flows

### Condensed matter physics

Begins with structure and bonding, then develops collective vibrations, electronic states, transport and phases. Soft matter has an introductory segment here. This is not yet a full polymer, liquid-crystal or active-matter curriculum.

- Crystal structure bonding and diffraction
- Lattice dynamics and thermal properties
- Electrons in crystals and band structure
- Electronic transport and semiconductor physics
- Magnetism and ordered phases
- Superconductivity and superfluidity
- Correlated and topological matter
- Soft matter and complex materials

### Electronics and semiconductor devices

Draws on semiconductor material physics in Condensed matter and inherited circuit foundations in Electromagnetism. It develops device boundary conditions, circuit behaviour, digital logic and measurement chains. The current inherited path is mathematically demanding; an earlier phenomenological electronics entry route remains a review question.

- Semiconductor junctions and diodes
- Bipolar and field-effect transistors
- Analogue circuits feedback and signal conditioning
- Digital logic and sequential circuits
- Data conversion and electronic measurement
- Power optoelectronic and integrated devices

### Nuclear physics

Begins with measured nuclear properties and interactions. Nuclear models, decay, reactions and detection precede an overview of extreme nuclear matter. Full quantum chromodynamics is developed in Particle physics rather than required for every introductory nuclear model.

- Nuclear properties and nuclear interactions
- Nuclear structure and collective models
- Radioactive decay and nuclear transitions
- Nuclear reactions and scattering
- Fission fusion and nucleosynthesis
- Radiation detection and nuclear measurements
- Nuclear matter and extreme conditions

### Quantum field theory

Develops field dynamics, quantisation, amplitudes, functional methods, renormalisation and gauge theories. The final segment identifies nonperturbative and curved-spacetime continuations. Its brief research overview does not supply a quantum-gravity curriculum.

- Classical fields symmetries and relativistic wave equations
- Quantised fields and particle states
- Scattering amplitudes and perturbative field theory
- Functional integrals and quantum effective actions
- Renormalisation and effective field theory
- Gauge theories and spontaneous symmetry breaking
- Nonperturbative fields and advanced directions

### Particle physics

Begins with particles, processes and measurements, then adds formal QFT at the electromagnetic and strong-interaction stages. The Standard Model belongs here. Nuclear interactions have their separate many-nucleon route.

- Particles interactions and conservation laws
- Accelerators detectors and particle measurements
- Quantum electrodynamics and precision particle tests
- Strong interactions and hadron structure
- Electroweak interactions and the Higgs mechanism
- Flavour neutrinos and symmetry violation
- Physics beyond the Standard Model

### Plasma physics

Develops particle, kinetic and fluid descriptions before waves, instabilities, transport, laboratory systems and natural plasmas. Fusion reaction physics comes from Nuclear physics. Space-plasma examples do not replace a complete heliophysics or planetary-space curriculum.

- Plasma scales and charged-particle motion
- Plasma kinetic theory and electrostatic waves
- Plasma fluid theory and magnetohydrodynamics
- Magnetised plasma waves and instabilities
- Plasma transport turbulence and reconnection
- Laboratory plasmas and controlled fusion
- Space and astrophysical plasmas

### Astrophysics

Begins with observable quantities and radiation, then develops stars, compact objects, interstellar matter, galaxies and planetary systems. Detailed cosmological inference belongs in Cosmology. Planetary interiors and atmospheres are introductions, not complete planetary science.

- Astronomical observations and physical scales
- Astrophysical radiation and matter
- Stellar structure and evolution
- Compact objects accretion and transients
- Interstellar matter and star formation
- Galaxies and stellar dynamics
- Planetary systems and celestial dynamics

### Cosmology

Uses the relativistic background model already introduced in Relativity. It develops observational inference, thermal history, perturbations, dark components and primordial physics. The overlap at the entry point is an observational application of the existing geometry, not a second derivation of general relativity.

- Cosmological observations and background evolution
- Thermal history and primordial nucleosynthesis
- Cosmological perturbations and structure growth
- Cosmic microwave background and observational probes
- Dark matter dark energy and nonlinear structure
- Inflation and primordial fluctuations
- Early-universe particles and cosmological frontiers

### Quantum information

Develops information measures, circuits, communication, error correction and fault tolerance, then physical implementations, simulation and sensing. Hardware examples are comparative introductions; device engineering remains in its respective material or electronics route.

- Quantum information states and correlations
- Quantum circuits and computation
- Quantum communication and cryptography
- Quantum noise and error correction
- Fault-tolerant quantum computing
- Quantum simulation sensing and hardware

## Semiconductor and logic placement

- Condensed matter: band structure, electrons and holes, doping, carrier statistics, transport and optical response of semiconductor materials.
- Electronics and semiconductor devices: PN junctions, Schottky contacts, heterojunctions, diodes, NPN and PNP bipolar transistors, JFETs, MOSFETs, and device models.
- Power devices: PNPN structures, thyristors, silicon-controlled rectifiers, TRIACs and switching devices.
- Analogue electronics: amplifiers, feedback, filters, oscillators and noise.
- Digital electronics: Boolean algebra, gates, CMOS logic, latches, flip-flops, counters, finite-state machines and timing.
- Measurement electronics: conversion, sensor interfaces, pulse processing and lock-in detection.

Logic circuits sit at the physics and electrical-engineering boundary. They are included because device behaviour, switching, noise and instrumentation are useful to a physics curriculum. Full processor architecture, software engineering and industrial chip-design workflows are outside this draft.

## Subjects not yet fully covered

These are explicit gaps or partial routes. They are not silently counted as complete because a related strand exists.

- Experimental physics and instrumentation: measurement, optical detection, nuclear detectors and electronics are distributed across the map. A coherent route through experimental design, calibration, uncertainty, statistical inference, vacuum systems, cryogenics, control, automation and laboratory practice is still missing.
- Computational physics: individual numerical methods appear in several strands. A dedicated sequence through numerical error, linear algebra, differential equations, Monte Carlo methods, molecular dynamics, finite-element and spectral methods, optimisation, reproducibility and verification remains to be written.
- Mathematical physics: the five current mathematics segments cannot support the whole expanded map. Linear and multilinear algebra, complex analysis, multivariable and vector calculus, PDEs, Fourier methods, probability, group theory, differential geometry, functional analysis and numerical methods remain major gaps.
- Soft matter: polymers, colloids, liquid crystals, glasses, granular matter and active matter have an introductory home in Condensed matter. Detailed polymer dynamics, rheology, self-assembly and nonequilibrium soft systems remain continuations.
- Biophysics: membranes, molecular motors, protein dynamics, cellular mechanics, biological transport and biological information have no dedicated learning sequence. Connections to soft matter and statistical physics do not count as coverage.
- Chemical physics: molecular structure and dynamics are present in Atomic and molecular physics. Detailed reaction kinetics, solution physics, chemical thermodynamics, computational quantum chemistry and photochemistry remain incomplete.
- Geophysics: elasticity and environmental flows provide foundations. Earth's interior, seismology, geodynamics, geomagnetism and inverse geophysical methods lack a coherent route.
- Atmospheric, ocean and climate physics: rotating and stratified flows are present. Moist thermodynamics, radiative-convective balance, atmospheric chemistry, circulation, climate feedbacks and observational climate methods are not fully covered.
- Planetary and space physics: planetary systems and natural plasmas have introductory coverage. Planetary geology and interiors, ionospheres, magnetospheres, solar physics and space-weather modelling need expanded paths.
- Medical physics: detector and radiation principles occur in Nuclear physics. Dosimetry practice, radiotherapy, imaging reconstruction, MRI instrumentation, ultrasound imaging and clinical quality assurance are not a medical-physics curriculum.
- Accelerator and beam physics: Particle physics introduces acceleration, focusing and luminosity. Beam optics, emittance evolution, collective effects, storage rings and accelerator design need further segments.
- Quantum optics and photonics: optics and atomic physics cover light propagation, lasers, coherent emitters and elementary cavity coupling. Full quantum field states of light, photon statistics, integrated photonics and quantum optical networks remain incomplete.
- Nonlinear dynamics and complex systems: chaos appears in Classical mechanics, fluids and plasma. Synchronisation, pattern formation, stochastic nonlinear dynamics and networks need a coverage audit before deciding on a separate strand.
- Low-temperature physics: quantum gases, superfluidity and superconductivity have homes in thermal and condensed-matter routes. Cryogenic techniques, quantum liquids and specialist low-temperature experiments remain incomplete.
- Nanophysics and surface physics: low-dimensional matter, junctions and interfaces are introduced. Surface reconstruction, adsorption, nanoscale probes, fabrication and mesoscopic devices need expansion.
- Quantum gravity, string theory and advanced mathematical field theory: named only as possible continuations. No systematic curriculum is provided, and speculative approaches must remain distinguished from established results.
- Energy and engineering applications: reactor, fusion, solar-cell and device principles occur in the map. Reactor engineering, power grids, aerospace design, mechanical engineering and industrial materials processing are not covered as complete professional subjects.
- Physics education, history and philosophy: not currently included as learning strands. They are legitimate areas of study, but require different sources and learning objectives from the present physics-topic checklists.

No finite subject list can guarantee coverage of all physics. New intersections and specialist topics will need explicit placement. When an omitted area is identified, record its proposed home, actual coverage and next action here or in the review tracker.

## Source comparison and limits

The [IUPAP commissions](https://iupap.org/who-we-are/internal-organization/commissions/) provide a breadth check across recognised communities, including biological physics, soft matter, semiconductors, low-temperature physics, mathematical physics and computational physics. Their affiliated commissions also make medical physics visible. These organisations are not a prerequisite sequence, and their structure is not copied as our strand hierarchy.

The [MIT physics subject catalogue](https://catalog.mit.edu/subjects/8/) and [Oxford advanced physics options](https://www.physics.ox.ac.uk/undergraduates/master-physics/fourth-year) support comparing separately taught subjects. They do not establish that each draft checklist is complete or that our exact grouping is standard.

The [MIT Circuits and Electronics syllabus](https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/pages/syllabus/) connects devices, circuit models, amplification and digital logic. The [MIT Digital Systems Laboratory](https://ocw.mit.edu/courses/6-111-introductory-digital-systems-laboratory-spring-2006/) supplies a boundary comparison for sequential logic, state machines and timing.

This pass creates an initial curriculum for review and compares broad subject coverage. It does not perform the detailed local-textbook and multi-institution audits used for earlier strands. Each new sequence still needs that audit, mathematical prerequisites, overlap review and author approval. Existing source-audited segments have not been rewritten to fit the expansion.
