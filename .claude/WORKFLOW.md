# Development Workflow Guide

This document defines the structured approach for making changes to the Flow application, following Context7 methodology.

## When Starting Any New Task

### Step 1: Understand Context (5-10 minutes)
Before writing any code, invest time in understanding:

```bash
# Review architectural constraints
Read .claude/CLAUDE.md

# Find relevant files
Use Glob tool to locate files by pattern
Use Grep tool to search for relevant code

# Read existing implementations
Use Read tool to understand current patterns
```

**Ask yourself:**
- What files will be affected?
- Are there existing patterns I should follow?
- What are the architectural constraints?
- What dependencies exist between components?

### Step 2: Plan with TodoWrite (2-5 minutes)
Create a clear task breakdown:

```javascript
// Example planning structure
TodoWrite({
  todos: [
    {
      content: "Review existing authentication implementation",
      status: "in_progress",
      activeForm: "Reviewing authentication implementation"
    },
    {
      content: "Create new API endpoint for user preferences",
      status: "pending",
      activeForm: "Creating API endpoint"
    },
    {
      content: "Add frontend component to display preferences",
      status: "pending",
      activeForm: "Adding frontend component"
    },
    {
      content: "Test the complete flow end-to-end",
      status: "pending",
      activeForm: "Testing end-to-end flow"
    }
  ]
})
```

**Guidelines:**
- Break complex tasks into 3-8 smaller tasks
- Each task should be completable in one focused session
- Use imperative form for `content` ("Create endpoint")
- Use present continuous for `activeForm` ("Creating endpoint")
- Keep exactly ONE task "in_progress" at a time

### Step 3: Execute Atomically
Work on ONE task at a time:

```bash
# Good: Single focused change
1. Update stage model to add new field
2. Create migration
3. Test migration
4. Mark task complete

# Bad: Multiple unrelated changes
1. Update stage model, fix unrelated UI bug, refactor auth, add new feature
```

**Mark completed immediately:**
```javascript
// As soon as a task is done, update the todo
TodoWrite({
  todos: [
    {
      content: "Review existing authentication implementation",
      status: "completed",  // ✅ Done!
      activeForm: "Reviewing authentication implementation"
    },
    {
      content: "Create new API endpoint for user preferences",
      status: "in_progress",  // ⏳ Now working on this
      activeForm: "Creating API endpoint"
    },
    // ... rest pending
  ]
})
```

### Step 4: Document Changes
Update documentation as you go:

**For architectural changes:**
- Update `.claude/CLAUDE.md` immediately
- Document new patterns or decisions
- Update implementation status checklist

**For complex logic:**
- Add inline comments explaining "why" not "what"
- Document edge cases and safety measures

### Step 5: Test Before Moving On
Before marking a task complete:

```bash
# Check dev server output
BashOutput tool to check running servers

# Manual testing
- Does the UI look correct?
- Are there console errors?
- Does the interaction work as expected?

# Defensive checks
- Are arrays initialized properly?
- Is null/undefined handled?
- Are error states displayed to users?
```

### Step 6: Clean Up Todo List
When all tasks are done:

```javascript
// Option 1: Start new work - create new todo list
// Option 2: Take a break - clear completed tasks

// Never leave stale todos mixed with new work
```

## Example: Complete Workflow

**User Request**: "Add a description field to flow templates"

### Context Phase (Understanding)
```bash
# 1. Review flow template model
Read /backend/app/models/flow.py

# 2. Find related schemas
Read /backend/app/schemas/flow.py

# 3. Check frontend usage
Grep "FlowTemplate" in frontend/src/

# 4. Review migration patterns
Read alembic/versions/*.py (most recent one)
```

**Findings:**
- FlowTemplate model in `models/flow.py`
- Uses SQLAlchemy ORM
- Pydantic schemas in `schemas/flow.py`
- Frontend uses FlowDesigner component
- Need Alembic migration for schema change

