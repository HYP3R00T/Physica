# Quantum mechanics curriculum

Proposed on 16 September 2026. Twelve segments are visible for author review, with `draft: false`. The baseline was committed as `748fa21` before the [source audit](quantum-mechanics-audit.md). Audit refinements retain twelve segments and were approved for commit on 16 September 2026.

## Proposed sequence

- Quantum phenomena and matter waves
- Wavefunctions and Schrödinger dynamics
- Quantum states, observables and measurement
- Quantum angular momentum and spin
- Central potentials and the hydrogen atom
- Quantum symmetries and charged-particle motion
- Stationary quantum approximation methods
- Quantum transitions and time-dependent methods
- Composite quantum systems and identical particles
- Quantum scattering theory
- Quantum propagators and path integrals
- Quantum measurement and open systems

The sequence develops experimental evidence, wave mechanics, the state-space formulation, angular structure and practical methods before reaching composite systems and advanced formulations. The final segments introduce tools used across graduate quantum mechanics. `Core` means a shared route through the subject, not an elementary difficulty level.

## Grouping and boundaries

Wavefunctions and Schrödinger dynamics includes one-dimensional wells, barriers and the oscillator. These models establish the wave description together. Operator methods then revisit the oscillator to develop ladder operators and coherent states. This is a change of formulation, not another catalogue of oscillator problems.

Angular momentum introduces tensor products for coupled angular degrees of freedom. Composite quantum systems later develops general subsystem states, entanglement, particle exchange and occupation numbers. Density operators first appear with the measurement postulates, so mixed states are available before reduced dynamics.

Central potentials supplies the unperturbed hydrogen problem. Stationary methods adds field shifts and fine-structure corrections; time-dependent methods adds transition probabilities. Detailed atomic and molecular structure can branch from those foundations. Molecular scale separation appears with composite systems after the adiabatic theorem.

The endpoint is a broad nonrelativistic quantum-mechanics route with advanced extensions. Relativistic wave equations, quantum field theory, full many-body methods, quantum information protocols and quantised-light theory remain later continuations. Fock-space basics do not constitute a quantum field theory course. The transition segment now introduces electromagnetic mode quantisation and photon states before spontaneous emission. Full quantum optics and relativistic field theory remain separate continuations.

## Dependencies

Each segment after the first follows its immediate predecessor through a dependency link. This implements the agreed cumulative reading trail, rather than claiming every topic in the preceding segment is a strict prerequisite for every topic in the next.

- Quantum phenomena starts from Wave packets, dispersion and periodic media. Work and energy and Linear ordinary differential equations are already inherited through that wave and mechanics route, so their redundant direct links were removed.
- Angular momentum adds Magnetic fields and magnetostatics for magnetic moments and spin-field interactions. Its inherited electric-field foundations also support the later Coulomb problem.
- Time-dependent methods adds Electromagnetic waves and material response for radiation-induced transitions.
- Path integrals adds Hamiltonian mechanics for action and canonical formulations.

No reverse prerequisite links were added to existing optics or thermal segments. Their quantum requirements should be connected after this sequence is reviewed. Such links need a cycle check and a review of inherited scope, particularly because the quantum strand itself uses existing wave and electromagnetic foundations.

## Missing foundations and review questions

- Complex numbers, probability distributions and complex inner-product spaces are needed near the beginning. Existing vector operations do not replace linear algebra.
- Operator methods require eigenvalue problems, spectral decompositions, matrix exponentials and tensor products. Infinite-dimensional spaces also require care with domains and continuous spectra.
- Central potentials needs multivariable calculus, spherical coordinates and special functions. Scattering and propagators require Fourier analysis, Green functions and differential equations beyond the present mathematical coverage.
- Symmetry topics need group representations and introductory topology. These should be linked when the corresponding mathematics is authored.
- Compton scattering uses relativistic kinematics. Fine-structure corrections and the spin-statistics connection also point beyond nonrelativistic theory. A dedicated relativity foundation is still missing; these entries identify that requirement rather than supplying a relativistic derivation.
- Imaginary-time thermal connections and environmental fluctuations need statistical foundations. They are introductory connections here, not substitutes for thermal physics.
- Review whether the last three segments belong on the shared route at their current depth, or should become advanced continuations. No specialised strand has been created merely to settle that question prematurely.
- Before linking this strand into optics and thermal physics, check the placement of transition theory, identical particles, field quantisation and open-system dynamics. Elementary field quantisation is now included, but specialist quantum-optical and material requirements still need their own coverage.

These gaps remain explicit. The proposed sequence is not yet a fully connected course for a reader starting without the supporting mathematics.

## Initial source comparison

[MIT 8.05 Quantum Physics II](https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/pages/syllabus/) groups state-space structure, dynamics, two-state systems, angular momentum, radial methods and identical particles. This supports the middle of the proposed route without determining our segment boundaries.

[MIT 8.06 Quantum Physics III readings](https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2016/pages/readings/) provides an initial comparison for perturbations, semiclassical methods, adiabatic evolution, transitions and scattering. The path-integral and open-system endpoints extend beyond this initial undergraduate comparison and need graduate-course and textbook review.

The subsequent [source audit](quantum-mechanics-audit.md) compares three local textbooks and courses from SVNIT, IIT Kanpur, IIT Bombay and MIT. It records the refinements, evidence limits and outstanding prerequisites. The advanced endpoint is retained as a proposed shared foundation, not a claim to cover every graduate specialisation.
