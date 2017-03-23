using Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace DAL
{
    public class DbObjectDAL
    {
        public string connectionString;

        public DbObjectDAL()
        {
            this.connectionString = ConfigurationManager.ConnectionStrings["GitDB"].ConnectionString;
        }

        public DbObjectDAL(string ConnectionString)
        {
            this.connectionString = ConnectionString;
        }

        public List<DbObject> GetDbObjectsByType(string Type)
        {
            var connection = new SqlConnection(this.connectionString);
            DbObject info = new DbObject();
            List<DbObject> result = new List<DbObject>();

            try
            {
                connection.Open();
                result = connection.Query<DbObject>(info.ScriptGetDbObjectsByType, new { Type = Type}).ToList();
                connection.Close();
            }
            catch(Exception)
            {
                result = null;
            }

            return result;
        }
    }
}
