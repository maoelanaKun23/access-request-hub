# AI Usage

## AI Tool

Gemini

## Interaction 1 — Backend Architecture

### Ask
Asked AI to design the backend architecture for the
Access Request Hub based on the assessment.

### Suggestion
AI proposed ASP.NET Core Web API, EF Core, SQLite,
Users, Applications, AccessRequests and AuditEvents.

### Decision
Accepted with minor adjustments.

### Why
The architecture matched the relational workflow
and assessment requirements.

---

## Interaction 2 — Backend Implementation

### Ask
Asked AI to implement the Access Request Hub backend
and required approval workflow.

### Suggestion
AI generated controllers, services, models,
database context and seed data.

### Decision
Accepted after review and testing.

### Why
The implementation matched the required workflow.

---

## Interaction 3 — Testing

### Ask
Asked AI to review the backend against the assessment
requirements.

### Suggestion
AI identified missing automated tests.

### Decision
Accepted.

### Why
The missing tests covered concurrency and terminal-state
requirements.

---

## Three Things AI Got Wrong

### 1. Initial backend context
AI initially generated a Weather Forecast backend instead
of the Access Request Hub.

### 2. Missing approval inbox
The initial implementation did not expose the required
approval inbox endpoint.

### 3. Missing automated scenarios
Initial tests did not cover all required concurrency and
terminal-state scenarios.

Each issue was identified during review and corrected
before final submission.