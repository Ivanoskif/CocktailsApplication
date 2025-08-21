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
  },
  {
    name: 'Aperol Spritz', category: 'Aperitif', alcoholic: true, isFavorite: false, rating: 5,
    ingredients: [
      { name: 'Aperol', amount: 60, unit: 'ml' },
      { name: 'Prosseco', amount: 90, unit: 'ml' },
      { name: 'Soda', amount: 60, unit: 'ml' },
      { name: 'Orange', amount: 1, unit: 'Slice' }
    ],
    instructions: 'Place ice cubes in a stemmed balloon glass and mix with all ingredients together.'
  }
]);
