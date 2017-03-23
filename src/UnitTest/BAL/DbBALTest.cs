using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BAL;
using BusinessObject.Request;
using BusinessObject.Response;
using BusinessObject.Dictionary;

namespace UnitTest.BAL
{
    [TestClass]
    public class DbBALTest
    {
        private IDbBAL bal;

        [TestInitialize]
        public void setup()
        {
            bal = new DbBAL();
        }

        [TestMethod]
        public void TestListAllTables()
        {
            ListAllTablesRequest request = new ListAllTablesRequest();
            request.ProjectName = "Test2";
            ListAllTablesResponse actual = bal.ListAllTables(request);
            Assert.AreEqual(StatusCodes.Status_Success, actual.StatusCode);
        }
    }
}
