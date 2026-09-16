# Roadmap review log

The active curriculum is being rebuilt one segment at a time under the author's review. Record unresolved questions, deferred topics and placement decisions here so they can be revisited. This log is working material; an entry does not automatically add a topic to the curriculum.

## Agreed approach

- Preserve the earlier curriculum in `archive/roadmap/` as a reference.
- Let physics requirements identify mathematics segments to create. Give each mathematics segment coherent coverage at its stated level, including standard material beyond the immediate physics application.
- Reuse or create mathematics segments as required, checking their prerequisites back to the Class 10 baseline.
- Use coherent subject strands that can grow. A new segment does not automatically need a new strand.
- Discuss and inspect each segment before treating its content as settled. Drafts remain hidden until explicitly made visible.
- Use topic and subtopic names in study checklists, with searchable words wherever possible.

The structural principles are in [Organising a learning roadmap](learning-roadmap-structure.md). File conventions are in [Writing the physics roadmap](roadmap.md).

## Open items

### R001 — Choose the first physics segment

- Status: Open
- Question: Which physics segment should begin the reviewed curriculum, and where should its coverage stop?
- Follow-up: The author approved separating measurement from one-dimensional motion. See R016 for the replacement files and dependency changes.
- Resolution: The first draft was requested on 14 September 2026. Content approval remains pending.

### R002 — Establish mathematics strands as requirements emerge

- Status: Deferred
- Question: Which established mathematical subject areas need their own strands in the physics-focused curriculum?
- Reason: The previous six-strand grouping was provisional. The reviewed physics requirements should determine the material we include.
- Revisit when: The first physics segment identifies mathematical requirements.
- Resolution: Calculus is the first agreed mathematics strand, initially containing Limits and derivatives and Antiderivatives and integrals. Further strand choices remain deferred. The archived grouping is a reference, not a requirement.

### R003 — Mathematics required for measurement and motion

- Status: Open
- Requirements: Scientific notation, algebra and equation rearrangement, functions and graphs, slopes, derivatives, definite integrals and elementary uncertainty propagation.
- Question: Which requirements belong to the assumed Class 10 baseline, and which need mathematics segments? How much treatment is appropriate for the first physics segment?
- Next step: Review the new Limits and derivatives and Antiderivatives and integrals segments. Revisit algebra, functions and graphs later, as requested; the first calculus segment has an empty dependency list until those earlier segments are defined.
- Resolution: Calculus is now linked through Antiderivatives and integrals, which requires Limits and derivatives. All three segments are visible for inspection. Earlier mathematical prerequisites and the depth needed for uncertainty propagation remain open.

### R005: Challenge problems and a possible question bank

- Status: Deferred
- Decision: Omit By the end sections for now; the topic checklist defines the current segment content.
- Proposal: Later, select one or two substantial problems that draw on the preceding material and help readers assess their understanding through independent work. Consider separate problem pages or a question bank if useful.
- Revisit when: The curriculum structure is established and the relevant segments have been reviewed.
- Resolution: Pending. Do not add challenge sections or build question-bank functionality yet.

### R007: Earlier requirements for the expanded calculus segments

- Status: Deferred
- Question: Which earlier segments will cover algebra, function families, trigonometry, inverse functions, hyperbolic functions, coordinate geometry, parametric curves and polar coordinates? Elementary probability is also needed for the probability applications of integration.
- Reason: The calculus checklists now cover introductory single-variable differential and integral calculus as subjects, rather than only the immediate motion examples. Earlier segments have not yet been authored, as requested.
- Next step: Review those prerequisites before claiming a complete route from the Class 10 baseline. Their absence from frontmatter is temporary; mathematical dependency checks cannot detect unauthored requirements.
- Resolution: Pending. No new prerequisite files were created during this review.

### R008: Later calculus and analysis coverage

- Status: Deferred
- Topics: Sequence and series convergence; power series and Taylor expansions with remainder estimates; differential equations beyond recovery from a prescribed derivative; multivariable calculus; vector calculus; deeper real analysis and integration theory.
- Reason: These warrant their own treatments beyond the two current single-variable segments. Their placement is a scope boundary, not a judgment that they are unnecessary for physics.
- Revisit when: Planning the next calculus or analysis segments. Check whether the current segments need splitting further after the author's review.
- Resolution: Pending.

### R010: Review Momentum, forces and Newton's laws

- Status: Open
- Scope: Mass, momentum, interactions, Newton's laws, common force models and basic free-body diagrams.
- Next step: Focus on `momentum-forces-and-newtons-laws.mdx` until its content is agreed. Follow-on segment names and boundaries are deferred under R012.
- Mathematical requirements: Vectors and vector operations is now linked alongside Measurement and motion. It requires Trigonometric functions and identities. Earlier algebra, functions and simultaneous linear equations still need review and explicit dependencies.
- Resolution: Mass precedes momentum, momentum precedes forces, and microscopic origins have been removed. The two proposed follow-on files were removed at the author's request; their material is parked below.

### R011: Mechanics topics following the force introduction

