Tasks

Asset
- [x] Add search options in Assets to match Query. type/make/model/status/warehouse/meter
- [] Allow user to copy paste model and search in query
- [] Print barcode react-barcode

Navigation
- [ ] Add bredcrumb trail 
- [ ] Match URL to the status of the page / Add dates as URL parameters

Search 
- [ ] Search by serial number

Arrival
- [ ] Create Arrival
  - [x] Generalize Model dropdown
  - [x] Add keyboard navigation on popover
  - [x] Add active inactive in warehouse
  - [x] Use generalized dropdown for transporter, vendor
  - [x] Add organizations endpoint in backend
  - [x] Add org api/ store/ hook
  - [x] Add multi selector
  - [x] Add form with Vendor, Warehouse, Transporter
  - [x] Add new asset with model, serial, meter, accessories, cassettes internal finisher 
  - [x] Change layout
  - [x] Add data table to show assets
  - [x] Use hook form with form validation for new asset
  - [x] Use hook form with form validation for new arrival
  - [x] Generate Arrival ID
  - [x] Front end should save model ID
  - [x] Create new Asset in Prisma
  - [x] Create new Arrival in Prisma
  - [x] Save form
- [ ] Add new asset on existing arrival
- [ ] Edit Arrival
- [ ] Auto load Arrivals of the last 7 days
- [ ] Add warehouse in the main search or quick search
- [ ] Create Location endpoint

Database Time - EST
- [ ] Fix database time

Error handling
- [ ] Standard error response from the backend
- [ ] Show toast on success
- [ ] Show toast on failure with human friendly message

Invoice 
- [ ] Create new invoice
- [ ] Attach existing assets to invoice
- [ ] Add new assets to invoice

Transfer
- [ ] Create Transfer
- [ ] Edit Transfer
- [ ] Accept Transfer

Departure
- [ ] Create Departure
  - [ ] Add assets from a hold/ saved collection
  - [ ] Add by barcode
- [ ] Edit departure

Holds
- [ ] Create holds

Comment
- [ ] Add Comment

Reports
- [] Move old reports to the new system

User
- [ ] Authentication
- [ ] Login
- [ ] Saved queries

Edit Asset
- [ ] edit error status, errors, meter reading, invoice
- [ ] add parts
- [ ] edit price
- [ ] attach images
- [ ] Add error codes
- [ ] Add parts

Location
- [ ] Add location
- [ ] Delete location
- [ ] Update location

Admin
- [ ] rights managemenet

History
- [ ] add history based on asset movement

Warehouse management
- [ ] physical inventory - remove location of all assets?
- [ ] show assets without location in the warehouse
- [ ] show a map with missing assets?

Asset Summary
- [ ] Provide quick filters for copiers/finishers/accessories within Asset list

Discussion
- [ ] Do we need Merge Arrival?
- [ ] What is consignment management? Do we need it?
- [ ] What is stores machine codes?
- [ ] Arrival number doesnt have warehouse reference but barcode does.

====================================================================================================
Prototype >>> Production

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