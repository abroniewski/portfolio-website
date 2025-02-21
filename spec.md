# **Developer Specification: Interactive Portfolio Website with Force-Directed Graph**

## **1. Project Overview**

This project is a **minimalist, interactive portfolio website** that serves as a **content hub** for blog posts, LinkedIn articles, YouTube videos, GitHub projects, photography, presentations, soundscapes, and travel blogs. The core feature is a **force-directed graph** that allows users to explore interconnected content dynamically.

The website will be **dark mode by default**, use a **floating navigation system**, and prioritize **smooth user experience** with interactive elements inspired by **Obsidian’s UI graph style**.

---

## **2. Key Features & Functional Requirements**

### **2.1 Graph-Based Content Navigation**

- The **graph is the homepage**, serving as the primary method of exploration.
- Nodes represent **content types** (articles, videos, GitHub repos, photography, etc.).
- **Graph Zoom Behavior:**
    - **Far Zoom:** Only nodes are visible (no text).
    - **Mid Zoom:** Titles of articles appear.
    - **Close Zoom:** Additional metadata (tags, category) appears.
- **Physics-Based Graph Interactions:**
    - Nodes can be **dragged & repositioned** (with inertia).
    - Hovering over a node **highlights directly connected nodes**.
    - Clicking and holding a node **displays a tooltip** with a preview.
    - Clicking a node **opens the corresponding content page**.

### **2.2 Content Pages (Two-Column Layout)**

- Clicking a node opens a **dedicated content page**.
- **Left Column:** Displays the **article/video/project**.
- **Right Sidebar:** Displays a **mini graph**, showing only directly related content.
- A **persistent floating back button** allows users to return to the graph.

### **2.3 Search Functionality**

- **Always-visible floating search bar** (desktop & mobile).
- Typing in the search bar **highlights relevant nodes in the graph** (but keeps everything visible).
- Search bar also includes a **button to return to the full graph**.

### **2.4 Content Engagement & Sharing**

- Floating social media buttons **stay fixed at the bottom of content pages**.
- General **share buttons** allow users to copy/share links.
- **Platform-Specific Engagement Buttons**:
    - **YouTube content:** Like, share, and comment buttons appear in their **native layout**.
    - **LinkedIn posts:** Like, share, and comment in **LinkedIn’s typical UI layout**.
    - **GitHub repos:** Star, clone, and view repo buttons match **GitHub’s UI**.

### **2.5 Mobile Experience**

- **Same interactive graph as desktop**, controlled via touch gestures.
- Users **zoom in to reveal text**.
- Search bar is **always visible**.
- UI elements will **follow mobile best practices** for collapsing when not in use.

---

## **3. Technical Architecture**

### **3.1 Tech Stack**

- **Frontend:** React (with D3.js for force-directed graph visualization)
- **Backend:** Django (for content aggregation and API fetching)
- **Database:** PostgreSQL (for metadata storage)
- **Hosting:** Railway.app

### **3.2 Data Handling**

- **Content Aggregation via Embeds (Phase 1):**
    - YouTube: Embedded player via YouTube API
    - LinkedIn: Embedded posts
    - GitHub: Embedded README previews
    - Polar Steps: Travel content embedded
- **API Integration (Phase 2):**
    - Fetch dynamic content updates via APIs (LinkedIn, YouTube, GitHub, etc.).

### **3.3 Graph Data Structure**

- **Nodes**:
    
    ```json
    {
      "id": "content-123",
      "type": "article", // video, github, presentation, etc.
      "title": "My LinkedIn Post",
      "url": "https://linkedin.com/xyz",
      "tags": ["AI", "Data Science"],
      "connections": ["content-456", "content-789"]
    }
    ```
    
- **Edges**:
    
    ```json
    {
      "source": "content-123",
      "target": "content-456"
    }
    ```
    

### **3.4 Error Handling & Fallbacks**

- **Graph Rendering Issues:** Display a “Retry” button if the graph fails to load.
- **Broken API Requests:** Gracefully degrade to embedded versions if API calls fail.
- **Search Errors:** Display “No results found” message with **suggestions for exploration**.
- **Slow Network Handling:** Implement skeleton loaders for content pages.

---

## **4. Performance Optimizations**

✅ **Lazy Loading** → Only load images/videos when they come into view. ✅ **Progressive Graph Loading** → Load **nodes dynamically** as users explore. ✅ **Graph Performance Tweaks** → Reduce real-time physics calculations when graph is static. ✅ **Static Preloading** → Ensure **search bar and navigation** load instantly. ✅ **Mobile Optimizations** → Reduce animation complexity for **touch-based interactions**.

---

## **5. Testing Plan**

### **5.1 Unit Tests**

- Test **graph rendering** (nodes & edges display correctly).
- Test **search functionality** (highlights nodes accurately).
- Test **content loading & embeds** (articles, videos, and GitHub repos load correctly).
- Test **navigation buttons & shortcuts** (ensure correct routing behavior).

### **5.2 Integration Tests**

- Ensure **graph remains responsive** under high node counts.
- Validate **API integrations** (LinkedIn, YouTube, GitHub) return expected results.
- Test **touch gestures on mobile** (dragging, tapping, zooming in and out).

### **5.3 User Experience Tests**

- Conduct **usability testing** (ensure interactions feel natural).
- Gather **feedback on performance** (does the graph lag on low-end devices?).
- Ensure **all navigation methods feel intuitive**.

---

## **6. Deployment & Future Roadmap**

### **6.1 Initial Launch Goals (MVP)**

✅ **Interactive Graph Homepage** (content navigation via graph). ✅ **Basic Content Embeds** (YouTube, LinkedIn, GitHub, etc.). ✅ **Persistent Search Bar & Floating Navigation**. ✅ **Two-Column Content Layout with Mini Graph Sidebar**. ✅ **Social Sharing & External Engagement Links**.

### **6.2 Future Enhancements**

🔹 **Full API Integration** (for LinkedIn, YouTube, GitHub auto-fetching). 🔹 **Content Filtering & Advanced Search Features**. 🔹 **Light Mode Toggle**. 🔹 **AI-Powered Content Suggestions (Keyword Matching & User Behavior-Based Graph Adjustments).**

---

## **7. Conclusion**

This document provides **a full development roadmap** for implementing the **interactive portfolio website with force-directed graph navigation**. The focus is on **intuitive UX, performance optimization, and seamless content engagement** while maintaining a **minimalist, visually impactful design**.

By following this specification, developers can **efficiently build, test, and deploy** the website while keeping it flexible for future enhancements.