# Electromagnetism curriculum audit

Reviewed on 16 September 2026 against baseline commit `221ba25`. That commit contains the twelve electromagnetism segments before this audit. The author approved committing the refinements and this report on 16 September 2026.

## Assessment

The twelve segments cover a defensible route from electrostatics to graduate classical electrodynamics. The comparison did not expose a missing major field of study within that scope. It did expose several omitted connections and a substantial prerequisite gap. Topic coverage alone does not make the route ready for an independent beginner: vector calculus, boundary-value mathematics and special relativity still need their own authored foundations.

Keep the twelve boundaries for now. They separate source fields, boundary methods, material response, conduction, induction, field conservation, propagation, confinement, relativity and radiation. This is an editorial organisation, not a claim that universities use twelve standard divisions.

## Sources inspected

### Local books

The following PDFs are in the author's `Electromagnetism & Photonics` book folder. The review used contents and selected passages, not a line-by-line reading of the books.

- David J. Griffiths, *Introduction to Electrodynamics*, fourth edition.
    - Contents of chapters 2 through 12 for undergraduate coverage.
    - Section 2.3.5, printed pages 88–90, for electrostatic interface conditions.
    - Section 3.1 and problem 3.2, printed page 118, for harmonic potentials and electrostatic stability.
    - Section 10.2.2, printed pages 449–451, for causal fields from distributed sources.
- John D. Jackson, *Classical Electrodynamics*, third edition.
    - The local copy is scanned. Rendered and OCR-read contents pages xv–xxi, PDF pages 18–24, were used for scope and placement. A rendered contents page was also inspected visually.
    - Chapters 1–6 cover static fields, boundary methods, media, induction and conservation; chapters 7–10 cover propagation, confinement, radiation, scattering and diffraction; chapters 11–16 extend into relativistic dynamics, particle interactions and radiation reaction.
    - This was a contents-level comparison, not a verification of every derivation or approximation in Jackson.
- Franz Wegner, *Classical Electrodynamics: Theoretical Physics II*, English manuscript, Heidelberg, 2003.
    - Contents, introductory assumptions and selected text were inspected.
    - Sections 2 and appendix A cover unit conventions; sections 12–15 connect induction, circuits and field conservation; sections 23–29 connect relativity, field transformations, action and moving-charge fields.
    - The manuscript assumes previous introductory electrodynamics and uses Gaussian units. Its order is not a beginner's starting sequence.

### Academic courses

