var express = require('express');
var router = express.Router();
var city = require('./../app/controllers/cities.js');
var dumpYard = require('./../app/controllers/dumpYards.js');

var collectionCenter = require('./../app/controllers/collectionCenters.js');

var vehicle = require('./../app/controllers/vehicles.js');
var user = require('./../app/controllers/users.js');

var vehicleStat = require('./../app/controllers/vehicleStats.js');
var reportgarbages = require('./../app/controllers/reportgarbages.js');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fetchCity',city.fetch);

router.post('/createCity',city.create);



router.get('/fetchDumpYards',dumpYard.fetch);

router.post('/createDumpYard',dumpYard.create);

router.post('/editDumpYard/:id',dumpYard.edit);

router.delete('/deleteDumpYard/:dumpYardId',dumpYard.delete);



router.get('/fetchCollectionCenters',collectionCenter.fetch);

router.post('/createCollectionCenter',collectionCenter.create);

router.post('/editCollectionCenter/:id',collectionCenter.edit);

router.delete('/deleteCollectionCenter/:collectionCenterId',collectionCenter.delete);

router.post('/addvehicle', vehicle.create);
router.get('/fetchvehicles', vehicle.fetch);
router.get('/fetchvehiclesWithDumpyards', vehicle.fetchWithCollection);


router.post('/adduser', user.create);
router.get('/fetchusers', user.fetch);





router.get('/addRandomDataToVehicleStat',vehicleStat.addRandomData);
router.get('/addRandomDataToCollectionPoints',vehicleStat.addRandomDataGC);
router.get('/fetchVehicleStats',vehicleStat.fetch);
router.get('/fetchGCStats',vehicleStat.fetchGCStats);
router.post('/addcpstats',vehicleStat.addcpstats);


router.post('/addvehiclestats', vehicleStat.add);
router.post('/reportgarbage', reportgarbages.create);
router.get('/reportedgarbagelist', reportgarbages.fetch);

module.exports = router;
