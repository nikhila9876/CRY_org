# NGO360 Project Audit & Architecture Plan

## 1. Executive Summary & Existing State Audit
- **Repository**: `https://github.com/nikhila9876/CRY_org.git`
- **Initial Audit**:
  - The repository was initialized with an empty `frontend` folder and the prompt specification document `NGO360_Frontend_Antigravity_Prompt_Detailed_Roles_API.docx`.
  - No prior legacy code existed.
  - Node.js `v22.21.0` and npm `10.9.4` are available.
  - Modern React with Vite (`react@19`, `vite@8`, `@tailwindcss/vite`, `react-router-dom`, `lucide-react`) is selected as instructed.

## 2. Target Roles & Experience Separation
1. **Role A: CRY Staff / Frontliner**
   - Focus: High-level monitoring across all partner NGOs, proactive risk detection, field visit scheduling, document review (Approve / Request Correction / Reject with reason), and alert management.
   - Dedicated Routes: `/staff/dashboard`, `/staff/ngos`, `/staff/projects`, `/staff/documents`, `/staff/field-visits`, `/staff/notifications`.
2. **Role B: Partner NGO Member**
   - Focus: Action-oriented simplicity answering *"What do I need to do next?"*.
   - Features: Next Important Task hero, Compliance Health Score, My Tasks (Today, Week, Month, Overdue), Document Submissions (Utilization Certificate, Program Report, Financial Utilization, ITR, FC-4, 10B audit), and Project Milestones Timeline.
   - Dedicated Routes: `/ngo/dashboard`, `/ngo/tasks`, `/ngo/projects`, `/ngo/documents`, `/ngo/field-visits`, `/ngo/notifications`, `/ngo/profile`.
3. **Role C: NGO Admin (Optional)**
   - Internal organization management, team member assignments, without access to CRY Staff administrative oversight.
4. **Unique Offline Field Visit Mode** (`/field-visit/:id/offline`):
   - Local device caching using IndexedDB.
   - Full offline checklist, observation notes, photo attachments, voice note simulator.
   - Offline queue with sync state transitions (`Offline`, `Waiting to Sync`, `Syncing`, `Synced`, `Sync Failed`).

## 3. UI Color System
- **Primary Green** (`#2E7D32`): NGO / Healthy status / Nature
- **Blue** (`#2563EB`): Navigation, Information, Project progress
- **Purple** (`#7C3AED`): AI Features & Intelligent Insights
- **Amber** (`#D97706`): Approaching deadlines, Attention required
- **Red** (`#DC2626`): Overdue & Critical issues
- **Teal** (`#0F766E`): Offline / Online Synchronization & System Status
- **Neutral Text** (`#172033`), Secondary (`#64748B`), Border (`#E2E8F0`), Background (`#F8FAFC`), Cards (`#FFFFFF`).

## 4. Security & Environment Architecture
- No backend secret keys, MongoDB URIs, JWT secrets, or cloud credentials committed.
- Frontend exposes public variables (`VITE_API_BASE_URL`, `VITE_ENABLE_MOCK_API`, etc.).
- Centralized service layer switches between mock data and real REST API based on `VITE_ENABLE_MOCK_API`.
