# RakshaWell-AI: Security Architecture & Controls

## 1. Access Control (RBAC)
- Four defined roles: Personnel, Welfare Officer, Commander, Admin.
- Least-privilege access enforcement:
  - Personnel can only read their own private baseline and submit self-assessments.
  - Welfare Officers can only access personnel cases within their assigned unit formations.
  - Commanders receive aggregated statistical dashboards without individual message or counseling details.
  - Admins manage system accounts and audit logs with zero access to private conversations.

## 2. Multi-Factor Authentication (2FA)
- Time-based 6-digit OTP enforcement for privileged administrative and officer role switches.
- Automatic session invalidation upon idle inactivity.

## 3. Data Protection & Minimization
- No clinical notes or private chat conversations are stored in general administrative audit logs.
- Sensitive access events (`SIGNAL_REVIEWED`, `DATA_ACCESS`) generate immutable, sanitized audit records with actor IP and timestamps.

## 4. Prototype vs. Production Separation
- Development environment utilizes 100% synthetic personnel data clearly labeled `PROTOTYPE DATASET — SYNTHETIC`.
- Real defence personnel credentials, unit locations, or operational deployments are strictly prohibited in the demo environment.
