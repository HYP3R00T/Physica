# Roadmap segment index

Segments are grouped by domain and strand in dependency order, including drafts. Indented names are direct prerequisites, which may belong to other domains or strands.

Regenerate with `pnpm docs:roadmap` after editing the segment frontmatter.

## Mathematics

### Foundations

- Sets, relations and functions

### Algebra

- Algebra
  - Sets, relations and functions
- Matrices and determinants
  - Algebra
- Complex numbers and complex exponentials
  - Trigonometry
- Linear algebra
  - Matrices and determinants
  - Vectors
  - Complex numbers and complex exponentials
- Groups and symmetry
  - Linear algebra
- Hilbert spaces and operators
  - Linear algebra
  - Partial differential equations and boundary-value problems
  - Probability distributions and statistical methods

### Probability and statistics

- Probability and statistics
  - Algebra
- Probability distributions and statistical methods
  - Probability and statistics
  - Multivariable calculus

### Geometry and vectors

- Trigonometry
  - Algebra
- Analytical geometry
  - Trigonometry
- Vectors
  - Analytical geometry
- Tensors
  - Linear algebra
  - Multivariable calculus
- Differential geometry for gravitation
  - Tensors
  - Vector calculus and fields
  - Relativistic dynamics and electromagnetism

### Calculus and analysis

- Differential calculus
  - Analytical geometry
- Integral calculus
  - Differential calculus
- Sequences, series and approximations
  - Integral calculus
- Multivariable calculus
  - Integral calculus
  - Vectors
  - Sequences, series and approximations
  - Matrices and determinants
- Calculus of variations
  - Multivariable calculus
  - Linear differential equations
- Complex analysis
  - Complex numbers and complex exponentials
  - Multivariable calculus
  - Sequences, series and approximations
- Vector calculus and fields
  - Multivariable calculus
- Asymptotic and perturbation methods
  - Complex analysis
  - Linear differential equations
  - Sequences, series and approximations
- Fourier and Laplace transforms
  - Complex analysis
  - Linear differential equations
- Special functions
  - Linear differential equations
  - Complex analysis

### Differential equations

- Introductory differential equations
  - Integral calculus
- Linear differential equations
  - Introductory differential equations
  - Linear algebra
- Partial differential equations and boundary-value problems
  - Vector calculus and fields
  - Fourier and Laplace transforms
  - Special functions

## Physics

### Methods

- Measurement and physical reasoning
  - Algebra
  - Differential calculus
- Computation, inference and instruments
  - Measurement and physical reasoning
  - Magnetism, induction and changing currents
  - Partial differential equations and boundary-value problems
  - Probability distributions and statistical methods
- Advanced numerical methods
  - Computation, inference and instruments
  - Classical statistical mechanics
- Experimental methods across branches
  - Advanced numerical methods
  - Atoms and molecules
  - Semiconductors and collective material behaviour
  - Structure, decay and reactions
  - Optical systems and propagation
- Reconstructing a substantial physical result
  - Experimental methods across branches

### Waves

- Ray optics
  - Analytical geometry
  - Measurement and physical reasoning
- Oscillations
  - Work, conservation and particle systems
  - Linear differential equations
  - Sequences, series and approximations
- Wave propagation and sound
  - Oscillations
- Wave optics
  - Ray optics
  - Wave propagation and sound
- Optical systems and propagation
  - Wave optics
  - Field energy and electromagnetic waves
  - Partial differential equations and boundary-value problems
- Quantum optics and light–matter physics
  - Lasers and controlled atoms
  - Advanced dynamics, scattering and relativistic quantum mechanics
  - Quantum statistical mechanics
  - Classical fields

### Mechanics

- Motion and Newtonian dynamics
  - Measurement and physical reasoning
  - Vectors
  - Introductory differential equations
- Work, conservation and particle systems
  - Motion and Newtonian dynamics
  - Integral calculus
- Rotation, gravity and open systems
  - Work, conservation and particle systems
- Analytical mechanics and normal modes
  - Rotation, gravity and open systems
  - Oscillations
  - Multivariable calculus
  - Calculus of variations
  - Tensors
- Elasticity and elementary fluids
  - Rotation, gravity and open systems
- Continuous media, elasticity and fluid dynamics
  - Elasticity and elementary fluids
  - Partial differential equations and boundary-value problems
  - Systematic thermodynamics
- Hamiltonian structure and nonlinear dynamics
  - Analytical mechanics and normal modes
  - Computation, inference and instruments

### Electromagnetism

