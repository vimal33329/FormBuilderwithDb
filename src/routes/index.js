const express = require('express');
const router = express.Router();

const model = require('../model/formsdata')();

router.get('/', (req, res)=>{
    model.find({}, (err, formsdata)=>{
        if(err){console.log(err);}

        res.render('index', {
            title: 'Form data',
            formsdata: formsdata
        });

    });
});


router.get('/slug/:slug', (req, res)=>{
    model.findOne({ _id:req.params.slug}, (err, formsdata)=>{
        if(err){console.log(err);}
        res.render('slug', {
            title: 'Form Builder',
            formsdata: formsdata
        });

    });
});


router.post('/formsdata', async (req, res)=>{
    let body = req.body;
    body.status = false;
	if(req.body.swtch == 'getData'){
	const formsdata = await model.find({}).exec();
    if (formsdata) { return res.status(200).json(formsdata).end(); } 
	else { return res.status(404).json({ error: 'No data Found' }); }
	}
	
	if(req.body.swtch == 'addData'){
	delete req.body.swtch,req.body.data_id; 
    model.create(req.body, (err, formsdata)=>{
        if(err){console.log(err);}
    return res.status(200).json("added").end()
    })
	}
	
	if(req.body.swtch == 'updateData'){
		let uid = req.body.data_id;
		model.findById(uid, (err, formsdata)=>{
        if(err){console.log(err);}
        formsdata.title=req.body.title;
		formsdata.description=req.body.description; console.log(formsdata);
        formsdata.save().then(()=> {return res.status(200).json("Updated").end()})
    });
	}

	if(req.body.swtch == 'change_status'){
    model.findById(req.body.uid, (err, formsdata)=>{ 
        if(err){console.log(err);}
        formsdata.status=!formsdata.status;
        formsdata.save().then(()=> {return res.status(200).json("Updated").end()})
    });
	}	
	
	if(req.body.swtch == 'del_formsdata'){
	    model.remove({_id: req.body.data_id}, (err, formsdata)=>{
		if(err){return res.status(404).json({ error: 'cannot perform delete'+err })}
        return res.status(200).json("Deleted ").end();
		});
	}	
	
});

module.exports = router;