import territoryData from './territories.json';

// Constructs an object based on territoryData where data is indexed by
// territoryID (does not include un-playable territories)
const territoriesByID = {};
territoryData.forEach((td) => {
  territoriesByID[td.id] = td;
});
export default territoriesByID;
