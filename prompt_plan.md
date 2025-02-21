Below is a **complete, multi-stage plan** for building the Interactive Portfolio Website with a force-directed graph. Following the plan, you’ll find **iterative breakdowns** and then a set of **code-generation prompts** that are designed to be used with a Large Language Model (LLM). These prompts will guide the LLM to build and test each piece of functionality incrementally, using best practices such as **Test-Driven Development (TDD)**.

---

# **1. Detailed Step-by-Step Blueprint**

## **1.1 Project Initialization**

1. **Set up the development environment**:
    
    - Use a Node.js + React boilerplate.
    - Decide on either Create React App or Vite (for faster builds).
    - Configure Prettier/ESLint for code consistency.
2. **Establish the backend** (if needed):
    
    - Choose an Express.js server or Firebase Functions.
    - Decide how you’ll store data (Firebase Firestore, PostgreSQL, etc.).
    - Create a simple “Hello World” API endpoint (if using Express).
3. **Plan the directory structure**:
    
    - **src/components** for React components
    - **src/pages** for distinct pages (home, content pages)
    - **src/services** for data fetching / API integration
    - **src/tests** for unit and integration tests
    - **public** for static files, if needed

## **1.2 Force-Directed Graph Setup**

4. **Install D3.js** for the force-directed graph simulation.
5. **Design the Node & Edge data structure**:
    - Each node has `id`, `type`, `title`, `url`, `tags`, `connections`, etc.
    - Each edge simply references `source` and `target`.
6. **Create a Graph component** (`GraphView`) in React:
    - Use D3’s **forceSimulation** and **forceLink**, **forceManyBody**, **forceCenter**.
    - Implement **zoom behavior** (D3’s zoom handler).
    - Render nodes as circles or small shapes; edges as lines.
    - Add **event handlers** (click, drag, hover).

## **1.3 Zoom Behavior & Node Rendering Logic**

7. **Far Zoom** → Show only node shapes (no text).
8. **Mid Zoom** → Show node titles.
9. **Close Zoom** → Show additional metadata (tags, short descriptions).

## **1.4 Content Page with Mini Graph**

10. **Create a separate route** for content pages (e.g., `/content/:id`).
11. **In the content page**:
    - **Left column**: embed or display the content (YouTube, article text, GitHub, etc.).
    - **Right column (mini-graph)**: display only directly related nodes from the main graph.
12. **Navigation**:
    - A floating **back button** to return to the main graph.

## **1.5 Search Functionality**

13. **Search bar**:
    
    - Always visible, possibly at the top or bottom corner.
    - On input, **highlight** matching nodes in the graph.
    - Include a reset or “show all” button.
14. **Search logic**:
    
    - Filter nodes by title, tags, type, etc.
    - Possibly use a fuzzy-search library or a simple substring match.

## **1.6 Integrations & Embeds**

15. **YouTube**: iFrame embed.
16. **LinkedIn**: Embedded post or article preview.
17. **GitHub**:
    - Possibly embed the README or show a snippet.
    - Provide Star/Clone buttons linking to GitHub.
18. **Photography/Presentations**:
    - Simple carousel or embed a slideshow framework (e.g., SlideShare).
19. **Travel content**:
    - Use a mapping platform or an embed from a travel blog site.

## **1.7 Mobile Responsiveness**

20. **Ensure the graph is touch-friendly**:
    - Use D3’s built-in touch events or a custom gesture handler.
21. **Responsive layout**:
    - Collapsing sidebars, floating buttons that stay accessible.
    - Test on multiple screen sizes.

## **1.8 Performance & Fallbacks**

22. **Lazy loading** for images/videos.
23. **Skeleton loaders** while content is fetched.
24. **Graph performance**:
    - Reduce force simulation calculations if the user is idle.
    - Possibly group nodes or limit node count until user zooms in.

## **1.9 Testing**

25. **Unit tests**:
    - For each React component (Graph, Node, Edge, Search).
    - For data fetch functions.
26. **Integration tests**:
    - For route navigation, ensuring the graph transitions to content pages properly.
    - For search highlighting multiple nodes.
27. **E2E tests**:
    - Use Cypress or Playwright to replicate real user flows.

## **1.10 Deployment**

28. **Automated build** (CI/CD with GitHub Actions, etc.).
29. **Deployment to Vercel or Netlify**:
    - Ensure environment variables are set properly.
    - Test your domain configuration.

---

# **2. Break Into Iterative Chunks**

