import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.schema.createTable('employees_work_schedule', (table) => {
    table.increments('id').primary()
    table.integer('employee').unsigned().references('id').inTable('employees').onDelete('CASCADE')
    table.string('day').notNullable()
    table.float('startTime').notNullable()
    table.float('endTime').notNullable()
    table.integer('order').notNullable()
  })
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.schema.dropTableIfExists('employees_work_schedule')
}