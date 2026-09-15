# CRY NGO360 — Operations & Compliance Platform

> **Comprehensive NGO project monitoring, grant tracking, statutory compliance governance, and offline field visit system for Child Rights and You (CRY).**

[![Build Status](https://img.shields.io/badge/Build-Passing-2E7D32.svg)](https://github.com/nikhila9876/CRY_org)
[![React 19](https://img.shields.io/badge/React-19.2-2563EB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-7C3AED.svg)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-0F766E.svg)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-ServiceWorker_&_Manifest-D97706.svg)](https://web.dev/progressive-web-apps/)
[![Zero Secrets](https://img.shields.io/badge/Secrets-Zero_Committed-2E7D32.svg)](#security--privacy)

---

## 1. Executive Summary & Core Purpose

CRY works with grassroots NGO partners across India to ensure children's fundamental rights to education, health, nutrition, and protection from violence and exploitation. **CRY NGO360** eliminates reporting friction, tracks annual cycles and financial tranches, and empowers field workers to record on-ground compliance checks even in zero-connectivity rural regions.

### Key Highlights
- **Strict Role Separation:** Distinct operational spaces for CRY Staff (multi-partner portfolio oversight) and Partner NGOs (deliverables, health score, document uploads).
- **First-Class Offline Field Visit Mode (`/field-visit/:id/offline`):** Native IndexedDB caching, interactive verification checklists, structured notes with local autosave, geo-tagged photo evidence, simulated voice memos, and deterministic FIFO sync queue.
- **Section 10 Multi-Color Light Theme:** Purpose-driven semantic colors (Green `#2E7D32`, Blue `#2563EB`, Purple `#7C3AED`, Amber `#D97706`, Red `#DC2626`, Teal `#0F766E`).
- **AI Compliance Copilot & Pre-Submission Scanner:** Statutory advice (FC-4, 20% admin ceiling, Tranche 2 prerequisites) and automated pre-submission radar scan.
- **PWA & Production Optimized:** Service worker (`cry-ngo360-v1`), `manifest.json`, and dynamic code-splitting via `React.lazy()` reducing bundle chunks to <50 kB.

---

## 2. Strict Role Distinction

| Capability / Surface | CRY Staff (`cry_staff`) | Partner NGO (`ngo_member` / `ngo_admin`) |
| :--- | :--- | :--- |
| **Workspace Scope** | Multi-NGO portfolio across states | Single-NGO scoped data (`Bachpan Bachao Trust`) |
| **Dashboard** | KPI metrics, AI briefing, recent submissions, upcoming visits | "Your Next Important Task" hero card, Compliance Health Score (78%), active deliverables |
| **Project Monitoring** | Utilization rate bars, DRS milestones, tranche release approval | Simplified milestones, deadline countdowns, upload triggers |
| **Documents** | Approve, Request Correction (with reason), Reject workflows | Document repository, status badges, drag-and-drop upload, feedback resolution |
| **Field Visits** | Schedule visits, configure objectives, sync inspection audits | View scheduled inspections, open Offline Field Visit mode |
| **Statutory Check** | DARPAN, FCRA, 12A/80G verification checklist | View legal verification status, advisory alerts |

---

## 3. Section 10 Multi-Color Semantic Design System

The interface strictly adopts a multi-color light theme where every color has unambiguous operational meaning:

| Token Name | Hex Code | Semantic Meaning & Usage in CRY NGO360 |
| :--- | :--- | :--- |
| **Primary Green** | `#2E7D32` | On-track status, compliance pass, active tranches, primary actions |
| **Information Blue**| `#2563EB` | Neutral metadata, informational badges, document version tags, active filters |
| **AI Purple** | `#7C3AED` | AI Compliance Copilot, statutory query suggestions, pre-submission scan |
| **Attention Amber** | `#D97706` | Approaching deadlines (≤7 days), correction requested, pending review |
| **Critical Red** | `#DC2626` | Overdue deliverables, statutory risks, FCRA expiry warnings, rejections |
| **Sync Teal** | `#0F766E` | Offline mode active, IndexedDB storage status, device cached indicators |
| **Neutral Background**| `#F8FAFC` | Light application shell background, accessible text contrast `#172033` |

---

## 4. Offline Field Visit System Architecture (`/field-visit/:id/offline`)

Built specifically for field frontliners inspecting rural learning centers and drought-prone clusters with intermittent or zero cellular connectivity:

```
+-----------------------------------------------------------------------+
|                 CRY NGO360 Offline Field Visit Layer                 |
+-----------------------------------------------------------------------+
|  [Network Detection & Simulation] -> navigator.onLine / Toggle Button  |
|  [Interactive Checklist]          -> 4-Tier Evaluation & Remarks      |
|  [Observation Field Notes]        -> Autosaved Debounced Inputs       |
|  [Photo Evidence Capture]         -> Base64 Storage & GPS Stamping    |
|  [Voice Memo Audio Recorder]      -> Live Waveform & Playback Buffer  |
|  [FIFO Outbox & Sync Queue]       -> Step-by-Step Server Transmit     |
+-----------------------------------------------------------------------+
                                  |
                                  v
+-----------------------------------------------------------------------+
|                Browser IndexedDB: CRY_FieldOps_DB (v1)                |
|   - Store: fieldVisits   |   - Store: syncQueue                       |
|   - Store: photos        |   - Store: audioNotes                      |
+-----------------------------------------------------------------------+
```

---

## 5. Summary of Completed Implementation Milestones (50 / 50)

All 50 implementation milestones have been completed via atomic Conventional Commits and merged via GitHub Pull Requests directly into `main`:

| # | Feature Branch | Summary of Changes & Deliverables |
| :-: | :--- | :--- |
| **1** | `feature-audit-project` | Project audit, architecture blueprint in `docs/PROJECT_AUDIT.md`, Vite + React 19 setup |
| **2** | `feature-design-tokens-theme` | Section 10 multi-color tokens in `src/constants/theme.js` & `src/index.css` |
| **3** | `feature-app-shell` | Responsive `AppShell.jsx` and real-time `OfflineBanner.jsx` |
| **4** | `feature-navbar` | `Navbar.jsx` with profile dropdown, notification bell, and 1-click role switcher |
| **5** | `feature-role-sidebar` | `Sidebar.jsx` and `MobileNavigation.jsx` with role-scoped navigation routes |
| **6** | `feature-protected-routing` | `RoleGuard.jsx`, `ProtectedRoute.jsx`, `Forbidden403.jsx`, `NotFound404.jsx` |
| **7** | `feature-login-page` | `Login.jsx` with Staff vs NGO tabs and instant demo account buttons |
| **8** | `feature-auth-states` | `usePermissions()` granular access hook and mock user registry |
| **9** | `feature-staff-dashboard` | `StaffDashboard.jsx` with KPI cards, AI briefing, recent submissions, upcoming visits |
| **10** | `feature-staff-ngo-list` | `StaffNgoList.jsx` with multi-facet filters (status, cycle, risk) and quick inspect |
| **11** | `feature-staff-ngo-detail` | `StaffNgoDetail.jsx` with DARPAN/FCRA/12A/80G legal verification card and contact list |
| **12** | `feature-staff-project-monitoring` | `StaffProjects.jsx` with financial utilization rates, DRS milestones, and tranches |
| **13** | `feature-staff-timeline` | `StaffTimeline.jsx` annual operational roadmap with quarterly document prerequisites |
| **14** | `feature-staff-document-review` | `StaffDocuments.jsx` with Approve, Request Correction (with reason), Reject modal |
| **15** | `feature-staff-field-scheduling` | `StaffFieldVisits.jsx` with schedule inspection modal and objectives builder |
| **16** | `feature-staff-notifications` | `StaffNotifications.jsx` with risk-categorized alerts and mark-as-read |
| **17** | `feature-ngo-dashboard` | `NgoDashboard.jsx` with "Next Important Task" hero card and 78% Compliance Health Score |
| **18** | `feature-ngo-tasks` | `NgoTasks.jsx` with priority badges, deadline countdowns, and completion toggle |
| **19** | `feature-deadline-filters` | `DeadlineFilters.jsx` filtering by Overdue, 24H, 7D, 30D, and categories |
| **20** | `feature-deadline-search` | `SearchBar.jsx` with keyboard '/' shortcut and real-time query counter |
| **21** | `feature-ngo-project-timeline` | `NgoProjects.jsx` partner milestone timeline with direct upload triggers |
| **22** | `feature-ngo-documents` | `NgoDocuments.jsx` partner compliance filings and document status badges |
| **23** | `feature-document-upload-ui` | `UploadZone.jsx` drag-and-drop file upload with format and 15MB size check |
| **24** | `feature-doc-preview-status` | `DocumentPreviewModal.jsx` and `DocumentStatusBadge.jsx` for inspection |
| **25** | `feature-correction-feedback-ui` | `CorrectionFeedbackCard.jsx` displaying staff remarks and 1-click re-upload |
| **26** | `feature-ngo-notifications` | `NgoNotifications.jsx` partner alerts with deadline reminders and approval notices |
| **27** | `feature-ngo-profile` | `NgoProfile.jsx` with coordinator settings, language selector, and assigned staff card |
| **28** | `feature-status-components` | `HealthScoreCard` (SVG progress ring), `SyncStatusBadge`, and `FilterChips` |
| **29** | `feature-modal-toast-system` | Reusable `Modal.jsx` and universal multi-color `ToastContext.jsx` provider |
| **30** | `feature-loading-error-states` | `SkeletonLoader.jsx` (6 variants), `EmptyState.jsx`, and `ErrorState.jsx` with retry |
| **31** | `feature-offline-field-visit` | Dedicated `/field-visit/:id/offline` page with header, status badges, and tab panels |
| **32** | `feature-offline-checklist` | `OfflineChecklist.jsx` with categories, 4-tier status toggles, and inspector remarks |
| **33** | `feature-offline-notes` | `OfflineNotes.jsx` with structured prompts, classification tags, and local autosave |
| **34** | `feature-offline-photo-ui` | `OfflinePhotoCapture.jsx` with GPS tagging, category metadata, and thumbnail preview |
| **35** | `feature-offline-voice-note` | `OfflineVoiceNote.jsx` recorder simulation with waveform visualizer and playback |
| **36** | `feature-offline-connection-indicator` | `OfflineConnectionIndicator.jsx` with real-time listeners and simulation toggle |
| **37** | `feature-pending-sync-ui` | `PendingSyncQueue.jsx` with FIFO sync execution, progress bar, and storage stats |
| **38** | `feature-indexeddb-abstraction` | Native `src/utils/indexedDB.js` storage layer (`CRY_FieldOps_DB` v1) with CRUD helpers |
| **39** | `feature-pwa-manifest` | `public/manifest.json` for standalone PWA installation, brand theme, and shortcuts |
| **40** | `feature-service-worker` | `public/sw.js` with app shell pre-caching and stale-while-revalidate strategy |
| **41** | `feature-central-api-client` | `src/services/apiClient.js` with JWT bearer injection and mock response simulation |
| **42** | `feature-auth-api-service` | `src/services/authService.js` with login, logout, refresh, and profile endpoints |
| **43** | `feature-project-task-services` | `src/services/projectService.js` and `src/services/taskService.js` |
| **44** | `feature-document-api-service` | `src/services/documentService.js` with upload, review, and verification endpoints |
| **45** | `feature-notification-field-services` | `src/services/notificationService.js` and `src/services/fieldVisitService.js` |
| **46** | `feature-ai-assistant-ui` | `AIAssistantDrawer.jsx` in Purple `#7C3AED` with statutory guides and floating trigger |
| **47** | `feature-ai-doc-check-ui` | `AIDocumentCheckModal.jsx` pre-submission radar scan checking DARPAN and CA stamps |
| **48** | `feature-responsive-accessibility` | WCAG 2.1 AA skip links, main landmarks, and high-visibility focus indicators |
| **49** | `feature-performance-refactoring` | `React.lazy()` + `<Suspense>` route splitting, eliminating large bundle chunk warnings |
| **50** | `feature-final-testing-docs` | Production verification, `.env.example`, and complete architectural documentation |

---

## 6. Getting Started & Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/nikhila9876/CRY_org.git
cd CRY_org/frontend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start local development server
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build & Verification

```bash
# Compile optimized production bundle with Vite
npm run build

# Preview the production build locally
npm run preview
```

---

## 7. Demo Accounts & One-Click Login

On the `/login` screen or the top navigation bar, quick demo buttons are available:

1. **CRY Staff (Operations Officer):**
   - **Email:** `priya.sharma@cry.org`
   - **Role:** `cry_staff`
   - **Access:** Full portfolio review, document approval/rejection, visit scheduling.

2. **Partner NGO Coordinator:**
   - **Email:** `aarav.patel@bachpanbachao.org`
   - **Role:** `ngo_member` (or `ngo_admin`)
   - **Access:** Bachpan Bachao Trust workspace, document uploads, task execution, AI Copilot.

---

## 8. Security & Privacy

- **Zero Secrets Committed:** No backend database URIs, JWT signing keys, or third-party LLM API keys are stored in client-side code.
- **Client Fallback:** In the absence of a live backend, the system gracefully operates using the client-side mock engine (`VITE_ENABLE_MOCK_API=true`).
- **Data Privacy:** Local field visit drafts, photos, and voice notes are stored strictly inside the user's private browser IndexedDB storage until explicitly synced.

---

## 9. License & Attribution

Designed and developed for **Child Rights and You (CRY)** NGO360 platform governance.
All rights reserved.
