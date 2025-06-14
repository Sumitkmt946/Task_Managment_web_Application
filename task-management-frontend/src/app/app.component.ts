import { Component } from "@angular/core"
import { TaskManagementComponent } from "./components/task-management/task-management.component"

@Component({
  selector: "app-root",
  
  imports: [TaskManagementComponent], 
  template: `
    <div class="app-container">
      <!-- Header -->
      <header class="app-header">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo-circle">
              <span class="logo-icon">⚪</span>
            </div>
            <h1 class="app-title">FINSTACK</h1>
          </div>
          
          
          <nav class="main-nav">
            <a href="#" class="nav-item">DASHBOARD</a>
            <a href="#" class="nav-item">MEETINGS</a>
            <a href="#" class="nav-item">NOTES</a>
            <a href="#" class="nav-item">DOCUMENTS</a>
          </nav>
          
          <div class="user-section">
            <div class="notifications">
              <span class="notification-icon">📧</span>
              <span class="notification-badge">0</span>
            </div>
            <div class="notifications">
              <span class="notification-icon">📄</span>
            </div>
            
            <div class="user-info">
              <span class="user-name">Task List Web</span>
              <div class="user-avatar">TL</div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <app-task-management></app-task-management>
      </main>
    </div>
  `,
  styles: [
    `
    .app-container {
      min-height: 100vh;
      background-color: #f5f7fa;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .app-header {
      background-color: #2c5f7c;
      color: white;
      padding: 0.75rem 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1400px;
      margin: 0 auto;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-icon {
      color: #2c5f7c;
      font-size: 16px;
    }

    .app-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .search-section {
      flex: 1;
      max-width: 600px;
      margin: 0 2rem;
    }

    .companies-dropdown {
      width: 100%;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .main-nav {
      display: flex;
      gap: 1.5rem;
    }

    .nav-item {
      color: white;
      text-decoration: none;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      padding: 0.25rem 0;
    }

    .nav-item:hover {
      opacity: 0.8;
    }

    .user-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .notifications {
      position: relative;
      cursor: pointer;
    }

    .notification-icon {
      font-size: 1.1rem;
    }

    .notification-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: #ff4444;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 0.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-name {
      font-size: 0.85rem;
      font-weight: 500;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #ffffff;
      color: #2c5f7c;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .main-content {
      padding: 1.5rem;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }
  `,
  ],
})
export class AppComponent {
  title = "task-management-frontend"
}
