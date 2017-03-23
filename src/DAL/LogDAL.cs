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
    public class LogDAL
    {
        public string connectionString;

        public LogDAL()
        {
            this.connectionString = ConfigurationManager.ConnectionStrings["GitDB"].ConnectionString;
        }

        public void InsertLog(string LogData)
        {
            var connection = new SqlConnection(this.connectionString);
            try
            {
                connection.Open();
                connection.Execute(" insert into [Log](LogData, CreateDate) values (@LogData, getdate()) ", new { LogData = LogData });
            }
            catch (Exception)
            {
            }
            finally
            {
                connection.Close();
            }
        }

    }
}
