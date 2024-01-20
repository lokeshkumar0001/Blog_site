module.exports.errorHandler = (err,req,res,next) => {

    if(err.name === 'ValidationError'){
        const errors = {};

        // Extract all error messages for each field
        for (const field in err.errors) {
            errors[field] = err.errors[field].message;
        }

        return res.json({ error: 'Validation failed', errors });
    }
    console.log(err);
    if(err.code === 11000){
        return res.json({error:'User already exists'})
    }
    res.json({error:err.message})
}