- Status: Deferred
- Topics: Impulse, momentum conservation, collisions and coefficient of restitution; circular and general multidimensional motion; rotating reference frames, centrifugal force and Coriolis force; oscillations and spring dynamics; drag and variable-force differential equations; extended-body equilibrium and torque.
- Reason: The current force segment uses constant-mass translational dynamics and introduces spring force without a full treatment of oscillations. These related topics need subsequent segments or an explicit scope review.
- Revisit when: Reviewing the force segment and selecting the next mechanics segment.
- Resolution: Pending. No placement or strand assignment fixed yet.

### R012: Park force applications and accelerating-frame material

- Status: Deferred
- Question: Should the proposed Equilibrium and constrained motion and Accelerating reference frames treatments be separate segments, combined, or organised differently? Their titles are provisional.
- Decision: The provisional files and subsequent Applications of Newton's laws segment were removed. Basic equilibrium, surface and friction examples now sit alongside free-body diagrams in Momentum, forces and Newton's laws. Connected-body constraints and accelerating-frame material remain parked; do not create replacement segments without settling their scope.
- Revisit when: Choosing the next conceptual step after Newton's laws. Decide whether connected bodies and constraint relationships form a substantial subject of their own. Review accelerating frames separately.
- Material to revisit:
    - Contact conditions beyond the basic surface and friction examples
    - Contact between accelerating bodies and shared acceleration
    - Stacked bodies, friction at each interface, onset of slipping and separate accelerations
    - Connected bodies, pulley tension and string-length constraints
    - Apparent weight and accelerating lifts described from an inertial ground frame
    - Translating reference frames with constant acceleration and relative acceleration
    - Inertial forces, their direction and frame dependence, and equations in accelerating frames
    - Equilibrium relative to an accelerating frame
    - Comparison of lift-frame and ground-frame descriptions
- Ordering note: Inclined planes should precede stacked bodies. Establish inertial-frame analysis before introducing accelerating-frame descriptions. These teaching preferences do not fix the eventual segment split.
- Resolution: Pending.

### R013: Review trigonometry and vector algebra

