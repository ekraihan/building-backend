let express = require('express');
let app = express();

const KerasJS = require('keras-js');
let IJS = require('image-js');

let bodyParser = require('body-parser');
let multer = require('multer');

let upload = multer();

app.use(bodyParser.urlencoded({ limit: '50mb', 
    extended: true
}));
app.use(bodyParser.json()); // for parsing application/json

app.post('/', upload.array(), function(req, res){
    
    // Set up for the model
    const SIZE = 32;
    this.MODEL_CONFIG = {
        filepaths: {
            model: '../prediction_code/model.json',
            weights: '../prediction_code/model_weights.buf',
            metadata: '../prediction_code/model_metadata.json'
        },
        filesystem: true
    };
    
    run_model(req.body.image);
	
	function run_model(image)
	{
        const model = new KerasJS.Model(Object.assign(this.MODEL_CONFIG));

        IJS.load(image).then(function(image) {
            image = image.grey();
            image = image.scale({width: SIZE, height: SIZE});

            try {
                model.ready().then(function(){
                    const inputData = { "input": new Float32Array(image.data)};
                    model.predict(inputData).then(output => {
                        get_building_type(output['output'][0]);
                    })
                });

            } catch (err) {
                console.log(err);
            }
        })
	};

    const building_map = {
        1 : "North",
        0 : "South"
    };
	function get_building_type(prediction)
	{
        res.header("Access-Control-Allow-Origin", "*");
		res.json({building: building_map[Math.round(prediction)]});
	}
})

app.listen(3000);