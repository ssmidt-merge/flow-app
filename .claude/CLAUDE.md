# CLAUDE.md

# AI Garage Systems Architecture - Steering Guide

This document provides the authoritative architecture specifications for the AI Garage systems. All coding agents must adhere to these specifications without deviation or assumption.

## Overview

This guide defines the technology stack, services, and vendors approved for use in the AI Garage ecosystem. Use only the services and technologies listed in this document.

---

## Approved Services & Technology Stack

### No SQL Database
- **Product**: Firestore
- **Vendor**: GCP
- **Reference**: https://cloud.google.com/products/firestore?hl=en

### SQL Database
- **Product**: Cloud SQL - PostgreSQL
- **Vendor**: GCP
- **Reference**: https://cloud.google.com/sql

### RAG (Retrieval-Augmented Generation)
1. **RAG Engine**
   - **Vendor**: GCP
   - **Reference**: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/rag-overview

2. **Vector Search**
   - **Vendor**: GCP
   - **Reference**: https://cloud.google.com/vertex-ai/docs/vector-search/overview

3. **File Search**
   - **Vendor**: GCP
   - **Reference**: https://ai.google.dev/gemini-api/docs/file-search

### LLM Providers
1. **Google Vertex AI**
   - **Vendor**: GCP
   - **Reference**: https://cloud.google.com/vertex-ai
   - **Authentication**: Google Cloud Application Default Credentials only (never use API keys)
   - **Description**: We communicate with Google's LLMs exclusively through Vertex AI

2. **Claude**
   - **Vendor**: Anthropic
   - **Reference**: https://claude.ai/

### App Hosting - Serverless
- **Product**: Cloud Run Functions
- **Vendor**: GCP
- **Type**: Serverless
- **Reference**: https://cloud.google.com/functions?hl=en

### UI/App Hosting - Containers
- **Product**: Cloud Run
- **Vendor**: GCP
- **Reference**: https://cloud.google.com/run?hl=en

### Identity Management
- **Product**: Firebase Authentication
- **Vendor**: GCP
- **Reference**: https://cloud.google.com/security/products/identity-platform

### File Storage
- **Product**: Cloud Storage Buckets
- **Vendor**: GCP
- **Reference**: https://github.com/MERGE-AI-Garage/garage-services

### Custom Garage Services
- **Product**: Reusable Customer Services
- **Vendor**: AI Garage
- **Repository**: https://github.com/MERGE-AI-Garage/garage-services

### UI Framework
- **Technologies**: React with TypeScript, Tailwind CSS, Daisy UI
- **Reference**: https://react.dev/
- **Language**: TypeScript for all React components and application code

### Backend Framework/Language
- **Language**: Python
- **Framework**: FastAPI
- **Reference**: https://fastapi.tiangolo.com

---

## Service Categories

The following categories are defined for organizing services:

1. No SQL DB
2. SQL DB
3. Identity management
4. RAG
5. LLM providers
6. UI/App hosting - Serverless
7. UI/App hosting - Containers
8. File Storage
9. Voice TTS
10. Voice 2 Voice
11. Custom Garage Services
12. UI framework
13. Backend framework/lang

---

## Approved Vendors

1. **GCP** (Google Cloud Platform)
2. **AI Garage**
3. **Anthropic**

---

## Agent Guidelines

### Mandatory Requirements

1. **Use ONLY the services listed in this document**
   - Do not propose or implement alternative services
   - Do not assume additional capabilities beyond what is specified

2. **Adhere to the specified technology stack**
   - Backend: Python with FastAPI
   - Frontend: React with Tailwind CSS and Daisy UI
   - Database: Firestore (NoSQL) or Cloud SQL PostgreSQL (SQL)
   - Hosting: Cloud Run or Cloud Run Functions

3. **Follow vendor constraints**
   - Use only GCP, AI Garage, or Anthropic services
   - Do not introduce services from other vendors

4. **Repository reference**
   - Custom services repository: https://github.com/MERGE-AI-Garage/garage-services

### Prohibited Actions

1. Do not suggest or implement services not listed in this document
2. Do not make assumptions about additional specifications
3. Do not propose alternative technology stacks
4. Do not introduce vendors outside the approved list

### When In Doubt

If a requirement or specification is unclear:
1. Ask for clarification rather than making assumptions
2. Reference this document as the source of truth
3. Defer to the approved services and vendors listed above

---

## Document Authority

This document represents the authoritative architecture specifications for the AI Garage systems. All implementation decisions must align with the services, technologies, and vendors specified herein.

