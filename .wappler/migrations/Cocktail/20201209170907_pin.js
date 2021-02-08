
exports.up = function(knex) {
  return knex.schema
    .table('users', function (table) {
      table.string('pin');
    })
};

exports.down = function(knex) {
  return knex.schema
    .table('users', function (table) {
      table.dropColumn('pin');
    })
};
