const NotesService = {
    getAllNotes(knex) {
        // console.log(knex)
        return knex.select('*').from('noteful_notes')
    },
    insertNote(knex, newNote) {
        return knex
            .insert(newNote)
            .into('noteful_notes')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteNote(knex, id) {
        return knex('noteful_notes')
            .where({ id })
            .delete()
    },
    getById(knex, id) {
        return knex.from('noteful_notes').select('*').where('id', id).first()
    }

}

module.exports = NotesService