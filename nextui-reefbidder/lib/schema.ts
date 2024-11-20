import { user } from '@nextui-org/theme';
import { boolean, integer, pgTable, serial, text, timestamp, numeric, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    clerkId: text('clerk_id').notNull().unique(),
    firstName: text('name').notNull(),
    lastName: text('last_name').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
    averageReviewScore: numeric('average_review_score', { precision: 3, scale: 2 }).default('0'),
    purchases: integer('purchases').notNull().default(0),
  });

export const sellersTable = pgTable('sellers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  userId: integer('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  averageReviewScore: numeric('average_review_score', { precision: 3, scale: 2 }).default('0'), //TODO: Add a function for this via PGAdmin
  sales: integer('sales').notNull().default(0),
  // Additional fields for the seller can be added here
});

export const listingsTable = pgTable('listings', {
  listingId: serial('listing_id').primaryKey(),
  listingName: text('listing_name').notNull(),
  listingType: text('listing_type', { enum: ['auction', 'buy now'] }).notNull(),
  sellerId: integer('seller_id')
    .notNull()
    .references(() => sellersTable.id, { onDelete: 'cascade' }),
  creationDateTime: timestamp('creation_datetime').notNull().defaultNow(),
  auctionEndDateTime: timestamp('auction_end_datetime'),
  localPickup: boolean('local_pickup').notNull().default(false),
  shipping: boolean('shipping').notNull().default(true),
  shippingCost: numeric('shipping_cost', { precision: 10, scale: 2 }),
  listingPrice: numeric('listing_price', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  quantity: integer('quantity').notNull().default(1),
  status: text('status', { enum: ['active', 'sold', 'expired'] }).notNull().default('active'),
  startingBid: numeric('starting_bid', { precision: 10, scale: 2 }), //TODO: Add a function for this via PGAdmin
  currentBid: numeric('current_bid', { precision: 10, scale: 2 }),
  categoryId: integer('category_id'),
  imageUrl: text('image_url'),
  views: integer('views').notNull().default(0),
  watchlistCount: integer('watchlist_count').notNull().default(0),
});

export const bidsTable = pgTable('bids', {
    bidId: serial('bid_id').primaryKey(),
    listingId: integer('listing_id').notNull()
        .references(() => listingsTable.listingId, { onDelete: 'cascade' }),
    userId: integer('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    creationDateTime: timestamp('creation_datetime').notNull().defaultNow(),
  });

export const viewsTable = pgTable('views', {
    viewId: serial('view_id').primaryKey(),
    listingId: integer('listing_id')
      .notNull()
      .references(() => listingsTable.listingId, { onDelete: 'cascade' }),
    userId: integer('user_id').references(() => usersTable.id), // Nullable for anonymous views
    viewTimestamp: timestamp('view_timestamp').notNull().defaultNow(),
    sessionId: text('session_id'), // Optional session ID for anonymous users
    ipAddress: text('ip_address'), // Optional IP address for analytics
  });  

export const favoritesTable = pgTable('favorites', {
favoriteId: serial('favorite_id').primaryKey(),
listingId: integer('listing_id')
    .notNull()
    .references(() => listingsTable.listingId, { onDelete: 'cascade' }),
userId: integer('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
favoriteTimestamp: timestamp('favorite_timestamp').notNull().defaultNow(),
});

export const sellerReviewsTable = pgTable('seller_reviews', {
    reviewId: serial('review_id').primaryKey(),
    sellerId: integer('seller_id').notNull()
        .references(() => sellersTable.id, { onDelete: 'cascade' }),
    userId: integer('user_id').notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    rating: integer('rating').notNull(),
    reviewText: text('review_text'),
    reviewTimestamp: timestamp('review_timestamp').notNull().defaultNow(),
  });

export const userReviewsTable = pgTable('user_reviews', {
    reviewId: serial('review_id').primaryKey(),
    userId: integer('user_id').notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    reviewerId: integer('reviewer_id').notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    rating: integer('rating').notNull(),
    reviewText: text('review_text'),
    reviewTimestamp: timestamp('review_timestamp').notNull().defaultNow(),
  });

  export const userShippingAddresses = pgTable('user_shipping_addresses', {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }), // Foreign key to `users.id`
    addressLabel: varchar('address_label', { length: 50 }), // e.g., "Home", "Work"
    streetAddress: varchar('street_address', { length: 255 }).notNull(),
    streetAddress2: varchar('street_address_2', { length: 255 }),
    city: varchar('city', { length: 100 }).notNull(),
    state: varchar('state', { length: 50 }).notNull(),
    zipCode: varchar('zip_code', { length: 20 }).notNull(),
    country: varchar('country', { length: 100 }).default('United States'),
    phoneNumber: varchar('phone_number', { length: 20 }),
    isDefault: boolean('is_default').default(false), // Set default address
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  });
  
export type InsertListing = typeof listingsTable.$inferInsert;
export type SelectListing = typeof listingsTable.$inferSelect;
