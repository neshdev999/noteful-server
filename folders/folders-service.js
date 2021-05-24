const FoldersService = {
    getAllFolders(knex) {
        // console.log(knex)
        return knex.select('*').from('noteful_folders')
    },
    insertFolder(knex, newFolder) {
        return knex
            .insert(newFolder)
            .into('noteful_folders')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteFolder(knex, id) {
        return knex('noteful_folders')
            .where({ id })
            .delete()
    },
    getById(knex, id) {
        return knex.from('noteful_folders').select('*').where('id', id).first()
    }
}

module.exports = FoldersService