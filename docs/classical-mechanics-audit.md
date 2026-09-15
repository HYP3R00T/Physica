# Classical mechanics coverage audit

Reviewed on 15 September 2026 against baseline commit `07dfcc7`.

## Conclusion

Keep the fourteen segments. The comparison found no missing major stage within the agreed nonrelativistic particle and rigid-body curriculum. It did find omissions in individual checklists and an ambiguous description of free rotation. Those corrections are listed below and remain separate from the baseline commit.

This is a defensible shared foundation through analytical mechanics, perturbation methods and nonlinear dynamics. It is not the entirety of classical mechanics, and completing a checklist does not establish proficiency. The supporting mathematics remains incomplete. Until those segments and their links are built, this is not a self-contained route from school mathematics to advanced mechanics.

## Method and limits

- Read all fourteen active physics checklists and their prerequisite relationships.
- Compare their coverage with the contents of four local textbooks, spanning introductory physics to graduate mechanics.
- Read selected textbook passages where a heading alone could not settle an accuracy question. In particular, check Goldstein's variational conditions and Tong's explanation of free rigid-body geometry.
- Compare official course outlines from SVNIT, IIT Kanpur, IISER Pune, MIT, Cambridge and Caltech. The earlier project provenance names SVNIT, which resolves the college reference in the discussion.
- Separate missing concepts, terminology refinements, deliberate boundaries and unresolved mathematics. A topic's appearance in one book is not sufficient reason to add it.

This is a coverage and conceptual-order audit, not a page-by-page verification of every derivation or exercise in the source books. University outlines specify different levels and often combine mechanics with adjacent subjects. Their order is evidence for possible routes, not a universal sequence to reproduce.

## Textbook references

Section and page numbers below refer to printed book numbering unless explicitly marked PDF.

- **HRW:** Halliday, Resnick and Walker, *Fundamentals of Physics*, tenth edition. Reviewed the mechanics contents spanning chapters 1–16, particularly the boundaries between rotation, equilibrium, gravitation, fluids and oscillations. This is the introductory coverage check.
    - Local file: `/home/hyperoot/Documents/Ebooks/Disciplines/Physics/Uncategorised/Fundamentals of Physics - Halliday, Resnick, Walker (10th Edition).pdf`
- **Taylor:** John R. Taylor, *Classical Mechanics*. Reviewed the contents of chapters 1–16. Chapters 1–5 cover Newtonian foundations and oscillators; 6–14 cover variational methods, central forces, frames, rigid bodies, modes, chaos, Hamiltonian mechanics and scattering. Chapters 15–16 help identify the relativity and continuum boundary.
    - Local file: `/home/hyperoot/Documents/Ebooks/Disciplines/Physics/Classical Mechanics/Classical Mechanics - J. R. Taylor.pdf`
- **KB:** Kibble and Berkshire, *Classical Mechanics*, fifth edition. Reviewed the preface and contents, including the mathematical appendices. Useful checks include general oscillator response, potential theory, many-body systems, analytical mechanics and dynamical systems.
    - Local file: `/home/hyperoot/Documents/Ebooks/Disciplines/Physics/Classical Mechanics/Kibble, Thomas Classical Mechanics - T. W. B. Kibble, F. H. Berkshire (5th Edition).pdf`
- **GPS:** Goldstein, Poole and Safko, *Classical Mechanics*, third edition. Verified the edition on the scanned title page. Read the contents and preface, then selected pages on rotation and stationary action: section 4.6, p. 155, and section 8.6, pp. 356–359. The latter occupy PDF pages 365–368 in this copy.
    - Local file: `/home/hyperoot/Documents/Ebooks/Disciplines/Physics/Classical Mechanics/Classical Mechanics - H. Goldstein, C. P. Poole, J. L. Safko.pdf`

## Institutional references