**Last Updated**: 2025-11-11

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flow is a visual, lightweight workflow management tool designed for small teams to manage linear, repeatable processes with clear handoffs between roles. The core philosophy is **clarity of process** - answering "Who has it now?" and "What needs to be done next?"

### Key Differentiators
- NOT a Kanban board or flexible to-do list
- Designed for LINEAR workflows only (no branching in v1.0)
- Focus on process visibility and handoff management
- Simple, auditable path for each task

### Core Problem Statement
Teams struggle with:
- **Process bottlenecks:** Unclear responsibility leads to stalled tasks
- **No clear end states:** Tasks need to be completed, terminated, or marked as stalled
- **Repetitive manual work:** Email chains and spreadsheet trackers create friction

### Target Users
- **Requesters/Intranet Users:** Employees submitting requests via simple web forms
- **Operations Leads:** Process managers needing visibility into multi-stage processes and bottleneck identification

### Sample Use Cases
- HR: New Hire Onboarding
- Procurement: Vendor Approval
- Accounts Payable: Invoice Processing
- Marketing: Blog Post Pipeline
- IT: Employee Offboarding

## Repository Information

- **GitHub Repository**: https://github.com/ssmidt-merge/flow-app
- **PRD**: See flow_prd.md for complete product requirements and technical specifications

## Development Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL (local or Google Cloud SQL)

### Quick Start
```bash
# Backend (Terminal 1)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Frontend (Terminal 2)
cd frontend
npm install
npm run dev
```

### Database Migrations
```bash
# Create migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

### Environment Configuration
Copy `.env.example` to `.env` and configure:
- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - JWT secret (generate with `openssl rand -hex 32`)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - OAuth credentials

### Running Tests
```bash
# Backend tests
pytest

# Frontend (when implemented)
cd frontend && npm test
```

## Architecture

### Tech Stack
- **Backend**: FastAPI (Python) with SQLAlchemy ORM
- **Frontend**: React 19 with TypeScript, React Router, Tailwind CSS, and Daisy UI via Vite
- **Database**: PostgreSQL (Google Cloud SQL for production)
- **Authentication**: JWT tokens (development mode with auth disabled)

### Project Structure
```
backend/app/
  ├── core/          # Config, database, security, dependencies
  ├── models/        # SQLAlchemy models (User, Flow, etc.)
  ├── routers/       # API endpoints grouped by domain
  └── schemas/       # Pydantic request/response schemas

frontend/
  ├── src/
  │   ├── components/  # Reusable React components (Layout, etc.) - TypeScript
  │   ├── pages/       # Page-level React components (MyTasks, FlowDesigner) - TypeScript
  │   ├── types.ts     # TypeScript type definitions for all data models
  │   ├── api.ts       # Centralized API client with auth and type safety
  │   ├── style.css    # Tailwind CSS with custom components
  │   ├── App.tsx      # Main React app with routing
  │   └── main.tsx     # React application entry point
  ├── index.html       # Single-page application root
  ├── tsconfig.json    # TypeScript configuration
  └── vite.config.js   # Build configuration with React plugin

