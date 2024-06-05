export const onUpdateTrigger = (table: string) => `
  CREATE TRIGGER ${table}_update_at
  BEFORE UPDATE ON ${table}
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp()
`