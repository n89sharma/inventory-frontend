# Tasks

## Arrival
- Edit arrival
  - Add a pen icon for each arrival row when user searches for arrivals
  - Add an edit icon for when the user opens a specific arrival
  - Should we allow the user to edit the vendor/ transporter/ warehouse?
  - For now we can just allow new assets?
  - Opens up create arrival page but populates the arrival information
  - User can add a new asset
- Print all barcodes

## Quality of life
- Share asset link
- Copy Asset barcode or Serial number

## Query
- Save a query for a user
- View a list of historical queries

## Asset Summary pages
- Add total number of assets within an arrival/transfer/departure/invoice/hold

## Backend
- Add locations endpoint
- On failure send standard error response

## Misc
- Dates should use abbreviated month. Feb instead of February
- Holds should have Date in the second column to match Arrival/Transfer/Departure
- All text should be Sentence Case by default
- Invoice should have Date in the second column to match Arrival/Transfer/Departure
- Show toast on general failure with human friendly message
- Table headers are crowded. Perhaps headings need to be broken in two? Total\nMeter

## Transfer
- Create Transfer
- Edit Transfer
- Accept Transfer

## Departure
- Create Departure
  - Add assets from a hold/ saved collection
  - Add by barcode
- Edit departure

## Invoice 
- Create new invoice
- Attach existing assets to invoice
- Add new assets to invoice

## Holds
- Search Holds by Created By Created For and Customer
- Create holds

## Asset
- Allow user to copy paste model and search in query
- Print barcode react-barcode
- Search asset by serial number
- Add Comment
- edit error status, errors, meter reading, invoice
- add parts
- edit price
- attach images
- Add error codes
- Add parts
- Provide quick filters for copiers/finishers/accessories within Asset list
- Edit location

## History
- [ ] add history based on asset movement

## Reports
- [] Move old reports to the new system

## User
- [ ] Authentication
- [ ] Login
- [ ] Saved queries
- [ ] rights managemenet

## Location
- [ ] Add location
- [ ] Delete location
- [ ] Update location

## Database
- [ ] Fix database time

## Warehouse management
- [ ] physical inventory - remove location of all assets?
- [ ] show assets without location in the warehouse
- [ ] show a map with missing assets?

## Discussion
- [ ] Do we need Merge Arrival?
- [ ] What is consignment management? Do we need it?
- [ ] What is stores machine codes?
- [ ] Arrival number doesnt have warehouse reference but barcode does.


Feedback
  Immediate Fixes (Bugs / Inconsistencies)

  6. Loading state exists in stores but isn't used on list pages
  All 5 list stores have a loading field and setLoading setter, but arrivals.tsx,       
  transfers.tsx, etc. never call setLoading. Only query.tsx manages loading locally with
   useState. Users get no feedback while data is fetching.

  ---
  Fix Soon (Architecture)

  7. Massive store boilerplate
  All 5 list stores (arrival, transfer, departure, hold, invoice) duplicate the exact   
  same pattern: fromDate, toDate, warehouse, hasSearched, and 4 setters. If you add a   
  new search filter, you touch 5 files. Consider a factory or a shared
  createSearchStore() Zustand slice.

  8. No error states shown to users on list page failures
  If getArrivals() throws, the error is unhandled — there's no catch, no toast, no empty
   state message. The table just stays empty. For an ERP system, silent failures are    
  dangerous.

  9. useAutoSearch captures a stale closure
  useEffect(() => {
    if (!hasSearched) onSearchSetData(...)
  }, []) // empty deps — stale closure
  ESLint exhaustive-deps will flag this, and it captures the initial render's
  onSearchSetData. In practice it works, but it's fragile.

  10. getPartNames() parses structured data from a string
  In formatters.ts, getPartNames() extracts part information from a freetext notes      
  field. This suggests either the backend stores structured data as a string or the     
  backend API is not providing a properly shaped response. This will break silently if  
  the format changes.

  ---
  Plan For (Scalability)

  11. No pagination on any list page
  Every list page fetches all records for a date range in one request. For an ERP       
  handling years of data, this will eventually cause slow loads and large memory usage. 
  You need cursor/offset pagination with lazy loading or infinite scroll. This needs to 
  be designed before the data grows too large to refactor around.

  12. Client-side fuzzy search (Fuse.js) won't scale
  PopoverSearch loads all models and orgs into memory and searches with Fuse.js on the  
  client. This is fine now (~hundreds of records), but ERP systems accumulate thousands 
  of vendors, models, and assets. Server-side search with debounced API calls will      
  eventually be needed.

  13. No URL-based filter state
  All filter state lives in Zustand. You can't share a URL pointing to a specific date  
  range or warehouse filter. In enterprise workflows, sharing a link to a filtered view 
  is a common expectation.

  14. No React Error Boundaries
  An unhandled runtime error in any component will crash the entire UI. Error Boundaries
   provide a fallback and prevent cascading failures.

  ---
  Major Gaps

  15. No authentication or authorisation
  The app has roles in the constants API but no session management, no login flow, and  
  no route-level access control. For a system competing with Odoo, this is the most     
  critical gap. It also affects what data each user should see and what actions they can
   take.

  16. Reports page is a placeholder
  /reports currently routes to ArrivalsPage. Not an immediate problem, but tracking this
   as intentional technical debt is important.