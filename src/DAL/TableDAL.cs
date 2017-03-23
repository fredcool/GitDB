﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using System.Configuration;
using Model;

namespace DAL
{
    public class TableDAL
    {
        public string connectionString;

        public TableDAL()
        {
            this.connectionString = ConfigurationManager.ConnectionStrings["GitDB"].ConnectionString;
        }

        public TableDAL(string ConnectionString)
        {
            this.connectionString = ConnectionString;
        }

        public List<Table> GetTables()
        {
            var connection = new SqlConnection(this.connectionString);
            Table info = new Table();
            List<Table> result = null;
            try
            {
                connection.Open();
                result = connection.Query<Table>(info.ScriptGetTables).ToList();
                connection.Close();
            }
            catch (Exception)
            {

            }
            return result;
        }
    }
}
