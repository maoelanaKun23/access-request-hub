# Access Request Hub — Engineering Plan

## 1. Problem Understanding

The company currently manages internal application access requests through email and chat. This makes approval tracking difficult, can result in duplicate requests, and creates a risk of concurrent approval actions against the same request.

The goal is to build an MVP Access Request Hub as a single source of truth for:

* Access requests
* Approval workflow
* Request status
* Audit trail

The application will run locally using seeded demo users. Real SSO, provisioning, email notification, and cloud deployment are out of scope.

## 2. Proposed Architecture

The application will use a simple end-to-end architecture:

```text
React + Vite
     |
     | HTTP / REST API
     v
ASP.NET Core Web API
     |
     | Entity Framework Core
     v
Relational Database
```

### Frontend

The frontend will provide:

* User switcher for seeded users
* Create access request form
* My Requests
* Approval Inbox
* Request Detail
* Audit timeline
* Loading, empty, validation, and conflict states

### Backend

The backend will be responsible for:

* Request validation
* Authorization
* Access request workflow
* Idempotent request creation
* Optimistic concurrency
* Approval/rejection processing
* Audit event creation
* Appropriate error responses

### Database

The database will use a relational schema with:

* Primary keys
* Foreign keys
* Unique constraints
* Relevant database constraints
* Migration/schema
* Seed data
* Append-only audit events

## 3. Data Model

The initial model will contain the following main entities:

### Users

Stores the seeded users and their roles/relationships.

### Applications

Stores applications and their assigned System Owners.

### Access Requests

Stores the business transaction containing:

* ClientRequestId
* Requester
* Application
* Environment
* Access Level
* Justification
* Status
* Policy Version
* Concurrency Version
* Timestamps

### Audit Events

Stores business-critical state transitions and actions performed against requests.

The detailed ERD and relationships will be finalized before implementation.

## 4. Implementation Order

1. Repository and Git workflow
2. Define architecture and data model
3. Create backend ASP.NET Core project
4. Configure relational database
5. Implement entities and migrations
6. Implement seeded users and master data
7. Implement access request creation
8. Implement request state transitions
9. Implement authorization rules
10. Implement idempotent request creation
11. Implement optimistic concurrency
12. Implement audit trail
13. Implement API endpoints
14. Create React + Vite frontend
15. Implement request creation and request listing
16. Implement approval inbox
17. Implement request detail and audit timeline
18. Add error/conflict handling
19. Add automated tests
20. Review security, correctness, and known limitations
21. Complete documentation and Phase 1 submission

## 5. Workflow

The Phase 1 workflow will follow:

```text
Requester submits request
          |
          v
Pending Manager Approval
          |
     Manager Decision
       /          \
   Reject        Approve
     |              |
 Rejected       High Risk?
                /       \
              No         Yes
              |           |
           Approved   Pending System Owner
                          |
                    Owner Decision
                      /       \
                   Reject    Approve
                     |          |
                 Rejected    Approved
```

A request is considered high-risk when:

* Environment = Production, OR
* Access Level = Admin

## 6. Test Strategy

Automated tests will cover the critical business behavior:

### Standard flow

Requester creates a non-high-risk request and the Manager approves it.

Expected result:

```text
Pending Manager -> Approved
```

### High-risk flow

Requester creates a high-risk request, Manager approves it, and the appropriate System Owner approves it.

Expected result:

```text
Pending Manager -> Pending System Owner -> Approved
```

### Authorization

An unauthorized user attempts to approve a request.

Expected result:

```text
403 Forbidden
```

### Idempotency

The same ClientRequestId is submitted multiple times.

Expected result:

```text
Only one business request is created.
```

### Concurrency

Two actions attempt to process the same request version.

Expected result:

```text
One action succeeds.
The stale action receives a conflict response.
```

### Rejection

A request is rejected with a reason.

Expected result:

* Rejection reason is stored.
* Audit event is created.
* Request cannot be processed again.

## 7. Important Trade-offs

### Simple local authentication

A seeded user switcher will be used instead of implementing real authentication/SSO because real identity integration is explicitly outside the Phase 1 scope.

Authorization will still be enforced on the backend.

### Simple architecture

A modular monolith will be used instead of microservices because the assessment requires a small end-to-end vertical slice and does not require distributed architecture.

### Backend-focused testing

Critical business behavior will primarily be proven through backend/integration tests. Frontend tests may be added where useful, but they are not the primary evidence for business correctness.

## 8. Security and Correctness Priorities

Priority will be given to:

1. Server-side authorization
2. Valid state transitions
3. Idempotent request creation
4. Concurrency protection
5. Atomic audit trail
6. Database constraints
7. Clear validation and error responses

UI visibility will not be treated as a security boundary.

## 9. Scope Control

The implementation will prioritize the required Phase 1 vertical slice.

The following will remain out of scope unless explicitly requested later:

* Real OAuth/OIDC
* Real email notifications
* Application provisioning
* Microservices
* Message brokers
* Kubernetes
* Cloud deployment
* Complex RBAC administration
* Advanced analytics/dashboard
* Complex search and pagination

## 10. Plan Changes

This section will be updated during implementation if technical discoveries or constraints require changes to the original plan.

| Change   | Reason       | Impact |
| -------- | ------------ | ------ |
| None yet | Initial plan | -      |
