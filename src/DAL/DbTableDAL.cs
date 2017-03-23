using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using System.Configuration;
using Model;
using Microsoft.SqlServer.Management.Smo;
using Microsoft.SqlServer.Management.Smo.SqlEnum;
using System.Collections.Specialized;
using BusinessObject.BusinessObjects;

namespace DAL
{
    public class DbTableDAL
    {
        public string connectionString;

        public DbTableDAL()
        {
            this.connectionString = ConfigurationManager.ConnectionStrings["GitDB"].ConnectionString;
        }

        public DbTableDAL(string ConnectionString)
        {
            this.connectionString = ConnectionString;
        }

        public List<DbTable> GetTables()
        {
            var connection = new SqlConnection(this.connectionString);
            DbTable info = new DbTable();
            List<DbTable> result = null;
            try
            {
                Dictionary<string, string> tableScripts = GenerateTableScript();
                connection.Open();
                result = connection.Query<DbTable>(info.ScriptGetTables).ToList();
                if (result != null)
                {
                    foreach (DbTable table in result)
                    {
                        if (tableScripts.ContainsKey(table.TABLE_NAME))
                            table.Definition = tableScripts[table.TABLE_NAME];
                    }
                }
            }
            catch (Exception)
            {
            }
            finally
            {
                connection.Close();
            }

            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, string> GenerateTableScript()
        {
            Dictionary<string, string> result = new Dictionary<string, string>();
            System.Data.SqlClient.SqlConnectionStringBuilder builder = new System.Data.SqlClient.SqlConnectionStringBuilder(this.connectionString);

            string server = builder.DataSource;
            string database = builder.InitialCatalog;

            Server srv = new Server();
            srv.ConnectionContext.LoginSecure = false;
            srv.ConnectionContext.ConnectionString = this.connectionString;

            Database db = new Database();
            db = srv.Databases[database];

            foreach (Table tbl in db.Tables)
            {
                StringBuilder sb = new StringBuilder();
                ScriptingOptions options = new ScriptingOptions();
                options.ClusteredIndexes = true;
                options.Default = true;
                options.DriAll = true;
                options.Indexes = true;
                options.IncludeHeaders = true;

                StringCollection coll = tbl.Script(options);
                foreach (string str in coll)
                {
                    sb.Append(str);
                    sb.Append(Environment.NewLine);
                }
                result.Add(tbl.Name, sb.ToString());
            }

            return result;
        }
    }
}