- **SVNIT:** [Integrated MSc curriculum index](https://www.svnit.ac.in/web/department/physics/curriculum-msc.php), [first-year syllabus](https://www.svnit.ac.in/web/department/physics/pdf/2-Integrated%20M.Sc.%20%28Physics%29%20%28w.e.f.%202023-24%20under%20NEP%29/2A-MSC-I_Physics_wef_AY2023-24_NEP.pdf) and [second-year syllabus](https://www.svnit.ac.in/web/department/physics/pdf/2-Integrated%20M.Sc.%20%28Physics%29%20%28w.e.f.%202023-24%20under%20NEP%29/2B-MSC-II_Physics_wef_AY2023-24_NEP.pdf).
    - PH101, PDF pp. 2–3, combines mechanics with material and wave topics. PH203, PDF pp. 4–5, provides the analytical-mechanics comparison. The scheme is effective from 2023–24; the second-year document records modifications approved on 30 April 2024.
- **IIT Kanpur:** [PHY401, 2025 teaching outline](https://home.iitk.ac.in/~sabyac/PHY401_2025.html) and [official course proposals](https://www.iitk.ac.in/phy/downloads/ARC_template/ARC_Course_Structures.pdf), PHY401 on PDF p. 9.
    - The 2025 outline progresses through Newtonian, Lagrangian, rigid-body, phase-space and Hamiltonian material, then perturbations and chaos. The older proposal also includes continuum topics. The linked lecture handouts were not individually audited, and the older proposal is not presented as the current syllabus.
- **IISER Pune:** [PHY311 Classical Mechanics](https://sites.iiserpune.ac.in/~santh/course/phy311-cm/phy311-cm.html).
    - The undated course page covers analytical formulations, symmetry, modes, central-force scattering and Hamiltonian chaos. Used as a coverage comparison, without assuming a current offering year.
- **MIT:** [8.09 Classical Mechanics III, Fall 2014, lecture outline](https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/).
    - Covers analytical mechanics, rigid bodies, modes, canonical methods, perturbations, fluids and nonlinear dynamics. The fluid chapter is evidence of this course's scope, not a requirement to insert fluid mechanics into our shared path.
- **Cambridge:** David Tong's [Classical Dynamics course](https://davidtong.org/teaching/classical-dynamics/) and [rigid-body notes](https://davidtong.org/pdfs/teaching/classical-dynamics/clas3.pdf), section 3.4.4, printed pp. 58–60.
    - The course is described as a second course for final-year undergraduates. Its analytical framework supports the later stages of our route. The detailed rigid-body passage resolves the geometry correction below. No current course year is inferred from the undated page.
- **Caltech:** [Ph106abc, 2025–26 course catalogue](https://physics.caltech.edu/academics/course-catalog/ph-106-abc).
    - The mechanics part includes analytical methods, normal modes, central forces and rigid bodies. The remaining parts cover electromagnetism and relativity. The whole Classical Physics course should therefore not be treated as a mechanics checklist.

## Corrections made after the baseline commit

### A01: Distinguish the two roles of mass

- File: `momentum-forces-and-newtons-laws.mdx`.
- Added inertial and gravitational mass, their experimental equivalence and universality of free fall under the existing weight model.
- Reason: The baseline introduced inertial mass and weight but left their connection implicit. This is a Newtonian conceptual distinction; it does not require introducing general relativity here.
- Evidence: [OpenStax, College Physics for AP Courses, section 6.5](https://openstax.org/books/college-physics-ap-courses/pages/6-5-newtons-universal-law-of-gravitation), subsection on gravitational and inertial mass.

### A02: Complete the scattering-frame connection

- File: `gravitation-and-central-force-motion.mdx`.
- Added scattering-angle and differential cross-section transformations between laboratory and centre-of-mass frames, including the solid-angle Jacobian and mass dependence.
- Reason: Naming the two frames did not explicitly include converting measured scattering distributions between them.
- Evidence: Taylor sections 14.7–14.8; KB section 7.4; GPS section 3.11.

### A03: Make constraint terminology searchable

- File: `lagrangian-mechanics.mdx`.
- Added “scleronomic” and “rheonomic” alongside time-independent and time-dependent constraints.
- Reason: The concepts were already present. This is a terminology refinement, not a previously absent branch of mechanics.
- Evidence: SVNIT PH203's constraints subsection.

### A04: Clarify the normal-mode test

- File: `coupled-oscillations-and-normal-modes.mdx`.
- Named the secular equation and characteristic determinant. Added accidental zero modes and higher-order stability analysis.
- Reason: A zero eigenvalue is not always explained by a continuous symmetry and does not, by itself, settle stability. The existing nonlinear segment already covers limits of linearisation; the warning belongs at its earlier use too.
- Evidence: SVNIT PH203 names the secular equation; GPS sections 6.1–6.3 and Taylor section 11.5 provide the small-oscillation framework. The zero-mode qualification is an audit inference from the quadratic approximation: a vanishing quadratic term leaves higher-order terms undecided.

### A05: Correct and complete spatial-rotation descriptions

- File: `three-dimensional-rigid-body-dynamics.mdx`.
- Named Euler's rotation theorem about a fixed point and orientation reconstruction from angular velocity.
- Replaced the ambiguous pairing of an inertia ellipsoid with an angular-momentum sphere. The checklist now distinguishes representations before naming Poinsot's inertia ellipsoid, invariable plane, polhode and herpolhode.
- Reason: In angular-velocity components, the energy and angular-momentum constraints generally define two ellipsoids. In angular-momentum components, the fixed-magnitude constraint is a sphere. Mixing those descriptions without identifying the coordinates obscures the construction.
- Evidence: GPS section 4.6; SVNIT PH101's rigid-body subsection; Tong sections 3.1 and 3.4.4.

### A06: Complete the Hamiltonian variational connection

- File: `hamiltonian-mechanics.mdx`.
- Added Maupertuis' principle and abbreviated action, with fixed energy, fixed endpoint configurations and variable transit time for a time-independent Hamiltonian.
- Named point transformations and induced momentum transformations. Expanded the existing bracket-properties entry with antisymmetry, the product rule and Jacobi identity.
- Reason: Hamilton's principle alone does not cover the distinct fixed-energy variational problem. The other additions make existing general headings easier to locate in references.
- Evidence: GPS sections 8.6 and 9.1–9.6; SVNIT PH203's variational and canonical-transformation subsections. The restrictions were checked against GPS pp. 356–359, rather than treating every “least action” heading as the same principle.

## Review of all fourteen segments

“No change” means no additional topic was justified by this comparison within the stated scope. It does not claim that every possible model is listed.

1. **Physical quantities and measurement**
    - Baseline covers units, dimensions, uncertainty, scaling, estimates and data interpretation. No change. HRW chapter 1 provides the introductory baseline; the data entries intentionally extend it. Detailed experimental statistics belongs in the measurement and mathematics review.
2. **Kinematics**
    - Baseline covers general motion descriptions before one-dimensional, projectile, relative-motion and circular models. No change. Compare HRW chapters 2–4 and Taylor chapter 1. The model headings avoid making dimensionality the definition of velocity or acceleration.
3. **Momentum, forces and Newton's laws**
    - Force models, Galilean frames, free-body diagrams and elementary contact constraints are present. Applied A01. Compare HRW chapters 5–6 and Taylor chapter 1. General drag remains deliberately deferred.
4. **Work and energy**
    - Work, power, potential, system accounting and conservative-field conditions are present. No change. Compare HRW chapters 7–8 and Taylor chapter 4. The main problem here is missing multivariable mathematics, not another physics segment.
5. **Impulse, momentum and collisions**
    - Includes particle systems, centre of mass, restitution, oblique impacts, recoil and open-system momentum balances. No change. Compare HRW chapter 9, Taylor chapter 3 and KB chapters 7–8. Rockets already belong to the committed baseline, not this audit's additions.
6. **Circular and rotational motion**
    - Includes banking, vertical-circle contact conditions, planar rigid motion, torque, angular momentum, rolling and rigid equilibrium. No change. Compare HRW chapters 6 and 10–12. It is the longest segment, but its internal sections support the agreed grouping; length alone is not grounds for another split.
7. **Oscillations**
    - Includes damping regimes, forcing, resonance distinctions, superposition, Fourier response and Green's-function response. No change. Compare Taylor chapter 5 and KB sections 2.2–2.8. Transform methods and Fourier mathematics need explicit support later.
8. **Non-inertial reference frames**
    - Translating and rotating observers, transport, apparent forces and Earth-based models are present. No change. Compare Taylor chapter 9 and KB chapter 5. Relativistic coordinate transformations are outside this segment.
9. **Gravitation and central-force motion**
    - Field theory, extended sources, effective radial motion, Kepler motion, virial relations and scattering are present. Applied A02. Compare Taylor chapters 8 and 14, KB chapters 4 and 6–7, and GPS chapter 3.
10. **Lagrangian mechanics**
    - Constraints, virtual work, action, symmetry and representative models are present. Applied A03. Compare Taylor chapters 6–7 and GPS chapters 1–2. Retained the explicit caution about nonholonomic constraints; arbitrary velocity constraints cannot simply be substituted into Hamilton's principle.
11. **Coupled oscillations and normal modes**
    - Includes matrix modes, damping, chains and the introductory continuum connection. Applied A04. Compare Taylor chapter 11, KB chapter 11 and GPS chapter 6. The string field-action example is a bridge, not a complete continuum or field-theory curriculum.
12. **Three-dimensional rigid-body dynamics**
    - Inertia tensors, Euler equations, free rotation and tops are present. Applied A05. Compare Taylor chapter 10, GPS chapters 4–5 and Tong's rigid-body chapter. This develops orientation and spatial dynamics beyond the earlier planar treatment.
13. **Hamiltonian mechanics**
    - Canonical methods, Hamilton–Jacobi theory, integrability, recurrence and perturbation theory are present. Applied A06. Compare GPS chapters 8–10 and 12, KB chapters 12 and 14, and Tong's course outline. Singular constrained systems remain an overview.
14. **Nonlinear dynamics and approximation methods**
    - Stability, perturbative approximations, nonlinear oscillators, maps, bifurcations, chaos and numerical diagnostics are present. No change. Compare Taylor chapter 12, KB chapters 13–14 and appendices C–D, GPS chapter 11 and MIT's nonlinear outline. Specialised dynamical-systems theory continues beyond this endpoint.

## Continuity and scope decisions

The opening route develops descriptions, Newtonian dynamics, energy, particle systems and rotation. Oscillations and changing observers then support the more general analytical formulations. Lagrangian mechanics supplies a common treatment for coupled coordinates and rigid bodies; Hamiltonian mechanics leads into phase-space and nonlinear methods.

This order is workable, but it is not uniquely required. Taylor introduces central-force motion after Lagrangian mechanics; our earlier Newtonian treatment is also viable. Our first normal-mode treatment uses a static conservative equilibrium, avoiding dependence on later gyroscopic dynamics. The advanced rigid-body segment can then use both analytical mechanics and the existing rotating-frame machinery.

The graph currently encodes a required curriculum sequence. It should not be read as proof that every earlier model is mathematically necessary for every later concept. In particular, this audit does not justify restoring redundant mathematics edges merely to reproduce textbook chapter order.

Keep these boundaries visible during later review:

- **Fluids, elasticity and full continuum mechanics:** deferred routes. Introductory mechanics books and some university courses include them. Their absence here is deliberate, not evidence that they lie outside classical mechanics.
- **General drag and terminal-speed models:** deferred under the author's earlier fluid-resistance decision. Linear oscillator damping stays here. This is a real difference from Taylor's introductory route, not an unnoticed omission.
- **Electromagnetic particle models and relativistic mechanics:** future domain connections. They occur in several source books but require concepts outside this path.
- **Specialist celestial mechanics:** restricted three-body dynamics, Lagrange points, detailed orbit perturbations and orbit determination remain future development. Hohmann transfers and orbital elements are representative models, not a complete celestial-mechanics treatment.
- **Geometric mechanics and field theory:** full Lie-group machinery, symplectic reduction, constrained Hamiltonian algorithms and continuous-field Hamiltonians remain extensions. Quaternion orientation methods are also a useful future numerical extension, not required for the present Euler-angle route.
- **Depth:** potential theory, detailed scattering and the later analytical material go beyond a typical introductory course. Their presence makes sense for the agreed broad foundation, but the shared `Core` label does not imply equal difficulty or study time.

## Mathematics still required

The physics additions do not fix these outstanding prerequisites. Build the relevant mathematics segments, then link each at its first required point and let later segments inherit it.

- Algebra, functions, graphs and elementary geometry before the current calculus and vector entries.
- Partial derivatives, gradients, line integrals, multiple integrals and conservative-field tests by Work and energy.
- Fourier methods, complex representation where chosen, convolution and Green's functions by general oscillator response.
- Vector calculus, curvilinear differential operators, series expansions and introductory boundary-value PDEs for gravitational potential theory.
- Variational calculus and constrained variations for Lagrangian mechanics.
- Matrices, eigenvalues, quadratic forms and systems of differential equations for normal modes; tensor and rotation methods for spatial rigid bodies.
- First-order PDEs and characteristics for Hamilton–Jacobi theory.
- Nonlinear differential equations, stability, asymptotic methods and numerical analysis for the final segment.

These are the largest remaining continuity gaps. Avoid describing the curriculum as fully prerequisite-complete until that review is finished.

## Validation

- All 29 existing tests pass.
- Astro checks 75 files with no errors, warnings or hints.
- The production static build succeeds.
- The content audit validates 19 roadmap entries, including fourteen published physics segments in the agreed sequence, with topic-only bodies and no redundant direct physics prerequisites.
- `git diff --check` passes.

These results apply to the current working tree, including the existing uncommitted Linear ordinary differential equations file and implementation changes. The physics-only baseline commit deliberately excludes those files. These checks establish file and graph integrity; they do not certify physics knowledge or replace author review.
