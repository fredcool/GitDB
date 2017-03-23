using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DAL;

namespace UnitTest.DAL
{
    [TestClass]
    public class LogDALTest
    {
        [TestMethod]
        public void TestInsertLog()
        {
            LogDAL dal = new LogDAL();
            dal.InsertLog("Test");
        }
    }
}
