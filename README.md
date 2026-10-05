# RakshaWell-AI

> **Detect Early. Understand Clearly. Support Privately.**
> 
> *Core Principle: AI identifies signals. Humans make decisions. Welfare comes before surveillance.*

---

## 1. System Overview

RakshaWell-AI is an AI-powered personnel welfare intelligence platform designed for defense formations, armed forces, and high-stress organizational environments. The platform identifies early changes in welfare-related patterns against an individual's personal baseline, explains those changes with transparent factor attributions, and empowers authorized human welfare officers to provide non-punitive, compassionate support.

### Ethical & Operational Axioms
- **Risk ≠ Diagnosis**: The system evaluates operational workload and fatigue indicators, never psychiatric illness.
- **Alert ≠ Accusation**: Identified variations reflect organizational friction, sleep debt, or delayed leave cycles—not personal deficit or disciplinary faults.
- **AI ≠ Final Decision**: Automated scoring only flags recommendations for human discretion.
- **Zero Commander Chat Access**: Individual voluntary check-ins and confidential Personal Welfare Twin dialogues are never visible to commanding officers. Commanders receive unit-level aggregated trends only.

---

## 2. Four Operational Roles

1. **Personnel (`Subedar Rajesh Kumar - JC-489211K`)**
   - **My Welfare Twin**: Private digital representation benchmarking against individual historical baseline.
   - **Wellness Check**: 7-domain voluntary check-in (Stress, Fatigue, Mood, Sleep, Recovery, Workload, Morale).
   - **My Wellness Journey**: 1M, 3M, 6M, 1Y multi-signal longitudinal telemetry and support milestones.
   - **Talk to My Twin**: Context-aware companion grounded in personal baseline (powered by server-side Gemini API with rule-based resilience).
   - **Request Support**: Confidential counseling requests with choice of urgency and support channel.

2. **Welfare Officer (`Major Anita Sharma - IC-624108M`)**
   - **Welfare Intelligence**: Triage distribution, multi-unit heatmaps, priority outreach queue.
   - **Cases**: Filterable case management (Immediate Human Review, Welfare Review, Monitor, Normal).
   - **Counseling**: Confidential support workflow, appointment scheduling, and recording general non-stigmatizing interventions (e.g., rest cycle, roster adjustment).
   - **Follow-ups**: Scheduled recovery checks and 7-day post-intervention verification.

3. **Commander (`Col. Vikramaditya Singh - IC-519820P`)**
   - **Unit Welfare Overview**: Strength, average weekly duty hours, and leave utilization rates across formations.
   - **Workload Intelligence**: Cross-unit duty distributions highlighting sustained workload clustering.
   - **Aggregate Trends**: 6-month division-wide trajectories correlating leave utilization with aggregate fatigue indices.
   - **Strict Privacy**: Zero individual message transcripts or private counseling notes are exposed.

4. **System Admin (`Sunita Rao - CIV-ADM-9942`)**
   - **Users**: Account provisioning and 2FA status monitoring.
   - **Roles**: Complete RBAC least-privilege permission matrix.
   - **Security**: Cryptographic verification, RLS policies, session timeout controls.
   - **Privacy Center**: Transparent charter detailing data minimization, voluntary consent, and access restrictions.
   - **Audit Logs**: Tamper-evident, sanitized logging of all sensitive data queries and administrative actions.

---

## 3. Technology Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS, Recharts, Lucide Icons.
- **Backend API**: Node.js & Express (`server.ts`) with Vite middleware mounting in development.
- **AI/ML Engine**: Google GenAI SDK (`gemini-3.8-flash`) server-side client, multi-signal feature engine with SHAP linear factor attributions.
- **Synthetic Longitudinal Dataset**: 105 synthetic personnel profiles across 4 operational units with 6–12 months of realistic trajectories.
- **Research Layer**: Open-source statutory policy framework integrating MoD, MHA, CAPF, WHO, ILO, and UN Peacekeeping directives.

---

## 4. How to Run & Test

1. Start development server: `npm run dev`
2. Test role switcher in the top navigation bar to seamlessly transition between Personnel, Welfare Officer, Commander, and Admin.
3. Switch to privileged roles (Welfare Officer, Commander, Admin) to observe the multi-factor OTP security gate (Demo code: `123456`).
4. Record a voluntary wellness check-in to observe instantaneous baseline recalibration and factor updates.
5. In the Welfare Officer view, open a case, schedule a counseling dialogue, and log an intervention.
