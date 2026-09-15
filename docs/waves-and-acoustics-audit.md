# Waves and acoustics audit

Reviewed on 15 September 2026 against baseline commit `61f67e0`. That commit preserves the nine segments and their planning documents before this audit. Subsequent changes are left uncommitted for author review.

## Finding

The nine segments form a defensible progression from mechanical propagation to advanced physical acoustics. The comparison does not justify another split or a wholesale rewrite. It does identify missing introductory distinctions and some terminology that could mislead readers.

The largest unresolved issue is the prerequisite structure. The reading sequence is continuous, but several mathematical, thermal and continuum foundations do not yet have active segments. The later material also exceeds an introductory waves course. A valid graph and a long topic list do not establish a complete, independently followable curriculum.

This is a coverage and placement audit using syllabuses, textbook contents and selected passages. It is not a page-by-page verification of every derivation. Institutional courses supply comparisons; none endorses our particular nine-segment grouping.

## Sources inspected

### IIT course material

- **IIT Kanpur, PHY115, Oscillations and Waves:** [Physics department course booklet](https://iitk.ac.in/phy/data/PHY-CourseBooklet-18-03-24.pdf), PDF pages 4–5. The retrieved cover says 2026 despite the older filename. Its continuum transition, propagation, polarisation, interference and dispersion topics provide an introductory comparison. Oscillator material is already inherited from Classical mechanics. Quantum examples remain outside this strand.
- **IIT Kanpur, ME633, Acoustics:** [Department course outline](https://www.iitk.ac.in/me/me633). The indexed course text was available, although direct retrieval failed. It develops fluid acoustics, sources, standing fields, resonators, damping devices and numerical or experimental methods. This supports the continuation beyond elementary sound. No offering year is stated in the retrieved text.
- **IIT Bombay, AE710, Aeroacoustics:** [January–April 2024 syllabus](https://www.aero.iitb.ac.in/~aniruddha/downloads/202324_2_AE710/Aeroacoustics_Sylbs.pdf), page 1. Its sources and reciprocity content supports the radiation segment. It explicitly expects fluid-mechanics knowledge. Flow-generated noise and aircraft applications provide a boundary for a later specialisation, rather than requirements to copy into this route.
- **IIT Madras, OE5170, Ocean Acoustics:** [Ocean Engineering curriculum](https://doe.iitm.ac.in/img/curriculum.pdf), PDF page 64. Rays, interfaces, sound channels, scattering and modal descriptions connect with the proposed spatial and guided-wave segments. Ocean profiles, sonar and tomography are specialist continuations. The course page does not establish a current teaching year.

These are comparisons across introductory physics and specialised engineering courses at three IITs. Their different depths and purposes should not be combined into a supposed universal undergraduate syllabus.

### Books from the local collection

- **Halliday, Resnick and Walker, Fundamentals of Physics, 10th edition:** chapter 16, Waves I, and chapter 17, Waves II. The chapter contents cover the elementary string-to-sound sequence, interference, standing waves, beats and Doppler effects. These are already represented in segments 1, 2 and 4. This contents check does not validate the advanced acoustics material.
    - Local file: `/home/hyperoot/Documents/Ebooks/Disciplines/Physics/Uncategorised/Fundamentals of Physics - Halliday, Resnick, Walker (10th Edition).pdf`
- **Young and Freedman, University Physics with Modern Physics, 14th edition:** chapter 15, Mechanical Waves, and chapter 16, Sound and Hearing. Contents and selected section 16.1 passages, printed pages 505–509, were inspected. The frequency classifications and timbre discussion exposed two small omissions in our sound segment. Its introductory treatment also supports keeping standing sound waves and Doppler effects before advanced radiation.
    - Local file: `/home/hyperoot/Documents/Ebooks/Disciplines/Physics/Uncategorised/University Physics with Modern Physics - Young, Freedman (14th Edition).pdf`
- **Ajoy Ghatak, Optics, McGraw-Hill, 2010, ISBN 978-0-07-338048-3:** contents for chapters 10, 11 and 17, plus selected polarisation text around printed page 340 in chapter 22. These check packet dispersion, general wave descriptions, coherence and analyser terminology. Optical hardware and electromagnetic material response are not imported into mechanical acoustics.
    - Local file: `/home/hyperoot/Documents/Ebooks/Disciplines/Physics/Optics & Acoustics/Optics - Ajoy Ghatak.pdf`

No dedicated Kinsler, Morse and Ingard, or Pierce acoustics textbook was located in the local collection search. Their appearance in course bibliographies is not evidence that those books were read. Advanced coverage therefore relies more heavily on institutional material than the introductory coverage does.

### Advanced comparisons

- [MIT 2.062J, Wave Propagation, Spring 2017 lecture outline](https://www.ocw.mit.edu/courses/2-062j-wave-propagation-spring-2017/pages/lecture-notes/): dispersion, interfaces, elastic media, surface waves and guided propagation. Its internal-wave and random-medium topics identify further continuations. The linked chapter 3 extraction contains corrupted text; it was not used as reliable prose evidence for a detailed derivation.
- [Robin Cleveland, ISNA 2022 nonlinear acoustics short course, Part I](https://isna22.web.ox.ac.uk/sites/default/files/isna22/documents/media/isna_2022_short_course_nonlinear_acoustics_part_i.pdf): the outline and initial governing-equation material support the progression through finite-amplitude distortion, shocks and reduced propagation models. They also reinforce the need for thermal and fluid foundations.
- The earlier radiation, elastic-wave and room-acoustics comparisons remain documented in [the curriculum proposal](waves-and-acoustics-curriculum.md). Those references are retained as prior evidence, not described as newly audited textbooks.

## Segment-by-segment assessment

1. **Wave motion and propagation:** the string model, wave equation, initial data, superposition and energy transport are present. Added a short momentum-transfer introduction, prompted by PHY115's explicit coverage. It distinguishes oscillatory particle momentum from mean transfer and avoids implying a universal energy-to-momentum formula for every medium. Detailed acoustic forces remain in segment 9.
2. **Wave boundaries, interference and standing waves:** boundary matching, impedance, interference, beats, modes and resonance already cover the introductory textbook comparison. No checklist change. Reusing these ideas for air columns later is a change of physical model, not a missing prerequisite.
3. **Wave packets, dispersion and periodic media:** the spectral and dispersive progression is coherent. Replaced the vague normal/anomalous-dispersion entry with positive and negative group-velocity dispersion and its distinction from refractive-index dispersion. These labels describe different derivatives and should not be treated as interchangeable. Periodic media remains an advanced extension beyond the introductory book comparison.
4. **Sound and linear acoustics:** the fluid equations, compressibility assumptions, impedance, levels, air columns and Doppler effects are present. Added infrasonic, audible and ultrasonic ranges, plus harmonic content and timbre. These provide basic sound vocabulary without expanding into auditory physiology or instrument design.
5. **Spatial waves, refraction and diffraction:** added partially polarised and unpolarised waves and ideal analyser component selection. Added oblique acoustic interface matching, angle-dependent normal impedance and normal energy-flux balance. The latter is a continuity refinement: Snell's law supplies directions, but does not alone determine reflected and transmitted amplitudes. Electromagnetic Fresnel coefficients remain outside this scalar acoustic treatment.
6. **Acoustic radiation and scattering:** added quadrupoles explicitly alongside monopoles and dipoles, making a standard source category searchable rather than hiding it inside the generic multipole entry. AE710 supports this inclusion. Full turbulent-source modelling remains deferred.
7. **Elastic and surface waves:** bulk modes, conversion, surface modes and gravity-capillary waves have distinct homes within one medium-focused segment. No checklist change. Stress, strain and potential flow need fuller prerequisite coverage; the existing introductory lists are not substitutes for that foundation.
8. **Waveguides, resonators and acoustic spaces:** guides, cavity modes, lumped resonators, decay and room response form a coherent confinement sequence. No checklist change. Environmental channels can later extend this framework. Building standards, audio equipment and architectural design are outside the present physics scope.
9. **Dissipation and nonlinear acoustics:** the central nonlinear progression agrees with the specialist short-course comparison. No checklist change. Solitons, streaming and bubble dynamics are extensions with separate assumptions; the overview labels matter. Their presence should not be read as a complete treatment of nonlinear fluid mechanics.

## Sequence and outstanding work

Keep the existing names and order for this review. The sequence introduces a general method, develops a medium-specific version, then broadens its geometry or validity. Some recurrence is necessary: one-dimensional string boundaries prepare acoustic interfaces; string modes prepare cavity modes; elementary packets prepare spectral evolution.

There is a noticeable difficulty increase in segment 3 before elementary sound. The current order supplies Fourier and dispersion tools for the whole continuation, but those tools are not all necessary for the first air-column problems. This is an editorial choice to revisit if readers struggle, not a physical prerequisite claim or an automatic reason for another segment.

Before calling the route complete, connect these foundations at their first use:

- Partial differential equations and initial/boundary-value problems in segment 1.
- Complex amplitudes, eigenfunction methods and Fourier analysis across segments 2–3.
- Thermodynamic response and compressibility in segment 4.
- Vector calculus, spatial differential equations and asymptotic methods across segments 5–6.
- Stress, strain, elasticity and potential flow in segment 7.
- Special functions and modal analysis in segment 8.
- Transport, nonlinear fluid equations and numerical methods in segment 9.

Internal gravity waves, waves in random media, full aeroacoustics and ocean acoustics are explicit future scope decisions. Do not silently claim them as covered. Equally, their appearance in specialised courses does not require adding them all to this shared route now.

Author review remains open under R035. Classical mechanics, the archive, frontmatter dependencies and segment visibility were preserved.

## Validation

- Markdown lint passed for the three audit/planning documents and all 23 physics MDX files.
- All 28 active roadmap entries have valid dependency targets; the nine wave segments remain visible and use topic-only checklists.
- Production build passed, generating 12 pages.
- Whitespace checks passed. No application code changed.
