const classChapters = {
    "calculus-ab": {
        name: "AP Calculus AB",
        chapters: [
            "Limits and Continuity",
            "Differentiation: Definition and Basic Rules",
            "Differentiation: Composite, Implicit, and Inverse Functions",
            "Contextual Applications of Differentiation",
            "Analytical Applications of Differentiation",
            "Integration and Accumulation of Change",
            "Differential Equations",
            "Applications of Integration"
        ]
    },
    "calculus-bc": {
        name: "AP Calculus BC",
        chapters: [
            "Limits and Continuity",
            "Differentiation: Definition and Basic Rules",
            "Differentiation: Composite, Implicit, and Inverse Functions",
            "Contextual Applications of Differentiation",
            "Analytical Applications of Differentiation",
            "Integration and Accumulation of Change",
            "Differential Equations",
            "Applications of Integration",
            "Parametric Equations, Polar Coordinates, and Vector-Valued Functions",
            "Infinite Sequences and Series"
        ]
    },
    "precalculus": {
        name: "AP Precalculus",
        chapters: [
            "Polynomial and Rational Functions",
            "Exponential and Logarithmic Functions",
            "Trigonometric and Polar Functions",
            "Functions Involving Parameters, Vectors, and Matrices"
        ]
    },
    "statistics": {
        name: "AP Statistics",
        chapters: [
            "Exploring One-Variable Data",
            "Exploring Two-Variable Data",
            "Collecting Data",
            "Probability, Random Variables, and Probability Distributions",
            "Sampling Distributions",
            "Inference for Categorical Data: Proportions",
            "Inference for Quantitative Data: Means",
            "Inference for Categorical Data: Chi-Square",
            "Inference for Quantitative Data: Slopes"
        ]
    },
    "biology": {
        name: "AP Biology",
        chapters: [
            "Chemistry of Life",
            "Cell Structure and Function",
            "Cellular Energetics",
            "Cell Communication and Cell Cycle",
            "Heredity",
            "Gene Expression and Regulation",
            "Natural Selection",
            "Ecology"
        ]
    },
    "chemistry": {
        name: "AP Chemistry",
        chapters: [
            "Atomic Structure and Properties",
            "Compound Structure and Properties",
            "Properties of Substances and Mixtures",
            "Chemical Reactions",
            "Kinetics",
            "Thermochemistry",
            "Equilibrium",
            "Acids and Bases",
            "Thermodynamics and Electrochemistry"
        ]
    },
    "environmental-science": {
        name: "AP Environmental Science",
        chapters: [
            "The Living World: Ecosystems",
            "The Living World: Biodiversity",
            "Populations",
            "Earth Systems and Resources",
            "Land and Water Use",
            "Energy Resources and Consumption",
            "Atmospheric Pollution",
            "Aquatic and Terrestrial Pollution",
            "Global Change"
        ]
    },
    "physics-1": {
        name: "AP Physics 1",
        chapters: [
            "Kinematics",
            "Dynamics",
            "Circular Motion and Gravitation",
            "Energy",
            "Momentum",
            "Simple Harmonic Motion",
            "Torque and Rotational Motion",
            "Electric Charge and Electric Force",
            "DC Circuits"
        ]
    },
    "physics-2": {
        name: "AP Physics 2",
        chapters: [
            "Thermodynamics",
            "Electric Force, Field, and Potential",
            "Electric Circuits",
            "Magnetism and Electromagnetism",
            "Geometric Optics",
            "Waves, Sound, and Physical Optics"
        ]
    },
    "physics-c-mechanics": {
        name: "AP Physics C: Mechanics",
        chapters: [
            "Kinematics",
            "Force and Translational Dynamics",
            "Work, Energy, and Power",
            "Linear Momentum",
            "Torque and Rotational Dynamics",
            "Energy and Momentum of Rotating Systems",
            "Oscillations"
        ]
    },
    "physics-c-em": {
        name: "AP Physics C: E&M",
        chapters: [
            "Electric Charges, Fields, and Gauss's Law",
            "Electric Potential",
            "Conductors and Capacitors",
            "Electric Circuits",
            "Magnetic Fields and Electromagnetism",
            "Electromagnetic Induction"
        ]
    },
    "computer-science-a": {
        name: "AP Computer Science A",
        chapters: [
            "Primitive Types",
            "Using Objects",
            "Boolean Expressions and if Statements",
            "Iteration",
            "Writing Classes",
            "Array",
            "ArrayList",
            "2D Array",
            "Inheritance",
            "Recursion"
        ]
    },
    "english-literature": {
        name: "AP English Literature and Composition",
        chapters: [
            "Short Fiction I",
            "Poetry I",
            "Longer Fiction or Drama I",
            "Short Fiction II",
            "Poetry II",
            "Longer Fiction or Drama II",
            "Short Fiction III",
            "Poetry III",
            "Longer Fiction or Drama III"
        ]
    },
    "english-language": {
        name: "AP English Language and Composition",
        chapters: [
            "Reading Rhetorically",
            "Close Reading and Analyzing Arguments",
            "Synthesizing Information",
            "Writing Rhetorically",
            "Developing Arguments",
            "Language, Gender, and Culture",
            "Globalization and the English Language",
            "Science and Technology",
            "Revision as Rhetorical Choice"
        ]
    },
    "us-history": {
        name: "AP United States History",
        chapters: [
            "Period 1: 1491-1607",
            "Period 2: 1607-1754",
            "Period 3: 1754-1800",
            "Period 4: 1800-1848",
            "Period 5: 1844-1877",
            "Period 6: 1865-1898",
            "Period 7: 1890-1945",
            "Period 8: 1945-1980",
            "Period 9: 1980-Present"
        ]
    },
    "computer-science-principles": {
        name: "AP Computer Science Principles",
        chapters: [
            "Computational Solution Design",
            "Algorithms and Program Development",
            "Abstraction in Program Development",
            "Code Analysis",
            "Computing Innovations",
            "Responsible Computing"
        ]
    },
    "psychology": {
        name: "AP Psychology",
        chapters: [
            "Biological Bases of Behavior",
            "Cognition",
            "Development and Learning",
            "Social Psychology and Personality",
            "Mental and Physical Health"
        ]
    },
    "human-geography": {
        name: "AP Human Geography",
        chapters: [
            "Thinking Geographically",
            "Population and Migration Patterns and Processes",
            "Cultural Patterns and Processes",
            "Political Patterns and Processes",
            "Agriculture and Rural Land-Use Patterns and Processes",
            "Cities and Urban Land-Use Patterns and Processes",
            "Industrial and Economic Development Patterns and Processes"
        ]
    },
    "world-history": {
        name: "AP World History",
        chapters: [
            "The Global Tapestry",
            "Networks of Exchange",
            "Land-Based Empires",
            "Transoceanic Interconnections",
            "Revolutions",
            "Consequences of Industrialization",
            "Global Conflict",
            "Cold War and Decolonization",
            "Globalization"
        ]
    },
    "european-history": {
        name: "AP European History",
        chapters: [
            "Renaissance and Exploration",
            "Age of Reformation",
            "Absolutism and Constitutionalism",
            "Scientific, Philosophical, and Political Developments",
            "Conflict, Crisis, and Reaction in the Late 18th Century",
            "Industrialization and Its Effects",
            "19th-Century Perspectives and Political Developments",
            "20th-Century Global Conflicts",
            "Cold War and Contemporary Europe"
        ]
    },
    "gov-politics-us": {
        name: "AP Government and Politics - US",
        chapters: [
            "Foundations of American Democracy",
            "Interactions Among Branches of Government",
            "Civil Liberties and Civil Rights",
            "American Political Ideologies and Beliefs",
            "Political Participation"
        ]
    },
    "gov-politics-comp": {
        name: "AP Government and Politics - Comparative",
        chapters: [
            "Political Systems, Regimes, and Governments",
            "Political Institutions",
            "Political Culture and Participation",
            "Party and Electoral Systems and Citizen Organizations",
            "Political and Economic Changes and Development"
        ]
    },
    "macroeconomics": {
        name: "AP Macroeconomics",
        chapters: [
            "Basic Economic Concepts",
            "Economic Indicators and the Business Cycle",
            "National Income and Price Determination",
            "Financial Sector",
            "Long-Run Consequences of Stabilization Policies",
            "Open Economy—International Trade and Finance"
        ]
    },
    "microeconomics": {
        name: "AP Microeconomics",
        chapters: [
            "Basic Economic Concepts",
            "Supply and Demand",
            "Production, Cost, and the Perfect Competition Model",
            "Imperfect Competition",
            "Factor Markets",
            "Market Failure and the Role of Government"
        ]
    },
    "seminar": {
        name: "AP Seminar",
        chapters: [
            "Analyze Sources and Evidence",
            "Construct an Evidence-Based Argument",
            "Understand Context and Perspective",
            "Communicate (Interpersonal and Intrapersonal)"
        ]
    },
    "research": {
        name: "AP Research",
        chapters: [
            "Question and Explore",
            "Understand and Analyze",
            "Evaluate Multiple Perspectives",
            "Synthesize Ideas",
            "Team, Transform, and Transmit"
        ]
    }
}; 