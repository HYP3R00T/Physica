# Electromagnetism curriculum

Proposed on 16 September 2026. Twelve segments are visible for author review. Each contains topics and subtopics, with no outcome section. The first draft was committed as `221ba25` before the source audit. The subsequent audit refinements were approved for commit on 16 September 2026.

## Proposed sequence

- Electric charge, fields and potential
    - Electrostatic interactions, Gauss's law, potential, energy and dipoles.
- Electrostatic boundary-value problems
    - Conductors, potential equations, solution methods, multipoles and capacitance.
- Polarisation and electric fields in matter
    - Bound charge, constitutive response, dielectric interfaces, energy and forces.
- Electric current and conduction
    - Charge transport, steady conduction, sources, dissipation and direct-current networks.
- Magnetic fields and magnetostatics
    - Lorentz force, steady-current fields, magnetic potentials and dipoles.
- Magnetisation and magnetic materials
    - Bound currents, material response, demagnetising fields and hysteresis.
- Electromagnetic induction and circuit dynamics
    - Induction, inductance, energy conversion, transients and alternating-current circuits.
- Maxwell's equations and field conservation
    - Displacement current, causal potentials, field energy, momentum and stress.
- Electromagnetic waves and material response
    - Propagation, polarisation, dispersion, absorption and interfaces.
- Electromagnetic waveguides and resonators
    - Transmission lines, guided modes, cavities and dielectric confinement.
- Relativistic electrodynamics
    - Field transformations, covariant equations and the particle–field action.
- Electromagnetic radiation and scattering
    - Multipole radiation, antennas, moving charges, scattering and self-interaction limits.

The grouping separates physical questions that need distinct methods. Electrostatic boundary problems develop tools beyond direct source integration. Material response introduces macroscopic constitutive models. Circuit dynamics treats the quasistatic limit before the full propagation problem. Radiation brings together sources, outgoing fields and energy loss.

Basic circuit theory belongs here because it connects charge conservation, energy transfer and induction. Active devices, semiconductor electronics, communication systems and detailed antenna engineering are later continuations. Optical interfaces and guided modes appear as electromagnetic models; imaging, optical instruments and specialised wave optics can receive their own strand.

## Dependencies and reading order

The strand begins at Work and energy. Each later node requires the preceding electromagnetic segment as a cumulative reading step, following the existing roadmap convention. This is not a claim that every earlier application is indispensable to every later topic.

- Induction and circuit dynamics adds Linear ordinary differential equations for transient and driven systems.
- Electromagnetic waves adds Wave motion and propagation for the shared wave framework. Electromagnetic polarisation and interfaces are developed within this strand, without requiring the entire acoustics route.
- Relativistic electrodynamics adds Lagrangian mechanics for action methods. Its special-relativity foundation still needs a separate authored prerequisite.

Relativity precedes the final radiation segment so relativistic source motion has an explicit conceptual home. Elementary dipole radiation could be studied earlier; it is kept with the broader source-radiation framework here.

The route does not require completion of thermal physics. When magnetic or dielectric models need statistical and quantum explanations, those connections should be attached at the relevant depth rather than imposed on the beginning of electromagnetism.

## Foundations and scope still to review

- Vector calculus is needed from the first segment: gradients, flux, divergence, curl and the integral theorems. Existing vector and single-variable calculus content does not replace it.
- Boundary-value methods need multivariable calculus, partial differential equations, distributions, orthogonal expansions, special functions and Green's functions.
- Phasors and frequency-dependent response need complex numbers, Fourier methods and linear-response mathematics.
- Thermal and quantum physics are needed for microscopic accounts of conduction, magnetic order, spin response, ferroelectricity and superconductivity. The early material descriptions remain phenomenological, with microscopic topics labelled as overviews.
- Special relativity, tensor notation and relativistic particle dynamics need an independent foundation before the covariant formulation. Listing those terms in the segment does not complete that prerequisite.
- Numerical electrostatics needs discretisation and convergence methods. More extensive computational electromagnetics belongs to a later scope decision.

`Core` retains the project's shared-route meaning, not a uniform difficulty level. The early segments develop undergraduate foundations. Covariant formulations, advanced boundary methods and radiation reaction reach graduate material. Quantum electrodynamics, full plasma physics, nonlinear optics and specialist material theories are beyond this proposed shared route.

No approved mechanics, waves or thermal segment has been rewritten or given new dependencies in this draft. Cross-strand links can be refined after author review.

## Initial source comparison

The [IIT Kanpur Physics course booklet](https://iitk.ac.in/phy/data/PHY-CourseBooklet-18-03-24.pdf), retrieved with a 2026 cover, provides an initial scope reference. PHY113 covers introductory fields and material response. PHY552 includes boundary methods, conservation, waves, radiation and confinement; PHY614 extends to relativistic fields and moving-charge radiation. This supports the intended range without establishing our twelve boundaries as an institutional standard.

The [electromagnetism audit](electromagnetism-audit.md) records the subsequent comparison with three local books and university courses, the refinements, and the remaining prerequisite gaps. The twelve-segment structure is retained.
