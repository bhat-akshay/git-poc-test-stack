// Define the Profile Card Web Component
customElements.define(
  "profile-card",
  class extends HTMLElement {
    constructor() {
      super();

      // Create Shadow DOM
      const shadowRoot = this.attachShadow({ mode: "open" });
      
      // Create styles
      const style = document.createElement("style");
      style.textContent = `
        :host {
          display: block;
          width: 320px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .card {
          background: linear-gradient(to bottom right, #ffffff, #f7f9fc);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
        
        .card-header {
          height: 120px;
          background: linear-gradient(135deg, var(--header-color, #4a6cf7) 0%, var(--header-color-secondary, #2541b2) 100%);
          position: relative;
        }
        
        .profile-pic {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 5px solid white;
          object-fit: cover;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 70px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .profile-pic img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .profile-pic-placeholder {
          font-size: 42px;
          color: #888;
        }
        
        .card-body {
          padding: 70px 24px 24px;
          text-align: center;
        }
        
        .name {
          margin: 0 0 5px;
          font-size: 22px;
          font-weight: 600;
          color: #2d3748;
        }
        
        .title {
          margin: 0 0 20px;
          font-size: 14px;
          color: var(--header-color, #4a6cf7);
          font-weight: 500;
        }
        
        .bio {
          font-size: 14px;
          line-height: 1.6;
          color: #4a5568;
          margin-bottom: 24px;
        }
        
        .stats {
          display: flex;
          justify-content: space-around;
          border-top: 1px solid #edf2f7;
          padding-top: 20px;
          margin-bottom: 24px;
        }
        
        .stat {
          display: flex;
          flex-direction: column;
        }
        
        .stat-value {
          font-size: 20px;
          font-weight: 600;
          color: #2d3748;
        }
        
        .stat-name {
          font-size: 12px;
          color: #718096;
          margin-top: 4px;
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 10px;
        }
        
        .social-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #f7fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4a5568;
          text-decoration: none;
          transition: transform 0.2s, background-color 0.2s;
          border: 1px solid #e2e8f0;
        }
        
        .social-icon:hover {
          transform: scale(1.15);
          background-color: var(--header-color, #4a6cf7);
          color: white;
        }
        
        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }
        
        .btn {
          flex: 1;
          padding: 10px 0;
          border-radius: 8px;
          border: none;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn-primary {
          background-color: var(--header-color, #4a6cf7);
          color: white;
        }
        
        .btn-primary:hover {
          background-color: var(--header-color-secondary, #2541b2);
          box-shadow: 0 4px 8px rgba(74, 108, 247, 0.2);
        }
        
        .btn-secondary {
          background-color: #f7fafc;
          color: #4a5568;
          border: 1px solid #e2e8f0;
        }
        
        .btn-secondary:hover {
          background-color: #edf2f7;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }
        
        .badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background-color: rgba(255, 255, 255, 0.9);
          color: var(--header-color, #4a6cf7);
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 600;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .availability {
          display: inline-flex;
          align-items: center;
          margin-top: 5px;
          margin-bottom: 16px;
          font-size: 13px;
          color: #68D391;
          font-weight: 500;
        }
        
        .availability-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #68D391;
          margin-right: 6px;
          display: inline-block;
        }
        
        .availability[data-status="offline"] {
          color: #A0AEC0;
        }
        
        .availability[data-status="offline"] .availability-dot {
          background-color: #A0AEC0;
        }
        
        .availability[data-status="busy"] {
          color: #F56565;
        }
        
        .availability[data-status="busy"] .availability-dot {
          background-color: #F56565;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .availability[data-status="online"] .availability-dot {
          animation: pulse 2s infinite;
        }
        
        @media (max-width: 480px) {
          :host {
            width: 100%;
          }
        }
      `;
      
      // Create the profile card HTML structure
      const card = document.createElement("div");
      card.classList.add("card");
      
      // Get attributes or use defaults
      const imgSrc = this.getAttribute("img") || "";
      const name = this.getAttribute("name") || "User Name";
      const title = this.getAttribute("title") || "Position";
      const bio = this.getAttribute("bio") || "No bio available";
      const followers = this.getAttribute("followers") || "0";
      const following = this.getAttribute("following") || "0";
      const projects = this.getAttribute("projects") || "0";
      const badge = this.getAttribute("badge") || null;
      const color = this.getAttribute("color") || "#4a6cf7";
      const colorSecondary = this.getAttribute("color-secondary") || "#2541b2";
      const status = this.getAttribute("status") || "offline"; // online, offline, busy
      
      // Set CSS variables for theming
      card.style.setProperty("--header-color", color);
      card.style.setProperty("--header-color-secondary", colorSecondary);
      
      card.innerHTML = `
        <div class="card-header">
          ${badge ? `<div class="badge">${badge}</div>` : ''}
        </div>
        <div class="profile-pic">
          ${imgSrc ? `<img src="${imgSrc}" alt="${name}">` : `<div class="profile-pic-placeholder">👤</div>`}
        </div>
        <div class="card-body">
          <h3 class="name">${name}</h3>
          <p class="title">${title}</p>
          <div class="availability" data-status="${status}">
            <span class="availability-dot"></span>
            ${status === "online" ? "Available now" : status === "busy" ? "Do not disturb" : "Currently offline"}
          </div>
          <p class="bio">${bio}</p>
          <div class="stats">
            <div class="stat">
              <div class="stat-value">${followers}</div>
              <div class="stat-name">Followers</div>
            </div>
            <div class="stat">
              <div class="stat-value">${following}</div>
              <div class="stat-name">Following</div>
            </div>
            <div class="stat">
              <div class="stat-value">${projects}</div>
              <div class="stat-name">Projects</div>
            </div>
          </div>
          <div class="social-links">
            <a href="#" class="social-icon" title="Twitter">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
              </svg>
            </a>
            <a href="#" class="social-icon" title="LinkedIn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg>
            </a>
            <a href="#" class="social-icon" title="GitHub">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
            <a href="#" class="social-icon" title="Email">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
              </svg>
            </a>
          </div>
          <div class="action-buttons">
            <button class="btn btn-primary">Connect</button>
            <button class="btn btn-secondary">Message</button>
          </div>
        </div>
      `;
      
      // Add event listeners
      card.querySelector('.btn-primary').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('connect', {
          bubbles: true,
          composed: true,
          detail: { name: name }
        }));
      });
      
      card.querySelector('.btn-secondary').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('message', {
          bubbles: true,
          composed: true,
          detail: { name: name }
        }));
      });
      
      // Append style and card to shadow root
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(card);
      
      // Set up mutation observer to handle attribute changes
      this.observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === 'attributes') {
            this.updateAttribute(mutation.attributeName);
          }
        });
      });
      
      this.observer.observe(this, { attributes: true });
    }
    
    // Specify which attributes to watch for changes
    static get observedAttributes() {
      return ['name', 'title', 'bio', 'img', 'followers', 'following', 'projects', 'badge', 'status', 'color', 'color-secondary'];
    }
    
    // Handle attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue && this.shadowRoot) {
        this.updateAttribute(name);
      }
    }
    
    // Update specific attribute in the DOM
    updateAttribute(attrName) {
      const root = this.shadowRoot;
      const card = root.querySelector('.card');
      
      switch(attrName) {
        case 'name':
          root.querySelector('.name').textContent = this.getAttribute('name') || 'User Name';
          break;
        case 'title':
          root.querySelector('.title').textContent = this.getAttribute('title') || 'Position';
          break;
        case 'bio':
          root.querySelector('.bio').textContent = this.getAttribute('bio') || 'No bio available';
          break;
        case 'img':
          const imgSrc = this.getAttribute('img');
          const profilePic = root.querySelector('.profile-pic');
          
          if (imgSrc) {
            if (profilePic.querySelector('img')) {
              profilePic.querySelector('img').src = imgSrc;
            } else {
              profilePic.innerHTML = `<img src="${imgSrc}" alt="${this.getAttribute('name') || 'User'}">`;
            }
          } else {
            profilePic.innerHTML = `<div class="profile-pic-placeholder">👤</div>`;
          }
          break;
        case 'followers':
          root.querySelector('.stat:nth-child(1) .stat-value').textContent = this.getAttribute('followers') || '0';
          break;
        case 'following':
          root.querySelector('.stat:nth-child(2) .stat-value').textContent = this.getAttribute('following') || '0';
          break;
        case 'projects':
          root.querySelector('.stat:nth-child(3) .stat-value').textContent = this.getAttribute('projects') || '0';
          break;
        case 'badge':
          const badgeValue = this.getAttribute('badge');
          let badgeElem = root.querySelector('.badge');
          
          if (badgeValue) {
            if (badgeElem) {
              badgeElem.textContent = badgeValue;
            } else {
              badgeElem = document.createElement('div');
              badgeElem.classList.add('badge');
              badgeElem.textContent = badgeValue;
              root.querySelector('.card-header').appendChild(badgeElem);
            }
          } else if (badgeElem) {
            badgeElem.remove();
          }
          break;
        case 'status':
          const status = this.getAttribute('status') || 'offline';
          const availability = root.querySelector('.availability');
          availability.dataset.status = status;
          
          const statusText = status === "online" ? "Available now" : 
                            status === "busy" ? "Do not disturb" : 
                            "Currently offline";
          
          availability.innerHTML = `
            <span class="availability-dot"></span>
            ${statusText}
          `;
          break;
        case 'color':
        case 'color-secondary':
          const color = this.getAttribute('color') || '#4a6cf7';
          const colorSecondary = this.getAttribute('color-secondary') || '#2541b2';
          
          card.style.setProperty('--header-color', color);
          card.style.setProperty('--header-color-secondary', colorSecondary);
          break;
      }
    }
    
    // Cleanup when element is removed from DOM
    disconnectedCallback() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }
);

// Example usage:
/*
<profile-card
  name="Sarah Johnson"
  title="Senior UX Designer"
  bio="Passionate about creating user-centered designs that solve real problems. Over 8 years of experience in product design."
  img="https://example.com/profile.jpg"
  followers="2.5k"
  following="365"
  projects="47"
  badge="PRO"
  status="online"
  color="#4a6cf7"
  color-secondary="#2541b2"
></profile-card>
*/
