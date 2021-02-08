
exports.up = function(knex) {
  return knex.schema
    .table('users', function (table) {
      table.string('email');
    })
};

exports.down = function(knex) {
  return knex.schema
    .table('users', function (table) {
      table.dropColumn('email');
    })
};