- Electrostatics
  - Work, conservation and particle systems
- Steady currents and DC circuits
  - Electrostatics
- Magnetism, induction and changing currents
  - Steady currents and DC circuits
  - Rotation, gravity and open systems
  - Oscillations
- Field theory and boundary-value electrostatics
  - Magnetism, induction and changing currents
  - Partial differential equations and boundary-value problems
- Field energy and electromagnetic waves
  - Field theory and boundary-value electrostatics
  - Wave propagation and sound
- Radiation and advanced electrodynamics
  - Field energy and electromagnetic waves
  - Relativistic dynamics and electromagnetism

### Thermal

- Heat and introductory thermodynamics
  - Work, conservation and particle systems
- Systematic thermodynamics
  - Heat and introductory thermodynamics
  - Multivariable calculus
- Classical statistical mechanics
  - Systematic thermodynamics
  - Analytical mechanics and normal modes
  - Probability distributions and statistical methods
- Quantum statistical mechanics
  - Classical statistical mechanics
  - Angular momentum, symmetry and composite systems
- Interactions, critical phenomena and nonequilibrium
  - Quantum statistical mechanics
  - Computation, inference and instruments

### Space

- Special relativity: first treatment
  - Work, conservation and particle systems
  - Wave propagation and sound
- Relativistic dynamics and electromagnetism
  - Special relativity: first treatment
  - Analytical mechanics and normal modes
  - Field energy and electromagnetic waves
- Classical fields
  - Hamiltonian structure and nonlinear dynamics
  - Field energy and electromagnetic waves
  - Relativistic dynamics and electromagnetism
  - Groups and symmetry
  - Tensors
  - Asymptotic and perturbation methods
- General relativity and relativistic cosmology
  - Differential geometry for gravitation
  - Classical fields
  - Systematic thermodynamics
- Collective charged matter
  - Radiation and advanced electrodynamics
  - Continuous media, elasticity and fluid dynamics
  - Interactions, critical phenomena and nonequilibrium
  - Hamiltonian structure and nonlinear dynamics
- Introductory quantum field theory
  - Classical fields
  - Advanced dynamics, scattering and relativistic quantum mechanics
  - Quantum statistical mechanics
- Stars, galaxies and the expanding universe
  - Structure, decay and reactions
  - Continuous media, elasticity and fluid dynamics
  - Radiation and advanced electrodynamics
  - Optical systems and propagation

### Quantum

- Evidence and the departure from classical models
  - Special relativity: first treatment
  - Heat and introductory thermodynamics
  - Wave optics
  - Electrostatics
- States, dynamics and solvable systems
  - Evidence and the departure from classical models
  - Hilbert spaces and operators
  - Oscillations
- Angular momentum, symmetry and composite systems
  - States, dynamics and solvable systems
  - Rotation, gravity and open systems
- Approximations and transitions
  - Angular momentum, symmetry and composite systems
  - Field energy and electromagnetic waves
- Advanced dynamics, scattering and relativistic quantum mechanics
  - Approximations and transitions
  - Relativistic dynamics and electromagnetism
  - Analytical mechanics and normal modes
- Information in quantum systems
  - Advanced dynamics, scattering and relativistic quantum mechanics
  - Probability distributions and statistical methods

### Matter

- Atoms and molecules
  - Approximations and transitions
  - Quantum statistical mechanics
- Crystals, phonons and electrons
  - Approximations and transitions
  - Quantum statistical mechanics
  - Analytical mechanics and normal modes
- Fluctuating and living matter
  - Interactions, critical phenomena and nonequilibrium
  - Continuous media, elasticity and fluid dynamics
- Lasers and controlled atoms
  - Atoms and molecules
  - Optical systems and propagation
- Semiconductors and collective material behaviour
  - Crystals, phonons and electrons
  - Field theory and boundary-value electrostatics
  - Interactions, critical phenomena and nonequilibrium
  - Advanced dynamics, scattering and relativistic quantum mechanics
- Structure, decay and reactions
  - Advanced dynamics, scattering and relativistic quantum mechanics
  - Relativistic dynamics and electromagnetism
  - Quantum statistical mechanics
- Interacting quantum systems
  - Semiconductors and collective material behaviour
  - Advanced dynamics, scattering and relativistic quantum mechanics
  - Groups and symmetry
  - Tensors
  - Asymptotic and perturbation methods
- Particles, interactions and evidence
  - Structure, decay and reactions
  - Groups and symmetry
  - Tensors
  - Asymptotic and perturbation methods
