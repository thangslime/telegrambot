const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class NftEntity extends Model {}

NftEntity.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
  },
  nft_address: {
    type: DataTypes.STRING,
  },
  collection_id: {
    type: DataTypes.INTEGER,
  },
  collection_address: {
    name: 'collection_address',
    type: DataTypes.STRING,
  },
  description: {
    name: 'description',
    type: "varchar",
  },
  maxQuantity: {
    name: 'max_quantity',
    type: "int4",
  },
  imageUrl: {
    name: 'image_url',
    type: "text",
  },
  creatorAddress: {
    name: 'creator_address',
    type: "varchar",
  },
  ownerAddress: {
    name: 'owner_address',
    type: "varchar",
  },
  properties: {
    name: 'properties',
    type: "jsonb",
  },
  externalLink: {
    name: 'external_link',
    type: "text",
  },
  expireTime: {
    name: 'expire_time',
    type: "int8",
  },
  createdAt: {
    name: 'created_at',
    type: Date,
  },
  updatedAt: {
    name: 'updated_at',
    type: Date,
  },
  nftStatus: {
    name: 'nft_status',
    type: "int4",
  },
  startPrice: {
    name: 'start_price',
    type: "numeric",
  },
  endPrice: {
    name: 'end_price',
    type: "numeric",
  },
  price: {
    name: 'price',
    type: "numeric",
  },
  marketPrice: {
    name: 'market_price',
    type: "numeric",
  },
  listingPrice: {
    name: 'listing_price',
    type: "numeric",
  },
  offerPrice: {
    name: 'offer_price',
    type: "numeric",
  },
  quantity: {
    name: 'quantity',
    type: "int4",
  },
  saleType: {
    name: 'sale_type',
    type: "smallint",
  },
  reserveBuyer: {
    name: 'reserve_buyer_id',
    type: "bigint",
  },
  startTime: {
    name: 'start_time',
    type: "bigint",
  },
  blockTimestamp: {
    name: 'block_timestamp',
    type: "bigint",
  },
  countReact: {
    name: 'count_react',
    type: "bigint",
  },
  rarityType: {
    name: 'rarity_type',
    type: "varchar",
  },
  ranking: {
    name: 'ranking',
    type: "int4",
  },
  workchainID: {
    name: 'workchain_id',
    type: "numeric",
  },
  accTypeName: {
    name: 'acc_type_name',
    type: "text",
  },
  jsonData: {
    name: 'json_data',
    type: "text",
  },
  managerNft: {
    name: 'manager_nft',
    type: "text",
  },
  lastActionTimestamp: {
    name: 'last_action_timestamp',
    type: "bigint",
  },
  networkType: {
    name: 'network_type',
    type: "int4",
  },
  version: {
    name: 'version',
    type: "int4",
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});