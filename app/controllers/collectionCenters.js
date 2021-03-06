var mongoose = require('mongoose'),
    CollectionCenter = mongoose.model('CollectionCenter'),
    City = mongoose.model('City'),
    ReportGarbage = mongoose.model('ReportGarbage'),
    Vehicle = mongoose.model('Vehicle');


exports.create = function(req, res){
	if(!req.body.name || !req.body.lat || !req.body.long || !req.body.city){
		if(!req.body.name){
			res.send({status:0,message:"Collection Center name required"});
		}else if(!req.body.long){
			res.send({status:0,message:"Collection Center longitude required"});
		}else if(!req.body.lat){
			res.send({status:0,message:"Collection Center latitude required"});
		}else if(!req.body.city){
			res.send({status:0,message:"Collection Center City required"});
		}else if(!req.body.vehicle){
			res.send({status:0,message:"Collection Center vehicle required"});
		}else if(!req.body.sweeperCapacity){
			res.send({status:0,message:"Collection Center Sweeper Capacity required"});
		}
	}else{
		CollectionCenter.findOne({lat:req.body.lat, long:req.body.long,deleted:0}).exec(function(err,col){
			if(col){
				res.send({status:0,message:"Collection Center of same location already exists"})
			}else{
				CollectionCenter(req.body).save(function(err,collectionCenter){
					if(err){
						res.send({status:0,message:err});
					}else{
						res.send({status:1,message:"success",data:collectionCenter});
                        if(req.body.reportCase && req.body.clientId){
                            ReportGarbage.update({_id : req.body.clientId},{$set:{deleted:1}},function(err,modData){
                                console.log(err,modData)
                            });
                        }
						City.findOne({_id:req.body.city}).exec(function(err,city){
							if(!err){
								if(!city.collectionCenters){
									city.collectionCenters=[];							
								}
								city.collectionCenters.push(collectionCenter._id);
								city.save(function(err){
									if(!err){
										Vehicle.findOne({_id:req.body.vehicle}).exec(function(err,vehicle){
											if(!err){
												if(!vehicle.collectionCenters){
													vehicle.collectionCenters=[];							
												}
												if(vehicle.collectionCenters.indexOf(collectionCenter._id)==-1){
													vehicle.collectionCenters.push(collectionCenter._id);
													vehicle.save();
												}												
											}
										})
									}
								});
							}
						})						
					}
				})
			}
		})		
	}
}

exports.fetch = function(req, res){
	var query = {deleted:0};
	if(req.query.city){
		query.city=req.query.city;
	}
	if(req.query.id){
		query._id=req.query.id;
	}
	if(req.query.vehicleId) {
		query.vehicle = req.query.vehicleId;
	}

	CollectionCenter.find(query,function(err,collectionCenter){
		if(err){
			res.send({status:0,message:err});
		}else{
			if(!collectionCenter.length){
				res.send({status:0,message:"No Collection Centers Found",data:collectionCenter});
			}else{
				res.send({status:1,message:"success",data:collectionCenter});
			}
		}
	})
}


exports.edit = function(req, res){
	if(!req.body.name && !req.body.lat && !req.body.long && !req.body.city){
		res.send({status:0,message:"Nothing to Update"})
	}else{
		var update={};
		if(req.body.name){
			update.name=req.body.name;
		}
		if(req.body.long){
			update.long=req.body.long;
		}
		if(req.body.lat){
			update.lat=req.body.lat;
		}
		if(req.body.city){
			update.city=req.body.city;			
		}
		if(req.body.vehicle){
			update.vehicle=req.body.vehicle;	
		}
		if(req.body.sweeperCapacity){
			update.sweeperCapacity=req.body.sweeperCapacity;
		}
		CollectionCenter.findOne({lat:req.body.lat, long:req.body.long, _id:{$ne:req.params.id}}).exec(function(err,col){
			if(col.length){
				res.send({status:0,message:"CollectionCenter of same location already exists"})
			}else{
				CollectionCenter.findOneAndUpdate({_id:req.params.id},update,{upsert:false,multi:false},function(err){
					if(err){
						res.send({status:0,message:err});
					}else{
						res.send({status:1,message:"success"});
					}
				})
			}
		})		
	}
}


exports.delete = function(req, res){
	if(req.params.collectionCenterId){
		CollectionCenter.findOneAndUpdate({_id:req.params.collectionCenterId},{deleted:1},{multi:false,upsert:false},function(err){
			if(err){
				res.send({status:0,message:err});
			}else{
				res.send({status:1,message:"success"});
			}
		})
	}else{
		res.send({status:0,message:"Collection Center Id required"});
	}	
}