- [IIT Kanpur Physics course booklet](https://iitk.ac.in/phy/data/PHY-CourseBooklet-18-03-24.pdf), retrieved 16 September 2026.
    - PHY113 provides an introductory comparison. PHY552 includes boundary methods, material fields, conservation, waves, radiation, scattering and confinement. PHY614 adds covariant fields, action methods, moving charges and radiation reaction.
    - These course descriptions support the breadth of the proposed strand. They do not establish our segment boundaries or certify completeness.
- [SVNIT first-year Integrated MSc Physics curriculum, effective 2023–24](https://www.svnit.ac.in/web/department/physics/pdf/2-Integrated%20M.Sc.%20%28Physics%29%20%28w.e.f.%202023-24%20under%20NEP%29/2A-MSC-I_Physics_wef_AY2023-24_NEP.pdf), PH102, PDF pages 17–18.
    - Covers vector calculus, electrostatics, dielectric fields, boundary methods, magnetostatics and magnetic matter.
    - It supports the early portion of this route. It is not evidence that the author took this curriculum version, or that their degree covered all our advanced topics.
- [MIT 8.07, fall 2012 calendar](https://ocw.mit.edu/courses/8-07-electromagnetism-ii-fall-2012/pages/calendar/) and [syllabus](https://ocw.mit.edu/courses/8-07-electromagnetism-ii-fall-2012/pages/syllabus/).
    - Provides an undergraduate comparison for vector methods, boundary problems, multipoles, magnetic matter, waves and radiation. The syllabus lists waves and differential equations as prerequisites.
    - Its specialised metamaterial lectures are examples of course-specific choices, not mandatory additions to our shared route.
- [MIT 8.311, spring 2004 calendar](https://ocw.mit.edu/courses/8-311-electromagnetic-theory-spring-2004/pages/calendar/) and [syllabus](https://ocw.mit.edu/courses/8-311-electromagnetic-theory-spring-2004/pages/syllabus/).
    - The graduate course connects conservation, material response, guides and cavities, action methods, relativity, radiation and scattering. This supports the later sequence and confirms that it extends well beyond introductory electromagnetism.

## Review of the twelve segments

- Electric charge, fields and potential
    - Coulomb and Gauss descriptions, potential, energy and dipoles form a coherent starting unit. Added explicit electrical units. Vector calculus is already needed here.
- Electrostatic boundary-value problems
    - The main solution methods are present. Added general interface conditions and the connection between harmonic potentials and equilibrium. Green's functions and general harmonic expansions make this an unusually steep second segment for a beginner.
- Polarisation and electric fields in matter
    - Bound charge, displacement, constitutive response, boundary models and dielectric energy are covered. Microscopic models are appropriately limited; ferroelectricity and electrostriction remain introductions.
- Electric current and conduction
    - Current continuity, local conduction, sources, dissipation and elementary networks connect the field and circuit viewpoints. This is broader than a typical theoretical electrodynamics text but useful for a route that starts before university electromagnetism.
- Magnetic fields and magnetostatics
    - Lorentz force, steady-current sources, potentials and dipoles are present. Corrected the field-line wording: zero divergence does not require every line to close on itself.
- Magnetisation and magnetic materials
    - Macroscopic response, bound currents, boundary problems and hysteresis are covered. Energy here is an overview; its induction-based derivation follows in the next segment. Quantum explanations of ordering and superconductivity remain later work.
- Electromagnetic induction and circuit dynamics
    - Induction, coupled circuits, transients and sinusoidal response are connected. Added source-work conditions for mechanical forces and an introduction to magnetic diffusion.
- Maxwell's equations and field conservation
    - Field equations, potentials, energy and momentum are covered. Added explicit source-to-field causal solutions and unit-system conventions.
- Electromagnetic waves and material response
    - Polarisation, dispersive response and interfaces are covered. Added pulse spreading and signal fronts to distinguish group velocity from causal signal propagation.
- Electromagnetic waveguides and resonators
    - Lines, metallic and dielectric guides, losses and cavities provide a coherent confinement unit. Periodic photonic structures are already labelled introductory and can later connect to photonics.
- Relativistic electrodynamics
    - Covariant fields and action are present. Added wave transformations and explicit Noether connections. The opening recap cannot replace a complete special-relativity prerequisite.
- Electromagnetic radiation and scattering
    - Source multipoles, antennas, moving charges, classical scattering and self-force limits provide a reasonable advanced endpoint. No additional segment is warranted by this review. Radiation reaction remains introductory, not a claim to resolve the point-particle problem.

## Reasons for the refinements

- Interface conditions: Griffiths 2.3.5 and Jackson 1.6 distinguish field jumps from potential continuity. Ideal dipole sheets require a separate qualification.
- Harmonic potentials and Earnshaw's theorem: Griffiths 3.1 connects Laplace's equation to equilibrium restrictions. The new wording limits the claim to fixed electrostatic sources and charge-free trapping regions.
- Magnetic-field lines: the divergence constraint forbids sources and sinks; it is not a theorem that all trajectories are closed. The replacement includes lines extending to infinity without claiming those two cases exhaust all possible field-line geometry.
- Inductive forces: Wegner 13.d explicitly distinguishes electrical constraints and source energy. Jackson 5.18 identifies magnetic diffusion as part of the quasistatic treatment. The new introductory entries connect existing eddy-current and transient topics.
- Causal fields: Griffiths 10.2.2 and Jackson 6.5 explicitly cover Jefimenko's equations. Naming the topic makes the bridge from static source laws searchable.
- Dispersive propagation: Jackson 7.8–7.11 distinguishes wave-packet evolution and signal arrival. Merely listing phase, group and energy velocities left that connection implicit.
- Relativistic waves and conservation: Wegner 25.e supplies the Doppler connection. Phase and wave-vector transformations also give the natural place for aberration. The action-to-conservation connection is explicit in IIT Kanpur PHY614 and MIT 8.311.
- Units: Griffiths appendix C, Jackson's units appendix and Wegner section 2 make conventions a practical requirement for reading across these sources.

## Remaining work and deliberate boundaries

- Mathematics at first use
    - Before the first segment: multivariable functions, vector fields, line and surface integrals, gradient, divergence, curl, and Gauss and Stokes theorems.
    - Before boundary methods: partial differential equations, uniqueness, orthogonal expansions, spherical harmonics, Bessel functions, distributions and Green's functions.
    - Before circuit frequency response and dispersive waves: complex numbers, Fourier methods and linear response. Scalar ODE coverage does not supply all these tools.
    - Before covariant fields: index notation, tensors, spacetime geometry and relativistic mechanics.
    - Do not add dependency slugs for segments that have not been authored. Track and attach these foundations when the mathematics and relativity routes are built.
- Difficulty and reading order
    - The first six segments are broadly undergraduate, but the boundary-method checklist includes graduate tools. The later route reaches graduate material. `Core` currently identifies the shared route, not a uniform level.
    - Retarded potentials precede the dedicated wave segment. Their checklist therefore introduces potential wave equations locally; a future PDE segment must supply the mathematical method.
    - Relativity before advanced radiation is defensible. Guided modes are not a physical prerequisite for relativity; that edge is part of the agreed cumulative reading trail.
    - A later beginner-facing study module should distinguish a first pass from advanced methods within a segment. No new status system or graph restructuring was introduced in this audit.
- Specialised continuations
    - Scalar and vector diffraction, aperture theory and detailed optical imaging need an optics continuation. Jackson chapter 10 includes them; they are an explicit boundary of this strand, not forgotten content.
    - Magnetohydrodynamics, magnetised plasma waves, guiding-centre dynamics and particle drifts need plasma or continuum mechanics foundations.
    - Collisional stopping power, multiple particle scattering and accelerator design belong to later particle-interaction or accelerator topics. Electromagnetic wave scattering is already included here.
    - Full microscopic magnetism, superconductivity, semiconductor devices, nonlinear optics and quantum electrodynamics need further strands. Their names appearing in an overview do not count as complete treatments.
    - Field Hamiltonians, constrained canonical systems and quantisation can follow the existing action formulation. This review does not claim to cover every advanced topic in Jackson or MIT's graduate course.

The result is a broad classical-electromagnetism syllabus with identified boundaries. The remaining prerequisite work matters more than adding more specialist phenomena to these twelve checklists.

## Validation

- Roadmap index regenerated successfully: 50 active segments.
- Production build passed: 12 pages built.
- Markdown lint passed for the physics segments and audit documents.
- `git diff --check` passed; newly written prose contains no em dashes.
- Seven electromagnetism MDX files contain the post-baseline refinements. No existing mechanics, waves, thermal or archive content was edited by this audit.
