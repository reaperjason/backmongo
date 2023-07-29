const store = require('./store');

function addMessage(user, message) {
    return new Promise((resolve, reject) => {
        if (user == null || message == null) {
            console.log('error message/Controller');
            reject('Datos incompletos');
            return false;
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        };
        store.add(fullMessage);
        resolve(fullMessage);
    });
}

function getMessages(filterUser) {
    return new Promise(async (resolve, reject) => {
        resolve(store.list(filterUser));
    });
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            reject('Invalid data');
            return false;
        }
        const result = await store.update(id, message);
        resolve(result);
    });
}

function deleteMessage(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            reject('ID Invalido');
            return false;
        }
        store.remove(id)
            .then(deleted => {
                if (deleted.deletedCount > 0) {
                    resolve(deleted);
                }
                reject('ID Invalido');
                return false;
            })
            .catch(e => {
                reject(e);
            });
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
};