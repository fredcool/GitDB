using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DAL;
using Model;
using System.Collections.Generic;

namespace UnitTest.DAL
{
    [TestClass]
    public class DbObjectDALTest
    {
        DbObjectDAL dal;

        [TestInitialize]
        public void setup()
        {
            dal = new DbObjectDAL("Data Source=34.208.160.108;Initial Catalog=GitDB;Integrated Security=False;User Id=GitDB;Password=GitDBAdmin;MultipleActiveResultSets=True");
        }

        [TestMethod]
        public void TestGetDbObjectsByType_GitDB_FN()
        {
            dal = new DbObjectDAL("Data Source=34.208.160.108;Initial Catalog=GitDB;Integrated Security=False;User Id=GitDB;Password=GitDBAdmin;MultipleActiveResultSets=True");
            List<DbObject> actual = dal.GetDbObjectsByType(DbObject.Type_Function);
            Assert.IsNotNull(actual);
            Assert.IsTrue(actual.Count > 0);
        }

        [TestMethod]
        public void TestGetDbObjectsByType_GitDB_P()
        {
            dal = new DbObjectDAL("Data Source=34.208.160.108;Initial Catalog=GitDB;Integrated Security=False;User Id=GitDB;Password=GitDBAdmin;MultipleActiveResultSets=True");
            List<DbObject> actual = dal.GetDbObjectsByType(DbObject.Type_Stored_Procedure);
            Assert.IsNotNull(actual);
            Assert.IsTrue(actual.Count > 0);
        }

        [TestMethod]
        public void TestGetDbObjectsByType_Fusion_FN()
        {
            dal = new DbObjectDAL("Data Source=34.208.160.108;Initial Catalog=Fusion;Integrated Security=False;User Id=GitDB;Password=GitDBAdmin;MultipleActiveResultSets=True");
            List<DbObject> actual = dal.GetDbObjectsByType(DbObject.Type_Function);
            Assert.IsNotNull(actual);
            Assert.IsTrue(actual.Count > 0);
        }
    }
}
