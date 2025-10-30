/**
 * Dynamic Projects Manager
 * Manages project data and carousel updates
 */

class ProjectsManager {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "Personal Brand Website",
                description: "Modern, responsive personal branding website showcasing AI, Tech & Marketing expertise",
                image: "assets/images/hero-section-image.png",
                alt: "Personal Brand Website",
                technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
                status: "active",
                category: "Web Development",
                date: "2024-10-24",
                link: "#",
                featured: true
            },
            {
                id: 2,
                title: "Personal Brand Website",
                description: "Modern, responsive personal branding website showcasing AI, Tech & Marketing expertise",
                image: "assets/images/hero-section-image.png",
                alt: "Personal Brand Website",
                technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
                status: "active",
                category: "Web Development",
                date: "2024-10-24",
                link: "#",
                featured: true
            },
            {
                id: 3,
                title: "Personal Brand Website",
                description: "Modern, responsive personal branding website showcasing AI, Tech & Marketing expertise",
                image: "assets/images/hero-section-image.png",
                alt: "Personal Brand Website",
                technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
                status: "active",
                category: "Web Development",
                date: "2024-10-24",
                link: "#",
                featured: true
            },
            {
                id: 4,
                title: "Personal Brand Website",
                description: "Modern, responsive personal branding website showcasing AI, Tech & Marketing expertise",
                image: "assets/images/hero-section-image.png",
                alt: "Personal Brand Website",
                technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
                status: "active",
                category: "Web Development",
                date: "2024-10-24",
                link: "#",
                featured: true
            },
            {
                id: 5,
                title: "Personal Brand Website",
                description: "Modern, responsive personal branding website showcasing AI, Tech & Marketing expertise",
                image: "assets/images/hero-section-image.png",
                alt: "Personal Brand Website",
                technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
                status: "active",
                category: "Web Development",
                date: "2024-10-24",
                link: "#",
                featured: true
            }
        ];
        
        this.init();
    }

    init() {
        this.updateCarousel();
        this.setupEventListeners();
    }

    /**
     * Add a new project to the carousel
     * @param {Object} projectData - Project information
     */
    addProject(projectData) {
        const newProject = {
            id: this.projects.length + 1,
            ...projectData,
            featured: true,
            date: new Date().toISOString().split('T')[0]
        };
        
        this.projects.unshift(newProject); // Add to beginning (most recent)
        this.updateCarousel();
        console.log('New project added:', newProject.title);
    }

    /**
     * Update project information
     * @param {number} projectId - Project ID
     * @param {Object} updates - Updated project data
     */
    updateProject(projectId, updates) {
        const projectIndex = this.projects.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
            this.projects[projectIndex] = { ...this.projects[projectIndex], ...updates };
            this.updateCarousel();
            console.log('Project updated:', this.projects[projectIndex].title);
        }
    }

    /**
     * Remove project from carousel
     * @param {number} projectId - Project ID
     */
    removeProject(projectId) {
        this.projects = this.projects.filter(p => p.id !== projectId);
        this.updateCarousel();
        console.log('Project removed:', projectId);
    }

    /**
     * Get featured projects (max 5 for carousel)
     */
    getFeaturedProjects() {
        return this.projects.filter(p => p.featured).slice(0, 5);
    }

    /**
     * Update the carousel HTML with current projects
     */
    updateCarousel() {
        const carouselTrack = document.getElementById('carouselTrack');
        if (!carouselTrack) return;

        const featuredProjects = this.getFeaturedProjects();
        const positions = ['active', 'left', 'right', 'left-2', 'right-2'];
        
        carouselTrack.innerHTML = '';
        
        featuredProjects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index, positions[index]);
            carouselTrack.appendChild(projectCard);
        });
    }

    /**
     * Create a project card element
     * @param {Object} project - Project data
     * @param {number} index - Card index
     * @param {string} position - Card position class
     */
    createProjectCard(project, index, position) {
        const card = document.createElement('div');
        card.className = `project-card ${position}`;
        card.setAttribute('data-index', index);
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.alt}" loading="lazy">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-cta">
                    View Project
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                </a>
            </div>
        `;
        
        return card;
    }

    /**
     * Setup event listeners for project management
     */
    setupEventListeners() {
        // Listen for custom events to add/update projects
        document.addEventListener('addProject', (e) => {
            this.addProject(e.detail);
        });
        
        document.addEventListener('updateProject', (e) => {
            this.updateProject(e.detail.id, e.detail.updates);
        });
        
        document.addEventListener('removeProject', (e) => {
            this.removeProject(e.detail.id);
        });
    }

    /**
     * Get all projects
     */
    getAllProjects() {
        return this.projects;
    }

    /**
     * Get project by ID
     * @param {number} projectId - Project ID
     */
    getProject(projectId) {
        return this.projects.find(p => p.id === projectId);
    }

    /**
     * Export projects data (for backup or migration)
     */
    exportProjects() {
        return JSON.stringify(this.projects, null, 2);
    }

    /**
     * Import projects data
     * @param {string} projectsJson - JSON string of projects
     */
    importProjects(projectsJson) {
        try {
            this.projects = JSON.parse(projectsJson);
            this.updateCarousel();
            console.log('Projects imported successfully');
        } catch (error) {
            console.error('Error importing projects:', error);
        }
    }
}

// Initialize Projects Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.projectsManager = new ProjectsManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectsManager;
}
