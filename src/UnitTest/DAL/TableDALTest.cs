using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DAL;
using System.Collections.Generic;
using Model;

namespace UnitTest.DAL
{
    [TestClass]
    public class TableDALTest
    {
        private TableDAL dal;

        [TestInitialize]
        public void setup()
        {
            dal = new TableDAL();
        }

        [TestMethod]
        public void TestMethod1()
        {
            List<Table> actual = dal.GetTablesByDatabase("");
        }
    }
}
