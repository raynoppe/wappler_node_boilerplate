
exports.up = function(knex) {
  return knex.schema
    .table('users', function (table) {
      table.string('privs');
    })
};

exports.down = function(knex) {
  return knex.schema
    .table('users', function (table) {
      table.dropColumn('privs');
    })
};
