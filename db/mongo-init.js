const dbName = process.env.MONGO_INITDB_DATABASE || 'cocktailsdb';
const user = process.env.MONGO_INITDB_ROOT_USERNAME || 'root';
const pass = process.env.MONGO_INITDB_ROOT_PASSWORD || 'example';

const admin = db.getSiblingDB('admin');
admin.auth(user, pass);

const appdb = db.getSiblingDB(dbName);
appdb.createCollection('cocktails');
appdb.cocktails.insertMany([
  {
    name: 'Margarita', category: 'Classic', alcoholic: true, isFavorite: true, rating: 5,
    ingredients: [
      { name: 'Tequila', amount: 50, unit: 'ml' },
      { name: 'Triple Sec', amount: 25, unit: 'ml' },
      { name: 'Lime Juice', amount: 25, unit: 'ml' }
    ],
    instructions: 'Shake with ice, strain into salt-rimmed glass.'
  },
  {
    name: 'Virgin Mojito', category: 'Mocktail', alcoholic: false, isFavorite: false, rating: 4,
    ingredients: [
      { name: 'Lime', amount: 1, unit: 'pc' },
      { name: 'Mint', amount: 10, unit: 'leaves' },
      { name: 'Soda', amount: 120, unit: 'ml' }
    ],
    instructions: 'Muddle mint and lime, add ice, top with soda.'
  }
]);
