using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using System.Configuration;

namespace DAL
{
    public class UserDAL
    {
        public string connectionString;

        public UserDAL()
        {
            this.connectionString = ConfigurationManager.ConnectionStrings["GitDB"].ConnectionString;
        }

        public User GetUserByUsername(string Username)
        {
            var connection = new SqlConnection(this.connectionString);
            User info = new User();
            User result = null;
            try
            {
                connection.Open();
                result = connection.Query<User>(info.ScriptGetUserByUsername, new { Username = Username }).FirstOrDefault();
                connection.Close();
            }
            catch (Exception)
            {

            }
            return result;
        }

        public string GetStringSha256Hash(string text)
        {
            if (String.IsNullOrEmpty(text))
                return String.Empty;

            using (var sha = new System.Security.Cryptography.SHA256Managed())
            {
                byte[] textData = System.Text.Encoding.UTF8.GetBytes(text);
                byte[] hash = sha.ComputeHash(textData);
                return BitConverter.ToString(hash).Replace("-", String.Empty);
            }
        }
    }
}
