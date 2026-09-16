# Quantum mechanics audit

Reviewed on 16 September 2026 against baseline `748fa21`. The request mentioned electromagnetism while asking to commit the newly created quantum strand; this review follows the quantum context. The baseline commit contains all twelve new roadmap files. The author approved committing the audit corrections and related documentation on 16 September 2026.

## Assessment

The twelve groups form a defensible route through nonrelativistic quantum mechanics and selected graduate methods. The main foundations were present. The audit found several omissions within those groups, two redundant prerequisite links, and a larger gap between mentioning spontaneous emission and providing the field description needed to explain it.

The corrections retain the filenames, titles, strand and reading order. They do not establish that the route is exhaustive or independently followable without the missing mathematics. The last two segments are advanced foundations, not prerequisites for starting atomic or condensed-matter physics.

## Local books inspected

The files are in `/home/hyperoot/Documents/Ebooks/Disciplines/Physics/Quantum Mechanics/`.

- **Griffiths and Schroeter, Introduction to Quantum Mechanics, third edition (2018):** Local filename `Introduction to Quantum Mechanics - D. J. Griffiths (3rd Edition).pdf`. Inspected contents and selected passages: section 3.5.3 on energy-time uncertainty, problem 7.38 on Hellmann–Feynman, and sections 8.3–8.4 on molecular bonding. PDF pages 124–125, 331 and 352–356 correspond to printed pages 109–110, 316 and 337–341. These support explicit uncertainty qualifications, parameter derivatives and molecular models.
- **Zettili, Quantum Mechanics: Concepts and Applications, second edition:** Local filename `Quantum Mechanics - N. Zettili (2nd Edition).pdf`. Inspected contents, including Cartesian systems and rotation matrices, and selected radiation passages in section 10.5, PDF pages 604–610 (printed 588–594). The field-mode treatment provides the bridge from oscillator operators to photon emission. This is contents and selected-passage inspection, not a complete reading of every chapter.
- **Shankar, Principles of Quantum Mechanics, second edition:** Local filename `Principles of Quantum Mechanics - R. Shankar (2nd Edition).pdf`. Text extraction was unusable. Visually inspected the preface on PDF page 7 and contents on PDF pages 11–14. The contents place path integrals both early and late, and include symmetry, approximation methods and a Dirac-equation endpoint. This supports multiple legitimate teaching orders; it does not uniquely validate ours. No detailed derivation was checked in this scanned book.

## Academic comparisons

