using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DAL;
using System.Collections.Generic;
using Model;

namespace UnitTest.DAL
{
    [TestClass]
    public class DbTableDALTest
    {
        private DbTableDAL dal;

        [TestInitialize]
        public void setup()
        {
            dal = new DbTableDAL("Data Source=34.208.160.108;Initial Catalog=GitDB;Integrated Security=False;User Id=GitDB;Password=GitDBAdmin;MultipleActiveResultSets=True");
        }

        [TestMethod]
        public void TestGetTablesByDatabase()
        {
            dal = new DbTableDAL("Data Source=34.208.160.108;Initial Catalog=GitDB;Integrated Security=False;User Id=GitDB;Password=GitDBAdmin;MultipleActiveResultSets=True");
            List<DbTable> actual = dal.GetTables();
            Assert.IsNotNull(actual);
        }

        [TestMethod]
        public void TestGetTablesByDatabase_Fusion()
        {
            dal = new DbTableDAL("Data Source=34.208.160.108;Initial Catalog=Fusion;Integrated Security=False;User Id=GitDB;Password=GitDBAdmin;MultipleActiveResultSets=True");
            List<DbTable> actual = dal.GetTables();
            Assert.IsNotNull(actual);
        }

        [TestMethod]
        public void TestGenerateTableScript()
        {
            dal = new DbTableDAL("Data Source=34.208.160.108;Initial Catalog=GitDB;Integrated Security=False;User Id=GitDB;Password=GitDBAdmin;MultipleActiveResultSets=True");
            var actual = dal.GenerateTableScript();
        }
    }
}
