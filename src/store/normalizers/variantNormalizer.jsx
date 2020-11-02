import { normalize, schema } from 'normalizr';

const namedCoast = new schema.Entity('named_coasts');

const territory = new schema.Entity('territories', {
  named_coasts: [namedCoast],
});

const nation = new schema.Entity('nations');

const variant = new schema.Entity('variants', {
  nations: [nation],
  territories: [territory],
});

const variantList = new schema.Array(variant);

const variantNormalizer = (variantData) => normalize(variantData, variantList);
export default variantNormalizer;