- [SVNIT PH204, Quantum Mechanics I](https://www.svnit.ac.in/web/department/physics/pdf/2-Integrated%20M.Sc.%20%28Physics%29%20%28w.e.f.%202023-24%20under%20NEP%29/2B-MSC-II_Physics_wef_AY2023-24_NEP.pdf), PDF pages 14–15, effective 2023–24 with modifications dated 30 April 2024. Its formalism, potential models, radial methods, particle identity and stationary approximations are represented. This public syllabus does not establish the author's cohort or personal course history.
- [IIT Kanpur course booklet](https://iitk.ac.in/phy/data/PHY-CourseBooklet-18-03-24.pdf), PHY431 on PDF page 17 and PHY626 on page 27. These connect introductory theory to perturbations, scattering, radiation and relativistic wave equations. The latter are an explicit continuation missing from our present nonrelativistic scope, not topics the audit considers unnecessary.
- [IIT Kanpur PHY602 historical outline](https://www.iitk.ac.in/phy/downloads/2015-2016/I/PHY602%20.pdf), page 1, under the 2015–2016 directory. Its numerical radial methods, field quantisation and path-integral introduction support those parts of the route. The live PHY602 page failed direct retrieval; this historical PDF was inspected instead.
- [IIT Bombay PH422, instructor course outline](https://homepages.iitb.ac.in/~shukla/qm2_syllabus.html), no teaching year stated on the page. It covers angular coupling, approximation methods, Einstein coefficients, Floquet theory and Green-function scattering, and expects linear algebra and partial differential equations. Those expectations reinforce our missing-mathematics warning.
- [MIT 8.04, spring 2016](https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/pages/syllabus/) and [8.06 readings, spring 2016](https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2016/pages/readings/) support wave mechanics through approximations, transitions, low-energy scattering and density operators. Their additional computing and material examples are not all requirements for this shared strand.
- [MIT 22.51, fall 2012](https://ocw.mit.edu/courses/22-51-quantum-theory-of-radiation-interactions-fall-2012/pages/syllabus/) explicitly treats composite systems, radiation and open dynamics at graduate level. Its [open-systems notes](https://ocw.mit.edu/courses/22-51-quantum-theory-of-radiation-interactions-fall-2012/b24652d7f4f647f05174797b957bd3bf_MIT22_51F12_Ch8.pdf), sections 8.3–8.4, support channels, reservoir timescales and master-equation assumptions. This supports the endpoint's relevance, not a claim that every introductory quantum course includes it.

The IIT Bombay 2024–2025 handbook failed retrieval. It is not used as evidence. Public course listings vary in depth and age; their inclusion does not imply a verified current offering.

## Coverage and refinements

- Quantum phenomena: Retained the experimental introduction. Removed the direct Work and energy link because the wave prerequisite already inherits it.
- Wavefunctions: Retained wells, barriers, tunnelling, oscillator methods and numerical propagation. Removed the inherited Linear ordinary differential equations link.
- States and observables: Added explicit delta normalisation, generalised eigenstates, density-operator evolution and energy-time uncertainty. The latter distinguishes an evolution timescale from a position-like observable.
- Angular momentum: Added Euler angles and Wigner rotation matrices alongside generators and angular coupling.
- Central potentials: Added separable Cartesian models before spherical separation, plus numerical radial methods. The purpose is to make multidimensional separation visible, not to create another model-only segment.
- Symmetries: Retained translation, parity, time reversal, gauge coupling, Landau levels and periodic potentials. No coverage change was needed in this pass.
- Stationary methods: Added Hellmann–Feynman parameter derivatives with their conditions. Existing perturbation, variational and WKB groups remain.
- Transitions: Added elementary radiation-mode quantisation, atom-field states, photon mode density, Einstein coefficients and natural linewidths. Spontaneous emission now follows this foundation rather than a deferred explanation.
- Composite systems: Named Hartree–Fock and distinguished exchange from correlation. Added orbital combinations and hydrogen bonding models within the existing molecular group.
- Scattering: Made frame transformations explicit and added the bound-state/phase-shift connection through Levinson's theorem, with threshold qualifications.
- Propagators: Retained the advanced formulation and semiclassical connections. No expansion into field-theory techniques was made.
- Open systems: Added initial-state assumptions, depolarisation and reservoir timescales. These qualify when reduced dynamics can be represented by the stated channels and master equations.

## Boundaries and unresolved work

Relativistic wave equations appear in the compared graduate sources. Klein–Gordon and Dirac theory should be planned after a dedicated special-relativity foundation, rather than silently treating relativistic quantum mechanics as absent from the wider subject. The existing fine-structure corrections do not replace that theory.

Elementary photon quantisation belongs here as preparation for emission. Photon correlation functions, cavity quantum electrodynamics, squeezed light and detailed photodetection can form a later quantum-optics continuation. Detailed atomic term structures, molecular spectroscopy, many-body correlation methods and solid-state phases also remain specialist continuations.

Complex analysis, linear algebra, probability, tensor products, multivariable calculus, Fourier methods, special functions and partial differential equations still need authored mathematical prerequisites. Merely adding their names to a physics checklist would not close that gap.

The graph remains a cumulative reading trail. It therefore inherits more material than a minimal prerequisite graph: even the wave entry brings substantial mechanics. Removing two redundant edges preserves reachability but does not solve that broader design tradeoff. No changes to approved waves, electromagnetism, optics or thermal segments were made.

Links from existing thermal and optical segments to this quantum strand remain a separate review task. Their inherited dependencies must be checked before adding links, particularly around field quantisation and open dynamics. The current twelve groups remain proposed, not a certification of complete graduate coverage.

## Validation

The roadmap index was regenerated for 72 segments. Dependency validation, Markdown checks, diff whitespace checks and the production build passed after the corrections. The audit changes can be compared against `748fa21`.
