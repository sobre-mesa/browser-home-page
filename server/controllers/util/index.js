const APIFeatures = require('./features');

const throwError = (e, r) => {
    return r.status(400).json({
      status: 'failed',
      message: e.message
    })
  }

const successGET = (r, p) => { 
    r.status(200).json({
        status: 'success',
        results: p.length,
        payload: p
    })
}

const getAll = (Model, enabledFeatures) => {
    return async (req, res) => {
        try {
            const features = new APIFeatures(Model, req);
            enabledFeatures?.forEach(feature => {
                features[feature]();
            });
            const payload = await features.query;
            console.log(payload);
            successGET(res, payload);
        }
        catch (err) {
            throwError(err, res);
        }
    }
}

const getAllForUser = (Model) => {
    return async (req, res) => {
        try {
            console.log('INNIT')
            const userId = req.params.user;
            console.log(userId)
            if(!userId) throw new Error();
            const payload = await Model.find({ user: userId });
            successGET(res, payload);
        } catch (err) {
            throwError(err, res);
        }
    };
};

const getOne = (Model) => {
    return async (req, res) => {
        try {
            const payload = await Model.findById(req.params.id);
            successGET(res, payload);
        }
        catch (err) {
            throwError(err, res);
        }
    }
}

const updateOne = (Model) => {
    return async (req, res) => {
        try {
            const payload = await Model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
              });
              successGET(res, payload);
        }
        catch (err) {
            throwError(err, res);
        }
    }
}

const deleteOne = (Model) => {
    return async (req, res) => {
        try {
            console.log(req.params.id)
            await Model.findByIdAndDelete(req.params.id);
            res.status(204).json({
                status: 'success',
            })
        }
        catch (err) {
            throwError(err, res);
        }
    }
}



const createOne = (Model) => {
    return async (req, res) => {
        console.log(req.body);
        try {
            const payload = await Model.create(req.body);
            console.log(payload)
            res.status(201).json({
                status: 'success',
                payload
            });
        }
        catch (err) {
            throwError(err, res);
        }
    }
}

module.exports = {
    getAll,
    getOne,
    updateOne,
    deleteOne,
    createOne,
    getAllForUser
}