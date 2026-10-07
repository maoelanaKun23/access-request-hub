# Access Request Hub

A small internal web application for managing application access requests, approvals, and audit trails.

This project was developed as part of the Fullstack Engineering Assessment.

## Overview

Access Request Hub allows employees to request access to internal applications and provides an approval workflow based on the request risk level.

The application supports:

- Creating access requests
- Viewing personal requests
- Viewing approval inbox
- Manager approval
- System Owner approval for high-risk requests
- Rejecting requests with a required reason
- Request status tracking
- Audit trail
- Idempotent request creation
- Optimistic concurrency protection
- Server-side authorization
- Simulated user switching for assessment purposes

### High-Risk Rules

A request is considered **high-risk** when:

- Environment is `Production`, or
- Access Level is `Admin`

All requests must first go through Manager approval.

High-risk requests require an additional System Owner approval after Manager approval.

---

# Tech Stack

## Frontend

- React
- Vite
- TypeScript
- React Router
- Kubb-generated API client
- Existing React/Vite frontend template

## Backend

- ASP.NET Core Web API
- C#
- Entity Framework Core
- Swagger / OpenAPI

## Database

- SQLite
- Entity Framework Core Migrations

## Testing

- .NET test framework
- Integration/service-level tests

---

# Architecture

The application follows a simple layered architecture:

```text
┌─────────────────────────────┐
│        React Frontend       │
│                             │
│ - Login / User Switcher     │
│ - My Requests               │
│ - Create Request            │
│ - Approval Inbox            │
│ - Request Detail            │
│ - Audit Timeline             │
└──────────────┬──────────────┘
               │ HTTP / JSON
               ▼
┌─────────────────────────────┐
│      ASP.NET Core API       │
│                             │
│ Controllers                 │
│ Services                    │
│ DTOs                        │
│ Authorization              │
│ Validation                 │
│ Workflow Rules              │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Entity Framework       │
│            Core             │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│          SQLite DB          │
│                             │
│ Users                       │
│ Applications                │
│ Access Requests             │
│ Audit Events                │
└─────────────────────────────┘