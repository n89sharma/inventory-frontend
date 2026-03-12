1. Errors
  - catch errors
  - log errors
  - show useful recovery steps to the user
2. Data
  - Scalable DB with backups
3. Security 
  - JWT, salted hashes, CORS and encrypted environment variables
4. Testing
  - automated unit, integration and E2E tests
5. Performance
  - concurrent users and multiple requests


1. Robustness & Error Handling

* [ ] **Global Error Handler:** Ensure your Node.js backend uses a central middleware so it never "hangs" on a failed request.
* [ ] **Input Validation:** Every single `req.body` is parsed through a **Zod** schema (as we discussed) to block "garbage" data.
* [ ] **Graceful Degradation:** If the database is down, does the app show a clean "Maintenance" screen or a raw technical error?

2. Security & Environment

* [ ] **Secrets Management:** Ensure your JWT secret and DB URL are in a `.env` file that is **gitignored**.
* [ ] **HTTPS/CORS:** Configure CORS to only allow requests from your specific frontend domain.
* [ ] **Rate Limiting:** Protect your `/arrivals` endpoint from being slammed by bot traffic or accidental loops.

3. Database & Data Integrity

* [ ] **Prisma Migrations:** Use `prisma migrate dev` to track changes rather than `db push`.
* [ ] **Indexing:** Ensure frequently searched fields (like `serial_number` or `arrival_number`) have database indexes for speed.
* [ ] **Unique Constraints:** Verify that fields like `status` or `serialNumber` are truly `@unique` in the schema.

4. Observability (The "Eyes")

* [ ] **Logging:** Use a library like `Winston` or `Pino` to log errors to a file or a service (like Datadog or Logtail).
* [ ] **Health Checks:** A simple `/api/health` endpoint that returns `200 OK` so you know the server is alive.
* [ ] **Monitoring:** Alerts for when the server hits 90% CPU or memory usage.

5. Code Quality & DevX

* [ ] **Shared Types:** Ensure the Frontend and Backend share the same TypeScript interfaces/schemas to prevent drift.
* [ ] **Documentation:** A `README.md` that explains how to get the project running from scratch.
* [ ] **CI/CD:** Automated pipelines that run your tests and linter before allowing a "Merge to Main."