import { normalize, schema } from 'normalizr';

const namedCoast = new schema.Entity('named_coasts');

const territory = new schema.Entity('territories', {
  named_coasts: [namedCoast],
});

const nation = new schema.Entity('nations');

const territoryData = new schema.Entity('territory_data');

const namedCoastData = new schema.Entity('named_coast_data');

const mapData = new schema.Entity('map_data', {
  territory_data: [territoryData],
  named_coast_data: [namedCoastData],
});

const variant = new schema.Entity('variants', {
  nations: [nation],
  territories: [territory],
  map_data: [mapData],
});

const variantList = new schema.Array(variant);

const variantNormalizer = (variantData) => normalize(variantData, variantList);
export default variantNormalizer;
