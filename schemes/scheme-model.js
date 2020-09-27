const { orWhereNull } = require('../data/connection')
const db = require('../data/connection')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    remove,
    update,
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
    .where({id})
    .first()
}

function findSteps(id) {
    return db('schemes')
    .join('steps', 'steps.scheme_id', 'schemes.id')
    .where('schemes.id', id)
    .orderBy('steps.step_number')
}

function add(scheme) {
    return db('schemes')
    .insert(scheme, "id")
    .then(([id]) => {
        return findById(id);
    })
}

function update(id, changes){
    return db('schemes')
    .where({id})
    .update(changes)
    .then(() => {
        return findById(id);
    })
}
function remove(id) {
    return db('schemes')
    .where({id})
    .del()
}