### Planning Phase (TodoWrite)
```javascript
TodoWrite({
  todos: [
    {
      content: "Add description field to FlowTemplate model",
      status: "in_progress",
      activeForm: "Adding description field to model"
    },
    {
      content: "Create Alembic migration for new field",
      status: "pending",
      activeForm: "Creating Alembic migration"
    },
    {
      content: "Update Pydantic schemas to include description",
      status: "pending",
      activeForm: "Updating Pydantic schemas"
    },
    {
      content: "Add description input to Flow Designer UI",
      status: "pending",
      activeForm: "Adding description input to UI"
    },
    {
      content: "Test creation and editing of flows with description",
      status: "pending",
      activeForm: "Testing flow description functionality"
    }
  ]
})
```

### Execution Phase (Atomic Changes)

**Task 1: Update Model**
```python
# Edit /backend/app/models/flow.py
# Add: description = Column(String, nullable=True)

# Mark complete immediately
TodoWrite({ todos: [...] }) # Move to completed
```

**Task 2: Create Migration**
```bash
# In backend directory
alembic revision --autogenerate -m "Add description to flow templates"

# Review generated migration
Read alembic/versions/xxx_add_description.py

# Apply migration
alembic upgrade head

# Mark complete
TodoWrite({ todos: [...] })
```

**Task 3: Update Schemas**
```python
# Edit /backend/app/schemas/flow.py
# Add description field to FlowTemplateCreate and FlowTemplateResponse

# Mark complete
TodoWrite({ todos: [...] })
```

**Task 4: Update UI**
```jsx
// Edit /frontend/src/pages/FlowDesigner.jsx
// Add textarea for description in flow creation/edit form

// Test in browser
// Mark complete
TodoWrite({ todos: [...] })
```

**Task 5: End-to-End Testing**
```bash
# Create new flow with description
# Edit existing flow description
# Verify saved correctly
# Check no console errors

# All good? Mark complete
TodoWrite({ todos: [...] })
```

### Documentation Phase
```markdown
# Update .claude/CLAUDE.md if needed
# For this change, probably no architectural doc updates needed
# Already documented in code with inline comments
```

## Anti-Patterns to Avoid

### ❌ Don't: Make changes without planning
```
User: "Add feature X"
Agent: *immediately starts coding*
```

### ✅ Do: Plan first with TodoWrite
```
User: "Add feature X"
Agent: "Let me plan this work with TodoWrite..."
Agent: *creates clear task breakdown*
Agent: "I'll start with understanding the current implementation..."
```

### ❌ Don't: Batch multiple task completions
```
Agent: *completes 5 tasks*
Agent: *updates todo marking all 5 complete at once*
```

### ✅ Do: Mark complete immediately after each task
```
Agent: *completes task 1*
Agent: *immediately marks task 1 complete*
Agent: *starts task 2*
```

### ❌ Don't: Make multiple unrelated changes together
```
Agent: *fixes bug + adds feature + refactors code + updates docs*
Agent: "All done!"
```

### ✅ Do: Focus on one task at a time
```
Agent: *fixes bug*
Agent: "Bug fixed and tested, marking complete"
Agent: *now starting the feature work*
```

### ❌ Don't: Assume or guess requirements
```
User: "Make the UI better"
Agent: *makes random UI changes without asking*
```

### ✅ Do: Ask clarifying questions
```
User: "Make the UI better"
Agent: "I can help improve the UI. What specific aspects would you like to improve?"
Agent: *uses AskUserQuestion tool if multiple options*
```

## Summary Checklist

Before starting any task:
- [ ] Reviewed relevant files and architecture
- [ ] Created TodoWrite plan with clear tasks
- [ ] Understand dependencies and constraints
- [ ] Know what success looks like

While working:
- [ ] One task in_progress at a time
- [ ] Mark completed immediately after finishing
- [ ] Test before moving to next task
- [ ] Document as you go

After completing:
- [ ] All tests pass
- [ ] No console errors
- [ ] Documentation updated
- [ ] Todo list reflects accurate state

## When to Use TodoWrite

**Always use for:**
- Multi-step features (3+ steps)
- Complex refactoring
- Bug fixes affecting multiple files
- Any work taking more than 10 minutes

**Optional for:**
- Single-file typo fixes
- Simple one-line changes
- Pure documentation updates

**Never skip for:**
- User's explicit multi-part requests
- Architectural changes
- Database migrations
- New feature development