- Status: Open
- Files: `trigonometric-functions-and-identities.mdx` in Trigonometry; `vectors-and-vector-operations.mdx` in Algebra.
- Scope: Introductory trigonometric functions, graphs, inverses, identities, equations and triangle relations; geometric vectors, components, products and elementary vector geometry in two and three dimensions.
- Connections: Vectors requires trigonometry. Momentum, forces and Newton's laws requires vectors and Measurement and motion. Limits and derivatives also requires trigonometry for its existing function and differentiation topics.
- Earlier requirements: Algebra, functions and graphs, Cartesian coordinates, elementary geometry and simultaneous equations remain to be organised. The empty trigonometry dependency list is provisional, not a claim that it requires no earlier knowledge.
- Later coverage: Abstract vector spaces, general linear maps and matrices, multilinear algebra and tensors remain for later segments. Small-angle limits belong to calculus; complex exponential representations require a later complex-number treatment.
- Reference check: Trigonometry terminology and scope checked against [OpenStax Precalculus 2e](https://openstax.org/books/precalculus-2e/pages/7-key-concepts), including its [triangle and vector material](https://openstax.org/books/precalculus-2e/pages/8-key-concepts). The vector checklist also extends to standard introductory three-dimensional vector algebra.
- Next step: Inspect both checklists and confirm their boundaries. Review the missing earlier requirements without treating their current omission as permanent.
- Resolution: Pending. Both segments are visible for review; no additional preparatory files created.

### R014: Retire the generic applications segment

- Status: Resolved
- Decision: Remove `applications-of-newtons-laws.mdx`. Applications alone do not define a coherent segment boundary; later mechanics also applies Newton's laws.
- Retained: A short list alongside free-body diagrams covers particle equilibrium, horizontal and inclined surfaces, angled forces, friction limits, angle of repose, sliding and acceleration from the net force. Existing system selection, force models and component equations remain in the Newton's laws segment.
- Deferred: Coupled-body motion, stacked-body slipping, string-length constraints, fixed and movable pulleys, and apparent weight remain recorded under R012. Constraint study includes position, velocity and acceleration relations, taut-string conditions and consistency of assumed friction directions. Accelerating reference frames remain a separate deferred concept.
- Resolution: Implemented at the author's request. No replacement applications segment created. Future segments should have a coherent subject or substantial new concept, with examples included where they support it.

### R015: Review Motion in two dimensions

- Status: Open
- Decision: Add a separate segment after Measurement and motion, with Vectors and vector operations as an independent prerequisite. Momentum, forces and Newton's laws now depends on this segment and inherits both earlier requirements.
- Scope: Vector kinematics, ideal projectile motion and relative motion in a plane. Gravity enters as a prescribed constant acceleration; its force explanation follows in Newton's laws.
- Reference check: Young and Freedman, University Physics (14th edition), section 3.3, page 75; Halliday, Resnick and Walker, Fundamentals of Physics (10th edition), section 4-4, page 70; Kleppner and Kolenkow, An Introduction to Mechanics, example 1.10, pages 21–22. All introduce basic projectile motion before their Newton's laws chapter. Taylor's Classical Mechanics treats projectile dynamics with air resistance after Newton's laws in chapter 2.
- Boundary: Circular motion remains for a later treatment of circular kinematics and dynamics. Air resistance and rotating-frame effects remain deferred. The introductory checklist covers changing velocity direction without introducing those force models.
- Next step: Review the checklist and its boundaries. The segment is visible so the existing published Newton's laws segment has a published prerequisite.
- Resolution: Pending author review.

### R016: Separate measurement and one-dimensional motion

- Status: Resolved
- Decision: Replace `measurement-and-motion.mdx` with `physical-quantities-and-measurement.mdx` and `motion-in-one-dimension.mdx`, followed by Motion in two dimensions.
- Scope: Preserve the approved measurement topics in the first file. Move straight-line kinematics, graphs, calculus, constant-acceleration models, free fall and relative motion into the second file. Explicitly include displacement over equal time intervals and during the nth second, with distance distinguished when motion reverses.
- Dependencies: Measurement has no declared prerequisite yet. Motion in one dimension requires measurement and Antiderivatives and integrals. Motion in two dimensions requires Motion in one dimension and Vectors and vector operations. Calculus is no longer a prerequisite for measurement alone; any earlier mathematics requirements remain subject to review.
- Resolution: Split approved by the author and implemented. Both replacement segments remain visible. Earlier mentions of Measurement and motion record the previous combined structure.

### R017: Organise motion around kinematics

- Status: Resolved
- Decision: Replace the one-dimensional and two-dimensional segments with `kinematics.mdx`. Physical quantities and measurement precedes it; Momentum, forces and Newton's laws follows it.
- Scope: General position, displacement, velocity, acceleration, reference frames, graphs and calculus appear once. Dimensionality belongs to the description, not the segment boundary. Rest, straight-line motion, constant acceleration, free fall, projectiles, uniform circular motion and relative-motion situations are models within kinematics.
- Boundary: Describe motion and its mathematical relationships without force laws, momentum, collision dynamics or a catalogue of solving techniques. Circular motion introduces inward acceleration, not a new force. Gravity is a prescribed acceleration at this stage.
- Dependencies: Measurement, Antiderivatives and integrals, and Vectors and vector operations are direct prerequisites. Newton's laws inherits them through Kinematics.
- Resolution: Implemented at the author's request. This supersedes the dimensional split in R015 and R016 and the deferral of circular kinematics in R015. Circular dynamics remains for later treatment.

### R018: Review Work and kinetic energy

- Status: Open
- Decision: Introduce work, translational kinetic energy, the work–energy theorem and power after Momentum, forces and Newton's laws.
- Scope: Constant and variable forces, scalar products, work along a trajectory, elementary force models and a constant-mass particle in an inertial frame. The segment remains visible for author review.
- Boundary: Potential energy, energy conservation, collision theory, rotational and internal energy remain for later segments. Uniform-gravity and spring examples concern work only. Circular dynamics remains deferred at the author's request.
- Reference check: Young and Freedman, University Physics (14th edition), chapter 6; Halliday, Resnick and Walker, Fundamentals of Physics (10th edition), chapter 7. Both introduce work and kinetic energy before potential energy and energy conservation.
- Next step: Review the topic list before committing this new file.
- Resolution: Pending author review.

### R019: Review Potential energy and energy conservation

- Status: Open
- Decision: Keep the introductory gravitational treatment inside this Classical mechanics segment, following Work and kinetic energy. No separate gravitation segment or strand is needed yet.
- Scope: Conservative work, configuration energy, uniform gravity, universal gravitation, gravitational field and potential, ideal springs, energy conservation and one-dimensional potential-energy diagrams.
- Boundaries: The spherical-mass field is stated for exterior points; shell-theorem proofs and interior fields remain for later review. Orbital motion, circular dynamics, rotating frames and escape-speed applications are not added here. The other-interaction overview was removed. Electrostatic potential energy belongs in the later electromagnetism treatment; effective atomic, molecular and nuclear potentials also remain for later study.
- Mathematics: Existing derivatives, definite integrals and vectors support this scope. Force from potential is restricted to one dimension; gradients and general multivariable potential theory remain for later mathematics.
- Next step: Review the checklist, particularly the gravitational scope and energy-accounting distinctions.
- Resolution: Pending author review. The segment is visible and uncommitted.

### R020: Review Impulse, momentum and collisions

- Status: Open
- Decision: Introduce impulse, particle-system momentum, centre-of-mass motion and momentum conservation before explicitly labelled collision, separation and recoil models. Collisions are a physical process treated through idealised models, not the endpoint of mechanics.
- Scope: Discrete fixed-mass systems, external-impulse conditions, elastic and inelastic collisions, restitution, smooth oblique impacts and elementary recoil. Distinguish zero normal separation speed from complete sticking in an oblique impact.
- Dependencies: Potential energy and energy conservation supplies energy accounting and inherits Newton's laws, vectors and calculus. No new mathematics segment is required for this introductory scope.
- Boundary: Continuous mass-distribution integrals, rockets and open-system mass flow, rough impacts involving spin, angular momentum and detailed deformation models remain for later review.
- Next step: Review the concepts, model assumptions and scope. This brings forward the impulse, collision and restitution topics parked under R011.
- Resolution: Pending author review. The file is visible and uncommitted.

### R021: Review Circular motion and its dynamics

- Status: Open
- Scope: Fixed-radius particle motion, angular quantities, radial and tangential acceleration, inertial-frame force equations and explicit horizontal and vertical circular-motion models. Circular gravitational orbits use an ideal fixed spherical source.
- Dependencies: Potential energy and energy conservation supplies vertical-circle energy methods and gravity, while inheriting Newton's laws and kinematics. Collisions are not a prerequisite merely because that segment was written first.
- Boundaries: Rigid-body rotation, torque, angular momentum, rolling, centrifugal and Coriolis forces, general orbits and Kepler's laws remain for later segments. The circular-orbit model does not attempt general orbital dynamics.
- Mathematics: Existing trigonometry, vectors, derivatives and integrals cover this scope. General variable-radius polar-coordinate acceleration is deferred.
- Next step: Review the models and constraint assumptions before committing.
- Resolution: Pending author review. The segment is visible and uncommitted.

### R022: Revisit desktop layout if the graph becomes too wide

- Status: Deferred
- Concern: Multiple paths within each strand can make the graph too wide beside both the segment list and the persistent detail panel, effectively creating three competing columns.
- Possible direction: Give the graph and segment list the main desktop space, with roughly half for each. Open segment details temporarily in an overlay or an alternate view instead of keeping a permanent detail column. The exact interaction remains undecided.
- Revisit when: More strands and branches make the existing desktop layout difficult to read or navigate.
- Decision: Keep the current layout and branching behaviour for now. Return to reviewing Circular motion and its dynamics; do not implement this layout proposal yet.
- Resolution: Pending a demonstrated layout need and author discussion.

### R023: Review Rotational motion and angular momentum

- Status: Open
- Scope: Rigid-body kinematics, torque, axial moments of inertia, rotational energy, angular momentum, rolling and explicit pulley and impact models. Rolling resistance is distinguished from static friction in ideal rolling.
- Dependencies: Circular motion and its dynamics supplies angular kinematics and radial motion. Impulse, momentum and collisions supplies particle systems, centre-of-mass motion and impact accounting. The paths genuinely converge here.
- Mathematics: Existing vector products, derivatives and single-variable integrals support the introductory treatment. Simple symmetric mass distributions can use slices and symmetry; arbitrary volume integrals and inertia tensors need later multivariable and linear-algebra treatment. Principal-axis alignment is introduced as a qualification, not a full tensor calculation.
- Boundaries: General three-dimensional rigid-body dynamics, inertia tensors, Euler equations and gyroscopic precession remain for later review. Full rigid-body equilibrium and oscillations remain separate planned subjects.
- Follow-up: The massive-pulley model introduces the simple no-slip acceleration constraint from R012. More general movable-pulley constraints and stacked-body problems remain deferred.
- Next step: Review the segment's size, model assumptions and mathematical boundaries before committing.
- Resolution: Pending author review. The file is visible and uncommitted.

### R024: Review Rigid-body equilibrium

- Status: Open
- Scope: Static force and torque balance, centre of gravity, elementary distributed loads, planar support reactions, determinacy, stability, tipping and sliding. Beams, ladders, hinged rods and loaded blocks are explicitly labelled models.
- Dependencies: Rotational motion and angular momentum supplies torque and extended-body descriptions while inheriting force, friction and energy concepts.
- Mathematics: Vector components, simultaneous linear equations and elementary definite integrals support the scope. The general earlier algebra prerequisite remains tracked under R003 and R007; no new advanced mathematics is required here.
- Boundaries: Bodies are treated as rigid. Indeterminate reactions are identified without introducing elasticity, beam bending, stress analysis or structural engineering methods. Dynamics after tipping or sliding starts remains outside the static models.
- Next step: Review the topic list and model assumptions before committing.
- Resolution: Pending author review. The segment is visible and uncommitted.

### R025: Consolidate related mechanics frameworks

- Status: Resolved
- Decision: Merge Work and kinetic energy with Potential energy and energy conservation into `work-and-energy.mdx`. Merge Circular motion and its dynamics, Rotational motion and angular momentum, and Rigid-body equilibrium into `circular-and-rotational-motion.mdx`.
- Principle: A segment represents a coherent framework and a useful prerequisite boundary, not automatically a textbook chapter or a change of topic. Use internal headings for concepts and models. Revisit a boundary when an actual downstream prerequisite needs a smaller unit; do not impose a segment-count limit.
- Structure: Measurement, Kinematics, Newton's laws, Work and energy, Impulse and collisions, then Circular and rotational motion. The last segment contains circular models, rigid-body rotation, angular momentum, rolling and static equilibrium as distinct internal sections.
- Dependencies: Work and energy follows Newton's laws. Impulse and collisions follows Work and energy. Circular and rotational motion follows Impulse and collisions and inherits the energy prerequisites. Circular motion alone does not require collisions, but the combined segment's particle systems and rotational impacts do.
- Preservation: All checklist topics from the five source files are retained, with grouped headings and a scope wording adjustment. No gyroscope or elasticity material is added in this merge. Earlier review entries and filenames describe the superseded structure.
- Resolution: Merged at the author's request on 15 September 2026. All replacement segments remain visible. No redirects or compatibility aliases added for the prelaunch slugs.

### R026: Name the particle-system framework explicitly

- Status: Resolved
- Decision: Rename Impulse, momentum and collisions to Systems of particles and linear momentum, with filename `systems-of-particles-and-linear-momentum.mdx`.
- Reason: The segment develops particle systems, centre-of-mass motion and linear-momentum conservation. Impulse, collisions and recoil remain within that framework.
- Resolution: Title, filename and dependent segment reference updated at the author's request. Checklist content is unchanged. Earlier entries retain the historical name.

### R027: Restore the familiar momentum title and stabilise the framework

- Status: Resolved
- Decision: Restore Impulse, momentum and collisions and `impulse-momentum-and-collisions.mdx`. Preserve its checklist and the six-segment mechanics structure. Update the dependent reference and generated index.
- Reason: The familiar title identifies the segment without implying a first introduction to linear momentum. A title change does not require reorganising its content. This supersedes R026.
- Working framework: Set a coherent scope, identify real prerequisites, organise concepts before models, then select a recognisable title. Review against references and record deferred extensions. Reopen settled boundaries only for specific gaps, dependency needs or demonstrated readability problems.
- Resolution: Implemented at the author's request. Further mechanics can be developed without another general restructuring review.

### R028: Review Oscillations and linear differential equations

- Status: Open
- Physics scope: Periodic motion, simple harmonic motion, energy, local linearisation near stable equilibrium, spring and pendulum models, linear damping, sinusoidal driving, resonance and superposition. Distinguish displacement resonance from power resonance and qualify weak-damping formulas.
- Physics placement: Oscillations continues Classical mechanics. It requires Circular and rotational motion for physical and torsional pendulums and inherits the earlier energy and momentum concepts. No new physics strand is introduced solely for this segment.
- Mathematics scope: Linear ordinary differential equations follows Antiderivatives and integrals. It covers first-order integrating factors, scalar higher-order solution structure, constant coefficients, elementary second-order variable-coefficient methods, boundary conditions and numerical approximation. These methods form a coherent mathematical treatment beyond the immediate oscillator examples.
- Mathematics boundaries: Use real exponential and trigonometric solution forms; complex exponentials are an optional later representation, not a declared prerequisite. Earlier algebra requirements, including polynomial factorisation and simultaneous equations, remain tracked under R003 and R007. Matrix methods for coupled systems, power-series methods, general nonlinear equations and transform methods remain for later segments.
- Physics boundaries: Coupled oscillators and normal modes, general nonlinear oscillations, parametric excitation and chaos remain deferred. Finite-amplitude pendulum behaviour is an overview rather than a full elliptic-integral treatment. Elastic deformation remains separate from ideal spring and torsional-stiffness models.
- Reference check: Halliday, Resnick and Walker, Fundamentals of Physics (10th edition), chapter 15, organises simple harmonic motion, energy, angular oscillators, pendulums, damping and forced resonance. The draft also includes elementary superposition and explicit damping regimes.
- Next step: Review both checklists and their prerequisite boundaries before committing.
- Resolution: Files created at the author's request and visible for review. Nothing committed.

### R029: Review the classical-mechanics continuation

- Status: Open
- Request: Draft the remaining major classical-mechanics segments together for individual review. Keep Differential equations as a separate mathematics strand. Revisit mathematics after the physics review, then check both domains together.
- Implemented: Seven new segments join Oscillations after the six approved introductory segments. All are visible for review, with topics and nested subtopics. No new physics strands or schema fields were introduced.
- Branches: Gravitation and central-force motion develops fields, orbits and scattering. Non-inertial reference frames develops translating and rotating observers. Lagrangian mechanics develops constraints, action and symmetry. Coupled oscillations and normal modes joins Oscillations with Lagrangian mechanics. Three-dimensional rigid-body dynamics joins non-inertial frames with Lagrangian mechanics. Hamiltonian mechanics follows Lagrangian mechanics. Nonlinear dynamics and chaos joins the coupled-oscillator and Hamiltonian treatments.
- Grouping: Central-force scattering stays with central-force motion. Newtonian constraint models and their general formulation share Lagrangian mechanics. Canonical transformations, Hamilton–Jacobi theory and perturbation methods share Hamiltonian mechanics. Numerical diagnostics stay with nonlinear dynamics. These are proposed scope boundaries, not final content approval.
- Dependencies: Existing direct prerequisites are connected. Foucault's pendulum makes Oscillations a prerequisite of Non-inertial reference frames. Matrix, multivariable and other missing mathematics prerequisites remain explicitly pending below; the current graph is not yet a complete prerequisite map.
- Mathematics review: Partial derivatives, multiple integrals, gradients and curvilinear coordinates for gravitation and analytical mechanics; matrices, eigenvalues and quadratic forms for normal modes and spatial rotation; rotations and tensors for rigid bodies; variational calculus for action; first-order systems, nonlinear ODEs, stability and perturbation methods for nonlinear dynamics; Fourier methods and PDEs for the continuum limit and Hamilton–Jacobi equation. Create coherent mathematics segments and add their direct dependency links during that review.
- Deferred coverage: Variable-mass motion and rocket momentum balances belong with the earlier systems-and-momentum material and still need review there. Arbitrary forcing, Fourier response and Green's functions need a later oscillator/mathematics review. Elasticity, continuum mechanics, fluids and a full mechanical-wave treatment need their own branch review; the oscillator-chain limit only introduces that connection. Relativistic mechanics belongs with relativity. Advanced constrained Hamiltonian systems, geometric mechanics and specialist many-body celestial mechanics remain future extensions.
- Earlier parked items: R012's connected-body constraints now have a proposed home in Lagrangian mechanics; accelerating frames have their own segment. R028's coupled modes, nonlinear oscillations and parametric excitation now have draft homes. Their review status remains open.
- Reference check: Taylor, Classical Mechanics, chapters 6–14, supports the main progression through variational and Lagrangian mechanics, central forces, non-inertial frames, spatial rotation, normal modes, nonlinear dynamics, Hamiltonian mechanics and scattering. Kibble and Berkshire, Classical Mechanics (5th edition), chapters 4–5 and 9–14, provides a second check on central forces, rotating frames, rigid bodies and analytical and chaotic dynamics. The chosen grouping is editorial; it does not reproduce either book's chapter structure or claim exhaustive coverage of classical mechanics.
- Next step: Review each physics segment's scope and topic order, then build the missing mathematics and audit all prerequisite paths. Avoid adding dependencies solely to impose a reading order.
- Resolution: Drafts created for inspection. Nothing committed.

### R030: Separate study succession from prerequisites

- Status: Open
- Concern: The prerequisite-only layout splits Classical mechanics into several simultaneous paths even when the author intends one continuous curriculum.
- Decision: Add optional `follows` metadata for the recommended previous step within a strand. Sort using both prerequisite and succession links; reject contradictory cycles. Draw the succession within that strand while retaining cross-strand prerequisite connections. The detail panel keeps the actual prerequisite list.
- Proposed sequence: Measurement, Kinematics, Newton's laws, Work and energy, Impulse and collisions, Circular and rotational motion, Oscillations, Non-inertial frames, Gravitation and central forces, Lagrangian mechanics, Coupled oscillations, Three-dimensional rigid-body dynamics, Hamiltonian mechanics, Nonlinear dynamics.
- Meaning: This is a recommended study sequence, not a claim that each topic requires the immediately preceding topic. Genuine independent branches remain available wherever no explicit succession is supplied. A shared predecessor can still introduce a deliberate fork.
- Drafts: Hidden succession steps are skipped for display. A hidden genuine prerequisite still prevents publication of its dependent segment.
- Supersedes: R029's parallel visual arrangement, not its subject coverage or recorded mathematics gaps.
- Next step: Inspect the continuous Classical mechanics path and review its study order. Nothing committed.

### R031: Adopt the fourteen-segment classical-mechanics curriculum

- Status: Open
- Agreed structure: The author accepted fourteen segments as the shared classical-mechanics curriculum. Keep ordered topic checklists and nested subtopics, without required outcome paragraphs, problem sets or a fixed template of conceptual categories.
- Implemented sequence: Physical quantities and measurement; Kinematics; Momentum, forces and Newton's laws; Work and energy; Impulse, momentum and collisions; Circular and rotational motion; Oscillations; Non-inertial reference frames; Gravitation and central-force motion; Lagrangian mechanics; Coupled oscillations and normal modes; Three-dimensional rigid-body dynamics; Hamiltonian mechanics; Nonlinear dynamics and approximation methods.
- Prerequisites: The physics path is cumulative. Each segment names the preceding physics segment as required prior study. Kinematics also introduces the existing integration and vector prerequisites; Oscillations introduces Linear ordinary differential equations. Later physics segments inherit these requirements rather than repeating them. All fourteen remain visible for review.
- Succession clarification: This adopts a required curriculum sequence, rather than claiming that every preceding model is indispensable to every later derivation. Removed redundant `follows` fields from these physics files. The generic optional advisory field remains available for other routes. This supersedes R030's advisory succession for Classical mechanics.
- Coverage refinements: Added measurement scales and data, coordinate representations, connected-body and frictional-contact models, multidimensional conservative forces, system energy, continuous centre-of-mass distributions, variable-mass momentum balances, planar rigid-body accelerations and rolling trajectories, general oscillator forcing, gravitational potential theory and the virial theorem, field action for a vibrating string, spatial rotation geometry, Hamiltonian recurrence, and explicit approximation methods.
- Final-segment identity: Renamed the new, uncommitted nonlinear-dynamics file and title to Nonlinear dynamics and approximation methods, matching the accepted outline. Chaos remains part of its checklist.
- Mathematics review: Earlier algebra and functions remain pending. Vector calculus and multivariable integration now enter explicitly in Work and energy and Gravitation; Fourier analysis and Green's functions in Oscillations; linear algebra, matrices and eigenvalues in Coupled oscillations; rotations and tensors in spatial rigid-body dynamics; variational calculus in Lagrangian mechanics; nonlinear ODEs, dynamical systems, perturbation methods and numerical analysis in the final segment. Mechanical field equations also need an introductory PDE treatment. Build these mathematics segments later and add direct links at their first required point, then recheck both domains together.
- Reference checks: Taylor, Classical Mechanics, chapters 2–5 and 6–14, for introductory mechanics, rockets, oscillations and analytical mechanics. Kibble and Berkshire, Classical Mechanics (5th edition), for oscillator response, central forces, rotating frames, many-body systems and the advanced sequence. [MIT Classical Mechanics III lecture outline](https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/) provides an additional coverage check for analytical mechanics, rigid bodies, modes, canonical methods, perturbations, continuous systems and nonlinear behaviour.
- Boundaries: This is the agreed shared curriculum, not every specialist topic in classical physics. Full fluid mechanics, elasticity, continuum mechanics, specialised celestial mechanics, relativistic mechanics and geometric mechanics remain future routes. The vibrating-string treatment is a bridge to continuous systems. General material-dependent resistance and fluid-flow models remain for the later fluid review; linear oscillator damping is retained here.
- Supersedes deferred gaps: R029's rocket momentum balances and general oscillator forcing now have checklist coverage. Its missing mathematics and specialist extensions remain open.
- Next step: Author review of the fourteen checklists, followed by the planned mathematics and cross-domain prerequisite review. Nothing committed.

### R032: Cross-check the fourteen-segment curriculum

- Status: Open
- Baseline: Committed only the fourteen physics MDX files as `07dfcc7` before the audit, as requested. Existing mathematics, documentation and implementation changes were excluded.
- Evidence: See [Classical mechanics coverage audit](classical-mechanics-audit.md) for four local textbook comparisons, six institutional sources, selected passage checks and the review of every segment.
- Changes: Six physics files received targeted additions or clarifications. The audit records these as A01–A06. The fourteen titles, slugs, sequence and publication settings remain unchanged.
- Scope: The shared nonrelativistic curriculum is supported by the comparison. Full mathematics prerequisites, specialist branches and proficiency assessment remain unfinished. Source coverage is not a claim of exhaustive mastery.
- Next step: Author review of the changes against the committed baseline, followed by the planned mathematics review. Audit changes remain uncommitted.

### R033: Begin Waves and acoustics

- Status: Open
- Segment: Wave motion and propagation, in the new `waves-and-acoustics` strand. Visible for author review and uncommitted.
- Dependency: Coupled oscillations and normal modes supplies the existing connection from discrete oscillators to continuous systems. The new strand branches there; it does not require the later spatial rigid-body, Hamiltonian or nonlinear-mechanics segments. Earlier mathematics requirements are inherited, with the unresolved gaps below still explicit.
- Scope: Wave descriptions, travelling profiles, harmonic waves, the ideal string equation, initial data, linear superposition, energy transport, intensity, and introductory packets and dispersion. The string supplies a concrete model; its assumptions are stated rather than extended to every medium.
- Continuity: The coupled-oscillator segment introduces the continuum connection. This segment develops propagation as its own subject, including the distinction between material motion, phase motion and energy transport. Standing waves are identified here; their detailed boundary-value treatment remains for the continuation.
- Deferred: Reflection and transmission, impedance and boundary matching, interference, standing-wave spectra and resonance, diffraction and refraction, detailed sound generation and propagation, Doppler effects, and quantitative attenuation. Later segment boundaries remain to be agreed. Electromagnetic wave dynamics requires electromagnetism; it is not silently included in a mechanical-wave prerequisite.
- Mathematics: Partial derivatives, the elementary wave initial-value problem, Fourier superposition and dispersion derivatives are needed. These extend the existing gaps recorded in R031 and the mechanics audit. Create and link the relevant mathematics during the planned mathematics review; the current graph is not a complete mathematics prerequisite map.
- References: Halliday, Resnick and Walker, Fundamentals of Physics (10th edition), chapter 16 contents, especially sections 16-1 through 16-4, for the introductory progression. [OpenStax University Physics, travelling waves](https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves), [wave descriptions and equations](https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves), [string wave speed](https://openstax.org/books/university-physics-volume-1/pages/16-3-wave-speed-on-a-stretched-string), and [wave energy](https://openstax.org/books/university-physics-volume-1/pages/16-4-energy-and-power-of-a-wave) support the initial scope. [MIT 8.03SC](https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/syllabus/) supports the broader oscillator-to-wave progression and subsequent dispersion treatment. Its full course also assumes electromagnetism, so it is not copied as this segment's prerequisite list.
- Next step: Author review of this segment's scope and terminology before developing the continuation. No changes to the approved classical-mechanics files.

### R034: Draft the complete Waves and acoustics continuation

- Status: Open
- Request: Create the strand's proposed continuation together so the author can evaluate its overall direction.
- Implemented: Eight additional segments, making nine in Waves and acoustics. All have topic checklists, nested subtopics and `draft: false` for inspection. The baseline was committed as `61f67e0` on 15 September 2026 before the source audit in R035.
- Sequence and evidence: See [Waves and acoustics curriculum](waves-and-acoustics-curriculum.md) for the ordered scope, institutional references and boundaries.
- Dependencies: The first segment branches from Coupled oscillations and normal modes; each subsequent wave segment requires its preceding reading step. Missing mathematics, thermal and continuum foundations are explicitly recorded in the curriculum document for future links.
- Supersedes: R033's postponement of the whole continuation. Its initial-segment references and outstanding mathematics concerns remain relevant. The new files are proposed coverage, not completed author approval.
- Next step: Review the nine-segment grouping and individual checklists, then connect the missing foundations as their strands are developed. Keep the archive and approved Classical mechanics content unchanged.

### R035: Cross-check Waves and acoustics

- Status: Open
- Request: Preserve the baseline, then compare all nine segments with IIT course outlines and local physics books.
- Evidence and changes: See [Waves and acoustics audit](waves-and-acoustics-audit.md). The audit retains the grouping and adds selected missing topics and clearer terminology.
- Remaining gaps: Connect mathematics, thermal physics and continuum mechanics at their first use. Review the advanced scope before treating the strand as an independently followable curriculum.
- Next step: Author review of the differences from `61f67e0`. Audit corrections remain uncommitted; no changes to Classical mechanics or the archive.

### R036: Draft Thermal and statistical physics

- Status: Open
- Request: Create the full proposed strand for review together.
- Implemented: Ten visible segments, from thermal equilibrium through nonequilibrium statistical physics. See [Thermal and statistical physics curriculum](thermal-and-statistical-physics-curriculum.md) for the sequence, level and initial source comparison.
- Dependencies: The strand begins at Work and energy. Kinetic theory adds collisions; statistical foundations adds Hamiltonian mechanics. Later segments inherit these requirements through the thermal sequence.
- Deferred foundations: Multivariable calculus, probability, quantum mechanics, continuum descriptions and stochastic methods need their own coverage and links. Acoustic prerequisites will be connected after author review.
- Next step: Review grouping and topic coverage, then perform the detailed textbook and institutional audit. No commits made; existing mechanics, acoustics and archive files preserved.

### R038: Draft Electromagnetism

- Status: Open
- Request: Create the full proposed strand so the author can inspect its segments together.
- Implemented: Twelve visible segments from electric charge and potential through radiation and scattering. See [Electromagnetism curriculum](electromagnetism-curriculum.md) for the sequence, scope and initial source comparison.
- Dependencies: Begins at Work and energy, with independent links to linear ordinary differential equations, wave propagation and Lagrangian mechanics where used.
- Remaining foundations: Vector calculus, boundary-value mathematics, complex methods, special relativity and microscopic material theories need appropriate coverage and links.
- Baseline: Twelve segments committed as `221ba25` before the detailed audit. See R039 for findings; the author approved committing the audit refinements on 16 September 2026.

### R039: Electromagnetism audit and missing foundations

- Status: Open
- Request: Preserve the first draft, then compare its coverage and sequence with books and academic courses.
- Review: Griffiths fourth edition, Jackson third-edition contents, Wegner, IIT Kanpur, SVNIT and MIT. See [Electromagnetism audit](electromagnetism-audit.md) for evidence and limits.
- Changes: Explicit interface and equilibrium conditions, inductive energy constraints, magnetic diffusion, causal fields, dispersive signals, relativistic wave transformations and unit conventions. Twelve segments retained.
- Remaining work: Author and link vector calculus, boundary-value mathematics, complex methods and special relativity. Review how study modules distinguish introductory coverage from advanced methods.
- Boundary decisions: Detailed diffraction, plasma dynamics, microscopic material theories and particle stopping remain later continuations.
- Decision: Audit refinements approved for commit on 16 September 2026. Keep this item open until the missing foundations are authored and linked.

## Resolved items

### R004 — Scope of base quantities and dimensions

- Status: Resolved
- Decision: Introduce all seven SI base quantities, their units and their dimensions in the first segment. Distinguish quantities, dimensions and units explicitly. Focus dimensional-analysis examples on length, mass and time through area, volume, velocity, acceleration and force.
- Reason: Readers should see the complete framework without needing a detailed treatment of electricity, thermodynamics, amount of substance or photometry at this stage.
- Resolution: Agreed and added to `measurement-and-motion.mdx` on 14 September 2026. This settles the scope of this part, not approval of the whole segment.
- Refinement: Keep the checklist at topic level instead of enumerating individual base quantities, units and example derived dimensions. Include dimensionless quantities and units as a single entry, without listing individual examples beneath it. The coverage remains complete within this agreed scope; the checklist is not a reference table.

### R006: Direct prerequisites and inherited requirements

- Status: Resolved
- Decision: Measurement and motion lists Antiderivatives and integrals, which lists Limits and derivatives. Do not repeat prerequisites already required through that chain.
- Reason: A reader following the dependency path will cover the earlier material. Independent requirements from other branches still need their own links; a later segment only replaces an earlier prerequisite when the path actually includes it.
- Resolution: Implemented for the introductory calculus sequence. Earlier algebra requirements remain deferred under R003.

### R009: Coherent coverage of mathematics segments

- Status: Resolved
- Decision: Physics determines which mathematics segment to create, but the mathematical subject and stated level determine its coverage. Standard topics are not omitted solely because the initiating physics segment does not use them.
- Implementation: Expanded Limits and derivatives and Antiderivatives and integrals as introductory single-variable calculus treatments. L'Hôpital's rule follows differentiation and mean value theorems. Integration now includes standard techniques, improper integrals, numerical approximations and geometric applications.
- References: Checked against [MIT 18.01SC](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/syllabus/), [OpenStax Calculus Volume 1](https://openstax.org/books/calculus-volume-1/pages/preface), [Volume 2](https://openstax.org/books/calculus-volume-2/pages/preface), and its [integration techniques chapter](https://openstax.org/books/calculus-volume-2/pages/3-introduction). These are scope references, not a claim that the two segments cover every chapter in those courses.
- Resolution: Both checklists revised for inspection. Content approval remains with the author; earlier prerequisites and later extensions remain tracked separately.

## Recording further items

Give each item a stable identifier and a short title. Record its status, the question or topic, the reason it remains open, and a concrete next step or condition for revisiting it. Include competing placements or the reason for disagreement when relevant.

Use Open, Deferred, Resolved or Dropped. When an item is resolved or dropped, retain it and add the decision, its reason, the date and any relevant segment or document. This preserves why something was included, moved or left out. Do not close an item merely because a draft file now exists.