alembic/             # Database migration scripts
```

### Authentication Flow
**Current Status**: Development mode with authentication disabled

**Development Mode** (DEV_MODE_AUTH_DISABLED = True):
1. All API requests automatically use test user (test@example.com)
2. No token validation required
3. Test user auto-created if not exists
4. Frontend still includes auth infrastructure (ready for production)

**Production Flow** (when auth enabled):
1. User logs in via email/password or Google OAuth
2. Backend issues JWT token with user email as subject
3. Frontend stores token in localStorage
4. All API requests include `Authorization: Bearer {token}` header
5. Backend validates token via `get_current_user` dependency

**Note**: Firebase Authentication migration is planned but not prioritized for current development phase.

### API Patterns
- REST endpoints prefixed by domain (`/auth`, `/users`, `/flows`)
- Pydantic schemas for request validation and response serialization
- SQLAlchemy models with relationship loading
- Dependency injection for database sessions and auth

### Database Conventions
- All tables use `id` as primary key (Integer, auto-increment)
- Timestamps: `created_at` and `updated_at` (UTC, auto-managed)
- Soft deletes not implemented (use `is_active` flags where needed)
- Enums defined as Python enums and stored as PostgreSQL enum types

### Frontend State Management
- **React 19 with TypeScript** - All components use TypeScript for type safety
- **React Router (v7)** for client-side routing
- Component-level state using `useState` and `useEffect` hooks with proper typing
- API client (api.ts) uses Axios for HTTP requests with full TypeScript support
- **Type Definitions** in `types.ts` covering all data models (User, FlowTemplate, Stage, FormField, etc.)
- **Daisy UI** component library built on Tailwind CSS for consistent styling
- Pages: MyTasks, FlowDesigner (both TypeScript)
- Reusable components: Layout (navigation and structure) - TypeScript

### TypeScript Integration
- **tsconfig.json** configured for React with strict type checking
- All React components use `.tsx` extension
- All utility/API files use `.ts` extension
- Comprehensive type definitions for:
  - API request/response models
  - Component props and state
  - Enums for field types, task status, flow status
  - User, FlowTemplate, Stage, FormField, TaskInstance interfaces
- Type-safe API client with typed Axios responses
- Defensive programming with array safety checks and null handling

## Implementation Status

### Feature 1: Authentication & My Tasks View (P0) ✅
- [x] JWT-based authentication infrastructure (disabled in dev mode)
- [x] "My Tasks" view (React component ready, awaiting task instances)
- [x] User management backend

### Feature 2: Flow Designer (P0) ✅
- [x] Flow Template model (stages, assignments, form fields)
- [x] Visual flow designer UI with full CRUD operations
- [x] Stage management with drag-and-drop reordering
- [x] Stage-level form builder with dynamic field types
- [x] User assignment selection per stage
- [x] Approval stage configuration
- [x] Delete flow functionality with confirmation
- [x] Comprehensive error handling and array safety

### Implementation Notes
- **Frontend Migration**: Successfully migrated from Vanilla JS to React 19 + TypeScript + Daisy UI
- **TypeScript Migration**: Full TypeScript conversion with comprehensive type definitions in `types.ts`
- **Type Safety**: All components, API calls, and state management properly typed
- **DaisyUI Configuration**: Custom theme defined explicitly (not spreading internal themes)
- **Component Architecture**: StageCard and FormFieldItem as reusable TypeScript components
- **State Management**: Defensive programming with array safety checks and TypeScript null safety throughout
- **UI/UX**: Clean alignment, proper visual hierarchy, hover states for interactions

### Next: Feature 3: Flow Execution (P0)
- [ ] Flow Instance model and CRUD endpoints
- [ ] Task creation from flow templates
- [ ] Task assignment and handoff workflow
- [ ] "My Tasks" view populated with assigned tasks
- [ ] Task status updates and completion

---

## Development Methodology

**See `.claude/WORKFLOW.md` for detailed workflow guide with examples.**

### Context7 Approach

All code changes should follow this structured approach:

1. **Understand Context**
   - Review relevant files and architecture before making changes
   - Understand dependencies and relationships
   - Check CLAUDE.md for architectural constraints

2. **Plan with TodoWrite**
   - Break work into clear, trackable tasks
   - Use TodoWrite tool at the start of any multi-step work
   - Keep exactly ONE task as "in_progress" at a time
   - Mark tasks completed immediately after finishing

3. **Make Atomic Changes**
   - One focused change at a time
   - Each change should be testable independently
   - Avoid batching multiple unrelated fixes

4. **Document as You Go**
   - Update CLAUDE.md for architectural changes
   - Add inline comments for complex logic
   - Keep documentation in sync with code

5. **Test Before Moving On**
   - Verify each change works before proceeding
   - Check dev server output for errors
   - Use defensive programming patterns (array safety, null checks)

6. **Follow Standards**
   - Adhere to AI Garage architecture specifications
   - Use approved services only (GCP, AI Garage, Anthropic)
   - Maintain consistency with existing code patterns

7. **Ask When Uncertain**
   - Use AskUserQuestion for clarification
   - Don't assume or guess requirements
   - Prefer explicit confirmation over implicit assumptions

### Code Quality Practices

**Frontend (React)**:
- Use functional components with hooks
- Ensure arrays are always initialized with fallbacks (`|| []`)
- Use `Array.isArray()` checks before `.map()` operations
- Implement proper error handling with user-friendly messages
- Follow Daisy UI component patterns for consistency

**Backend (FastAPI)**:
- Use Pydantic schemas for validation
- Implement proper error responses with status codes
- Use SQLAlchemy relationships for data loading
- Include proper database transaction handling

**Database**:
- Always use Alembic migrations for schema changes
- Test migrations locally before committing
- Use proper foreign key constraints and cascades

---

## Component Architecture

### FlowDesigner Component

**Location**: `/frontend/src/pages/FlowDesigner.jsx`

**Purpose**: Visual designer for creating and managing workflow templates with stages and form fields.

#### State Management
- `currentFlow` - Currently selected flow template (null when none selected)
- `allTemplates` - Array of all flow templates available
- `allUsers` - Array of all system users (for assignment selection)
- `loading` - Boolean indicating initial data load state

#### Key Functions

**Initialization**:
- `initializeDesigner()` - Loads users and flow templates on mount
  - Ensures `allUsers` is always an array with fallbacks
  - Loads all flow templates
  - Sets loading state

**Flow Management**:
- `createFlow()` - Creates new empty flow template
- `loadFlow(flowId)` - Loads specific flow with stages and form fields
  - Ensures nested arrays (stages, form_fields) are initialized
- `updateFlow()` - Saves current flow changes to backend
- `deleteFlow(flowId, event)` - Deletes flow with confirmation
  - Prevents event propagation to avoid unwanted navigation
  - Clears current flow if it was the deleted one

**Stage Management**:
- `addStage()` - Adds new stage to current flow
  - Auto-increments order number
  - Ensures form_fields array exists
- `updateStageField(stageId, field, value)` - Updates single stage property
- `deleteStage(stageId)` - Removes stage and reorders remaining stages

**Form Field Management**:
- `addFormField(stageId)` - Adds new form field to specific stage
  - Auto-increments order within stage
  - Ensures form_fields array exists
- `updateFormField(stageId, fieldId, updates)` - Updates form field properties
- `deleteFormField(stageId, fieldId)` - Removes form field from stage

#### Component Hierarchy

```
FlowDesigner (Main Container)
├── Left Sidebar (Flow Templates List)
│   ├── Create New Flow Button
│   └── Template Cards (with delete buttons)
│       └── onClick: loadFlow(template.id)
│
└── Right Panel (Flow Editor)
    ├── Flow Header (name input, save button)
    ├── Add Stage Button
    └── Stages List
        └── StageCard (for each stage)
            ├── Stage Header (name, order, delete)
            ├── Assignment Dropdown (user selection)
            ├── Approval Checkbox
            ├── Expandable Section Toggle
            └── Stage Details (when expanded)
                ├── Instructions Textarea
                └── Form Fields Section
                    ├── Add Form Field Button
                    └── FormFieldItem (for each field)
                        ├── Field Type Dropdown
                        ├── Label Input
                        ├── Required Checkbox
                        └── Delete Button