Now, let’s break the project into major “milestones” or “chunks.” Each chunk is **iterative** and builds on the previous one.

30. **Chunk A**: Project Setup & Boilerplate
    
    - Initialize React project + basic server if needed.
    - Confirm linting, formatting, and testing frameworks.
31. **Chunk B**: Basic Graph Rendering
    
    - Implement a minimal force-directed graph with dummy data.
    - Add simple zoom/pan functionality.
32. **Chunk C**: Node & Edge Interactivity
    
    - Add click, drag, hover events.
    - Integrate the zoom-level logic (far, mid, close).
33. **Chunk D**: Content Page & Mini Graph
    
    - Build a separate content page.
    - Implement the mini graph for related content.
34. **Chunk E**: Search Functionality
    
    - Introduce a global search bar.
    - Highlight nodes based on the search term.
35. **Chunk F**: Content Embeds & API Integrations
    
    - YouTube, LinkedIn, GitHub embeddings.
    - Basic fallback handling for broken embeds.
36. **Chunk G**: Mobile Responsiveness & Testing
    
    - Ensure graph is touch-friendly.
    - Add comprehensive unit/integration tests.
37. **Chunk H**: Performance Tweaks & Final Deployment
    
    - Implement lazy loading and skeleton loaders.
    - Final bug fixes, refine UI, and deploy.

---

# **3. Break Each Chunk into Smaller Steps**

We now iterate again—each chunk is split into smaller steps that should be tackled **incrementally**.

## **Chunk A: Project Setup & Boilerplate**

38. **Create React App** (or Vite) boilerplate.
39. **Set up ESLint & Prettier** for code consistency.
40. **Install dependencies**:
    - React, React Router, D3.js, Testing libraries, etc.
41. **Initialize Git repository** and push to remote.
42. **Create a simple README** describing the project.

## **Chunk B: Basic Graph Rendering**

43. **Install D3.js**.
44. **Create a mock dataset**: a few nodes and edges.
45. **Build a Graph container** (`GraphView`) that:
    - Initializes the D3 simulation.
    - Renders nodes as `<circle>` and edges as `<line>`.
46. **Add a minimal UI** with a single `<div>` for the graph.
47. **Verify graph displays** in the browser.

## **Chunk C: Node & Edge Interactivity**

48. **Implement node dragging**:
    - Use D3 drag events to move nodes.
49. **Implement hover**:
    - Change node/edge style on mouseover.
50. **Implement different zoom levels**:
    - Decide on “zoom scale” thresholds (far, mid, close).
    - Show/hide node text based on scale.
51. **Add a tooltip** that appears on click or long press.

## **Chunk D: Content Page & Mini Graph**

52. **Set up React Router**:
    - Main route (`/`) for the graph.
    - Content route (`/content/:id`).
53. **Build a `ContentPage` component**:
    - Left column to display dummy content.
    - Right column for a mini graph with only connected nodes.
54. **Link** main graph nodes to their respective content pages:
    - On node click, navigate to `/content/:id`.
55. **Add a back button** to return to the graph from the content page.

## **Chunk E: Search Functionality**

56. **Create a global search bar** component (e.g., `SearchBar`).
57. **Implement search logic**:
    - On input, highlight nodes that match the text.
    - Provide a reset mechanism to unhighlight nodes.
58. **Integrate the search bar**:
    - Make it float at the top/bottom of the page.
    - Ensure it’s visible in both home and content pages.

## **Chunk F: Content Embeds & API Integrations**

59. **Add components** for specific content types:
    - `YouTubeEmbed`, `LinkedInEmbed`, `GitHubPreview`, etc.
60. **Embed logic**:
    - For YouTube, use `<iframe>` with an embed URL.
    - For LinkedIn, embed posts if possible.
    - For GitHub, embed README or direct link.
61. **Basic fallback**:
    - If an embed or API call fails, show an error message.
62. **Connect** these embed components to the data in your node objects.

## **Chunk G: Mobile Responsiveness & Testing**

63. **Adapt Graph for touch**:
    - Ensure dragging works with touch events.
    - Test zoom gestures on a device or emulator.
64. **Styling**:
    - Use CSS media queries or a responsive framework.
65. **Testing**:
    - Write unit tests for each component (Jest/React Testing Library).
    - Write integration tests for major flows (Cypress/Playwright).
    - Verify everything on real mobile devices or simulators.

## **Chunk H: Performance Tweaks & Final Deployment**

66. **Lazy loading**:
    - Use React’s lazy loading or a library like `react-lazyload`.
