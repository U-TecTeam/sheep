# Next Steps: Coffee Social Subscription E-commerce Platform

Based on the current implementation of the `sheep` project, here are the prioritized next steps to complete the prototype and enhance the user experience.

## 1. Module 1: Social Discovery Polish
- **[x] Post Detail View**: Dedicated page for post details (`app/[locale]/post/[id]`) with related product sticky bar.
- **[x] Connect SKUModal in CommunityFeed**: "Buy Now" button now opens the `SKUModal` directly.
- **[ ] Masonry Layout**: Implement a true masonry layout for the `CommunityFeed`.

## 2. Module 2: Product Detail Enhancements
- **[ ] Grind Guide Content**: Implement visual comparisons of different grind sizes.
- **[ ] Flavor Radar Interaction**: Add tooltips explaining each parameter.

## 3. Module 4: User Retention & Social
- **[x] Brewing Note Editor**: Create a structured editor for sharing ratios and temperature.
- **[ ] Subscription Management**: Add functionality to the "Skip" and "Modify" buttons.

## 4. Module 5: Internationalization & RTL
- **[ ] RTL UI Audit**: Specifically check progress bars, timelines, and navigation.

## 5. Backend & Data
- **[ ] Supabase Sync**: Ensure all mock data in `lib/mockData.ts` is reflected in the database.
- **[ ] Auth Redirects**: Test and fix the GitHub OAuth redirect flow.

## 6. Visual Polish
- **[ ] Mobile Bottom Sheet**: Refine the `SKUModal` to feel more like a native half-sheet.
- **[ ] Loading States**: Add skeletons for page transitions.

## 7. Module 6: Admin Dashboard (Backend UI)
- **[x] Dashboard Structure**: Sidebar navigation and overview stats.
- **[x] Product List**: Table view of existing coffee products.
- **[ ] Product Management**: CRUD interface (Create/Edit/Delete).
- **[x] Order & Subscription List**: View and manage active orders.
- **[ ] Content Moderation**: Manage user posts and community notes.

## 8. Module 7: Minimal Transaction Loop (The "Happy Path")
- **[x] Order Creation**: Mock checkout creates an entry in `orders` table (Status: `Pending`).
- **[x] Admin Fulfillment**: "Ship Now" action in Admin updates status to `Shipped`.
- **[x] Logistics Feedback**: Profile page reflects status and shows mock tracking ID.
- **[x] Confirmation & Review**: "Confirm Receipt" sets status to `Delivered` and redirects to Social Loop.
