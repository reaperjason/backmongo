const express = require('express');
const response = require('../../network/response');
const controller = require('./controlller');
const router = express.Router();

router.get('/', (req, res) => {
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
        .then(messageList => {
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'error boteniendo', 500, e)
        });
});

router.post('/', (req, res) => {
    controller.addMessage(req.body.user, req.body.message)
        .then(fullmessage => {
            response.success(req, res, fullmessage, 201);
        })
        .catch(e => {
            response.error(req, res, 'Informacion incompleta', 400, 'error controllerMessage');
        });
});

router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message)
        .then(data => {
            response.success(req, res, data, 200);
            console.log('fin', data);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });

});

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `usuario ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        });
});

module.exports = router;