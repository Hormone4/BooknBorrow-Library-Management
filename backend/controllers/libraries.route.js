const express = require('express');
const router = express.Router();
const libraryRepo = require('../utils/libraries.repository');


router.get('/list', libraryListAction); //Works
router.get('/show/:libraryId', libraryShowAction);
router.get('/del/:libraryId', libraryDelAction);
router.post('/update/:libraryId', libraryUpdateAction);

async function libraryListAction(request, response) {
    var libraries = await libraryRepo.getAllLibraries();
    response.send(JSON.stringify(libraries));
}

async function libraryShowAction(request, response) {
    var oneLibrary = await libraryRepo.getOneLibrary(request.params.libraryId);
    response.send(JSON.stringify(oneLibrary));
}

async function libraryDelAction(request, response) {
    var numRows = await libraryRepo.delOneLibrary(request.params.libraryId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}

async function libraryUpdateAction(request, response) {
    var libraryId = request.params.libraryId;
    if (libraryId === "0") libraryId = await libraryRepo.addOneLibrary();

    var numRows = await libraryRepo.editOneLibrary(
        libraryId,
        request.body.library_name,
        request.body.library_address,
        request.body.library_phone,
        request.body.library_email,
        request.body.library_openingHours
    );
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;