67. **Skeleton loaders**:
    - For content pages while the graph or content is fetching.
68. **Final bug fixes** and **UI refinements**.
69. **Deploy** to Vercel, Netlify, or your preferred host.
70. **Post-deployment checks**:
    - Test links, routing, embed functionality in production.

---

# **4. Series of Code-Generation LLM Prompts**

Below is a series of **test-driven development (TDD)** prompts that you can provide to a code-generation LLM. Each prompt is broken into:

- **Context**: Explains what has been done so far and what we want next.
- **Instructions**: Summarizes the tasks.
- **Example TDD Flow**: Provides a structure for the LLM to generate tests first, then the actual code.

Each prompt is wrapped in triple backticks (```) so that you can feed it directly into an LLM. You would run these prompts **in sequence**, ensuring each step is integrated before moving to the next.

---

## **Prompt 1: Project Setup & Boilerplate**

```text
You are helping me build a React + Node project for an interactive portfolio website with a force-directed graph.

**Context:**
- We want to initialize a React project (using Vite or Create React App), set up linting, formatting, testing frameworks, and a simple README.
- Use best practices and keep everything minimal but functional.

**Instructions:**
71. Initialize a new React project (Vite).
72. Add ESLint + Prettier configuration.
73. Add a testing library setup (Jest + React Testing Library).
74. Create a README with a short project overview.
75. Generate a package.json with relevant scripts (test, dev, build).

**Example TDD Flow:**
76. Generate a test to confirm the project runs a basic “Hello World” in the browser.
77. Implement the minimal React component to pass the test.
78. Show the ESLint and Prettier config files.
79. Provide a final file structure overview.

Now, produce the code necessary to fulfill these tasks in small, reviewable chunks.
```

---

## **Prompt 2: Basic Graph Rendering**

```text
You are continuing the same project. Now we need a basic force-directed graph with D3.

**Context:**
- We have a working React project and a test setup.
- We want to introduce D3.js and create a GraphView component that renders nodes and edges from a mock dataset.
- We'll start with a simple <svg> approach.

**Instructions:**
80. Install D3.js.
81. Create a GraphView component that:
   - Sets up a D3 force simulation with a small, hard-coded dataset.
   - Renders a few circles (nodes) and lines (edges).
82. Write tests to confirm that the correct number of nodes and edges render.
83. Make sure there are no TypeScript or ESLint errors (if using TS).

**Example TDD Flow:**
84. Write a test that fails because the GraphView isn’t rendering any nodes.
85. Implement the GraphView to pass the test.
86. Demonstrate the graph in a minimal parent component or App component.

Now provide the test code and the GraphView implementation.
```

---

## **Prompt 3: Node & Edge Interactivity**

```text
Continuing the project with our GraphView component in React + D3:

**Context:**
- We already render a simple graph with circles for nodes and lines for edges.
- Now we want to add interactivity: dragging, hover highlights, and zoom scaling changes text display.

**Instructions:**
87. Implement D3 drag behaviors so nodes can be repositioned.
88. On hover, change the style of the hovered node and its edges (e.g., highlight color).
89. Add zoom-level logic:
   - If zoom < someThreshold, hide all text.
   - If zoom >= someThreshold, show node titles.
90. Write tests for each piece of interactivity (e.g., that dragging changes node positions).

**Example TDD Flow:**
91. Write a test to ensure that “drag” events trigger a change in node position.
92. Write a test for zoom scale states: node labels appear/disappear.
93. Implement the code to pass these tests, in small, incremental steps.

Now produce the test code first, then the implementation code to pass the tests.
```

---

## **Prompt 4: Content Page & Mini Graph**

```text
We now have an interactive graph. Next, we add a ContentPage with its own mini graph.

**Context:**
- We want to introduce React Router for a multi-page setup.
- Each node click in GraphView navigates to /content/:id.
- The ContentPage shows the main content on the left, and a mini graph on the right (with only directly connected nodes).

**Instructions:**
94. Set up React Router (or your routing method of choice).
95. Add a ContentPage component.
96. Pass an ID to ContentPage via the URL.
97. Fetch the node’s content from the mock dataset or a new minimal in-memory store.
98. Render a mini graph of just the connected nodes in the right column.
99. Provide a “Back” or “Home” button to return to the main graph.

**Example TDD Flow:**
100. Write a test to ensure clicking a node in the main graph navigates to /content/:id.
101. Write a test that checks if the ContentPage displays the correct node’s title.
102. Write a test for the mini graph: it renders only directly connected nodes.
103. Implement the routing, the ContentPage component, and the mini graph to pass these tests.

Now provide the test code first, then the implementation code to pass the tests.
```

---

## **Prompt 5: Search Functionality**

```text
Our graph can now navigate to a content page. Next, we want global search.

**Context:**
- We have a global set of nodes that the GraphView uses.
- We want a floating search bar that highlights nodes in the graph.

**Instructions:**
104. Create a SearchBar component that is always visible (position fixed or sticky).
105. On input change, highlight matching nodes (by title or tag).
106. Add a “clear search” button that removes highlights and resets the graph view.
107. Write tests to confirm that search terms highlight the correct nodes.

**Example TDD Flow:**
108. Write a test to ensure the search input exists and is visible.
109. Write a test to confirm that typing a known node title highlights that node.
110. Write a test to confirm the “clear search” button resets highlights.
111. Implement the search functionality to pass these tests.

Now generate the test code first and then the implementation.
```

---

## **Prompt 6: Content Embeds & API Integrations**

```text
We can navigate between the graph and content pages, and we have search. Next, we embed YouTube, LinkedIn, GitHub, etc.

**Context:**
- Our ContentPage currently just shows a title and minimal text.
- We have different node types (e.g., “video”, “article”, “github”) in our dataset.

**Instructions:**
112. Create specialized components: YouTubeEmbed, LinkedInEmbed, GitHubPreview, etc.
113. Update the ContentPage so it conditionally renders these components based on node type.
114. Provide a fallback if an embed fails (e.g., “Error loading content”).
115. Write tests confirming correct rendering of each embed type.

**Example TDD Flow:**
116. Write a test for each embed type, ensuring the correct iFrame or link is rendered.
117. Write a test for fallback behavior when embed data is missing or invalid.
118. Implement the embed components in small steps to pass each test.

Now provide the test code first, then the implementation.
```

---

## **Prompt 7: Mobile Responsiveness & Testing**

```text
We now have a functional site on desktop. Let’s ensure it works on mobile and add thorough tests.

**Context:**
- The graph uses D3’s drag/zoom. We need to ensure this works on touch devices.
- We should also finalize unit and integration tests for all major components.
- Possibly use Cypress or Playwright for end-to-end (E2E) tests.

**Instructions:**
119. Enhance the D3 config to handle touch events for drag & zoom.
120. Use CSS media queries to ensure layout changes for smaller screens.
121. Add or finalize unit tests across all major components (GraphView, SearchBar, ContentPage, embed components).
122. Write integration/E2E tests that replicate user flows: search, click node, open content page, go back.

**Example TDD Flow:**
123. Write a test verifying a simulated touch drag moves a node.
124. Write a test verifying layout changes on small screen breakpoints.
125. Implement the changes to pass these tests.
126. Write or update E2E tests for the full user journey.

Now provide the test code and any necessary implementation details.
```

---

## **Prompt 8: Performance Tweaks & Final Deployment**

```text
Our site is functional across desktop and mobile. We want to optimize performance and deploy.

**Context:**
- We want lazy loading of images and skeleton loaders during data fetching.
- We want to refine the final UI and fix any residual bugs.
- Then we’ll deploy to Vercel (or Netlify), ensuring environment configs are correct.

**Instructions:**
127. Implement lazy loading for heavy media (images, etc.).
128. Add skeleton loader components for graph or content areas.
129. Do final cleanup of code, removing any console.logs or unused variables.
130. Provide a minimal guide to deploy to Vercel or Netlify.
131. Write final tests ensuring the lazy loading and skeleton states appear as expected.

**Example TDD Flow:**
132. Write a test verifying that a skeleton loader appears before the data is fully fetched.
133. Confirm that images aren’t loaded until scrolled into view (if possible).
134. Implement these features step by step, verifying each test passes.
135. Provide final instructions (in code) on how to deploy to Vercel or Netlify.

Now write the test code for lazy loading and skeleton loaders, then the implementation code, and final deployment scripts.
```

---

## **Wrapping Up**

Following these prompts **in order** ensures you build the site **incrementally** with TDD principles. Each prompt:

- Builds on the previous chunk’s code.
- Tests the new functionality before implementation.
- Ensures no major leap in complexity.
- Integrates everything so there’s no “orphaned” code.

Using this process, you’ll end up with a **fully tested, performance-optimized** interactive portfolio website featuring a **force-directed graph** at its core.