```

#### Safety Patterns

The component implements comprehensive defensive programming:

**Array Safety**:
```javascript
// Always ensure arrays exist before mapping
{(currentFlow?.stages || []).map(stage => ...)}

// Initialize arrays in API responses
const safeFlow = {
  ...flowData,
  stages: (flowData.stages || []).map(stage => ({
    ...stage,
    form_fields: stage.form_fields || []
  }))
}

// Check array type before mapping
{Array.isArray(allUsers) && allUsers.map(user => ...)}
```

**Error Handling**:
```javascript
try {
  await api.call()
  // Update state
} catch (error) {
  console.error('Failed to...:', error)
  alert('User-friendly message')
  // Set safe fallback state
}
```

**Event Propagation Control**:
```javascript
// Prevent parent click handlers when clicking nested buttons
const deleteFlow = async (flowId, event) => {
  event?.stopPropagation()
  // ... delete logic
}
```

#### Styling Approach

- Uses **Daisy UI components** for form elements and buttons
- Custom Tailwind classes for layout and spacing
- Hover states for interactive elements (delete buttons, template cards)
- Visual feedback for selected state (primary colors)
- Responsive design with flexbox layouts

#### API Integration

Uses centralized API client (`/frontend/src/api.js`):
- `flowTemplates.list()` - Get all templates
- `flowTemplates.get(id)` - Get single template with relations
- `flowTemplates.create(data)` - Create new template
- `flowTemplates.update(id, data)` - Update template
- `flowTemplates.delete(id)` - Delete template
- `stages.create(flowId, data)` - Add stage
- `stages.update(flowId, stageId, data)` - Update stage
- `stages.delete(flowId, stageId)` - Remove stage
- `formFields.create(flowId, stageId, data)` - Add field
- `formFields.update(flowId, stageId, fieldId, data)` - Update field
- `formFields.delete(flowId, stageId, fieldId)` - Remove field
- `users.list()` - Get all users for assignment dropdown

#### Known Limitations

1. **No drag-and-drop reordering** - Stages use fixed order numbers
2. **No undo/redo** - Changes are persisted immediately on save
3. **No validation** - Allows saving incomplete flows
4. **No versioning** - Single version per flow template

#### Future Enhancements

- Visual flow diagram/preview
- Stage template library (reusable stage configs)
- Conditional logic between stages
- Bulk stage operations
- Import/export flow templates
