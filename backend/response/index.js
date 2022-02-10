const ok = (res, data) =>{
	return res.status(200).json({
		success: {
			code: 200,
			data: data,
		},
	});
};

const error = (res, code, error) => {
	return res.status(code).send({
		code:code,
		message: error,
	});
};

const serverResponse = {
	ok, error
};

module.exports = serverResponse;