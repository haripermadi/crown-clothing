import { createSelector } from "reselect";

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5,
// };

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectShopCollectionCategory = (slug) =>
  createSelector(
    [selectShopCollections],
    (collections) =>
      // collections.find((item) => item.id === COLLECTION_ID_MAP[slug])
      collections ? collections[slug] : null // data normalitation change array to object see shop.data.js/ hash table data structure
  );

export const selectCollectionArray = createSelector(
  [selectShopCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectIsFetchingCollection = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections // !! for truthy/falsy
);
